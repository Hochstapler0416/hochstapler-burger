import { db, pool } from "@workspace/db";
import { menuCategoriesTable, menuItemsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const seedData = [
  {
    name: "Burger — Rind", slug: "burger-rind", type: "food", sortOrder: 1,
    items: [
      { name: "Klassiker", price: "14,00 EUR", description: "Patty, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun", badge: "", sortOrder: 1 },
      { name: "Hochstapler", price: "15,00 EUR", description: "Patty, Der Froehliche Faehnrich Bio-Kaese, karamellisierte Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun", badge: "Signature", sortOrder: 2 },
      { name: "All American", price: "15,00 EUR", description: "Patty, Kaeptn Pauli Bio-Kaese, Bacon, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Senf, Hausketchup, Brioche-Bun", badge: "", sortOrder: 3 },
      { name: "Hippe", price: "16,00 EUR", description: "Patty, Ziegenkaese, Lollo Salat, Feigenmarmelade, Sour Cream, Mehrkorn-Bun", badge: "", sortOrder: 4 },
      { name: "El Nacho", price: "16,50 EUR", description: "Patty, Chorizo, Pimientos de Patron, Nachos, Jalapenos, Chilli-Kaese-Sauce, Brioche-Bun", badge: "", sortOrder: 5 },
      { name: "New Yorker", price: "18,00 EUR", description: "Patty, hausgemachtes New York Style Pastrami, Der Froehliche Faehnrich Bio-Kaese, Sauerkraut, Lollo Salat, Tomate, Russian Dressing, Brioche-Bun", badge: "Beliebt", sortOrder: 6 },
      { name: "Hinterwaeldler", price: "16,50 EUR", description: "Patty, Brie, gebratene Kraeuter-Champignons, Apfel-Chutney, Rauke, Tomate, Trueffel Mayo, Mehrkorn-Bun", badge: "", sortOrder: 7 },
      { name: "Memphis BBQ", price: "19,00 EUR", description: "Patty, hausgeroechertes Roastbeef, Der Froehliche Faehnrich Bio-Kaese, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Honig-BBQ Sauce, Brioche-Bun", badge: "", sortOrder: 8 },
      { name: "Big Daddy", price: "20,00 EUR", description: "Doppeltes Patty, Kaeptn Pauli Bio-Kaese, Bacon, Spiegelei, karamellisierte Zwiebeln, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun", badge: "Premium", sortOrder: 9 },
      { name: "Jo-Ki", price: "17,00 EUR", description: "Patty, Bacon, Der Froehliche Faehnrich Kaese, geschmorrte Zwiebeln, Gewuerzgurke, Lollo Salat, Jalapenos, Tomate, Ketchup, Honig-BBQ Sauce, Brioche-Bun", badge: "", sortOrder: 10 },
      { name: "Ministapler (Kinder)", price: "7,80 EUR", description: "Patty (80g), Ketchup oder Mayo, Brioche-Bun, Fritten", badge: "Kids", sortOrder: 11 },
    ],
  },
  {
    name: "Die etwas anderen Burger", slug: "andere-burger", type: "food", sortOrder: 2,
    items: [
      { name: "Ms Carolina", price: "15,50 EUR", description: "Pulled Pork, Lollo Salat, rote Zwiebeln, Cole Slaw, Jalapenos, Chili-Kaese-Sauce, Honig-BBQ-Sauce, Brioche-Bun", badge: "", sortOrder: 1 },
      { name: "Spicy Chicken", price: "17,50 EUR", description: "Crispy Chicken, Rauke, Tomate, rote Zwiebeln, Curry-Mango Sauce, Joghurt-Habanero Sauce (Scharf!), Mehrkorn-Bun", badge: "Scharf", sortOrder: 2 },
      { name: "Clubburger", price: "16,50 EUR", description: "Gebackene Haehnchenbrust, Bacon, Spiegelei, Roemersalat, getrocknete Tomaten, Zitronengras-Limetten Mayo, Senf, Brioche-Bun", badge: "", sortOrder: 3 },
      { name: "Mediterrano", price: "15,50 EUR", description: "Gegrillte Haehnchenbrust, Serrano-Schinken, getrocknete Tomaten, Rauke, Oliven-Tapenade, Kaeptn Paulis Goldschatz-Kaese-Raspel, Salbei Mayo, Mehrkorn-Bun", badge: "", sortOrder: 4 },
      { name: "Little Italy", price: "14,50 EUR", description: "Gegrillte Haehnchenbrust, Bueffelmozzarella, Bruschetta-Tomaten, Rauke, Basilikumpesto, Hochstapler Aioli, Brioche-Bun", badge: "", sortOrder: 5 },
      { name: "Surf n Turf", price: "17,00 EUR", description: "Patty, Garnelen, Rucola, Mango-Chutney, Trueffelmayo, Brioche-Bun", badge: "Besonders", sortOrder: 6 },
    ],
  },
  {
    name: "Vegan & Vegetarisch", slug: "vegan", type: "food", sortOrder: 3,
    items: [
      { name: "Black Pat", price: "14,50 EUR", description: "Belugalinsen-Quinoa-Patty, gebratener Lauch, Kraeuter-Champignons, Rauke, Tomatenpesto, vegane Mayonnaise, Mehrkorn-Bun", badge: "Vegan", sortOrder: 1 },
      { name: "Casablanca", price: "14,50 EUR", description: "Kichererbsen-Falafel, gebratene Ananasscheibe, Rauke, Tomate, Sweet-Chilli-Sesam Sauce, Veganer Mayo, Mehrkorn-Bun", badge: "Vegan", sortOrder: 2 },
      { name: "Say Chee", price: "14,50 EUR", description: "Erbsenprotein-Patty, veganer Kaese, Lollo Salat, Tomate, Gewürzgurken, rote Zwiebeln, Hochstapler Burgersauce, Mehrkorn-Bun", badge: "Vegetarisch", sortOrder: 3 },
      { name: "O Elinas", price: "14,50 EUR", description: "Feta Patty, Zaziki, Romanasalat, Cole Slaw, Salatgurke, getrocknete Tomaten, Mehrkorn-Bun", badge: "Vegetarisch", sortOrder: 4 },
      { name: "Brokk Me Amadeus", price: "14,50 EUR", description: "Brokkoli Patty, Rucola, Gewürzgurke, Tomate, Avocadocreme, Paprika Hummus, Vegane Mayo, Mehrkorn-Bun", badge: "Vegan", sortOrder: 5 },
    ],
  },
  {
    name: "Salate", slug: "salate", type: "food", sortOrder: 4,
    items: [
      { name: "Ra(ba)uke", price: "14,50 EUR", description: "Rauke, Ziegenkaese, Feigenmarmelade, Oliven, Honig-Senf-Dressing, hausgebackenes Brot mit Chimichurri", badge: "", sortOrder: 1 },
      { name: "Caesar Salad", price: "15,00 EUR", description: "Roemersalat, Parmesan-Raspel, Anchovis-Filet, Croutons, Hochstapler Caesar-Dressing", badge: "", sortOrder: 2 },
      { name: "Popeye", price: "15,00 EUR", description: "Babyspinat, Karotte, Rotkohl, gebeizter Lachs, Himbeer-Dressing, hausgebackenes Brot", badge: "", sortOrder: 3 },
      { name: "Gruener Hochstapler", price: "14,50 EUR", description: "Gemischte Blattsalate, gebratene Zucchini und Apfel, Kerne, Kraeutер-Joghurt-Dressing, hausgebackenes Brot mit Chimichurri", badge: "", sortOrder: 4 },
      { name: "Grosser Gemischter", price: "14,50 EUR", description: "Gemischte Blattsalate, Gurke, Kirschtomate, Paprika, Karotte, Radieschen, Sprossen, Balsamico-Dressing, hausgebackenes Brot", badge: "", sortOrder: 5 },
    ],
  },
  {
    name: "Knabbern & Teilen", slug: "vorspeisen", type: "food", sortOrder: 5,
    items: [
      { name: "Trueffel-Fritten", price: "9,40 EUR", description: "Hausfritten mit Trueffeloel, geraspelter Hafenkaese, Fruehlingszwiebeln, Hochstapler Aioli", badge: "", sortOrder: 1 },
      { name: "Salatschiffchen Caesar Style", price: "8,40 EUR", description: "Roemersalat, Parmesan-Raspel, Anchovis-Filet, Croutons, Hochstapler Caesar-Dressing", badge: "", sortOrder: 2 },
      { name: "Tempura Zwiebelringe", price: "7,30 EUR", description: "mit Sour Cream", badge: "", sortOrder: 3 },
      { name: "Chili Cheese Nachos", price: "7,80 EUR", description: "Chili-Kaese Sauce, Jalapenos, Avocadocreme", badge: "", sortOrder: 4 },
      { name: "Chili Cheese Fries", price: "9,40 EUR", description: "Chili-Kaese Sauce, Jalapenos", badge: "", sortOrder: 5 },
      { name: "Hausgemachtes Brot", price: "7,30 EUR", description: "mit Bacon Jam", badge: "", sortOrder: 6 },
      { name: "Ahorn-Fritten", price: "9,40 EUR", description: "Suesskartoffelfritten mit Ahornsirup, Baconstreifen, Fruehlingszwiebeln, Honig-BBQ Sauce", badge: "", sortOrder: 7 },
      { name: "Frittierte Gewuerzgurken", price: "7,30 EUR", description: "mit Chipotle Mayo", badge: "", sortOrder: 8 },
      { name: "Rohkostteller", price: "7,30 EUR", description: "Moehren, Paprika, Kohlrabi, Gurke, Sour Cream", badge: "", sortOrder: 9 },
      { name: "Pimientos da Padron", price: "7,30 EUR", description: "mit Sriracha Ketchup", badge: "", sortOrder: 10 },
      { name: "Chili-Cheese Nuggets", price: "9,40 EUR", description: "mit Buttermilch-Ranch-Dressing", badge: "", sortOrder: 11 },
      { name: "Roastbeef-Roellchen", price: "9,40 EUR", description: "mit Bacon, Rauke und Honig BBQ Sauce", badge: "", sortOrder: 12 },
    ],
  },
  {
    name: "Beilagen", slug: "beilagen", type: "food", sortOrder: 6,
    items: [
      { name: "Hausfritten", price: "4,70 EUR", description: "", badge: "", sortOrder: 1 },
      { name: "Suesskartoffelfritten", price: "5,20 EUR", description: "", badge: "", sortOrder: 2 },
      { name: "Hochstaplers Coleslaw", price: "4,20 EUR", description: "", badge: "", sortOrder: 3 },
      { name: "Chili Cheese Fries", price: "6,30 EUR", description: "", badge: "", sortOrder: 4 },
      { name: "Ahorn Fritten", price: "6,30 EUR", description: "", badge: "", sortOrder: 5 },
      { name: "Trueffelfritten", price: "6,30 EUR", description: "", badge: "", sortOrder: 6 },
      { name: "Gemischter Salat", price: "4,20 EUR", description: "mit Balsamico Dressing", badge: "", sortOrder: 7 },
      { name: "Rucola Salat", price: "4,20 EUR", description: "mit Honig-Senf-Dressing", badge: "", sortOrder: 8 },
      { name: "Chili-Cheese Nuggets", price: "6,20 EUR", description: "", badge: "", sortOrder: 9 },
    ],
  },
  {
    name: "Saucen", slug: "saucen", type: "food", sortOrder: 7,
    items: [
      { name: "Ketchup", price: "0,90 EUR", description: "", badge: "", sortOrder: 1 },
      { name: "Mayonnaise", price: "0,90 EUR", description: "", badge: "", sortOrder: 2 },
      { name: "Senf", price: "0,90 EUR", description: "", badge: "", sortOrder: 3 },
      { name: "Honig-BBQ Sauce", price: "1,50 EUR", description: "", badge: "", sortOrder: 4 },
      { name: "Zitronengras-Limetten Mayo", price: "1,50 EUR", description: "", badge: "", sortOrder: 5 },
      { name: "Mexikanische Chipotle Mayo", price: "1,50 EUR", description: "", badge: "", sortOrder: 6 },
      { name: "Hochstapler Aioli", price: "1,50 EUR", description: "", badge: "", sortOrder: 7 },
      { name: "Salbei Mayo", price: "1,50 EUR", description: "", badge: "", sortOrder: 8 },
      { name: "Joghurt-Habanero Sauce", price: "1,50 EUR", description: "Scharf!", badge: "", sortOrder: 9 },
      { name: "Avocadocreme", price: "1,50 EUR", description: "", badge: "", sortOrder: 10 },
      { name: "Curry-Mango Sauce", price: "1,50 EUR", description: "", badge: "", sortOrder: 11 },
      { name: "Trueffel Mayonnaise", price: "1,50 EUR", description: "", badge: "", sortOrder: 12 },
      { name: "Sour Cream", price: "1,50 EUR", description: "", badge: "", sortOrder: 13 },
      { name: "Bacon Jam", price: "2,00 EUR", description: "", badge: "", sortOrder: 14 },
    ],
  },
  {
    name: "Desserts", slug: "desserts", type: "food", sortOrder: 8,
    items: [
      { name: "Creme Brulee", price: "7,30 EUR", description: "mit Cremino Eis und Fruchtsauce", badge: "", sortOrder: 1 },
      { name: "Apfel-Walnuss-Cheesecake", price: "7,30 EUR", description: "", badge: "", sortOrder: 2 },
      { name: "Hot Fudge", price: "8,40 EUR", description: "Warmer Schokoladen Brownie, karamellisierte Walnuesse, Vanille-Eis, weisse Schokoladensauce, Sahne", badge: "", sortOrder: 3 },
      { name: "Limetten-Sorbet", price: "2,80 EUR", description: "", badge: "", sortOrder: 4 },
      { name: "Mango-Sorbet", price: "2,80 EUR", description: "", badge: "", sortOrder: 5 },
      { name: "Himbeer-Sorbet", price: "2,80 EUR", description: "", badge: "", sortOrder: 6 },
      { name: "Caipi-Sorbet", price: "3,30 EUR", description: "Limetten-Sorbet, Pitu, Zucker", badge: "", sortOrder: 7 },
      { name: "Dreierlei Sorbet", price: "7,80 EUR", description: "", badge: "", sortOrder: 8 },
      { name: "Vanille-Eis", price: "3,00 EUR", description: "MaMas Eismanufaktur", badge: "", sortOrder: 9 },
      { name: "Schokoladeneis vegan", price: "3,00 EUR", description: "MaMas Eismanufaktur", badge: "Vegan", sortOrder: 10 },
    ],
  },
  {
    name: "Cocktails & Longdrinks", slug: "cocktails", type: "drink", sortOrder: 9,
    items: [
      { name: "Aperol Sour", price: "7,00 EUR", description: "Aperol, Zitronensaft, Zuckersirup, Orangensaft", badge: "Happy Hour", sortOrder: 1 },
      { name: "Cuba Libre", price: "7,00 EUR", description: "Brauner Rum, Cola, Limettensaft", badge: "Happy Hour", sortOrder: 2 },
      { name: "Gin Fizz", price: "7,00 EUR", description: "Gin, Puderzucker, Zitronensaft, Soda", badge: "Happy Hour", sortOrder: 3 },
      { name: "Mai Tai", price: "7,00 EUR", description: "Brauner Rum, Limettensaft, Apricot Brandy, Mandelsirup", badge: "Happy Hour", sortOrder: 4 },
      { name: "Moscow Mule", price: "7,00 EUR", description: "Vodka, Limettensaft, Ginger Beer", badge: "Happy Hour", sortOrder: 5 },
      { name: "Mojito", price: "7,00 EUR", description: "Weisser Rum, Limettensaft, Zuckersirup, Minze", badge: "Happy Hour", sortOrder: 6 },
      { name: "Raspberry Mojito", price: "7,00 EUR", description: "Bacardi Razz, Limettensaft, Himbeersirup, Minze", badge: "Happy Hour", sortOrder: 7 },
      { name: "Vanilla Passion", price: "7,00 EUR", description: "Vodka, Zitronensaft, Vanillesirup, Maracujasaft", badge: "Happy Hour", sortOrder: 8 },
    ],
  },
  {
    name: "Aperitif & Spritz", slug: "aperitif", type: "drink", sortOrder: 10,
    items: [
      { name: "Aperol Spritz", price: "8,00 EUR", description: "Aperol, Sekt, Soda", badge: "", sortOrder: 1 },
      { name: "Lillet Wildberry", price: "8,00 EUR", description: "Lillet, Schweppes Wildberry", badge: "", sortOrder: 2 },
      { name: "Limoncello Spritz", price: "8,00 EUR", description: "Limoncello, Zitronensaft, Sekt, Soda", badge: "", sortOrder: 3 },
      { name: "Hugo", price: "8,00 EUR", description: "Sekt, Holunderbluetensirup, Soda", badge: "", sortOrder: 4 },
      { name: "Campari Spritz", price: "8,00 EUR", description: "Campari, Sekt, Soda", badge: "", sortOrder: 5 },
      { name: "Bellini", price: "8,00 EUR", description: "Pfirsichpueree, Sekt", badge: "", sortOrder: 6 },
      { name: "Rosella Tonic", price: "8,00 EUR", description: "Aperitif 1022, Tonic", badge: "", sortOrder: 7 },
      { name: "Aperol Pink", price: "8,00 EUR", description: "Aperol, Pink Grapefruit, Soda", badge: "", sortOrder: 8 },
      { name: "Martini Bianco", price: "5,00 EUR", description: "", badge: "", sortOrder: 9 },
      { name: "Cremant 0,1l", price: "5,00 EUR", description: "", badge: "", sortOrder: 10 },
      { name: "Cremant Flasche", price: "30,00 EUR", description: "0,75 l", badge: "", sortOrder: 11 },
      { name: "Sekt Alkoholfrei", price: "4,90 EUR", description: "", badge: "Alkoholfrei", sortOrder: 12 },
    ],
  },
  {
    name: "Biere", slug: "biere", type: "drink", sortOrder: 11,
    items: [
      { name: "Bitburger Pils", price: "3,90 EUR", description: "0,3 l vom Fass", badge: "", sortOrder: 1 },
      { name: "Potts Landbier", price: "3,90 EUR", description: "0,3 l vom Fass", badge: "", sortOrder: 2 },
      { name: "Tango", price: "3,90 EUR", description: "0,3 l vom Fass", badge: "", sortOrder: 3 },
      { name: "Benediktiner Hell", price: "3,90 EUR", description: "0,3 l vom Fass", badge: "", sortOrder: 4 },
      { name: "Benediktiner Weizen", price: "3,90 EUR", description: "0,3 l vom Fass", badge: "", sortOrder: 5 },
      { name: "Fassbier gross", price: "6,40 EUR", description: "0,5 l", badge: "", sortOrder: 6 },
      { name: "Heineken", price: "3,20 EUR", description: "0,25 l Flasche", badge: "", sortOrder: 7 },
      { name: "Pinkus Alt", price: "4,20 EUR", description: "0,33 l Flasche", badge: "", sortOrder: 8 },
      { name: "Pinkus Special", price: "4,20 EUR", description: "0,33 l Flasche", badge: "", sortOrder: 9 },
      { name: "TH Koenig Zwickel Kellerbier", price: "4,10 EUR", description: "0,33 l Flasche", badge: "", sortOrder: 10 },
      { name: "Bitburger 0,0%", price: "4,10 EUR", description: "0,33 l alkoholfrei", badge: "Alkoholfrei", sortOrder: 11 },
      { name: "Benediktiner Weizen alkoholfrei", price: "6,20 EUR", description: "0,5 l", badge: "Alkoholfrei", sortOrder: 12 },
    ],
  },
  {
    name: "Softdrinks & Saefte", slug: "softdrinks", type: "drink", sortOrder: 12,
    items: [
      { name: "Selters Classic", price: "3,40 EUR", description: "0,25 l", badge: "", sortOrder: 1 },
      { name: "Selters Naturell", price: "3,40 EUR", description: "0,25 l", badge: "", sortOrder: 2 },
      { name: "Selters Classic gross", price: "7,80 EUR", description: "0,75 l", badge: "", sortOrder: 3 },
      { name: "Hausgemachter Eistee", price: "4,50 EUR", description: "0,4 l", badge: "", sortOrder: 4 },
      { name: "Hausgemachte Limonade", price: "4,50 EUR", description: "0,4 l", badge: "", sortOrder: 5 },
      { name: "Fruchtsaft klein", price: "3,20 EUR", description: "0,2 l - Apfel, Banane, Kirsch, Orange, Maracuja, Rhabarber", badge: "", sortOrder: 6 },
      { name: "Fruchtsaft gross", price: "5,30 EUR", description: "0,4 l", badge: "", sortOrder: 7 },
      { name: "liba-kola", price: "4,00 EUR", description: "0,33 l", badge: "", sortOrder: 8 },
      { name: "liba-limo orange", price: "4,00 EUR", description: "0,33 l", badge: "", sortOrder: 9 },
      { name: "Red Bull", price: "4,50 EUR", description: "", badge: "", sortOrder: 10 },
      { name: "Ginger Beer", price: "3,20 EUR", description: "0,2 l", badge: "", sortOrder: 11 },
      { name: "Bitter Lemon", price: "3,20 EUR", description: "0,2 l", badge: "", sortOrder: 12 },
    ],
  },
  {
    name: "Weine", slug: "weine", type: "drink", sortOrder: 13,
    items: [
      { name: "Sauvignon Blanc", price: "7,50 EUR", description: "Weingut Keth, Rheinhessen", badge: "Weisswein", sortOrder: 1 },
      { name: "Riesling trocken", price: "7,50 EUR", description: "Weingut Thomas Bauer, Pfalz", badge: "Weisswein", sortOrder: 2 },
      { name: "Grauburgunder", price: "6,90 EUR", description: "Weingut Thomas Bauer, Pfalz", badge: "Weisswein", sortOrder: 3 },
      { name: "Chardonnay & Weissburgunder", price: "7,50 EUR", description: "Weingut Knipser, Pfalz", badge: "Weisswein", sortOrder: 4 },
      { name: "Lugana Ora DOC", price: "7,50 EUR", description: "Weingut Perla del Garda, Italien", badge: "Weisswein", sortOrder: 5 },
      { name: "Cabernet Sauvignon", price: "6,90 EUR", description: "Weingut Leeuwenkuil, Suedafrika", badge: "Rotwein", sortOrder: 6 },
      { name: "Garnacha", price: "7,50 EUR", description: "Weingut Bodegas Borsao, Spanien", badge: "Rotwein", sortOrder: 7 },
      { name: "Piluna Primitivo Salento", price: "7,50 EUR", description: "Weingut Cantine de Castello, Apulien", badge: "Rotwein", sortOrder: 8 },
      { name: "Marques de Castillo Rosado", price: "7,50 EUR", description: "Weingut Cristo de la Vega, Spanien", badge: "Rose", sortOrder: 9 },
    ],
  },
  {
    name: "Kaffee & Tee", slug: "kaffee", type: "drink", sortOrder: 14,
    items: [
      { name: "Espresso", price: "3,00 EUR", description: "", badge: "", sortOrder: 1 },
      { name: "Doppelter Espresso", price: "4,30 EUR", description: "", badge: "", sortOrder: 2 },
      { name: "Espresso Macchiato", price: "3,20 EUR", description: "", badge: "", sortOrder: 3 },
      { name: "Cafe Creme", price: "3,20 EUR", description: "", badge: "", sortOrder: 4 },
      { name: "Cappuccino", price: "3,70 EUR", description: "", badge: "", sortOrder: 5 },
      { name: "Latte Macchiato", price: "4,10 EUR", description: "", badge: "", sortOrder: 6 },
      { name: "Dunkle Schokolade", price: "4,10 EUR", description: "", badge: "", sortOrder: 7 },
      { name: "Friesentee", price: "3,40 EUR", description: "", badge: "Tee", sortOrder: 8 },
      { name: "Chai Tee", price: "3,40 EUR", description: "", badge: "Tee", sortOrder: 9 },
      { name: "Frische Minze", price: "3,40 EUR", description: "", badge: "Tee", sortOrder: 10 },
    ],
  },
];

async function main() {
  console.log("Seeding menu...");
  for (const cat of seedData) {
    const existing = await db.select().from(menuCategoriesTable).where(eq(menuCategoriesTable.slug, cat.slug));
    let categoryId: number;
    if (existing.length > 0) {
      categoryId = existing[0].id;
      console.log(`  Exists: ${cat.name} (id=${categoryId})`);
    } else {
      const [inserted] = await db.insert(menuCategoriesTable).values({
        name: cat.name, slug: cat.slug, type: cat.type, sortOrder: cat.sortOrder, isVisible: true,
      }).returning();
      categoryId = inserted.id;
      console.log(`  Created: ${cat.name} (id=${categoryId})`);
    }
    const existingItems = await db.select().from(menuItemsTable).where(eq(menuItemsTable.categoryId, categoryId));
    if (existingItems.length === 0) {
      for (const item of cat.items) {
        await db.insert(menuItemsTable).values({
          categoryId, name: item.name, description: item.description,
          price: item.price, badge: item.badge, sortOrder: item.sortOrder, isAvailable: true,
        });
      }
      console.log(`  Seeded ${cat.items.length} items`);
    } else {
      console.log(`  Items already exist, skipping`);
    }
  }
  console.log("Done!");
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
