import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import pageBg from "@/assets/images/hero-bg.jpg";

interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  badge: string;
  isAvailable: boolean;
  sortOrder: number;
}

interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
  sortOrder: number;
  isVisible: boolean;
  items: MenuItem[];
}

function formatPrice(price: string): string {
  return price.replace(/EUR/g, "€").trim();
}

const tagColors: Record<string, string> = {
  Signature: "bg-accent text-primary",
  Beliebt: "bg-coral text-white",
  Premium: "bg-primary text-primary-foreground",
  Vegan: "bg-green-100 text-green-800",
  Vegetarisch: "bg-green-100 text-green-800",
  Scharf: "bg-red-100 text-red-800",
  Kids: "bg-blue-100 text-blue-800",
  Besonders: "bg-amber-100 text-amber-800",
  "Happy Hour": "bg-yellow-100 text-yellow-800",
  Alkoholfrei: "bg-sky-100 text-sky-700",
  Weisswein: "bg-yellow-50 text-yellow-800",
  Rotwein: "bg-red-50 text-red-800",
  Rose: "bg-pink-100 text-pink-700",
  Tee: "bg-green-50 text-green-700",
};

function useMenu() {
  const [data, setData] = useState<MenuCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useState(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((d: MenuCategory[]) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  });

  return { data, loading, error };
}

export default function SpeisekartePage() {
  const { data: allCategories, loading, error } = useMenu();
  const [activeTab, setActiveTab] = useState<"food" | "drink">("food");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const categories = allCategories?.filter((c) => c.type === activeTab) ?? [];
  const effectiveCategoryId = activeCategoryId ?? categories[0]?.id ?? null;
  const currentCategory = categories.find((c) => c.id === effectiveCategoryId) ?? categories[0];

  return (
    <MainLayout>
      <SEO
        title="Speisekarte"
        description="Die vollständige Speise- und Getränkekarte des Hochstapler Burger am Hafen in Münster. Handgemachte Craft Burger, Salate, vegane Optionen, Cocktails, Biere und mehr."
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
            className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3"
          >
            Mit Passion und Liebe
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground mb-4"
          >
            Unsere Karte
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-primary-foreground/70 max-w-2xl mx-auto text-lg"
          >
            Frische, Qualität und Regionalität vereint — von Handwerk-Burgern bis zu
            hausgemachten Cocktails.
          </motion.p>
        </div>
      </section>

      {/* FOOD / DRINK TOGGLE */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-0">
              {(["food", "drink"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveCategoryId(null); }}
                  className={`px-8 py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-coral text-primary"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                >
                  {tab === "food" ? "Speisekarte" : "Getränkekarte"}
                </button>
              ))}
            </div>
            <a
              href="/menu"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors pr-2"
            >
              <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-5 h-3.5 object-cover" />
              English Menu
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="sticky top-16 z-30 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-0 overflow-x-auto">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 px-5 py-4 h-12 w-28 bg-muted/50 animate-pulse" />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    data-testid={`tab-category-${cat.slug}`}
                    className={`flex-shrink-0 px-5 py-4 text-sm font-semibold uppercase tracking-wide transition-colors border-b-2 whitespace-nowrap ${
                      cat.id === effectiveCategoryId
                        ? "border-accent text-primary"
                        : "border-transparent text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
          </div>
        </div>
      </section>

      {/* MENU CONTENT */}
      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="py-6 flex justify-between gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-48 bg-muted/60 rounded animate-pulse" />
                    <div className="h-4 w-80 bg-muted/40 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-16 bg-muted/60 rounded animate-pulse flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg mb-2">Karte konnte nicht geladen werden.</p>
              <p className="text-sm">Bitte versuche es später noch einmal.</p>
            </div>
          )}

          {!loading && !error && currentCategory && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10">
                  <h2 className="font-serif text-4xl text-primary mb-2">{currentCategory.name}</h2>
                  <div className="w-10 h-0.5 bg-coral" />
                </div>

                <div className="divide-y divide-border">
                  {currentCategory.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-6 flex items-start justify-between gap-6"
                      data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-serif text-xl text-primary">{item.name}</h3>
                          {item.badge && (
                            <span
                              className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${
                                tagColors[item.badge] ?? "bg-muted text-muted-foreground"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.price && (
                        <p className="font-bold text-lg text-primary whitespace-nowrap flex-shrink-0">
                          {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ALLERGEN NOTE */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <p className="text-muted-foreground text-sm text-center">
            Alle Preise inkl. MwSt. Bei Allergien oder Unverträglichkeiten sprechen Sie bitte unsere Servicekräfte an.
            Jeden Burger gibt es auch mit glutenfreiem Bun auf Anfrage.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
