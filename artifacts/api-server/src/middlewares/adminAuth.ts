import { type Request, type Response, type NextFunction } from "express";
import { jwtVerify } from "jose";
import { adminSecret } from "../lib/adminSecret.js";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const { payload } = await jwtVerify(auth.slice(7), adminSecret, { algorithms: ["HS256"] });
    if (payload.role !== "admin") throw new Error("Admin role required");
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
