import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";

type Category =
  | "burger-rind"
  | "andere-burger"
  | "vegan"
  | "salate"
  | "vorspeisen"
  | "beilagen"
  | "getraenke";

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  tag?: string;
}

const categories: { id: Category; label: string }[] = [
  { id: "burger-rind", label: "Burger — Rind" },
  { id: "andere-burger", label: "Andere Burger" },
  { id: "vegan", label: "Vegan & Vegetarisch" },
  { id: "salate", label: "Salate" },
  { id: "vorspeisen", label: "Vorspeisen & Teilen" },
  { id: "beilagen", label: "Beilagen & Saucen" },
  { id: "getraenke", label: "Getränke" },
];

const menu: Record<Category, { title: string; subtitle?: string; items: MenuItem[] }> = {
  "burger-rind": {
    title: "Unsere Burger",
    subtitle:
      "100% reines Rindfleisch aus artgerechter Freilandhaltung – veredelt mit unserem 'Burger Dust'. Unsere Burger werden MEDIUM gebraten. Auf Wunsch kann die Garstufe geändert werden. Glutenfreie Buns auf Anfrage erhältlich.",
    items: [
      {
        name: "Klassiker",
        price: "14,00 €",
        desc: "Patty, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun",
      },
      {
        name: "Hochstapler",
        price: "15,00 €",
        desc: 'Patty, "Der Fröhliche Fähnrich" Bio-Käse, karamellisierte Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun',
        tag: "Signature",
      },
      {
        name: "All American",
        price: "15,00 €",
        desc: 'Patty, "Käpt\'n Pauli" Bio-Käse, Bacon, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Senf, Hausketchup, Brioche-Bun',
      },
      {
        name: "Hippe",
        price: "16,00 €",
        desc: "Patty, Ziegenkäse, Lollo Salat, Feigenmarmelade, Sour Cream, Mehrkorn-Bun",
      },
      {
        name: "El Nacho",
        price: "16,50 €",
        desc: "Patty, Chorizo, Pimientos de Patrón, Nachos, Jalapenos, Chilli-Käse-Sauce, Brioche-Bun",
      },
      {
        name: "New Yorker",
        price: "18,00 €",
        desc: 'Patty, hausgemachtes "New York Style" Pastrami, "Der Fröhliche Fähnrich" Bio-Käse, Sauerkraut, Lollo Salat, Tomate, Russian Dressing, Brioche-Bun',
        tag: "Beliebt",
      },
      {
        name: "Hinterwäldler",
        price: "16,50 €",
        desc: "Patty, Brie, gebratene Kräuter-Champignons, Apfel-Chutney, Rauke, Tomate, Trüffel Mayo, Mehrkorn-Bun",
      },
      {
        name: "Memphis BBQ",
        price: "19,00 €",
        desc: 'Patty, hausgeräuchertes Roastbeef, "Der Fröhliche Fähnrich" Bio-Käse, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Honig-BBQ Sauce, Brioche-Bun',
      },
      {
        name: "Big Daddy",
        price: "20,00 €",
        desc: 'Doppeltes Patty, "Käpt\'n Pauli" Bio-Käse, Bacon, Spiegelei, karamellisierte Zwiebeln, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun',
        tag: "Premium",
      },
      {
        name: "Jo-Ki",
        price: "17,00 €",
        desc: "Patty, Bacon, Der Fröhliche Fähnrich Käse, geschmorrte Zwiebeln, Gewürzgurke, Lollo Salat, Jalapenos, Tomate, Ketchup, Honig-BBQ Sauce, Brioche-Bun",
      },
      {
        name: "Ministapler (Kinder)",
        price: "7,80 €",
        desc: "Patty (80g), Ketchup oder Mayo, Brioche-Bun, Fritten",
        tag: "Kids",
      },
    ],
  },
  "andere-burger": {
    title: "Die etwas anderen Burger",
    items: [
      {
        name: "Ms Carolina",
        price: "15,50 €",
        desc: "Pulled Pork, Lollo Salat, rote Zwiebeln, Cole Slaw, Jalapeños, Chili-Käse-Sauce, Honig-BBQ-Sauce, Brioche-Bun",
      },
      {
        name: "Spicy Chicken",
        price: "17,50 €",
        desc: "Crispy Chicken, Rauke, Tomate, rote Zwiebeln, Curry-Mango Sauce, Joghurt-Habanero Sauce (Scharf!), Mehrkorn-Bun",
        tag: "Scharf",
      },
      {
        name: "Clubburger",
        price: "16,50 €",
        desc: "Gebackene Hähnchenbrust, Bacon, Spiegelei, Römersalat, getrocknete Tomaten, Zitronengras-Limetten Mayo, Senf, Brioche-Bun",
      },
      {
        name: "Mediterrano",
        price: "15,50 €",
        desc: "Gegrillte Hähnchenbrust, Serrano-Schinken, getrocknete Tomaten, Rauke, Oliven-Tapenade, Käpt'n Paulis Goldschatz-Käse-Raspel, Salbei Mayo, Mehrkorn-Bun",
      },
      {
        name: "Little Italy",
        price: "14,50 €",
        desc: "Gegrillte Hähnchenbrust, Büffelmozzarella, Bruschetta-Tomaten, Rauke, Basilikumpesto, Hochstapler Aioli, Brioche-Bun",
      },
      {
        name: "Surf 'n Turf",
        price: "17,00 €",
        desc: "Patty, Garnelen, Rucola, Mango-Chutney, Trüffelmayo, Brioche-Bun",
        tag: "Besonders",
      },
    ],
  },
  "vegan": {
    title: "Vegan & Vegetarisch",
    subtitle:
      "Jeden unserer fleischlosen Burger kannst du mit dem veganen Patty (115g) auf Erbsenproteinbasis bestellen.",
    items: [
      {
        name: "Black Pat",
        price: "14,50 €",
        desc: "Belugalinsen-Quinoa-Patty, gebratener Lauch, Kräuter-Champignons, Rauke, Tomatenpesto, vegane Mayonnaise, Mehrkorn-Bun",
        tag: "Vegan",
      },
      {
        name: "Casablanca",
        price: "14,50 €",
        desc: "Kichererbsen-Falafel, gebratene Ananasscheibe, Rauke, Tomate, Sweet-Chilli-Sesam Sauce, Veganer Mayo, Mehrkorn-Bun",
        tag: "Vegan",
      },
      {
        name: "Say Chee",
        price: "14,50 €",
        desc: "Erbsenprotein-Patty, veganer Käse, Lollo Salat, Tomate, Gewürzgurken, rote Zwiebeln, Hochstapler Burgersauce, Mehrkorn-Bun",
        tag: "Vegetarisch",
      },
      {
        name: "O'Elinas",
        price: "14,50 €",
        desc: "Feta Patty, Zaziki, Romanasalat, Cole Slaw, Salatgurke, getrocknete Tomaten, Mehrkorn-Bun",
        tag: "Vegetarisch",
      },
      {
        name: "Brokk Me Amadeus",
        price: "14,50 €",
        desc: "Brokkoli Patty, Rucola, Gewürzgurke, Tomate, Avocadocreme, Paprika Hummus, Vegane Mayo, Mehrkorn-Bun",
        tag: "Vegan",
      },
    ],
  },
  "salate": {
    title: "Ab ins Grüne — Salate",
    items: [
      {
        name: "Ra(ba)uke",
        price: "14,50 €",
        desc: "Rauke, Ziegenkäse, Feigenmarmelade, Oliven, Honig-Senf-Dressing, hausgebackenes Brot mit Chimichurri",
      },
      {
        name: "Caesar Salad",
        price: "15,00 €",
        desc: "Römersalat, Parmesan-Raspel, Anchovis-Filet, Croutons, Hochstapler Caesar-Dressing",
      },
      {
        name: "Popeye",
        price: "15,00 €",
        desc: "Babyspinat, Karotte, Rotkohl, gebeizter Lachs, Himbeer-Dressing, hausgebackenes Brot",
      },
      {
        name: "Grüner Hochstapler",
        price: "14,50 €",
        desc: "Gemischte Blattsalate, gebratene Zucchini und Apfel, Kerne, Kräuter-Joghurt-Dressing, hausgebackenes Brot mit Chimichurri",
      },
      {
        name: "Großer Gemischter",
        price: "14,50 €",
        desc: "Gemischte Blattsalate, Gurke, Kirschtomate, Paprika, Karotte, Radieschen, Sprossen, Balsamico-Dressing, hausgebackenes Brot",
      },
    ],
  },
  "vorspeisen": {
    title: "Knabbern und Teilen",
    items: [
      { name: "Trüffel-Fritten", price: "9,40 €", desc: "Hausfritten mit Trüffelöl, geraspelter Hafenkäse, Frühlingslauch, Hochstapler Aioli" },
      { name: "Salatschiffchen Caesar Style", price: "8,40 €", desc: "Römersalat, Parmesan-Raspel, Anchovis-Filet, Croutons, Hochstapler Caesar-Dressing" },
      { name: "Tempura Zwiebelringe", price: "7,30 €", desc: "mit Sour Cream" },
      { name: "Chili Cheese Nachos", price: "7,80 €", desc: "Chili-Käse Sauce, Jalapenos, Avocadocreme" },
      { name: "Chili Cheese Fries", price: "9,40 €", desc: "Chili-Käse Sauce, Jalapenos" },
      { name: "Hausgemachtes Brot", price: "7,30 €", desc: "mit Bacon Jam" },
      { name: "Ahorn-Fritten", price: "9,40 €", desc: "Süßkartoffelfritten mit Ahornsirup, Baconstreifen, Frühlingslauch, Honig-BBQ Sauce" },
      { name: "Frittierte Gewürzgurken", price: "7,30 €", desc: "mit Chipotle Mayo" },
      { name: "Rohkostteller mit Sour Cream", price: "7,30 €", desc: "Möhren, Paprika, Kohlrabi, Gurke" },
      { name: "Pimientos da Padron", price: "7,30 €", desc: "mit Sriracha Ketchup" },
      { name: "Chili-Cheese Nuggets", price: "9,40 €", desc: "mit Buttermilch-Ranch-Dressing" },
      { name: "Roastbeef-Röllchen", price: "9,40 €", desc: "mit Bacon, Rauke und Honig BBQ Sauce" },
    ],
  },
  "beilagen": {
    title: "Beilagen & Saucen",
    items: [
      { name: "Hausfritten", price: "4,70 €" },
      { name: "Süßkartoffelfritten", price: "5,20 €" },
      { name: "Hochstaplers Coleslaw", price: "4,20 €" },
      { name: "Chili Cheese Fries", price: "6,30 €" },
      { name: "Ahorn Fritten", price: "6,30 €" },
      { name: "Trüffelfritten", price: "6,30 €" },
      { name: "Gemischter Salat", price: "4,20 €", desc: "mit Balsamico Dressing" },
      { name: "Rucola Salat", price: "4,20 €", desc: "mit Honig-Senf-Dressing" },
      { name: "Chili-Cheese Nuggets", price: "6,20 €" },
      { name: "Ketchup", price: "0,90 €" },
      { name: "Mayonnaise", price: "0,90 €" },
      { name: "Senf", price: "0,90 €" },
      { name: "Honig-BBQ Sauce", price: "1,50 €" },
      { name: "Hochstapler Aioli", price: "1,50 €" },
      { name: "Trüffel Mayonnaise", price: "1,50 €" },
      { name: "Sour Cream", price: "1,50 €" },
      { name: "Bacon Jam", price: "2,00 €" },
      { name: "Curry-Mango Sauce", price: "1,50 €" },
      { name: "Avocadocreme", price: "1,50 €" },
    ],
  },
  "getraenke": {
    title: "Getränke",
    subtitle: "Jeden Tag ab 21 Uhr: Drinks für 7 Euro — Happy Hour!",
    items: [
      { name: "Selters Classic 0,25 l", price: "3,40 €" },
      { name: "Selters Naturell 0,25 l", price: "3,40 €" },
      { name: "Selters Classic 0,75 l", price: "7,80 €" },
      { name: "Hausgemachter Eistee 0,4 l", price: "4,50 €" },
      { name: "Hausgemachte Limonade 0,4 l", price: "4,50 €" },
      { name: "Fruchtsaft 0,2 l", price: "3,20 €", desc: "Apfel, Banane, Kirsch, Johannisbeere, Orange, Maracuja, Rhabarber" },
      { name: "Red Bull", price: "4,50 €" },
      { name: "Bitburger Pils 0,3 l", price: "3,90 €" },
      { name: "Potts Landbier 0,3 l", price: "3,90 €" },
      { name: "Tango 0,3 l", price: "3,90 €" },
      { name: "Benediktiner Hell 0,3 l", price: "3,90 €" },
      { name: "Benediktiner Weizen 0,3 l", price: "3,90 €" },
      { name: "Fassbier 0,5 l", price: "6,40 €" },
      { name: "Aperol Sour", price: "7,00 €", desc: "Happy Hour", tag: "Happy Hour" },
      { name: "Mojito", price: "7,00 €", desc: "Happy Hour", tag: "Happy Hour" },
      { name: "Moscow Mule", price: "7,00 €", desc: "Happy Hour", tag: "Happy Hour" },
      { name: "Gin Fizz", price: "7,00 €", desc: "Happy Hour", tag: "Happy Hour" },
    ],
  },
};

const tagColors: Record<string, string> = {
  Signature: "bg-accent text-primary",
  Beliebt: "bg-[#FE6C61] text-white",
  Premium: "bg-primary text-primary-foreground",
  Vegan: "bg-green-100 text-green-800",
  Vegetarisch: "bg-green-100 text-green-800",
  Scharf: "bg-red-100 text-red-800",
  Kids: "bg-blue-100 text-blue-800",
  Besonders: "bg-amber-100 text-amber-800",
  "Happy Hour": "bg-yellow-100 text-yellow-800",
};

export default function SpeisekartePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("burger-rind");
  const currentMenu = menu[activeCategory];

  return (
    <MainLayout>
      <SEO
        title="Speisekarte"
        description="Entdecke die vollständige Speisekarte des Hochstapler Burger am Hafen in Münster. Handgemachte Craft Burger, Salate, Vorspeisen, vegane Optionen und vieles mehr."
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
            Mit Passion und Liebe
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground mb-4"
          >
            Speisekarte
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-primary-foreground/70 max-w-2xl mx-auto text-lg"
          >
            Frische, Qualität und Regionalität vereint. Kulinarische Erfahrungen aus aller Welt
            für einzigartige und abwechslungsreiche Kreationen.
          </motion.p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="sticky top-16 z-30 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`tab-category-${cat.id}`}
                className={`flex-shrink-0 px-5 py-4 text-sm font-semibold uppercase tracking-wide transition-colors border-b-2 ${
                  activeCategory === cat.id
                    ? "border-accent text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MENU CONTENT */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <h2 className="font-serif text-4xl text-primary mb-3">{currentMenu.title}</h2>
                {currentMenu.subtitle && (
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">{currentMenu.subtitle}</p>
                )}
              </div>

              <div className="divide-y divide-border">
                {currentMenu.items.map((item) => (
                  <div
                    key={item.name}
                    className="py-6 flex items-start justify-between gap-6"
                    data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-serif text-xl text-primary">{item.name}</h3>
                        {item.tag && (
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${tagColors[item.tag] ?? "bg-muted text-muted-foreground"}`}>
                            {item.tag}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                    <p className="font-bold text-lg text-primary whitespace-nowrap flex-shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ALLERGEN NOTE */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <p className="text-muted-foreground text-sm text-center">
            Alle Preise inkl. MwSt. Bei Allergien oder Unverträglichkeiten sprechen Sie bitte unsere Servicekräfte an.
            Jeder Burger ist auch mit glutenfreiem Bun erhältlich.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
