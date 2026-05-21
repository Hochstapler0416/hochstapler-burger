import { useState } from "react";
import { Link } from "wouter";
import { motion, type Easing } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Users, Mail, Phone, Check, CalendarDays, Clock } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResmioWidget } from "@/components/ResmioWidget";

const ease: Easing = "easeOut";

const groupSchema = z.object({
  name: z.string().min(2, "Bitte Namen eingeben"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(6, "Bitte Telefonnummer eingeben"),
  guests: z.coerce.number().min(6, "Mindestens 6 Personen"),
  date: z.string().min(1, "Bitte Datum wählen"),
  time: z.string().min(1, "Bitte Uhrzeit wählen"),
  occasion: z.string().optional(),
  notes: z.string().optional(),
});

type GroupFormData = z.infer<typeof groupSchema>;

export default function ReservierungPage() {
  const [mode, setMode] = useState<"small" | "group">("small");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: { guests: 6 },
  });

  async function onSubmit(data: GroupFormData) {
    setSending(true);
    setSendError(null);
    const message =
      `Hallo liebes Hochstapler-Team,\n\n` +
      `hiermit möchten wir eine Tischreservierung für eine Gruppe anfragen:\n\n` +
      `Telefon: ${data.phone}\n` +
      `Anzahl Personen: ${data.guests}\n` +
      `Wunschdatum: ${data.date}\n` +
      `Wunschzeit: ${data.time} Uhr\n` +
      (data.occasion ? `Anlass: ${data.occasion}\n` : "") +
      (data.notes ? `Anmerkungen: ${data.notes}\n` : "") +
      `\nVielen Dank und bis bald!\n${data.name}`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: `Gruppenanfrage – ${data.guests} Personen – ${data.date}`,
          message,
        }),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      setSubmitted(true);
    } catch {
      setSendError("Die Anfrage konnte leider nicht gesendet werden. Bitte schreiben Sie uns direkt an reservierung@hochstapler-burger.de.");
    } finally {
      setSending(false);
    }
  }

  return (
    <MainLayout>
      <SEO
        title="Reservierung"
        description="Jetzt Tisch reservieren bei Hochstapler Burger in Münster – online für bis zu 5 Personen, Gruppenanfrage ab 6 Personen."
      />

      {/* HERO */}
      <section className="bg-primary py-20 pt-28 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Tisch reservieren
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground mb-5"
          >
            Wir freuen uns auf Euch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Bis 5 Personen direkt online buchen. Ab 6 Personen bitte Gruppenanfrage nutzen.
          </motion.p>
        </div>
      </section>

      {/* TOGGLE */}
      <section className="pt-10 pb-4 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          <div className="flex gap-2 p-1.5 bg-muted rounded-xl">
            <button
              onClick={() => setMode("small")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                mode === "small"
                  ? "bg-accent text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users size={15} />
              Bis 5 Personen
            </button>
            <button
              onClick={() => setMode("group")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                mode === "group"
                  ? "bg-accent text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users size={15} />
              Ab 6 Personen
            </button>
          </div>
        </div>
      </section>

      {/* RESMIO WIDGET */}
      {mode === "small" && (
        <motion.section
          key="resmio"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="pb-20 bg-background"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-xl pt-6">
            <ResmioWidget facilityId="hochstapler" height="580px" />
          </div>
        </motion.section>
      )}

      {/* GROUP FORM */}
      {mode === "group" && (
        <motion.section
          key="group"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="pb-20 bg-background"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-xl pt-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={30} className="text-accent" />
                </div>
                <h2 className="font-serif text-2xl text-primary mb-3">
                  Anfrage gesendet!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Vielen Dank — wir haben Ihre Gruppenanfrage erhalten und melden uns so schnell wie möglich.
                </p>
                <p className="text-sm text-muted-foreground">
                  Fragen? Rufen Sie uns an:{" "}
                  <a href="tel:+4925128746555" className="text-accent hover:underline">
                    +49 251 287 46 555
                  </a>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-accent underline underline-offset-2 hover:opacity-80"
                >
                  Neue Anfrage stellen
                </button>
              </motion.div>
            ) : (
              <>
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 mb-7 flex gap-3 items-start">
                  <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-primary text-sm">Gruppenanfrage (ab 6 Personen)</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Formular ausfüllen und absenden — wir melden uns direkt per E-Mail oder Telefon bei Ihnen.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" placeholder="Ihr vollständiger Name" {...register("name")} />
                      {errors.name && (
                        <p className="text-destructive text-xs">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="guests">Anzahl Personen *</Label>
                      <Input
                        id="guests"
                        type="number"
                        min={6}
                        placeholder="z. B. 10"
                        {...register("guests")}
                      />
                      {errors.guests && (
                        <p className="text-destructive text-xs">{errors.guests.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input id="email" type="email" placeholder="ihre@email.de" {...register("email")} />
                      {errors.email && (
                        <p className="text-destructive text-xs">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input id="phone" type="tel" placeholder="+49 251 …" {...register("phone")} />
                      {errors.phone && (
                        <p className="text-destructive text-xs">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="date">Wunschdatum *</Label>
                      <Input id="date" type="date" {...register("date")} />
                      {errors.date && (
                        <p className="text-destructive text-xs">{errors.date.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="time">Wunschzeit *</Label>
                      <Input id="time" type="time" {...register("time")} />
                      {errors.time && (
                        <p className="text-destructive text-xs">{errors.time.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="occasion">Anlass (optional)</Label>
                    <Input
                      id="occasion"
                      placeholder="z. B. Geburtstag, Firmenessen, Jubiläum …"
                      {...register("occasion")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Anmerkungen (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Besondere Wünsche, Allergien, Sitzplatzpräferenzen …"
                      rows={3}
                      {...register("notes")}
                    />
                  </div>

                  {sendError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">{sendError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-accent text-primary font-bold hover:bg-accent/90 py-6 text-base disabled:opacity-60"
                  >
                    <Mail size={18} className="mr-2" />
                    {sending ? "Wird gesendet…" : "Anfrage senden"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Alternativ direkt schreiben:{" "}
                    <a
                      href="mailto:reservierung@hochstapler-burger.de"
                      className="text-accent hover:underline"
                    >
                      reservierung@hochstapler-burger.de
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.section>
      )}

      {/* INFO BAR */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-3">
                Öffnungszeiten
              </p>
              <table className="text-sm text-primary-foreground/80 w-full">
                <tbody>
                  <tr>
                    <td className="pr-6 py-0.5">Mo – Do</td>
                    <td>16:00 – 00:00</td>
                  </tr>
                  <tr>
                    <td className="pr-6 py-0.5">Freitag</td>
                    <td>16:00 – 02:00</td>
                  </tr>
                  <tr>
                    <td className="pr-6 py-0.5">Samstag</td>
                    <td>13:00 – 02:00</td>
                  </tr>
                  <tr>
                    <td className="pr-6 py-0.5">Sonntag</td>
                    <td>13:00 – 22:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-3">
                Telefon
              </p>
              <a
                href="tel:+4925128746555"
                className="text-primary-foreground/80 text-sm hover:text-accent transition-colors flex items-center gap-2"
              >
                <Phone size={14} className="text-accent" />
                +49 251 287 46 555
              </a>
            </div>
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-3">
                E-Mail Reservierungen
              </p>
              <a
                href="mailto:reservierung@hochstapler-burger.de"
                className="text-primary-foreground/80 text-sm hover:text-accent transition-colors flex items-center gap-2 break-all"
              >
                <Mail size={14} className="text-accent flex-shrink-0" />
                reservierung@hochstapler-burger.de
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
