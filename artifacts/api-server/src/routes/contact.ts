import { Router, type IRouter, type Request, type Response } from "express";
import { Resend } from "resend";
import { z } from "zod";

const router: IRouter = Router();

const ContactBody = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", async (req: Request, res: Response) => {
  const parsed = ContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Ungültige Eingabe" });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: "Hochstapler Burger <kontakt@hochstapler-burger.de>",
      to: ["reservierung@hochstapler-burger.de"],
      replyTo: email,
      subject: `Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a2a2a;">Neue Kontaktanfrage über die Website</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">E-Mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Betreff:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="white-space: pre-wrap; color: #444;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Diese Nachricht wurde über das Kontaktformular auf hochstapler-burger.de gesendet.</p>
        </div>
      `,
    });

    if (error) {
      req.log.error({ err: error }, "Resend-Fehler beim E-Mail-Versand");
      res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Fehler beim E-Mail-Versand");
    res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
});

export default router;
