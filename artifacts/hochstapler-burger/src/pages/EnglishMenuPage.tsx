import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import pageBg from "@/assets/images/hero-bg.jpg";

const ease = "easeOut" as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

interface MenuEntry {
  name: string;
  price?: string;
  description?: string;
  note?: string;
}

interface MenuSection {
  heading: string;
  intro?: string;
  items: MenuEntry[];
}

interface MenuCategory {
  id: string;
  label: string;
  sections: MenuSection[];
}

const MENU: MenuCategory[] = [
  {
    id: "salads",
    label: "Salads",
    sections: [
      {
        heading: "Salads",
        items: [
          { name: "RA(BA)UKE", price: "€14,50", description: "Arugula, Scellebelle goat cheese, fig jam, olives, honey-mustard-dressing, homemade bread with chimichurri" },
          { name: "Caesar Salad", price: "€15,00", description: "Romaine lettuce, parmesan shavings, anchovy filets, croutons, Hochstapler caesar-dressing" },
          { name: "Popeye", price: "€15,00", description: "Baby spinach, carrot, red cabbage, pickled salmon, raspberry-dressing, homemade bread with chimichurri" },
          { name: "Grüner Hochstapler", price: "€14,50", description: "Mixed greens, grilled zucchini, grilled apple, seeds, herbs-yogurt-dressing, homemade bread with chimichurri" },
          { name: "Grosser Gemischter", price: "€14,50", description: "Mixed greens, cucumber, cherry tomato, paprika, carrot, radish, sprouts, balsamico-dressing, homemade bread with chimichurri" },
        ],
      },
      {
        heading: "Salad Toppings",
        items: [
          { name: "Grilled chicken", price: "€6,00" },
          { name: "Pickled salmon", price: "€6,00" },
          { name: "Grilled herbed mushrooms", price: "€4,00" },
          { name: "Feta", price: "€4,00" },
        ],
      },
    ],
  },
  {
    id: "starters",
    label: "Starters",
    sections: [
      {
        heading: "Starters & Sharing",
        items: [
          { name: "Truffle Fries", price: "€9,40", description: "Fries with chopped summer truffle, truffle oil, cheese shavings, spring leek, Hochstapler aioli" },
          { name: "Caesar Boats", price: "€8,40", description: "Romaine lettuce, parmesan shavings, anchovy filets, croutons, Hochstapler caesar-dressing" },
          { name: "Onion Rings", price: "€7,30", description: "with Sour Cream" },
          { name: "Chili Cheese Nachos", price: "€7,80", description: "Chili-cheese sauce, jalapeños, avocado cream" },
          { name: "Chili Cheese Fries", price: "€9,40", description: "Chili-cheese sauce, jalapeños" },
          { name: "Homemade Bread", price: "€7,30", description: "with bacon jam" },
          { name: "Maple Fries", price: "€9,40", description: "Sweet potato fries with maple syrup, bacon strips, spring leek, honey-BBQ sauce" },
          { name: "Fried Pickles", price: "€7,30", description: "with chipotle mayo" },
          { name: "Raw Vegetable Platter", price: "€7,30", description: "Carrots, cucumber, kohlrabi, peppers with sour cream" },
          { name: "Pimientos de Padrón", price: "€7,30", description: "with sriracha ketchup" },
          { name: "Chili-Cheese Nuggets", price: "€9,40", description: "with buttermilk ranch dressing" },
          { name: "Roastbeef Rolls", price: "€9,40", description: "with bacon, arugula and honey-BBQ sauce" },
        ],
      },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    sections: [
      {
        heading: "Beef Burgers",
        intro: "100% pure beef (150g) from species-appropriate free-range husbandry – refined with our 'Burger Dust'. Our burgers are grilled MEDIUM. Cooking level can be changed on request. By choosing the pea protein patty (115g), every burger becomes vegetarian.",
        items: [
          { name: "Klassiker", price: "€14,00", description: "Patty, red onions, pickles, lollo salad, tomato, Hochstapler burger sauce, brioche bun" },
          { name: "Hochstapler", price: "€15,00", description: "Patty, 'Der Fröhliche Fähnrich' bio cheese, caramelized onions, pickles, lollo salad, tomato, Hochstapler burger sauce, brioche bun" },
          { name: "All American", price: "€15,00", description: "Patty, 'Käpt'n Pauli' bio cheese, bacon, red onions, pickles, lollo salad, tomato, mustard, ketchup, brioche bun" },
          { name: "Hippe", price: "€16,00", description: "Patty, goat cheese, lollo salad, fig jam, sour cream, multigrain bun" },
          { name: "El Nacho", price: "€16,50", description: "Patty, chorizo, pimientos de patrón, nachos, jalapeños, chili-cheese sauce, brioche bun" },
          { name: "New Yorker", price: "€18,00", description: "Patty, homemade 'New York Style' pastrami, 'Der Fröhliche Fähnrich' bio cheese, sauerkraut, lollo salad, tomato, Russian dressing, brioche bun" },
          { name: "Hinterwäldler", price: "€16,50", description: "Patty, brie, grilled herbed mushrooms, apple chutney, arugula, tomato, truffle mayo, multigrain bun" },
          { name: "Memphis BBQ", price: "€19,00", description: "Patty, house-smoked roast beef, 'Der Fröhliche Fähnrich' bio cheese, red onions, pickles, lollo salad, tomato, honey-BBQ sauce, brioche bun" },
          { name: "Big Daddy", price: "€20,00", description: "Double patty, 'Käpt'n Pauli' bio cheese, bacon, fried egg, caramelized onions, lollo salad, tomato, Hochstapler burger sauce, brioche bun" },
          { name: "Jo-Ki", price: "€17,00", description: "Patty, bacon, 'Der Fröhliche Fähnrich' cheese, stewed onions, pickles, lollo salad, jalapeños, tomato, ketchup, honey-BBQ sauce, brioche bun" },
          { name: "Ministapler (Kids)", price: "€7,80", description: "Patty (80g), ketchup or mayo, brioche bun, fries" },
        ],
      },
      {
        heading: "The Other Burgers",
        items: [
          { name: "Ms Carolina", price: "€15,50", description: "Pulled pork, lollo salad, red onions, cole slaw, jalapeños, chili-cheese sauce, honey-BBQ sauce, brioche bun" },
          { name: "Spicy Chicken", price: "€17,50", description: "Crispy chicken, arugula, tomato, red onions, curry-mango sauce, yogurt-habanero sauce (hot!), multigrain bun" },
          { name: "Clubburger", price: "€16,50", description: "Crispy baked chicken, bacon, fried egg, romaine lettuce, dried tomatoes, lemongrass-lime mayo, mustard, brioche bun" },
          { name: "Mediterrano", price: "€15,50", description: "Grilled chicken breast, serrano ham, dried tomatoes, arugula, olive tapenade, cheese shavings, sage mayo, multigrain bun" },
          { name: "Little Italy", price: "€14,50", description: "Grilled chicken breast, buffalo mozzarella, bruschetta tomatoes, arugula, basil pesto, Hochstapler aioli, brioche bun" },
          { name: "Surf 'n Turf", price: "€17,00", description: "Patty, prawns, arugula, mango chutney, truffle mayo, brioche bun" },
        ],
      },
      {
        heading: "Vegan & Vegetarian Burgers",
        intro: "Every meatless burger can be ordered with the vegan pea protein patty (115g).",
        items: [
          { name: "Black Pat (vegan)", price: "€14,50", description: "Black bean-quinoa patty, fried leek, grilled herbed mushrooms, arugula, tomato pesto, vegan mayo, multigrain bun" },
          { name: "Casablanca (vegan)", price: "€14,50", description: "Chickpea falafel, fried pineapple, arugula, tomato, sweet-chili-sesame sauce, vegan mayo, multigrain bun" },
          { name: "Say Chee (vegan)", price: "€14,50", description: "Pea protein patty, vegan cheese, lollo salad, tomato, pickles, red onions, Hochstapler burger sauce, multigrain bun" },
          { name: "O'Elinas", price: "€14,50", description: "Feta patty, tzatziki, romaine salad, cole slaw, cucumber, dried tomatoes, multigrain bun" },
          { name: "Brokk Me Amadeus (vegan)", price: "€14,50", description: "Broccoli patty, arugula, pickles, tomato, avocado cream, pepper hummus, vegan mayo, multigrain bun" },
        ],
      },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    sections: [
      {
        heading: "Sides",
        items: [
          { name: "Hochstapler Fries", price: "€4,70" },
          { name: "Sweet Potato Fries", price: "€5,20" },
          { name: "Hochstapler's Coleslaw", price: "€4,20" },
          { name: "Chili Cheese Fries", price: "€6,30" },
          { name: "Maple Fries", price: "€6,30" },
          { name: "Truffle Fries", price: "€6,30" },
          { name: "Mixed Greens", price: "€4,20", description: "with balsamico dressing" },
          { name: "Arugula Salad", price: "€4,20", description: "with honey-mustard dressing" },
          { name: "Chili-Cheese Nuggets", price: "€6,20" },
        ],
      },
      {
        heading: "Homemade Sauces",
        items: [
          { name: "Ketchup", price: "€0,90" },
          { name: "Mayonnaise", price: "€0,90" },
          { name: "Mustard", price: "€0,90" },
          { name: "Honey-BBQ Sauce", price: "€1,50" },
          { name: "Lemongrass-Lime Mayo", price: "€1,50" },
          { name: "Chipotle Mayo", price: "€1,50" },
          { name: "Hochstapler Aioli", price: "€1,50" },
          { name: "Sage Mayo", price: "€1,50" },
          { name: "Yogurt-Habanero Sauce", price: "€1,50" },
          { name: "Avocado Cream", price: "€1,50" },
          { name: "Curry-Mango Sauce", price: "€1,50" },
          { name: "Truffle Mayo", price: "€1,50" },
          { name: "Sour Cream", price: "€1,50" },
          { name: "Bacon Jam", price: "€2,00" },
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    sections: [
      {
        heading: "Desserts",
        items: [
          { name: "Crème Brûlée", price: "€7,30", description: "with cremino ice cream and fruit sauce" },
          { name: "Apple-Walnut Cheesecake", price: "€7,30" },
          { name: "Hot Fudge", price: "€8,40", description: "Warm chocolate brownie, caramelized walnuts, vanilla ice cream, white chocolate sauce, cream" },
          { name: "Lime Sorbet", price: "€2,80" },
          { name: "Mango Sorbet", price: "€2,80" },
          { name: "Raspberry Sorbet", price: "€2,80" },
          { name: "Caipi Sorbet", price: "€3,30", description: "Lime sorbet, Pitu, sugar" },
          { name: "Triple Sorbet", price: "€7,80" },
          { name: "Vanilla Ice Cream", price: "€3,00" },
          { name: "Chocolate Ice Cream (vegan)", price: "€3,00" },
        ],
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  vegan: "bg-green-100 text-green-800",
  vegetarian: "bg-green-100 text-green-800",
  hot: "bg-red-100 text-red-800",
  kids: "bg-blue-100 text-blue-800",
};

function getBadge(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("vegan")) return { label: "Vegan", color: tagColors.vegan };
  if (lower.includes("kids") || lower.includes("mini")) return { label: "Kids", color: tagColors.kids };
  return null;
}

export default function EnglishMenuPage() {
  const [activeCategory, setActiveCategory] = useState("burgers");

  const currentCat = MENU.find((c) => c.id === activeCategory) ?? MENU[0];

  return (
    <MainLayout>
      <SEO
        title="English Menu – Hochstapler Burger Münster"
        description="Our full English menu: burgers, salads, starters, sides and desserts."
      />

      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img
          src={pageBg}
          alt="English Menu"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3"
          >
            English Menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-serif text-4xl md:text-6xl text-background"
          >
            Our Menu
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5"
          >
            <Link
              href="/speisekarte"
              className="inline-block text-xs font-bold uppercase tracking-wider text-background/70 hover:text-accent transition-colors border-b border-background/40 hover:border-accent pb-0.5"
            >
              → Deutsche Speisekarte
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-background sticky top-[60px] z-30 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {MENU.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
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

      {/* Menu Content */}
      <section className="py-12 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            >
              {currentCat.sections.map((section) => (
                <div key={section.heading} className="mb-12">
                  <motion.h2
                    variants={fadeUp}
                    className="font-serif text-2xl md:text-3xl text-primary mb-3"
                  >
                    {section.heading}
                  </motion.h2>
                  {section.intro && (
                    <motion.p
                      variants={fadeUp}
                      className="text-muted-foreground text-sm mb-6 max-w-2xl leading-relaxed italic"
                    >
                      {section.intro}
                    </motion.p>
                  )}
                  <div className="divide-y divide-border border-t border-b border-border">
                    {section.items.map((item) => {
                      const badge = getBadge(item.name);
                      return (
                        <motion.div
                          key={item.name}
                          variants={fadeUp}
                          className="py-4 flex items-start justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="font-bold text-primary">{item.name}</span>
                              {badge && (
                                <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider ${badge.color}`}>
                                  {badge.label}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            {item.note && (
                              <p className="text-xs text-muted-foreground/70 mt-1 italic">{item.note}</p>
                            )}
                          </div>
                          {item.price && (
                            <span className="font-bold text-primary whitespace-nowrap flex-shrink-0">
                              {item.price}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-center">
        <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Book a table</p>
        <h2 className="font-serif text-3xl text-background mb-8">Ready to visit us?</h2>
        <Link
          href="/reservierung"
          className="inline-block bg-accent text-primary font-bold uppercase tracking-wider px-8 py-3 hover:bg-accent/90 transition-colors text-sm"
        >
          Make a reservation
        </Link>
      </section>
    </MainLayout>
  );
}
