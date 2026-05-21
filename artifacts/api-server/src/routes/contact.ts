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
  host: "smtp.server-he.de",
  port: 587,
  secure: false,
  auth: {
    user: "kontakt@hochstapler-burger.de",
    pass: process.env.SMTP_PASSWORD,
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
      from: `"Hochstapler Burger Kontaktformular" <kontakt@hochstapler-burger.de>`,
      to: "reservierung@hochstapler-burger.de",
      replyTo: email,
      subject: `Kontaktanfrage: ${subject}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Fehler beim E-Mail-Versand");
    res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
});

export default router;
