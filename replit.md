# Hochstapler Burger Website

Professionelle Restaurant-Webseite für hochstapler-burger.de — vollständig responsiv, mobile-first, SEO-optimiert, mit 7 Seiten, echtem Content und Markenbild.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API-Server starten (Port 8080)
- `PORT=8082 BASE_PATH=/ pnpm --filter @workspace/hochstapler-burger run dev` — Frontend starten (Port 8082)
- `pnpm run typecheck` — vollständiger TypeScript-Check aller Pakete
- `pnpm run build` — typecheck + build alle Pakete
- `pnpm --filter @workspace/hochstapler-burger run build` — Produktions-Build der Website

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7 + Tailwind CSS v4
- Routing: wouter
- Animationen: framer-motion
- Formulare: react-hook-form + zod
- SEO: react-helmet-async + JSON-LD Schema
- API: Express 5 (für zukünftige Backend-Funktionen)
- DB: PostgreSQL + Drizzle ORM (bereitgestellt, noch nicht verwendet)

## Where things live

- `artifacts/hochstapler-burger/src/pages/` — 7 Seiten: HomePage, SpeisekartePage, UeberUnsPage, GaleriePage, KontaktPage, ImpressumPage, DatenschutzPage
- `artifacts/hochstapler-burger/src/components/layout/` — Navbar, Footer, MainLayout
- `artifacts/hochstapler-burger/src/components/SEO.tsx` — SEO-Komponente
- `artifacts/hochstapler-burger/src/assets/images/` — KI-generierte Restaurant-Bilder
- `artifacts/hochstapler-burger/src/index.css` — Farbthema, Fonts (Open Sans + Playfair Display)
- `artifacts/hochstapler-burger/index.html` — JSON-LD Restaurant Schema
- `artifacts/hochstapler-burger/public/robots.txt` — robots.txt
- `artifacts/hochstapler-burger/public/sitemap.xml` — Sitemap

## Architecture decisions

- Rein statisches Frontend (kein Backend benötigt) — Kontaktformular zeigt Erfolgsmeldung ohne E-Mail-Versand
- Wouter statt React Router (leichtgewichtiger für SPA ohne SSR)
- Tailwind CSS v4 mit HSL Custom Properties für konsistentes Theming
- Framer Motion mit korrekt typisierten Easing-Werten (`const ease: Easing = "easeOut"`)
- Der Workflow "Hochstapler Burger" (eigenständig) startet den Dev-Server — der artifact-managed Workflow "artifacts/hochstapler-burger: web" schlägt fehl aufgrund eines Port-Erkennungsproblems in Replit

## Product

Professionelle Restaurant-Website mit: Startseite (Hero + Menühighlights + Kundenbewertungen), Speisekarte (mit Kategorien-Tabs), Über uns (Geschichte, Fleisch & Käse-Herkunft), Galerie (Lightbox), Kontakt (Formular + Karte), Impressum, Datenschutzerklärung.

## User preferences

- Sprache der Website: Deutsch (alles auf Deutsch halten)
- Branding: Grün (#75D69C) + Coral (#FE6C61), Fonts Open Sans + Playfair Display
- Logo: https://hochstapler-burger.de/wp-content/uploads/2021/04/Logo_sticky.png

## Gotchas

- **Workflow-Problem**: Der artifact-managed Workflow "artifacts/hochstapler-burger: web" schlägt immer mit DIDNT_OPEN_A_PORT fehl, obwohl Vite korrekt startet. Verwende stattdessen den "Hochstapler Burger" Workflow (eigenständig, kein Port-Health-Check).
- **Öffnungszeiten**: In KontaktPage.tsx als [PLACEHOLDER] markiert — bitte mit dem Restaurant bestätigen
- **Kontaktformular**: Nur client-seitig, kein E-Mail-Versand. Für echten E-Mail-Versand wäre ein Backend + SMTP-Service nötig.
- **Framer Motion Typing**: Easing-Werte immer als `const ease: Easing = "easeOut"` definieren, nicht als inline-String

## Pointers

- Siehe `pnpm-workspace` Skill für Workspace-Struktur
- Port: Hochstapler-Burger läuft auf Port 8082, API-Server auf 8080, Mockup-Sandbox auf 8081
