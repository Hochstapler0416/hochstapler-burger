import { Link } from "wouter";
import { motion, type Variants, type Easing } from "framer-motion";
import { Star, MapPin, Clock, Phone, ArrowRight } from "lucide-react";
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
    tagColor: "bg-accent text-primary",
  },
  {
    name: "New Yorker",
    price: "18,00 €",
    desc: "Patty, hausgemachtes Pastrami, Bio-Käse, Sauerkraut, Lollo Salat, Tomate, Russian Dressing, Brioche-Bun",
    tag: "Beliebt",
    tagColor: "bg-coral text-white",
  },
  {
    name: "Big Daddy",
    price: "20,00 €",
    desc: "Doppeltes Patty, Bio-Käse, Bacon, Spiegelei, karamellisierte Zwiebeln, Lollo Salat, Tomate, Hochstapler Burgersauce",
    tag: "Premium",
    tagColor: "bg-coral text-white",
  },
  {
    name: "Black Pat",
    price: "14,50 €",
    desc: "Belugalinsen-Quinoa-Patty, gebratener Lauch, Kräuter-Champignons, Rauke, Tomatenpesto, vegane Mayonnaise",
    tag: "Vegan",
    tagColor: "bg-accent text-primary",
  },
];

const reviews = [
  {
    text: "Sehr gutes Essen, wir lieben ganz besonders die leckeren Salate. Das Personal immer sehr freundlich und aufmerksam.",
    stars: 5,
    name: "Maria K.",
  },
  {
    text: "War alles top, war sehr lecker, freundliche Bedienung. Obwohl alles voll war, kam das Essen innerhalb von 20 min. Das ist Weltklasse!",
    stars: 5,
    name: "Thomas R.",
  },
  {
    text: "Köstliche Burger und leckere Drinks. Sicherlich immer wieder ein Besuch wert!",
    stars: 5,
    name: "Jana M.",
  },
];

const marqueeItems = [
  "HANDWERK", "·", "LEIDENSCHAFT", "·", "MÜNSTER", "·",
  "FRISCH GEWOLFT", "·", "CRAFT BURGER", "·", "AM HAFEN", "·",
  "HANDWERK", "·", "LEIDENSCHAFT", "·", "MÜNSTER", "·",
  "FRISCH GEWOLFT", "·", "CRAFT BURGER", "·", "AM HAFEN", "·",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
  show: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <MainLayout>
      <SEO
        title="Startseite"
        description="Handgemachte Craft Burger am Hafen in Münster. Frisches, regionales Fleisch, Bio-Käse von der Hafenkäserei und hausgemachte Saucen. Jetzt reservieren!"
      />

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-primary grain">
        <div className="absolute inset-0">
          <img
            src={heroBurger}
            alt="Handgemachter Hochstapler Burger"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/20 to-primary/90" />
        </div>

        {/* Diagonal bottom cut */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-accent z-20"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

        <div className="relative z-10 px-4 max-w-5xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-6"
          >
            — Echte Burgerliebe am Hafen —
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-background leading-[0.95] mb-8 tracking-tight"
          >
            Hand&shy;werk.<br />
            Leiden&shy;schaft.<br />
            <span className="text-coral italic">Burger.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 h-0.5 bg-accent mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-primary-foreground/70 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
          >
            100% reines Rindfleisch aus artgerechter Haltung.<br />
            Täglich frisch gewolft. Bio-Käse aus Münster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/speisekarte"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-bold text-sm uppercase tracking-wider hover:bg-coral/90 transition-all"
              data-testid="button-speisekarte-hero"
            >
              Zur Speisekarte
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:reservierung@hochstapler-burger.de"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-background/60 text-background font-bold text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
              data-testid="button-reservierung-hero"
            >
              Tisch reservieren
            </a>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <section className="bg-accent py-4 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex gap-8 pr-8 shrink-0">
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className={`text-sm font-bold uppercase tracking-widest ${item === "·" ? "text-primary/30" : "text-primary"}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="animate-marquee flex gap-8 pr-8 shrink-0" aria-hidden>
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className={`text-sm font-bold uppercase tracking-widest ${item === "·" ? "text-primary/30" : "text-primary"}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-xs font-semibold uppercase tracking-widest">
            <div className="flex items-center gap-2" data-testid="info-address">
              <MapPin size={14} className="text-accent" />
              <span>Hafenweg 8, 48155 Münster</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-primary-foreground/20" />
            <div className="flex items-center gap-2" data-testid="info-hours">
              <Clock size={14} className="text-accent" />
              <span>Mo – Do: 12 – 22 Uhr &nbsp;|&nbsp; Fr – Sa: 12 – 23 Uhr</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-primary-foreground/20" />
            <div className="flex items-center gap-2" data-testid="info-phone">
              <Phone size={14} className="text-accent" />
              <a href="tel:+4925128746555" className="hover:text-accent transition-colors">+49 251 287 46 555</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24 md:py-36 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Images - diagonal overlap layout */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeLeft}
              className="relative h-[520px] order-2 lg:order-1"
            >
              <div className="absolute top-0 left-0 w-[72%] h-[75%] overflow-hidden">
                <img
                  src={interiorBar}
                  alt="Bar und Lounge im Hochstapler Burger"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[55%] overflow-hidden border-8 border-background shadow-2xl">
                <img
                  src={meatSourcing}
                  alt="Regionales Rindfleisch aus artgerechter Haltung"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Accent block */}
              <div className="absolute bottom-8 left-4 bg-coral text-white px-6 py-4 z-10">
                <p className="font-serif text-3xl font-bold">2019</p>
                <p className="text-xs uppercase tracking-widest font-semibold opacity-90">Gegründet</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeRight}
              className="order-1 lg:order-2"
            >
              <p className="text-coral text-xs font-bold uppercase tracking-[0.3em] mb-4">Restaurant Hochstapler</p>
              <h2 className="font-serif text-5xl md:text-6xl text-primary mb-6 leading-tight">
                Unsere<br />
                <span className="italic text-accent">Geschichte.</span>
              </h2>
              <div className="w-12 h-0.5 bg-coral mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Wir treten an, um Dir am Hafen einzigartiges und ehrliches Burger-Handwerk zu
                servieren. Produkte aus verantwortungsvoller – möglichst regionaler – Erzeugung,
                frische Zubereitung und eigenes Wolfen kombiniert mit kreativen Rezepten.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Die Hochstapler Burgerschmiede ist Dein Anlaufpunkt am Hafen von Münster.
                Mit Bar, Lounge-Bereich und bis zu 200 Plätzen drinnen und draußen.
              </p>
              <Link
                href="/ueber-uns"
                className="group inline-flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-wider border-b-2 border-primary pb-1 hover:border-coral hover:text-coral transition-colors"
                data-testid="link-mehr-ueber-uns"
              >
                Mehr erfahren
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUALITY STATS - diagonal dark section */}
      <section className="relative bg-primary text-primary-foreground py-28 md:py-40 clip-diagonal-bottom overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px"
            }}
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Unsere Versprechen</p>
            <h2 className="font-serif text-4xl md:text-5xl text-background">Was uns ausmacht</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-1"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {[
              { number: "100%", label: "Reines Rindfleisch", desc: "Aus artgerechter Freilandhaltung bei Vit's Twente, täglich frisch gewolft.", accent: "text-accent" },
              { number: "140+", label: "Sitzplätze", desc: "Innen & Außen, Bar, Lounge, direkt am Hafen – je nach Saison bis zu 200 Plätze.", accent: "text-coral" },
              { number: "0%", label: "Kompromisse", desc: "Bio-Käse von der Hafenkäserei Münster – handgemacht, direkt nebenan produziert.", accent: "text-coral" },
            ].map((fact) => (
              <motion.div
                key={fact.label}
                variants={fadeUp}
                className="text-center px-8 py-12 hover:bg-white/5 transition-colors border border-white/10"
                data-testid={`fact-${fact.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p className={`font-serif text-7xl md:text-8xl font-bold mb-4 ${fact.accent}`}>{fact.number}</p>
                <p className="font-bold text-sm uppercase tracking-widest mb-4 text-background">{fact.label}</p>
                <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs mx-auto">{fact.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeLeft}
            >
              <p className="text-coral text-xs font-bold uppercase tracking-[0.3em] mb-3">Ausgewählte Kreationen</p>
              <h2 className="font-serif text-5xl md:text-6xl text-primary leading-tight">
                Unsere<br />
                <span className="italic text-accent">Burger.</span>
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeRight}
            >
              <Link
                href="/speisekarte"
                className="group inline-flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-wider border-b-2 border-primary pb-1 hover:border-coral hover:text-coral transition-colors"
                data-testid="link-full-menu"
              >
                Gesamte Karte
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {menuHighlights.map((item, idx) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                className={`relative p-8 flex flex-col group cursor-default transition-all duration-300 hover:bg-primary ${idx < menuHighlights.length - 1 ? "border-r border-border" : ""}`}
                data-testid={`card-menu-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <span className="font-serif text-2xl font-bold text-primary group-hover:text-accent transition-colors">{item.price}</span>
                </div>
                <h3 className="font-serif text-2xl text-primary group-hover:text-background transition-colors mb-4">{item.name}</h3>
                <div className="w-8 h-0.5 bg-coral mb-4 group-hover:w-12 transition-all duration-300" />
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 group-hover:text-primary-foreground/70 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE BREAK */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={cheeseSourcing}
          alt="Handwerk und Qualität bei Hochstapler Burger"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-center px-4"
          >
            <p className="font-serif text-3xl md:text-5xl text-background italic leading-tight max-w-3xl">
              „Qualität ist kein Zufall — sie ist das Ergebnis von echtem Handwerk."
            </p>
            <div className="mt-6 w-12 h-0.5 bg-coral mx-auto" />
          </motion.blockquote>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-coral text-xs font-bold uppercase tracking-[0.3em] mb-3">Google Bewertungen</p>
            <h2 className="font-serif text-5xl md:text-6xl text-primary">
              Das sagen<br />
              <span className="italic text-accent">unsere Gäste.</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-card border border-border p-8 relative group hover:border-accent transition-colors"
                data-testid={`review-card-${i}`}
              >
                <p className="font-serif text-6xl text-accent/20 absolute top-4 left-6 leading-none select-none group-hover:text-accent/30 transition-colors">"</p>
                <div className="flex gap-1 mb-5 pt-4">
                  {Array.from({ length: review.stars }).map((_, si) => (
                    <Star key={si} size={14} className="text-coral fill-coral" />
                  ))}
                </div>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent flex items-center justify-center text-primary font-bold text-xs">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-primary uppercase tracking-wide">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BOOKING - Dark with texture */}
      <section className="relative py-28 md:py-40 bg-primary overflow-hidden grain">
        <div className="absolute inset-0">
          <img src={interiorBar} alt="" className="w-full h-full object-cover opacity-15" aria-hidden />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-6">— Jetzt einen Tisch sichern —</p>
            <h2 className="font-serif text-5xl md:text-7xl text-background leading-tight mb-4">
              Wir freuen<br />
              <span className="italic text-coral">uns auf Dich.</span>
            </h2>
            <div className="w-16 h-0.5 bg-coral mx-auto my-8" />
            <p className="text-primary-foreground/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Für Reservierungen schreibt uns eine Mail oder ruft direkt an.
              Wir stehen auch für Veranstaltungen und private Events zur Verfügung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:reservierung@hochstapler-burger.de"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-coral text-white font-bold text-sm uppercase tracking-wider hover:bg-coral/90 transition-all"
                data-testid="button-reservierung-cta"
              >
                Reservierung anfragen
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-background/40 text-background font-bold text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
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
