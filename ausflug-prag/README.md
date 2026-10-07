# Tagesausflug Prag

Interaktiver Reisebegleiter für einen Tagesausflug mit dem **EuroCity von Dresden nach Prag**: Altstadt mit Astronomischer Uhr und Karlsbrücke, Kleinseite und Prager Burg.

Live: <https://le-martin.github.io/ausflug-prag/>

> ⚠ **Das Deutschlandticket gilt im EC nach Prag nicht** – ein eigenes Ticket ist nötig (z. B. DB Sparpreis Europa). Es gibt **kein festes Reisedatum**: Der Tagesplan ist ein **Beispielablauf**, Öffnungs-Ampel, Reisemodus und Wetter beziehen sich immer auf den **heutigen Tag**. Alle Fahrzeiten sind Beispielzeiten.

## Funktionen

Wie beim [Oberlausitz-Reisebegleiter](../ausflug-oberlausitz/): Tages-Timeline, Karten je Bereich, Sehenswürdigkeiten mit Öffnungs-Ampel, „besucht“-Häkchen und Favoriten, Essen & Cafés, Verbindungen (EC, Tram 22, Metro) mit Countdown, Reisemodus mit Zeitsimulation, Wetter, Hell/Dunkel, Deutsch/Englisch/Koreanisch (`?lang=de|en|ko`).

## Struktur

```
ausflug-prag/
├── index.html           # Seitengerüst (Bereiche: altstadt, burg)
├── css/style.css        # Gestaltung (Hero mit Farbverlauf)
├── js/data.js           # ALLE Inhalte (Deutsch), inkl. monatsabhängiger Öffnungszeiten
├── js/i18n.js           # Oberflächentexte (common + trip) und EN/KO-Übersetzungen
├── js/walks.js          # leer – Gehzeiten stehen als Text in data.js
├── js/app.js            # datengetriebene App-Logik (identisch mit ausflug-leipzig/js/app.js)
└── tools/check-i18n.js  # prüft, ob alle Texte übersetzt sind
```

## Daten pflegen

Viele Prager Öffnungszeiten wechseln monatlich. `data.js` berechnet sie beim Laden aus dem aktuellen Datum (`POWDER`, `JEWISH`, `NICHOLAS`, `CASTLE_CLOSE`, `SUMMER`). Bei neuen Saisonzeiten dort anpassen und anschließend `node tools/check-i18n.js` ausführen.

## Datenstand

Recherche: **07.10.2026**, über Suchergebnisse (Direktabrufe waren gesperrt). Koordinaten sind auf ca. 50 m genau, Fotos fehlen bewusst. Wichtige Befunde:

- **EuroCity** Dresden Hbf – Praha hl. n. etwa alle 2 Stunden, ca. 2:15–2:30 h, hält auch in Dresden-Neustadt; Reservierung meist freiwillig, in den Sommern 2024/2025 zeitweise Pflicht.
- **Prager Burg**: Areal 6–22 Uhr kostenlos, Gebäude Sommer 9–17, Winter 9–16 Uhr; Sicherheitskontrolle an allen Eingängen. Ticketpreis („Main Circuit“ ca. 450 CZK) auf hrad.cz prüfen.
- **Veitsdom** sonntags erst ab 12 Uhr.
- **Jüdisches Museum** samstags und an jüdischen Feiertagen geschlossen.
- **Trdelník** ist entgegen der Werbung kein traditionell tschechisches Gebäck.
- Bezahlt wird in **Kronen (CZK)**; bei Kartenzahlung immer in CZK zahlen.

> Bitte am Reisetag aktuelle Abfahrtszeiten und Öffnungszeiten prüfen.
