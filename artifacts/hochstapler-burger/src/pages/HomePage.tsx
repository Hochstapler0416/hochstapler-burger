import { Link } from "wouter";
import { motion, type Variants, type Easing } from "framer-motion";
import { ChevronDown, Star, MapPin, Clock, Phone } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import heroBurger from "@/assets/images/hero-burger.png";
import interiorBar from "@/assets/images/interior-bar.png";
import meatSourcing from "@/assets/images/meat-sourcing.png";
import cheeseSourcing from "@/assets/images/cheese-sourcing.png";

const ease: Easing = "easeOut";

const menuHighlights = [
  {
    name: "Hochstapler",
    price: "15,00 €",
    desc: "Patty, Bio-Käse, karamellisierte Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun",
    tag: "Signature",
  },
  {
    name: "New Yorker",
    price: "18,00 €",
    desc: "Patty, hausgemachtes Pastrami, Bio-Käse, Sauerkraut, Lollo Salat, Tomate, Russian Dressing, Brioche-Bun",
    tag: "Beliebt",
  },
  {
    name: "Big Daddy",
    price: "20,00 €",
    desc: "Doppeltes Patty, Bio-Käse, Bacon, Spiegelei, karamellisierte Zwiebeln, Lollo Salat, Tomate, Hochstapler Burgersauce",
    tag: "Premium",
  },
  {
    name: "Black Pat",
    price: "14,50 €",
    desc: "Belugalinsen-Quinoa-Patty, gebratener Lauch, Kräuter-Champignons, Rauke, Tomatenpesto, vegane Mayonnaise",
    tag: "Vegan",
  },
];

const reviews = [
  {
    text: "Sehr gutes Essen, wir lieben ganz besonders die leckeren Salate. Das Personal immer sehr freundlich und aufmerksam.",
    stars: 5,
  },
  {
    text: "War alles top, war sehr lecker, freundliche Bedienung. Obwohl alles voll war, kam das Essen innerhalb von 20 min. Das ist Weltklasse!",
    stars: 5,
  },
  {
    text: "Köstliche Burger und leckere Drinks. Sicherlich immer wieder ein Besuch wert!",
    stars: 5,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger: Variants = {
  show: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  return (
    <MainLayout>
      <SEO
        title="Startseite"
        description="Handgemachte Craft Burger am Hafen in Münster. Frisches, regionales Fleisch, Bio-Käse von der Hafenkäserei und hausgemachte Saucen. Jetzt reservieren!"
      />

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src={heroBurger}
            alt="Handgemachter Hochstapler Burger"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1 }}
            className="text-accent uppercase text-sm md:text-base font-semibold tracking-[0.2em] mb-4"
          >
            Echte Burgerliebe am Hafen
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-background leading-tight mb-6"
          >
            Handwerk.<br />Leidenschaft.<br />
            <span className="text-accent">Burger.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            100% reines Rindfleisch aus artgerechter Haltung. Täglich frisch gewolft.
            Bio-Käse aus Münster. Rezepte mit Charakter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/speisekarte"
              className="px-8 py-4 bg-accent text-primary font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-colors"
              data-testid="button-speisekarte-hero"
            >
              Zur Speisekarte
            </Link>
            <a
              href="mailto:reservierung@hochstapler-burger.de"
              className="px-8 py-4 border-2 border-background text-background font-bold text-sm uppercase tracking-wider hover:bg-background hover:text-primary transition-colors"
              data-testid="button-reservierung-hero"
            >
              Tisch reservieren
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 animate-bounce"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* INFO STRIP */}
      <section className="bg-accent text-primary py-5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-2" data-testid="info-address">
              <MapPin size={16} />
              <span>Hafenweg 8, 48155 Münster</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-primary/40" />
            <div className="flex items-center gap-2" data-testid="info-hours">
              <Clock size={16} />
              <span>Mo – Do: 12 – 22 Uhr &nbsp;|&nbsp; Fr – Sa: 12 – 23 Uhr</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-primary/40" />
            <div className="flex items-center gap-2" data-testid="info-phone">
              <Phone size={16} />
              <a href="tel:+4925128746555" className="hover:underline">+49 251 287 46 555</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Restaurant Hochstapler</p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
                Unsere Geschichte
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Wir treten an, um Dir am Hafen einzigartiges und ehrliches Burger-Handwerk zu
                servieren. Produkte aus verantwortungsvoller – möglichst regionaler – Erzeugung,
                frische Zubereitung und eigenes Wolfen kombiniert mit kreativen Rezepten und
                100% Burger-Know-How werden Dich begeistern.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Die Hochstapler Burgerschmiede ist Dein Anlaufpunkt am Hafen von Münster.
                Mit Bar, Lounge-Bereich und 140 bis 200 Plätzen drinnen und draußen – je nach Saison.
              </p>
              <Link
                href="/ueber-uns"
                className="inline-block px-7 py-3 border-2 border-primary text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-mehr-ueber-uns"
              >
                Mehr erfahren
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid grid-cols-2 gap-4 h-[480px]"
            >
              <div className="h-full overflow-hidden">
                <img
                  src={interiorBar}
                  alt="Bar und Lounge im Hochstapler Burger"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex-1 overflow-hidden">
                  <img
                    src={meatSourcing}
                    alt="Regionales Rindfleisch aus artgerechter Haltung"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <img
                    src={cheeseSourcing}
                    alt="Bio-Käse von der Hafenkäserei Münster"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Ausgewählte Kreationen</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Unsere Burger</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {menuHighlights.map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                className="bg-card border border-border p-6 flex flex-col hover:shadow-lg transition-shadow"
                data-testid={`card-menu-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 inline-block">
                  {item.tag}
                </span>
                <h3 className="font-serif text-2xl text-primary mb-3">{item.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{item.desc}</p>
                <p className="font-bold text-xl text-primary">{item.price}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <Link
              href="/speisekarte"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary/80 transition-colors"
              data-testid="link-full-menu"
            >
              Gesamte Speisekarte
            </Link>
          </motion.div>
        </div>
      </section>

      {/* QUALITY SECTION */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                number: "100%",
                label: "Reines Rindfleisch",
                desc: "Aus artgerechter Freilandhaltung bei Vit's Twente, täglich frisch gewolft.",
              },
              {
                number: "140+",
                label: "Sitzplätze",
                desc: "Innen & Außen, Bar, Lounge, direkt am Hafen – je nach Saison bis zu 200 Plätze.",
              },
              {
                number: "3",
                label: "Bio-Käsesorten",
                desc: "Von der Hafenkäserei Münster – handgemacht, direkt nebenan produziert.",
              },
            ].map((fact) => (
              <motion.div
                key={fact.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                data-testid={`fact-${fact.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p className="font-serif text-6xl text-accent mb-2">{fact.number}</p>
                <p className="font-bold text-lg uppercase tracking-wide mb-3">{fact.label}</p>
                <p className="text-primary-foreground/70 leading-relaxed">{fact.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Bewertungen</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Das sagen unsere Gäste</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-card border border-border p-8"
                data-testid={`review-card-${i}`}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.stars }).map((_, si) => (
                    <Star key={si} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-base leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BOOKING */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Tisch reservieren
            </h2>
            <p className="text-primary/70 text-lg mb-8 max-w-xl mx-auto">
              Für Reservierungen schreibt uns eine Mail. Für allgemeine Anfragen und Veranstaltungen
              stehen wir ebenfalls gerne zur Verfügung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:reservierung@hochstapler-burger.de"
                className="px-8 py-4 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary/80 transition-colors"
                data-testid="button-reservierung-cta"
              >
                Reservierung anfragen
              </a>
              <Link
                href="/kontakt"
                className="px-8 py-4 border-2 border-primary text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="button-kontakt-cta"
              >
                Kontakt & Anfahrt
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
