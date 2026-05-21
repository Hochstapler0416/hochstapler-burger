import pageBg from "@/assets/images/bar.jpg";
import { motion, type Variants, type Easing } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ease: Easing = "easeOut";

const contactSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein (mind. 2 Zeichen)"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  subject: z.string().min(3, "Bitte geben Sie einen Betreff ein"),
  message: z.string().min(10, "Bitte schreiben Sie eine Nachricht (mind. 10 Zeichen)"),
});

type ContactForm = z.infer<typeof contactSchema>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      setSubmitted(true);
    } catch {
      setSendError("Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt an reservierung@hochstapler-burger.de.");
    } finally {
      setSending(false);
    }
  }

  return (
    <MainLayout>
      <SEO
        title="Kontakt"
        description="Kontaktieren Sie das Hochstapler Burger am Hafen Münster. Adresse: Hafenweg 8, 48155 Münster. Telefon: +49 251 287 46 555. Reservierungen und allgemeine Anfragen."
      />

      {/* PAGE HERO */}
      <section className="relative bg-primary py-20 pt-28 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={pageBg} alt="" className="w-full h-full object-cover opacity-25" aria-hidden />
          <div className="absolute inset-0 bg-primary/65" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Wir freuen uns auf Euch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground"
          >
            Kontakt & Anfahrt
          </motion.h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT: Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              {/* Reservation Notice */}
              <div className="bg-accent/20 border border-accent p-6 mb-10">
                <h2 className="font-serif text-2xl text-primary mb-3">Reservierungen</h2>
                <p className="text-muted-foreground mb-4">
                  Dieses Kontaktformular dient <strong>nicht</strong> für Reservierungen.
                  Für Tischreservierungen nutzt bitte unsere Online-Buchung — bis 5 Personen
                  direkt, ab 6 Personen per Gruppenanfrage.
                </p>
                <a
                  href="/reservierung"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary/80 transition-colors"
                  data-testid="button-reservierung-kontakt"
                >
                  <Mail size={16} />
                  Jetzt reservieren
                </a>
              </div>

              {/* Info Blocks */}
              <h2 className="font-serif text-3xl text-primary mb-8">Kontaktdaten</h2>
              <ul className="space-y-7">
                <li className="flex gap-4" data-testid="contact-address">
                  <div className="w-10 h-10 bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">Adresse</p>
                    <p className="text-muted-foreground">Hafenweg 8<br />48155 Münster</p>
                  </div>
                </li>
                <li className="flex gap-4" data-testid="contact-phone">
                  <div className="w-10 h-10 bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">Telefon</p>
                    <p className="text-muted-foreground">
                      <a href="tel:+4925128746555" className="hover:text-accent transition-colors">
                        +49 251 287 46 555
                      </a>{" "}
                      (Restaurant)
                    </p>
                    <p className="text-muted-foreground">
                      <a href="tel:+4925128746554" className="hover:text-accent transition-colors">
                        +49 251 287 46 554
                      </a>{" "}
                      (Büro)
                    </p>
                  </div>
                </li>
                <li className="flex gap-4" data-testid="contact-email">
                  <div className="w-10 h-10 bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">E-Mail</p>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@hochstapler-burger.de" className="hover:text-accent transition-colors">
                        info@hochstapler-burger.de
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4" data-testid="contact-hours">
                  <div className="w-10 h-10 bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-2">Öffnungszeiten</p>
                    <table className="text-muted-foreground text-sm">
                      <tbody>
                        <tr>
                          <td className="pr-8 py-0.5">Montag – Donnerstag</td>
                          <td>16:00 – 00:00 Uhr</td>
                        </tr>
                        <tr>
                          <td className="pr-8 py-0.5">Freitag</td>
                          <td>16:00 – 02:00 Uhr</td>
                        </tr>
                        <tr>
                          <td className="pr-8 py-0.5">Samstag</td>
                          <td>13:00 – 02:00 Uhr</td>
                        </tr>
                        <tr>
                          <td className="pr-8 py-0.5">Sonntag</td>
                          <td>13:00 – 22:00 Uhr</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>

              {/* Map Placeholder */}
              <div className="mt-10 bg-muted h-64 flex items-center justify-center border border-border" data-testid="map-placeholder">
                <div className="text-center text-muted-foreground">
                  <MapPin size={40} className="mx-auto mb-3 text-accent" />
                  <p className="font-bold text-primary">Hafenweg 8, 48155 Münster</p>
                  <a
                    href="https://maps.google.com/?q=Hafenweg+8,+48155+Münster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline mt-2 inline-block"
                  >
                    In Google Maps öffnen
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl text-primary mb-8">Schreib uns</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/20 border border-accent p-10 text-center"
                  data-testid="form-success"
                >
                  <CheckCircle className="text-accent mx-auto mb-4" size={48} />
                  <h3 className="font-serif text-2xl text-primary mb-3">Nachricht gesendet!</h3>
                  <p className="text-muted-foreground mb-4">
                    Vielen Dank — Ihre Nachricht ist bei uns eingegangen. Wir melden uns so schnell wie möglich.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-sm text-accent underline underline-offset-2 hover:opacity-80"
                  >
                    Neue Nachricht schreiben
                  </button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-semibold uppercase text-xs tracking-wider">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ihr vollständiger Name"
                              {...field}
                              data-testid="input-name"
                              className="border-border focus:border-primary rounded-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-semibold uppercase text-xs tracking-wider">E-Mail</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="ihre@email.de"
                              {...field}
                              data-testid="input-email"
                              className="border-border focus:border-primary rounded-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-semibold uppercase text-xs tracking-wider">Betreff</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Worum geht es?"
                              {...field}
                              data-testid="input-subject"
                              className="border-border focus:border-primary rounded-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-semibold uppercase text-xs tracking-wider">Nachricht</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ihre Nachricht..."
                              rows={6}
                              {...field}
                              data-testid="input-message"
                              className="border-border focus:border-primary rounded-none resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {sendError && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3">{sendError}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-wider py-6 rounded-none hover:bg-primary/80 transition-colors flex items-center gap-2 disabled:opacity-60"
                      data-testid="button-submit-contact"
                    >
                      <Send size={16} />
                      {sending ? "Wird gesendet…" : "Nachricht senden"}
                    </Button>
                    <p className="text-muted-foreground text-xs text-center">
                      Dieses Formular ist für allgemeine Anfragen. Für Reservierungen nutzen Sie bitte die E-Mail oben.
                    </p>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
