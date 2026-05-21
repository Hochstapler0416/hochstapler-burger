import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/images/logo-weiss.png";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/specials", label: "Specials" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-md py-2"
          : "bg-primary py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Hochstapler Burger Logo"
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location === link.href
                    ? "text-accent"
                    : "text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-accent text-primary font-bold hover:bg-accent/90"
            >
              <Link href="/reservierung">
                Reservierung anfragen
              </Link>
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[400px] border-t border-primary-border/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 py-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium py-2 transition-colors ${
                location === link.href
                  ? "text-accent"
                  : "text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-accent text-primary font-bold mt-2 w-full"
          >
            <Link href="/reservierung">
              Reservierung anfragen
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
