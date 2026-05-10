import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import gallery1 from "@/assets/images/gallery-1.jpg";
import gallery2 from "@/assets/images/gallery-2.jpg";
import gallery3 from "@/assets/images/gallery-3.jpg";
import gallery4 from "@/assets/images/gallery-4.jpg";
import gallery5 from "@/assets/images/hero-bg.jpg";
import gallery6 from "@/assets/images/bar.jpg";
import heroBurger from "@/assets/images/hero-burger.jpg";
import interiorBar from "@/assets/images/interior-main.jpg";
import meatSourcing from "@/assets/images/about-burger.jpg";

const images = [
  { src: heroBurger, alt: "Handgemachter Hochstapler Burger — Meisterwerk aus dem Hafenweg" },
  { src: gallery1, alt: "Burger-Kreation mit Bio-Käse vom Hochstapler" },
  { src: gallery2, alt: "Frische Zutaten für unsere handgemachten Burger" },
  { src: gallery3, alt: "Rustikale Atmosphäre im Hochstapler am Hafen" },
  { src: gallery4, alt: "Craft Burger aus der Hochstapler Burgerschmiede" },
  { src: gallery5, alt: "Leckere Vorspeisen und Snacks im Hochstapler" },
  { src: gallery6, alt: "Burger-Handwerk am Hafen Münster" },
  { src: interiorBar, alt: "Bar und Lounge im Restaurant Hochstapler" },
  { src: meatSourcing, alt: "Regionales Rindfleisch aus artgerechter Haltung" },
];

export default function GaleriePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <MainLayout>
      <SEO
        title="Galerie"
        description="Bilder aus dem Hochstapler Burger am Hafen Münster — handgemachte Burger, gemütliche Atmosphäre und erstklassige Zutaten in Bildern."
      />

      {/* PAGE HERO */}
      <section className="bg-primary py-20 pt-28 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Ein Blick hinter die Kulissen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground"
          >
            Galerie
          </motion.h1>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                onClick={() => openLightbox(i)}
                className="group relative overflow-hidden aspect-[4/3] block w-full"
                data-testid={`gallery-item-${i}`}
                aria-label={`Bild vergrößern: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold uppercase tracking-wider border border-white px-4 py-2">
                    Vergrößern
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            data-testid="lightbox-overlay"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors p-2"
              aria-label="Schließen"
              data-testid="button-lightbox-close"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white hover:text-accent transition-colors p-2"
              aria-label="Vorheriges Bild"
              data-testid="button-lightbox-prev"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white hover:text-accent transition-colors p-2"
              aria-label="Nächstes Bild"
              data-testid="button-lightbox-next"
            >
              <ChevronRight size={40} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
