import { Router, raw, static as serveStatic } from "express";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { requireAdmin } from "../middlewares/adminAuth.js";
import { rateLimit } from "../middlewares/rateLimit.js";

const router = Router();
const maxBytes = 5 * 1024 * 1024;
const extensions = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" } as const;
const metadataSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().int().min(1).max(maxBytes),
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
});
const filenamePattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/;
const uploadDir = process.env.UPLOAD_DIR ? path.resolve(process.env.UPLOAD_DIR) : undefined;

router.post("/storage/uploads/request-url", requireAdmin, rateLimit(30, 15 * 60 * 1000), (req, res) => {
  const parsed = metadataSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Nur JPG, PNG oder WebP bis 5 MB sind erlaubt." });
    return;
  }
  if (!uploadDir) {
    res.status(503).json({ error: "Bildspeicher ist noch nicht eingerichtet." });
    return;
  }
  const filename = randomUUID() + extensions[parsed.data.contentType];
  res.json({
    uploadURL: `/api/storage/uploads/${filename}`,
    objectPath: `/objects/${filename}`,
    metadata: parsed.data,
  });
});

function isImage(data: Buffer, contentType: string) {
  if (contentType === "image/jpeg") return data.length >= 3 && data[0] === 255 && data[1] === 216 && data[2] === 255;
  if (contentType === "image/png") return data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  return contentType === "image/webp" && data.length >= 12 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP";
}

router.put("/storage/uploads/:filename", requireAdmin, rateLimit(30, 15 * 60 * 1000),
  raw({ type: ["image/jpeg", "image/png", "image/webp"], limit: maxBytes }),
  async (req, res) => {
    const filename = String(req.params.filename);
    const contentType = req.get("Content-Type")?.split(";")[0] ?? "";
    const ext = extensions[contentType as keyof typeof extensions];
    if (!filenamePattern.test(filename) || !ext || !filename.endsWith(ext) ||
        !Buffer.isBuffer(req.body) || req.body.length === 0 || !isImage(req.body, contentType)) {
      res.status(400).json({ error: "Ungültige Bilddatei." });
      return;
    }
    if (!uploadDir) {
      res.status(503).json({ error: "Bildspeicher ist noch nicht eingerichtet." });
      return;
    }
    try {
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), req.body, { flag: "wx", mode: 0o600 });
      res.status(201).json({ success: true });
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "EEXIST") {
        res.status(409).json({ error: "Bild ist bereits gespeichert." });
        return;
      }
      req.log.error({ err }, "Bild konnte nicht gespeichert werden");
      res.status(500).json({ error: "Bild konnte nicht gespeichert werden." });
    }
  });

if (uploadDir) {
  router.use("/storage/objects", serveStatic(uploadDir, {
    dotfiles: "deny",
    index: false,
    maxAge: "1d",
    setHeaders: res => { res.setHeader("X-Content-Type-Options", "nosniff"); },
  }));
}
export default router;
