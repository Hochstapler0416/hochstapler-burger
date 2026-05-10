import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logoWeiss from "@/assets/images/logo-weiss.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-border/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block mb-2">
              <img
                src={logoWeiss}
                alt="Hochstapler Burger Logo"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Echte Burgerliebe am Hafen. Handgemachte Craft Burger, regionales Fleisch und bester Bio-Käse aus Münster.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* [PLACEHOLDER] Social Links */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sidebar-border flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sidebar-border flex items-center justify-center hover:bg-accent hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-accent">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent mt-1 flex-shrink-0" size={18} />
                <span className="text-muted-foreground">Hafenweg 8<br />48155 Münster</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent flex-shrink-0" size={18} />
                <span className="text-muted-foreground">+49 251 287 46 555</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent flex-shrink-0" size={18} />
                <a href="mailto:info@hochstapler-burger.de" className="text-muted-foreground hover:text-accent transition-colors">info@hochstapler-burger.de</a>
              </li>
            </ul>
          </div>

          {/* Hours Col */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-accent">Öffnungszeiten</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Mo – Do</span>
                <span>16:00 – 00:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Freitag</span>
                <span>16:00 – 02:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Samstag</span>
                <span>13:00 – 02:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sonntag</span>
                <span>13:00 – 22:00</span>
              </li>
            </ul>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-accent">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-accent transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-accent transition-colors">Datenschutz</Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-accent transition-colors">Kontakt</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-primary-border/20 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Hochstapler Burger. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
