import { Router, type IRouter, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const router: IRouter = Router();

const ContactBody = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post("/contact", async (req: Request, res: Response) => {
  const parsed = ContactBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Ungültige Eingabe" });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await transporter.sendMail({
      from: `"Hochstapler Burger" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px">
          <h2>Neue Kontaktanfrage</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Betreff:</strong> ${subject}</p>

          <hr>

          <p>${message
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>")}</p>

          <hr>

          <small>
            Diese Nachricht wurde über das Kontaktformular auf
            hochstapler-burger.de gesendet.
          </small>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "SMTP Fehler");
    res.status(500).json({
      error: "E-Mail konnte nicht gesendet werden",
    });
  }
});

export default router;