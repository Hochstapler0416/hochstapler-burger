# Hochstapler Burger: Wiederherstellung auf Render

## Stand

Die Vorbereitung liegt im Zweig `render-wiederherstellung`. Der ursprüngliche
Hauptzweig bleibt unverändert. Es wurden noch keine Render-Dienste angelegt.
Die neue Anwendung liefert Website, Adminbereich und API gemeinsam aus.
PostgreSQL speichert die Speisekarte; ein persistenter Datenträger speichert
neu hochgeladene JPG-, PNG- und WebP-Bilder bis 5 MB. Der alte Replit-Bildspeicher
wird in den aktiven Routen nicht mehr verwendet.

## Kosten vor dem Anlegen bestätigen

Die Datei `render.yaml` ist eine Vorlage für **kostenpflichtige** Dienste.
Nicht ohne Kostenfreigabe anwenden.

- Webdienst `0.5c-512mb`: 7 USD/Monat.
- PostgreSQL `0.1c-256mb`: 6 USD/Monat; exakt 1 GB anlegen.
- Datenbankspeicher vorsichtshalber mit 0,30 USD/GB/Monat kalkulieren.
- Upload-Datenträger: 1 GB, 0,25 USD/Monat.
- Ausgangsrahmen: rund 14 USD/Monat; keine Garantie für eine Gesamtkostengrenze.
- Steuern, zusätzlicher Traffic, Build-Minuten, externe Sicherungen,
  Domain, E-Mail und ggf. bestehendes resmio-Abonnement sind gesondert zu prüfen.
- Hobby-Workspace genügt für einen einzelnen Verwalter; kein Pro-Workspace nötig.
- Tarife, Speicher und Bestellübersicht am Tag der Freigabe erneut prüfen.
  Die PostgreSQL-Voreinstellung kann deutlich mehr als 1 GB vorsehen.

Alle Dienste gehören nach Frankfurt. DNS und E-Mail bei Host Europe zunächst
beibehalten. Eine Domainumstellung erfolgt erst nach vollständigem Funktionstest.

## Voraussetzungen und Start

Node.js 24.16.0; pnpm 11.25.0 (im `packageManager`-Feld festgelegt).
Der Build benötigt auch Entwicklungsabhängigkeiten:

```sh
pnpm install --frozen-lockfile --prod=false
pnpm run build:render
```

Render Build Command:
`pnpm install --frozen-lockfile --prod=false && pnpm run build:render`

Render Pre-deploy Command: `pnpm run db:migrate`

Render Start Command: `pnpm start`

Root Directory bleibt leer (gesamtes Monorepo). Der Dienst verwendet Render PORT.
Healthcheck: `/api/readyz` prüft zusätzlich eine Datenbankverbindung.

## Geschützte Konfiguration

Keine echten Passwörter oder Verbindungsadressen in GitHub eintragen.

- `DATABASE_URL`: interne PostgreSQL-Verbindung vom neuen Hoster.
- `NODE_ENV=production`.
- `SESSION_SECRET`: mindestens 32 zufällige Zeichen, zwingend erforderlich.
- `ADMIN_PASSWORD`: neues starkes Passwort, mindestens 12 Zeichen.
- `UPLOAD_DIR=/var/data/uploads`, Datenträger bei `/var/data` einhängen.
- `BASE_PATH=/` beim Build.
- Node-Version über `NODE_VERSION=24.16.0`.

E-Mail wird bewusst erst nach Klärung des bestehenden Postfaches eingerichtet:

- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`.
- `SMTP_PORT=587`: STARTTLS wird verlangt.
- `SMTP_PORT=465`: TLS ab Verbindungsaufbau.
- Der historische Hinweis ist `smtp.server-he.de`; mit Host Europe abgleichen.
- Der aktive Empfänger heißt **CONTACT_TO**, nicht SMTP_TO.
- Fehlen Werte, liefert das Formular einen Fehler statt einer falschen
  Erfolgsmeldung. Kontakt und Gruppenreservierungsanfrage verwenden denselben Versand.

## Datenbank einrichten

Es gibt eine versionierte Ausgangsmigration unter `lib/db/drizzle`. Sie beschreibt
die drei Tabellen menu_categories, menu_items und specials.

```sh
pnpm run db:migrate
pnpm run db:seed
```

Den Seed nur einmal bewusst auf der neuen leeren Datenbank starten. Er enthält
14 Kategorien und 135 Gerichte/Getränke. Die vorhandene Skip-Logik verhindert
Duplikate beim erneuten Ausführen, aktualisiert aber keine vorhandenen Einträge.
Es ist kein Abgleich mit der zuletzt auf dem gelöschten VPS verwendeten Karte.
Preise und Verfügbarkeit vor der Veröffentlichung bestätigen.
Monatsangebote sind nicht im Seed enthalten und müssen neu eingetragen werden.
Die englische Karte wird bislang separat im Frontend gepflegt.

Kein `push-force`, kein Tabellenlöschen und kein Seed bei jedem Serverstart.
Die dauerhafte Datenträger-Dateistruktur muss zusammen mit der Datenbank
gesichert werden, da die Datenbank nur Foto-URLs enthält.

## Durchgeführte Prüfungen

`pnpm run build:render`: Typprüfungen und Produktions-Build von Website und API.

`pnpm run test:recovery`: benötigt lokal initdb, pg_ctl, psql, pg_dump,
createdb und pg_restore. Erstellt ausschließlich einen neuen temporären
PostgreSQL-Cluster auf 127.0.0.1; benutzt keine vorhandene Datenbank.
Alle Testdaten werden nach dem Lauf wieder entfernt.

Geprüft:
1. Migration und Seed jeweils zweimal: 14 Kategorien, 135 Einträge.
2. Website und direkte Unterseiten, lokales Logo, getrennte API-404-Antworten.
3. Adminanmeldung, Passwortprüfung und Zurückweisung einer fremden Rolle.
4. Anlegen/Ändern/Ausblenden/Löschen von Gerichten, Kategorien und Specials.
5. Bildupload nur als Admin, Typ- und Größenprüfung, kein Überschreiben,
   Bild bleibt nach Anwendungsneustart erreichbar.
6. Kontakteingaben werden geprüft; ohne SMTP-Konfiguration kein Versand.
7. Datenbankexport und Rücksicherung in eine zweite isolierte Testdatenbank.
8. Begrenzung wiederholter Anmeldeversuche.

Zusätzlich wurde die Speise-/Getränkekarte im lokalen Browser geprüft.
Bisher auf macOS mit Node 24.16.0 geprüft; ein tatsächlicher Build und
Funktionstest auf Render/Linux steht noch aus. Der Build meldet Hinweise
zu Quellkarten zweier UI-Bibliotheksdateien und zur Bundlegröße; er läuft durch.

## Vor der Domainfreigabe noch offen

- Wiederherstellungszweig auf Render bereitstellen und Seed bewusst einspielen.
- Neues Adminpasswort und Sitzungsschlüssel geschützt hinterlegen.
- Bildpersistenz nach echtem Render-Deploy und Neustart prüfen.
- SMTP-Konto bestätigen und nach Versandauftrag Testnachrichten bis zum
  richtigen Posteingang nachweisen.
- Das vorhandene externe resmio-Konto und die Einbindung prüfen.
- Datenschutzerklärung nennt noch Replit; an den tatsächlichen Betrieb und die
  verwendeten Dienste anpassen und inhaltlich prüfen lassen.
- Öffnungszeiten, Anschrift, Preise, englische Karte und übrige Inhalte prüfen.
- Datenbankexport und Fotos regelmäßig zusätzlich außerhalb des Hostingkontos
  sichern; Rücksicherung auch aus einer echten Betriebssicherung prüfen.
- DNS-Zustand sichern, dann nur die Website-Einträge nach Freigabe ändern.
  Mail-DNS-Einträge und Postfächer erhalten; www/HTTPS/Weiterleitung testen.

Einzelne Webinstanz mit Datenträger: bei Deploys sind kurze Unterbrechungen
möglich. Die Anmelde-/Upload-/Kontaktbegrenzung arbeitet im Arbeitsspeicher
dieser einen Instanz und ist vor einer Skalierung gemeinsam zu speichern.

