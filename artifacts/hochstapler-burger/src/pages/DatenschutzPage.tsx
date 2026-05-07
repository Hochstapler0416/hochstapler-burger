import { motion } from "framer-motion";
// no variants used here
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";

export default function DatenschutzPage() {
  return (
    <MainLayout>
      <SEO
        title="Datenschutz"
        description="Datenschutzerklärung des Hochstapler Burger — Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO."
      />

      <section className="bg-primary py-20 pt-28 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground"
          >
            Datenschutzerklärung
          </motion.h1>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl prose prose-stone">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-accent/20 border border-accent p-6 mb-8 not-prose">
              <p className="text-muted-foreground text-sm">
                <strong className="text-primary">Hinweis:</strong> Diese Datenschutzerklärung ist ein
                Platzhalter und muss vor dem Go-Live durch eine rechtlich geprüfte und vollständige
                Datenschutzerklärung ersetzt werden. Bitte konsultieren Sie einen Datenschutzbeauftragten.
              </p>
            </div>

            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h2>2. Verantwortliche Stelle</h2>
            <p>
              Hochstapler GmbH &amp; Co. KG<br />
              Egbert-Snoek-Straße 1<br />
              48155 Münster<br />
              E-Mail: <a href="mailto:info@hochstapler-burger.de">info@hochstapler-burger.de</a>
            </p>

            <h2>3. Datenerfassung auf dieser Website</h2>
            <h3>Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Diese Daten werden
              nicht mit anderen Datenquellen zusammengeführt.
            </p>
            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zum Zweck der
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <h2>4. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
            </p>
            <p>
              Für weitere Fragen zum Thema Datenschutz stehen wir Ihnen jederzeit unter der im
              Impressum angegebenen Adresse zur Verfügung.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch
              notwendige Daten verarbeitet, die für den Betrieb der Website erforderlich sind.
            </p>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
