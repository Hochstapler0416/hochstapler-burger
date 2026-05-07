import { motion } from "framer-motion";
// no variants used here
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";

export default function ImpressumPage() {
  return (
    <MainLayout>
      <SEO
        title="Impressum"
        description="Impressum des Hochstapler Burger — Hochstapler GmbH & Co. KG, Hafenweg 8, 48155 Münster."
      />

      <section className="bg-primary py-20 pt-28 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground"
          >
            Impressum
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
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Hochstapler GmbH &amp; Co. KG<br />
              Egbert-Snoek-Straße 1<br />
              48155 Münster
            </p>

            <h2>Vertreten durch</h2>
            <p>
              Persönlich haftende Gesellschafterin der Hochstapler GmbH &amp; Co. KG:<br />
              <strong>Hochstapler Verwaltungs-GmbH</strong><br />
              Geschäftsführer: Franz-Ludwig Feldhaus, Tim Snoek
            </p>

            <h2>Handelsregister</h2>
            <p>
              Registergericht: Amtsgericht Münster<br />
              Registernummer: HRB 15472
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: <a href="tel:+4925128746555">+49 251 – 287 46 555</a><br />
              E-Mail: <a href="mailto:info@hochstapler-burger.de">info@hochstapler-burger.de</a>
            </p>

            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: <em>[PLACEHOLDER]</em>
            </p>

            <h2>Konzeption, Webdesign und technische Umsetzung</h2>
            <p>Hochstapler GmbH &amp; Co. KG</p>

            <h2>Haftungsausschluss</h2>
            <h3>Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
              nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <h3>Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
              haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
              der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <h3>Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
              jeweiligen Autors bzw. Erstellers.
            </p>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
