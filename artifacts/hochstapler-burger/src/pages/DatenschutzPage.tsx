import { motion } from "framer-motion";
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

            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
              Text aufgeführten Datenschutzerklärung.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
              Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.B. durch
              Eingabe in ein Kontaktformular. Andere Daten werden automatisch oder nach Ihrer
              Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
              allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs).
            </p>
            <p>
              <strong>Wofür nutzen wir Ihre Daten?</strong><br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten. Andere Daten können zur Beantwortung Ihrer Anfragen genutzt werden.
            </p>
            <p>
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine
              Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten
              Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>

            <h2>2. Hosting</h2>
            <p>
              Diese Website wird bei <strong>Replit, Inc.</strong> (600 Townsend Street, Suite 500,
              San Francisco, CA 94103, USA) gehostet. Details entnehmen Sie der Datenschutzerklärung
              von Replit:{" "}
              <a href="https://replit.com/site/privacy" target="_blank" rel="noopener noreferrer">
                https://replit.com/site/privacy
              </a>
            </p>
            <p>
              Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO. Der
              Websitebetreiber hat ein berechtigtes Interesse an einer möglichst fehlerfreien
              Darstellung und Optimierung seiner Website.
            </p>

            <h2>3. Verantwortliche Stelle (Art. 13 DSGVO)</h2>
            <p>
              Hochstapler GmbH &amp; Co. KG<br />
              Egbert-Snoek-Straße 1<br />
              48155 Münster<br />
              Telefon: <a href="tel:+4925128746555">+49 251 – 287 46 555</a><br />
              E-Mail: <a href="mailto:info@hochstapler-burger.de">info@hochstapler-burger.de</a>
            </p>

            <h2>4. Datenerfassung auf dieser Website</h2>

            <h3>Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung dieser
              Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat
              ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung
              seiner Website — hierzu müssen die Server-Log-Files erfasst werden.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
              vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
              gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde.
            </p>
            <p>
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
              Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
              Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
              gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
            </p>

            <h3>Cookies</h3>
            <p>
              Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb
              der Website erforderlich sind. Es werden keine Tracking-Cookies, Werbe-Cookies oder
              Cookies zu Analysezwecken eingesetzt. Technisch notwendige Cookies können nicht
              deaktiviert werden, da ohne sie die Website nicht ordnungsgemäß funktioniert.
            </p>
            <p>
              Rechtsgrundlage für den Einsatz technisch notwendiger Cookies ist Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse am Betrieb der Website).
            </p>

            <h3>SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
              Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an
              dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung
              aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen
              werden.
            </p>

            <h2>5. Ihre Rechte als betroffene Person</h2>

            <h3>Recht auf Auskunft (Art. 15 DSGVO)</h3>
            <p>
              Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob Sie betreffende
              personenbezogene Daten verarbeitet werden, sowie Auskunft über diese Daten und weitere
              Informationen gemäß Art. 15 DSGVO zu erhalten.
            </p>

            <h3>Recht auf Berichtigung (Art. 16 DSGVO)</h3>
            <p>
              Sie haben das Recht, unverzüglich die Berichtigung Sie betreffender unrichtiger
              personenbezogener Daten zu verlangen.
            </p>

            <h3>Recht auf Löschung (Art. 17 DSGVO)</h3>
            <p>
              Sie haben das Recht, zu verlangen, dass Sie betreffende personenbezogene Daten unverzüglich
              gelöscht werden, sofern einer der in Art. 17 DSGVO genannten Gründe vorliegt.
            </p>

            <h3>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
            <p>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
              zu verlangen, wenn eine der Voraussetzungen des Art. 18 DSGVO gegeben ist.
            </p>

            <h3>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
            <p>
              Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten,
              gängigen und maschinenlesbaren Format zu erhalten, sofern die Verarbeitung auf einer
              Einwilligung oder einem Vertrag beruht.
            </p>

            <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
            <p>
              Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
              jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die auf
              Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt, Widerspruch einzulegen.
            </p>

            <h3>Recht auf Widerruf einer Einwilligung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
              Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit
              der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3>Beschwerderecht bei der Aufsichtsbehörde</h3>
            <p>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
              der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde für Nordrhein-Westfalen
              ist die:
            </p>
            <p>
              <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit NRW (LDI NRW)</strong><br />
              Kavalleriestraße 2–4<br />
              40213 Düsseldorf<br />
              Telefon: +49 211 38424-0<br />
              E-Mail: poststelle@ldi.nrw.de<br />
              <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer">www.ldi.nrw.de</a>
            </p>

            <h2>6. Externe Links und soziale Medien</h2>
            <p>
              Diese Website enthält Links zu externen Plattformen (z.B. Instagram, Facebook). Beim
              Anklicken dieser Links verlassen Sie unsere Website. Für die Inhalte und
              Datenschutzpraktiken der verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich. Es werden beim Aufruf dieser Website keine Daten an soziale Netzwerke
              übertragen (keine eingebetteten Social-Media-Plugins).
            </p>

            <h2>7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2025. Durch die
              Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter
              gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese
              Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit
              auf der Website unter <a href="/datenschutz">hochstapler-burger.de/datenschutz</a> von
              Ihnen abgerufen und ausgedruckt werden.
            </p>

          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
