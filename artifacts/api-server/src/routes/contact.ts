import { Router } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import { rateLimit } from "../middlewares/rateLimit.js";

const router = Router();
const ContactBody = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(10000),
});
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]!));

router.post("/contact", rateLimit(10, 15 * 60 * 1000), async (req, res) => {
  const parsed = ContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Ungültige Eingabe" });
    return;
  }
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_TO) {
    res.status(503).json({ error: "E-Mail-Versand ist noch nicht eingerichtet." });
    return;
  }
  const port = Number(process.env.SMTP_PORT ?? 587);
  if (![465, 587].includes(port)) {
    res.status(503).json({ error: "E-Mail-Konfiguration ist ungültig." });
    return;
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST, port, secure: port === 465, requireTLS: port === 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
  });
  const { name, email, subject, message } = parsed.data;
  try {
    await transporter.sendMail({
      from: { name: "Hochstapler Burger", address: SMTP_FROM },
      to: CONTACT_TO,
      replyTo: email,
      subject: `Kontaktanfrage: ${subject.replace(/[\r\n]/g, " ")}`,
      text: `Neue Kontaktanfrage\nName: ${name}\nE-Mail: ${email}\nBetreff: ${subject}\n\n${message}`,
      html: `<h2>Neue Kontaktanfrage</h2><p>Name: ${escapeHtml(name)}</p><p>E-Mail: ${escapeHtml(email)}</p><p>Betreff: ${escapeHtml(subject)}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    res.json({ success: true });
  } catch (err) {
    // Log a transport code only: provider errors may contain message addresses or contents.
    req.log.error({ code: (err as NodeJS.ErrnoException).code }, "SMTP-Versand fehlgeschlagen");
    res.status(500).json({ error: "E-Mail konnte nicht gesendet werden." });
  } finally {
    transporter.close();
  }
});
export default router;
