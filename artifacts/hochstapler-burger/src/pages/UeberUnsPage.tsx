import { motion, type Variants, type Easing } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import meatSourcing from "@/assets/images/meat-sourcing.png";
import cheeseSourcing from "@/assets/images/cheese-sourcing.png";
import interiorBar from "@/assets/images/interior-bar.png";

const ease: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function UeberUnsPage() {
  return (
    <MainLayout>
      <SEO
        title="Über uns"
        description="Lerne das Hochstapler Burger kennen — unsere Geschichte, unser Fleisch aus artgerechter Haltung und unser Bio-Käse aus der Hafenkäserei Münster."
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
            Restaurant Hochstapler
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-primary-foreground"
          >
            Über uns
          </motion.h1>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Unsere Geschichte</p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
                Ehrliches Burger-Handwerk
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Wir treten an, um Dir am Hafen einzigartiges und ehrliches Burger-Handwerk zu
                servieren. Produkte aus verantwortungsvoller – möglichst regionaler – Erzeugung,
                frische Zubereitung und eigenes Wolfen kombiniert mit kreativen Rezepten und
                100% Burger-Know-How.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Die Hochstapler Burgerschmiede ist Dein Anlaufpunkt am Hafen von Münster.
                Mit Bar und chilligem Lounge-Bereich und 140 bis 200 Plätzen – je nach Saison –
                drinnen und draußen empfangen wir Euch gerne zu Burger und Drinks.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Kulinarische Erfahrungen, die unser Team auf der ganzen Welt gesammelt hat,
                lassen wir in unsere Kreationen einfließen. Sie sorgen für einzigartige und
                abwechslungsreiche Burger, die Dich und Deine Freunde begeistern werden.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="overflow-hidden h-[500px]"
            >
              <img
                src={interiorBar}
                alt="Bar und Lounge im Restaurant Hochstapler am Hafen Münster"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* MEAT SOURCING */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="overflow-hidden h-[480px] lg:order-1"
            >
              <img
                src={meatSourcing}
                alt="Rindfleisch aus artgerechter Haltung von Vit's Twente"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="lg:order-2"
            >
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Das Fleisch</p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
                Artgerecht. Regional. Frisch.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Unser Streben, artgerechte Haltung, hohe Qualität und kontinuierliche
                Verfügbarkeit zu vereinen, führte uns kurz hinter die niederländische Grenze
                nach Twente. Das Fleisch für unsere Patties von Vit's Twente beziehen wir
                über die Münsteraner Metzgerei Philipp Büning.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Vit's Rindfleisch ist von allerbester Qualität – superzart, mit einer feinen
                Struktur und herrlichem Geschmack. Die Tiere werden in großen, tierfreundlichen
                Ställen auf einer dicken Strohschicht gehalten. Während der Sommermonate laufen
                die Rinder auf Wiesen und Weiden.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Die Schlachtung erfolgt in einem kleinen Schlachthaus in unmittelbarer Nähe zum
                Aufzuchtsort – kurze Transportwege für die Tiere. Das Fleisch kommt frisch am
                Stück zu uns. Das Wolfen und die Zubereitung der Patties nehmen wir
                <strong className="text-primary"> täglich selbst vor</strong>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CHEESE SOURCING */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Der Käse</p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
                Handwerk aus der Nachbarschaft
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Unsere Nachbarn von der anderen Hafenseite beliefern uns mit Käse.
                Die <strong className="text-primary">Hafenkäserei</strong> setzt auf echtes
                Handwerk und produziert Bio-Käse mitten in Münster, direkt am Wasser,
                in ihrem Schaubetrieb.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Unsere Kreationen werden durch drei besondere Sorten bereichert:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    name: "Der Fröhliche Fähnrich",
                    desc: "Herzhaft-würziger Bio-Käse — unser meistgenutzter Klassiker auf dem Hochstapler-Burger.",
                  },
                  {
                    name: "Käpt'n Pauli",
                    desc: "Milder, cremiger Bio-Käse — perfekt für den All American und den Big Daddy.",
                  },
                  {
                    name: "Goldschatz",
                    desc: "Fein-würziger Käse für Raspeln — bringt den Mediterrano auf ein neues Niveau.",
                  },
                ].map((cheese) => (
                  <li key={cheese.name} className="flex gap-4">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-primary">{cheese.name}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{cheese.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="overflow-hidden h-[480px]"
            >
              <img
                src={cheeseSourcing}
                alt="Bio-Käse von der Hafenkäserei Münster"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground">Unsere Werte</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              { title: "Qualität", desc: "Frische, hochwertige Zutaten. Kein Kompromiss." },
              { title: "Regionalität", desc: "Möglichst kurze Wege — vom Erzeuger direkt zu Dir." },
              { title: "Handwerk", desc: "Täglich frisch gewolft. Eigene Saucen. Echtes Burger-Know-How." },
            ].map((val) => (
              <motion.div
                key={val.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
                <h3 className="font-serif text-2xl text-accent mb-3">{val.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
