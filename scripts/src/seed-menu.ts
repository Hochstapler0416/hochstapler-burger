import { db, pool } from '@workspace/db';
import { menuCategoriesTable, menuItemsTable } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';

const seedData = [
  {
    name: 'Burger — Rind', slug: 'burger-rind', type: 'food', sortOrder: 1,
    subtitle: '100% reines Rindfleisch aus artgerechter Freilandhaltung – veredelt mit unserem 'Burger Dust'. Unsere Burger werden MEDIUM gebraten. Glutenfreie Buns auf Anfrage.',
    items: [
      { name: 'Klassiker', price: '14,00 €', description: 'Patty, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun', badge: '', sortOrder: 1 },
      { name: 'Hochstapler', price: '15,00 €', description: 'Patty, 'Der Fröhliche Fähnrich' Bio-Käse, karamellisierte Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun', badge: 'Signature', sortOrder: 2 },
      { name: 'All American', price: '15,00 €', description: 'Patty, 'Käpt'n Pauli' Bio-Käse, Bacon, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Senf, Hausketchup, Brioche-Bun', badge: '', sortOrder: 3 },
      { name: 'Hippe', price: '16,00 €', description: 'Patty, Ziegenkäse, Lollo Salat, Feigenmarmelade, Sour Cream, Mehrkorn-Bun', badge: '', sortOrder: 4 },
      { name: 'El Nacho', price: '16,50 €', description: 'Patty, Chorizo, Pimientos de Patrón, Nachos, Jalapenos, Chilli-Käse-Sauce, Brioche-Bun', badge: '', sortOrder: 5 },
      { name: 'New Yorker', price: '18,00 €', description: 'Patty, hausgemachtes 'New York Style' Pastrami, 'Der Fröhliche Fähnrich' Bio-Käse, Sauerkraut, Lollo Salat, Tomate, Russian Dressing, Brioche-Bun', badge: 'Beliebt', sortOrder: 6 },
      { name: 'Hinterwäldler', price: '16,50 €', description: 'Patty, Brie, gebratene Kräuter-Champignons, Apfel-Chutney, Rauke, Tomate, Trüffel Mayo, Mehrkorn-Bun', badge: '', sortOrder: 7 },
      { name: 'Memphis BBQ', price: '19,00 €', description: 'Patty, hausgeräuchertes Roastbeef, 'Der Fröhliche Fähnrich' Bio-Käse, rote Zwiebeln, Gewürzgurken, Lollo Salat, Tomate, Honig-BBQ Sauce, Brioche-Bun', badge: '', sortOrder: 8 },
      { name: 'Big Daddy', price: '20,00 €', description: 'Doppeltes Patty, 'Käpt'n Pauli' Bio-Käse, Bacon, Spiegelei, karamellisierte Zwiebeln, Lollo Salat, Tomate, Hochstapler Burgersauce, Brioche-Bun', badge: 'Premium', sortOrder: 9 },
      { name: 'Jo-Ki', price: '17,00 €', description: 'Patty, Bacon, Der Fröhliche Fähnrich Käse, geschmorrte Zwiebeln, Gewürzgurke, Lollo Salat, Jalapenos, Tomate, Ketchup, Honig-BBQ Sauce, Brioche-Bun', badge: '', sortOrder: 10 },
      { name: 'Ministapler (Kinder)', price: '7,80 €', description: 'Patty (80g), Ketchup oder Mayo, Brioche-Bun, Fritten', badge: 'Kids', sortOrder: 11 },
    ],
  },
  {
    name: 'Die etwas anderen Burger', slug: 'andere-burger', type: 'food', sortOrder: 2,
    items: [
      { name: 'Ms Carolina', price: '15,50 €', description: 'Pulled Pork, Lollo Salat, rote Zwiebeln, Cole Slaw, Jalapeños, Chili-Käse-Sauce, Honig-BBQ-Sauce, Brioche-Bun', badge: '', sortOrder: 1 },
      { name: 'Spicy Chicken', price: '17,50 €', description: 'Crispy Chicken, Rauke, Tomate, rote Zwiebeln, Curry-Mango Sauce, Joghurt-Habanero Sauce (Scharf!), Mehrkorn-Bun', badge: 'Scharf', sortOrder: 2 },
      { name: 'Clubburger', price: '16,50 €', description: 'Gebackene Hähnchenbrust, Bacon, Spiegelei, Römersalat, getrocknete Tomaten, Zitronengras-Limetten Mayo, Senf, Brioche-Bun', badge: '', sortOrder: 3 },
      { name: 'Mediterrano', price: '15,50 €', description: 'Gegrillte Hähnchenbrust, Serrano-Schinken, getrocknete Tomaten, Rauke, Oliven-Tapenade, Käpt'n Paulis Goldschatz-Käse-Raspel, Salbei Mayo, Mehrkorn-Bun', badge: '', sortOrder: 4 },
      { name: 'Little Italy', price: '14,50 €', description: 'Gegrillte Hähnchenbrust, Büffelmozzarella, Bruschetta-Tomaten, Rauke, Basilikumpesto, Hochstapler Aioli, Brioche-Bun', badge: '', sortOrder: 5 },
      { name: 'Surf 'n Turf', price: '17,00 €', description: 'Patty, Garnelen, Rucola, Mango-Chutney, Trüffelmayo, Brioche-Bun', badge: 'Besonders', sortOrder: 6 },
    ],
  },
  {
    name: 'Vegan & Vegetarisch', slug: 'vegan', type: 'food', sortOrder: 3,
    subtitle: 'Jeden unserer fleischlosen Burger kannst du mit dem veganen Patty (115g) auf Erbsenproteinbasis bestellen.',
    items: [
      { name: 'Black Pat', price: '14,50 €', description: 'Belugalinsen-Quinoa-Patty, gebratener Lauch, Kräuter-Champignons, Rauke, Tomatenpesto, vegane Mayonnaise, Mehrkorn-Bun', badge: 'Vegan', sortOrder: 1 },
      { name: 'Casablanca', price: '14,50 €', description: 'Kichererbsen-Falafel, gebratene Ananasscheibe, Rauke, Tomate, Sweet-Chilli-Sesam Sauce, Veganer Mayo, Mehrkorn-Bun', badge: 'Vegan', sortOrder: 2 },
      { name: 'Say Chee', price: '14,50 €', description: 'Erbsenprotein-Patty, veganer Käse, Lollo Salat, Tomate, Gewürzgurken, rote Zwiebeln, Hochstapler Burgersauce, Mehrkorn-Bun', badge: 'Vegetarisch', sortOrder: 3 },
      { name: 'O'Elinas', price: '14,50 €', description: 'Feta Patty, Zaziki, Romanasalat, Cole Slaw, Salatgurke, getrocknete Tomaten, Mehrkorn-Bun', badge: 'Vegetarisch', sortOrder: 4 },
      { name: 'Brokk Me Amadeus', price: '14,50 €', description: 'Brokkoli Patty, Rucola, Gewürzgurke, Tomate, Avocadocreme, Paprika Hummus, Vegane Mayo, Mehrkorn-Bun', badge: 'Vegan', sortOrder: 5 },
    ],
  },
  {
    name: 'Salate', slug: 'salate', type: 'food', sortOrder: 4,
    items: [
      { name: 'Ra(ba)uke', price: '14,50 €', description: 'Rauke, Ziegenkäse, Feigenmarmelade, Oliven, Honig-Senf-Dressing, hausgebackenes Brot mit Chimichurri', badge: '', sortOrder: 1 },
      { name: 'Caesar Salad', price: '15,00 €', description: 'Römersalat, Parmesan-Raspel, Anchovis-Filet, Croutons, Hochstapler Caesar-Dressing', badge: '', sortOrder: 2 },
      { name: 'Popeye', price: '15,00 €', description: 'Babyspinat, Karotte, Rotkohl, gebeizter Lachs, Himbeer-Dressing, hausgebackenes Brot', badge: '', sortOrder: 3 },
      { name: 'Grüner Hochstapler', price: '14,50 €', description: 'Gemischte Blattsalate, gebratene Zucchini und Apfel, Kerne, Kräuter-Joghurt-Dressing, hausgebackenes Brot mit Chimichurri', badge: '', sortOrder: 4 },
      { name: 'Großer Gemischter', price: '14,50 €', description: 'Gemischte Blattsalate, Gurke, Kirschtomate, Paprika, Karotte, Radieschen, Sprossen, Balsamico-Dressing, hausgebackenes Brot', badge: '', sortOrder: 5 },
    ],
  },
  {
    name: 'Knabbern & Teilen', slug: 'vorspeisen', type: 'food', sortOrder: 5,
    items: [
      { name: 'Trüffel-Fritten', price: '9,40 €', description: 'Hausfritten mit Trüffelöl, geraspelter Hafenkäse, Frühlingslauch, Hochstapler Aioli', badge: '', sortOrder: 1 },
      { name: 'Salatschiffchen Caesar Style', price: '8,40 €', description: 'Römersalat, Parmesan-Raspel, Anchovis-Filet, Croutons, Hochstapler Caesar-Dressing', badge: '', sortOrder: 2 },
      { name: 'Tempura Zwiebelringe', price: '7,30 €', description: 'mit Sour Cream', badge: '', sortOrder: 3 },
      { name: 'Chili Cheese Nachos', price: '7,80 €', description: 'Chili-Käse Sauce, Jalapenos, Avocadocreme', badge: '', sortOrder: 4 },
      { name: 'Chili Cheese Fries', price: '9,40 €', description: 'Chili-Käse Sauce, Jalapenos', badge: '', sortOrder: 5 },
      { name: 'Hausgemachtes Brot', price: '7,30 €', description: 'mit Bacon Jam', badge: '', sortOrder: 6 },
      { name: 'Ahorn-Fritten', price: '9,40 €', description: 'Süßkartoffelfritten mit Ahornsirup, Baconstreifen, Frühlingslauch, Honig-BBQ Sauce', badge: '', sortOrder: 7 },
      { name: 'Frittierte Gewürzgurken', price: '7,30 €', description: 'mit Chipotle Mayo', badge: '', sortOrder: 8 },
      { name: 'Rohkostteller', price: '7,30 €', description: 'Möhren, Paprika, Kohlrabi, Gurke, Sour Cream', badge: '', sortOrder: 9 },
      { name: 'Pimientos da Padron', price: '7,30 €', description: 'mit Sriracha Ketchup', badge: '', sortOrder: 10 },
      { name: 'Chili-Cheese Nuggets', price: '9,40 €', description: 'mit Buttermilch-Ranch-Dressing', badge: '', sortOrder: 11 },
      { name: 'Roastbeef-Röllchen', price: '9,40 €', description: 'mit Bacon, Rauke und Honig BBQ Sauce', badge: '', sortOrder: 12 },
    ],
  },
  {
    name: 'Beilagen', slug: 'beilagen', type: 'food', sortOrder: 6,
    items: [
      { name: 'Hausfritten', price: '4,70 €', description: '', badge: '', sortOrder: 1 },
      { name: 'Süßkartoffelfritten', price: '5,20 €', description: '', badge: '', sortOrder: 2 },
      { name: 'Hochstaplers Coleslaw', price: '4,20 €', description: '', badge: '', sortOrder: 3 },
      { name: 'Chili Cheese Fries', price: '6,30 €', description: '', badge: '', sortOrder: 4 },
      { name: 'Ahorn Fritten', price: '6,30 €', description: '', badge: '', sortOrder: 5 },
      { name: 'Trüffelfritten', price: '6,30 €', description: '', badge: '', sortOrder: 6 },
      { name: 'Gemischter Salat', price: '4,20 €', description: 'mit Balsamico Dressing', badge: '', sortOrder: 7 },
      { name: 'Rucola Salat', price: '4,20 €', description: 'mit Honig-Senf-Dressing', badge: '', sortOrder: 8 },
      { name: 'Chili-Cheese Nuggets', price: '6,20 €', description: '', badge: '', sortOrder: 9 },
    ],
  },
  {
    name: 'Saucen', slug: 'saucen', type: 'food', sortOrder: 7,
    items: [
      { name: 'Ketchup', price: '0,90 €', description: '', badge: '', sortOrder: 1 },
      { name: 'Mayonnaise', price: '0,90 €', description: '', badge: '', sortOrder: 2 },
      { name: 'Senf', price: '0,90 €', description: '', badge: '', sortOrder: 3 },
      { name: 'Honig-BBQ Sauce', price: '1,50 €', description: '', badge: '', sortOrder: 4 },
      { name: 'Zitronengras-Limetten Mayo', price: '1,50 €', description: '', badge: '', sortOrder: 5 },
      { name: 'Mexikanische Chipotle Mayo', price: '1,50 €', description: '', badge: '', sortOrder: 6 },
      { name: 'Hochstapler Aioli', price: '1,50 €', description: '', badge: '', sortOrder: 7 },
      { name: 'Salbei Mayo', price: '1,50 €', description: '', badge: '', sortOrder: 8 },
      { name: 'Joghurt-Habanero Sauce', price: '1,50 €', description: 'Scharf!', badge: '', sortOrder: 9 },
      { name: 'Avocadocreme', price: '1,50 €', description: '', badge: '', sortOrder: 10 },
      { name: 'Curry-Mango Sauce', price: '1,50 €', description: '', badge: '', sortOrder: 11 },
      { name: 'Trüffel Mayonnaise', price: '1,50 €', description: '', badge: '', sortOrder: 12 },
      { name: 'Sour Cream', price: '1,50 €', description: '', badge: '', sortOrder: 13 },
      { name: 'Bacon Jam', price: '2,00 €', description: '', badge: '', sortOrder: 14 },
    ],
  },
  {
    name: 'Desserts', slug: 'desserts', type: 'food', sortOrder: 8,
    items: [
      { name: 'Crème Brûlée', price: '7,30 €', description: 'mit Cremino Eis und Fruchtsauce', badge: '', sortOrder: 1 },
      { name: 'Apfel-Walnuss-Cheesecake', price: '7,30 €', description: '', badge: '', sortOrder: 2 },
      { name: 'Hot Fudge', price: '8,40 €', description: 'Warmer Schokoladen Brownie, karamellisierte Walnüsse, Vanille-Eis, weiße Schokoladensauce, Sahne', badge: '', sortOrder: 3 },
      { name: 'Limetten-Sorbet', price: '2,80 €', description: '', badge: '', sortOrder: 4 },
      { name: 'Mango-Sorbet', price: '2,80 €', description: '', badge: '', sortOrder: 5 },
      { name: 'Himbeer-Sorbet', price: '2,80 €', description: '', badge: '', sortOrder: 6 },
      { name: 'Caipi-Sorbet', price: '3,30 €', description: 'Limetten-Sorbet, Pitu, Zucker', badge: '', sortOrder: 7 },
      { name: 'Dreierlei Sorbet', price: '7,80 €', description: '', badge: '', sortOrder: 8 },
      { name: 'Vanille-Eis', price: '3,00 €', description: 'MaMa's Eismanufaktur', badge: '', sortOrder: 9 },
      { name: 'Schokoladeneis (vegan)', price: '3,00 €', description: 'MaMa's Eismanufaktur', badge: 'Vegan', sortOrder: 10 },
    ],
  },
  {
    name: 'Cocktails & Longdrinks', slug: 'cocktails', type: 'drink', sortOrder: 9,
    subtitle: 'Jeden Tag ab 21 Uhr Drinks für 7 Euro — Happy Hour!',
    items: [
      { name: 'Aperol Sour', price: '7,00 €', description: 'Aperol, Zitronensaft, Zuckersirup, Orangensaft — Happy Hour', badge: 'Happy Hour', sortOrder: 1 },
      { name: 'Cuba Libre', price: '7,00 €', description: 'Brauner Rum, Cola, Limettensaft — Happy Hour', badge: 'Happy Hour', sortOrder: 2 },
      { name: 'Gin Fizz', price: '7,00 €', description: 'Gin, Puderzucker, Zitronensaft, Soda — Happy Hour', badge: 'Happy Hour', sortOrder: 3 },
      { name: 'Mai Tai', price: '7,00 €', description: 'Brauner Rum, Limettensaft, Apricot Brandy, Mandelsirup — Happy Hour', badge: 'Happy Hour', sortOrder: 4 },
      { name: 'Moscow Mule', price: '7,00 €', description: 'Vodka, Limettensaft, Ginger Beer — Happy Hour', badge: 'Happy Hour', sortOrder: 5 },
      { name: 'Mojito', price: '7,00 €', description: 'Weißer Rum, Limettensaft, Zuckersirup, Minze — Happy Hour', badge: 'Happy Hour', sortOrder: 6 },
      { name: 'Raspberry Mojito', price: '7,00 €', description: 'Bacardi Razz, Limettensaft, Himbeersirup, Minze — Happy Hour', badge: 'Happy Hour', sortOrder: 7 },
      { name: 'Vanilla Passion', price: '7,00 €', description: 'Vodka, Zitronensaft, Vanillesirup, Maracujasaft — Happy Hour', badge: 'Happy Hour', sortOrder: 8 },
    ],
  },
  {
    name: 'Aperitif & Spritz', slug: 'aperitif', type: 'drink', sortOrder: 10,
    items: [
      { name: 'Aperol Spritz', price: '8,00 €', description: 'Aperol, Sekt, Soda', badge: '', sortOrder: 1 },
      { name: 'Lillet Wildberry', price: '8,00 €', description: 'Lillet, Schweppes Wildberry', badge: '', sortOrder: 2 },
      { name: 'Limoncello Spritz', price: '8,00 €', description: 'Limoncello, Zitronensaft, Sekt, Soda', badge: '', sortOrder: 3 },
      { name: 'Hugo', price: '8,00 €', description: 'Sekt, Holunderblütensirup, Soda', badge: '', sortOrder: 4 },
      { name: 'Campari Spritz', price: '8,00 €', description: 'Campari, Sekt, Soda', badge: '', sortOrder: 5 },
      { name: 'Bellini', price: '8,00 €', description: 'Pfirsichpüree, Sekt', badge: '', sortOrder: 6 },
      { name: 'Rosella Tonic', price: '8,00 €', description: 'Aperitif 1022 (Kirsch, Marille, Pfirsich), Tonic', badge: '', sortOrder: 7 },
      { name: 'Aperol Pink', price: '8,00 €', description: 'Aperol, Pink Grapefruit, Soda', badge: '', sortOrder: 8 },
      { name: 'Martini Bianco', price: '5,00 €', description: '', badge: '', sortOrder: 9 },
      { name: 'Cremant', price: '5,00 €', description: '0,1 l', badge: '', sortOrder: 10 },
      { name: 'Cremant Flasche', price: '30,00 €', description: '0,75 l', badge: '', sortOrder: 11 },
      { name: 'Sekt Alkoholfrei', price: '4,90 €', description: '', badge: 'Alkoholfrei', sortOrder: 12 },
    ],
  },
  {
    name: 'Biere', slug: 'biere', type: 'drink', sortOrder: 11,
    items: [
      { name: 'Bitburger Pils', price: '3,90 €', description: '0,3 l vom Fass', badge: '', sortOrder: 1 },
      { name: 'Potts Landbier', price: '3,90 €', description: '0,3 l vom Fass', badge: '', sortOrder: 2 },
      { name: 'Tango', price: '3,90 €', description: '0,3 l vom Fass', badge: '', sortOrder: 3 },
      { name: 'Benediktiner Hell', price: '3,90 €', description: '0,3 l vom Fass', badge: '', sortOrder: 4 },
      { name: 'Benediktiner Weizen', price: '3,90 €', description: '0,3 l vom Fass', badge: '', sortOrder: 5 },
      { name: 'Fassbier groß', price: '6,40 €', description: '0,5 l', badge: '', sortOrder: 6 },
      { name: 'Heineken', price: '3,20 €', description: '0,25 l Flasche', badge: '', sortOrder: 7 },
      { name: 'Pinkus Alt', price: '4,20 €', description: '0,33 l Flasche', badge: '', sortOrder: 8 },
      { name: 'Pinkus Special', price: '4,20 €', description: '0,33 l Flasche', badge: '', sortOrder: 9 },
      { name: 'TH. König Zwickel Kellerbier', price: '4,10 €', description: '0,33 l Flasche', badge: '', sortOrder: 10 },
      { name: 'Bitburger 0,0%', price: '4,10 €', description: '0,33 l alkoholfrei', badge: 'Alkoholfrei', sortOrder: 11 },
      { name: 'Benediktiner Weizen (alkoholfrei)', price: '6,20 €', description: '0,5 l', badge: 'Alkoholfrei', sortOrder: 12 },
    ],
  },
  {
    name: 'Softdrinks & Säfte', slug: 'softdrinks', type: 'drink', sortOrder: 12,
    items: [
      { name: 'Selters Classic', price: '3,40 €', description: '0,25 l', badge: '', sortOrder: 1 },
      { name: 'Selters Naturell', price: '3,40 €', description: '0,25 l', badge: '', sortOrder: 2 },
      { name: 'Selters Classic groß', price: '7,80 €', description: '0,75 l', badge: '', sortOrder: 3 },
      { name: 'Hausgemachter Eistee', price: '4,50 €', description: '0,4 l', badge: '', sortOrder: 4 },
      { name: 'Hausgemachte Limonade', price: '4,50 €', description: '0,4 l', badge: '', sortOrder: 5 },
      { name: 'Fruchtsaft klein', price: '3,20 €', description: '0,2 l — Apfel, Banane, Kirsch, Orange, Maracuja, Rhabarber', badge: '', sortOrder: 6 },
      { name: 'Fruchtsaft groß', price: '5,30 €', description: '0,4 l', badge: '', sortOrder: 7 },
      { name: 'liba-kola', price: '4,00 €', description: '0,33 l', badge: '', sortOrder: 8 },
      { name: 'liba-limo orange', price: '4,00 €', description: '0,33 l', badge: '', sortOrder: 9 },
      { name: 'Red Bull', price: '4,50 €', description: '', badge: '', sortOrder: 10 },
      { name: 'Ginger Beer', price: '3,20 €', description: '0,2 l', badge: '', sortOrder: 11 },
      { name: 'Bitter Lemon', price: '3,20 €', description: '0,2 l', badge: '', sortOrder: 12 },
    ],
  },
  {
    name: 'Weine', slug: 'weine', type: 'drink', sortOrder: 13,
    items: [
      { name: 'Sauvignon Blanc', price: '7,50 €', description: 'Weingut Keth, Rheinhessen — Stachelbeere und frisches Gras', badge: 'Weißwein', sortOrder: 1 },
      { name: 'Riesling trocken', price: '7,50 €', description: 'Weingut Thomas Bauer, Pfalz — intensive Fruchtaromen', badge: 'Weißwein', sortOrder: 2 },
      { name: 'Grauburgunder', price: '6,90 €', description: 'Weingut Thomas Bauer, Pfalz — Honigmelone und Trauben', badge: 'Weißwein', sortOrder: 3 },
      { name: 'Chardonnay & Weißburgunder', price: '7,50 €', description: 'Weingut Knipser, Pfalz', badge: 'Weißwein', sortOrder: 4 },
      { name: 'Lugana Ora DOC', price: '7,50 €', description: 'Weingut Perla del Garda, Italien — Weißer Pfirsich und Apfel', badge: 'Weißwein', sortOrder: 5 },
      { name: 'Cabernet Sauvignon', price: '6,90 €', description: 'Weingut Leeuwenkuil, Südafrika — Aromen roter Beeren', badge: 'Rotwein', sortOrder: 6 },
      { name: 'Garnacha', price: '7,50 €', description: 'Weingut Bodegas Borsao, Spanien — Kirsche und schwarze Beeren', badge: 'Rotwein', sortOrder: 7 },
      { name: 'Piluna Primitivo Salento', price: '7,50 €', description: 'Weingut Cantine de Castello, Apulien', badge: 'Rotwein', sortOrder: 8 },
      { name: 'Marqués de Castillo Rosado', price: '7,50 €', description: 'Weingut Cristo de la Vega, Spanien — Himbeere und Kirsche', badge: 'Rosé', sortOrder: 9 },
    ],
  },
  {
    name: 'Kaffee & Tee', slug: 'kaffee', type: 'drink', sortOrder: 14,
    items: [
      { name: 'Espresso', price: '3,00 €', description: '', badge: '', sortOrder: 1 },
      { name: 'Doppelter Espresso', price: '4,30 €', description: '', badge: '', sortOrder: 2 },
      { name: 'Espresso Macchiato', price: '3,20 €', description: '', badge: '', sortOrder: 3 },
      { name: 'Café Creme', price: '3,20 €', description: '', badge: '', sortOrder: 4 },
      { name: 'Cappuccino', price: '3,70 €', description: '', badge: '', sortOrder: 5 },
      { name: 'Latte Macchiato', price: '4,10 €', description: '', badge: '', sortOrder: 6 },
      { name: 'Dunkle Schokolade', price: '4,10 €', description: '', badge: '', sortOrder: 7 },
      { name: 'Friesentee', price: '3,40 €', description: '', badge: 'Tee', sortOrder: 8 },
      { name: 'Chai Tee', price: '3,40 €', description: '', badge: 'Tee', sortOrder: 9 },
      { name: 'Frische Minze', price: '3,40 €', description: '', badge: 'Tee', sortOrder: 10 },
    ],
  },
];

async function main() {
  console.log('Seeding menu...');

  for (const cat of seedData) {
    const existing = await db
      .select()
      .from(menuCategoriesTable)
      .where(eq(menuCategoriesTable.slug, cat.slug));

    let categoryId: number;

    if (existing.length > 0) {
      categoryId = existing[0].id;
      console.log(`  Category exists: ${cat.name} (id=${categoryId})`);
    } else {
      const [inserted] = await db
        .insert(menuCategoriesTable)
        .values({
          name: cat.name,
          slug: cat.slug,
          type: cat.type,
          sortOrder: cat.sortOrder,
          isVisible: true,
        })
        .returning();
      categoryId = inserted.id;
      console.log(`  Created category: ${cat.name} (id=${categoryId})`);
    }

    const existingItems = await db
      .select()
      .from(menuItemsTable)
      .where(eq(menuItemsTable.categoryId, categoryId));

    if (existingItems.length === 0) {
      for (const item of cat.items) {
        await db.insert(menuItemsTable).values({
          categoryId,
          name: item.name,
          description: item.description,
          price: item.price,
          badge: item.badge,
          sortOrder: item.sortOrder,
          isAvailable: true,
        });
      }
      console.log(`  Seeded ${cat.items.length} items for ${cat.name}`);
    } else {
      console.log(`  Items already exist for ${cat.name}, skipping`);
    }
  }

  console.log('Done!');
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
