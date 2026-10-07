# Tagesausflug Prag

Interaktiver Reisebegleiter für einen Tagesausflug mit dem **EuroCity von Dresden nach Prag**. Der Freitagsplan ist um gespeicherte Lieblingsorte gebaut: Antiquariat Dlážděná, Burger bei Naše maso, Astronomische Uhr, Kloster Strahov und Prager Burg, Malatang-Snack, Sonnenuntergang im Riegrovy sady und Abendessen bei U Houdků.

Live: <https://le-martin.github.io/ausflug-prag/>

> ⚠ **Das Deutschlandticket gilt im EC nach Prag nicht** – ein eigenes Ticket ist nötig (z. B. DB Sparpreis Europa).
>
> **Geplant für Freitag, 9. Oktober 2026** (`TRIP_DATE` in `js/data.js`): Countdown, Reisemodus und Wetter beziehen sich auf diesen Tag, saisonale Öffnungszeiten werden aus dem Reisedatum berechnet. Hinfahrt laut Suchergebnis: **Railjet RJ 257, Dresden Hbf 08:10 → Praha hl. n. 10:27**. Die **Rückfahrt ist noch nicht bestätigt** – beides vor der Buchung im DB Navigator prüfen. Für einen anderen Tag `TRIP_DATE` ändern (`null` = Beispielplan für „heute“).
>
> **Zwei Tagespläne** (Umschalter über der Timeline): *Früh* mit RJ 257 ab 08:10 und *Später* mit Abfahrt ca. 10:10 (unbestätigt; gefunden wurden Railjets um 09:10 und 11:10) – ohne Malatang, Strahov und Burg im Eiltempo. Definiert über `plans` und `planList` in `js/data.js`.

## Funktionen

Wie beim [Oberlausitz-Reisebegleiter](../ausflug-oberlausitz/): Tages-Timeline, Karten je Bereich, Sehenswürdigkeiten mit Öffnungs-Ampel, „besucht“-Häkchen und Favoriten, Essen & Cafés, Verbindungen (EC, Tram 22, Metro) mit Countdown, Reisemodus mit Zeitsimulation, Wetter, Hell/Dunkel, Deutsch/Englisch/Koreanisch (`?lang=de|en|ko`).

## Struktur

```
ausflug-prag/
├── index.html           # Seitengerüst (Bereiche: altstadt, burg, vinohrady)
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
- **Sonnenuntergang** am 9.10.2026 ca. 18:25 Uhr (noch Sommerzeit; Zeitumstellung am 25.10.).
- **Laut Google Maps** (vom Nutzer übermittelt): Zubang 11:45–16 und 17–22, Malatang No.1 11–22, K-Remember 11–21:30 Uhr; Adressen Budvarka (Wuchterlova 336/22) und U Houdků (Bořivojova 693/110).
- **Noch unsicher** (in der App als „prüfen“ markiert): Öffnungszeiten von U Houdků und The Kimchi; K-Remember ist laut Eintrag vietnamesisch/vegetarisch.
- **Nicht aufgenommen**, weil keine Adresse gefunden wurde: *Coffee Star Origins & Blends* und *K-Food* (koreanischer Lebensmittelladen).

> Bitte am Reisetag aktuelle Abfahrtszeiten und Öffnungszeiten prüfen.
