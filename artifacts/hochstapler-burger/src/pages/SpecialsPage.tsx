import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import pageBg from "@/assets/images/hero-bg.jpg";

interface Special {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  imageUrl: string;
  type: string;
  isVisible: boolean;
  sortOrder: number;
}

const ease = "easeOut" as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function SpecialCard({ special }: { special: Special }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-card border border-border overflow-hidden group"
    >
      {special.imageUrl ? (
        <div className="h-56 overflow-hidden bg-muted">
          <img
            src={special.imageUrl}
            alt={special.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="h-56 bg-primary/10 flex items-center justify-center">
          <span className="text-6xl">🍔</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-wider">
              {special.type === "drink" ? "Getränk des Monats" : "Top of the Month"}
            </span>
            <h3 className="font-serif text-xl text-primary mt-1">{special.title}</h3>
            {special.subtitle && (
              <p className="text-muted-foreground text-sm mt-0.5">{special.subtitle}</p>
            )}
          </div>
          {special.price && (
            <span className="font-bold text-lg text-primary whitespace-nowrap flex-shrink-0">
              {special.price}
            </span>
          )}
        </div>
        {special.description && (
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            {special.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function SpecialsPage() {
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/specials")
      .then((r) => r.json())
      .then((data: Special[]) => { setSpecials(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const foodSpecials = specials.filter((s) => s.type === "food");
  const drinkSpecials = specials.filter((s) => s.type === "drink");

  return (
    <MainLayout>
      <SEO
        title="Top of the Month – Hochstapler Burger Münster"
        description="Unsere monatlich wechselnden Specials: besondere Burger-Kreationen und Drinks, frisch und einzigartig."
      />

      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img
          src={pageBg}
          alt="Specials Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3"
          >
            Monatlich neu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-serif text-4xl md:text-6xl text-background"
          >
            Top of the Month
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Mit Kreativität und Liebe erschafft unser Team regelmäßig neue Gerichte und Drinks,
            um euch ein einzigartiges Erlebnis am Hafen zu bieten. Unsere Specials werden aus
            frischen und lokalen Produkten zu einzigartigen Kreationen.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="py-24 text-center text-muted-foreground">
          Lade Specials...
        </section>
      ) : specials.length === 0 ? (
        <section className="py-24 text-center">
          <p className="text-muted-foreground text-lg mb-6">
            Aktuell gibt es keine Specials. Schau bald wieder rein!
          </p>
          <Link
            href="/speisekarte"
            className="inline-block bg-primary text-primary-foreground font-bold uppercase tracking-wider px-8 py-3 hover:bg-primary/80 transition-colors text-sm"
          >
            Zur Speisekarte
          </Link>
        </section>
      ) : (
        <>
          {/* Food Specials */}
          {foodSpecials.length > 0 && (
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                >
                  <p className="text-coral text-xs font-bold uppercase tracking-[0.3em] mb-2">Burger & Speisen</p>
                  <h2 className="font-serif text-3xl text-primary mb-10">Unsere Food Specials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {foodSpecials.map((s) => (
                      <SpecialCard key={s.id} special={s} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Drink Specials */}
          {drinkSpecials.length > 0 && (
            <section className="py-16 bg-muted/20">
              <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                >
                  <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">Drinks & Cocktails</p>
                  <h2 className="font-serif text-3xl text-primary mb-10">Unsere Drink Specials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drinkSpecials.map((s) => (
                      <SpecialCard key={s.id} special={s} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary text-center">
        <div className="container mx-auto px-4">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Alle Gerichte entdecken</p>
          <h2 className="font-serif text-3xl text-background mb-8">Zur vollständigen Speisekarte</h2>
          <Link
            href="/speisekarte"
            className="inline-block bg-accent text-primary font-bold uppercase tracking-wider px-8 py-3 hover:bg-accent/90 transition-colors text-sm"
          >
            Speisekarte ansehen
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
