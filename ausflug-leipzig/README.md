# Tagesausflug Leipzig

Interaktiver Reisebegleiter für einen Tagesausflug mit der Bahn von **Dresden nach Leipzig**: Innenstadt, Völkerschlachtdenkmal und Plagwitz (Karl-Heine-Kanal). Mit dem RE50 und den Leipziger Straßenbahnen gilt durchgehend das Deutschlandticket.

Live: <https://le-martin.github.io/ausflug-leipzig/>

> ⚠ Es gibt **kein festes Reisedatum**: Der Tagesplan ist ein **Beispielablauf** (Di–Sa gedacht), Öffnungs-Ampel, Reisemodus und Wetter beziehen sich immer auf den **heutigen Tag**. Alle Fahrzeiten sind Beispielzeiten – die passende Abfahrt im DB Navigator bzw. in der LVB-App wählen.

## Funktionen

Wie beim [Oberlausitz-Reisebegleiter](../ausflug-oberlausitz/): Tages-Timeline, Karten (Leaflet + OpenStreetMap) je Bereich, Sehenswürdigkeiten mit Öffnungs-Ampel, „besucht“-Häkchen und Favoriten, Essen & Cafés, Verbindungen mit Countdown, Reisemodus mit Zeitsimulation, Wetter (Open-Meteo), Hell/Dunkel, Deutsch/Englisch/Koreanisch (`?lang=de|en|ko`).

## Struktur

```
ausflug-leipzig/
├── index.html           # Seitengerüst (Bereiche: zentrum, voelkerschlacht, plagwitz)
├── css/style.css        # Gestaltung (wie Oberlausitz, Hero mit Farbverlauf statt Foto)
├── js/data.js           # ALLE Inhalte (Deutsch): Bereiche, Orte, Öffnungszeiten, Essen, Verbindungen, Tagesplan
├── js/i18n.js           # Oberflächentexte (common + trip) und EN/KO-Übersetzungen
├── js/walks.js          # leer – Gehzeiten stehen als Text in data.js
├── js/app.js            # datengetriebene App-Logik (identisch mit ausflug-prag/js/app.js)
└── tools/check-i18n.js  # prüft, ob alle Texte übersetzt sind
```

## Daten pflegen

- `areas`: Bereiche mit `key` (= `city` der Orte), Suchstadt für Google Maps (`q`) und Kartenausschnitt (`view`)
- `hours(...)`: Öffnungszeiten für die Ampel; saisonale Zeiten (z. B. Völkerschlachtdenkmal Nov–März bis 16 Uhr) werden über `SUMMER` aus dem aktuellen Monat berechnet
- `connections` + `connOrder`: Verbindungen und ihre Reihenfolge/Beschriftung; `mapLines`: schematische Linien auf der Übersichtskarte
- Nach Änderungen: `node tools/check-i18n.js`

## Datenstand

Recherche: **07.10.2026**, über Suchergebnisse (Direktabrufe waren gesperrt). Koordinaten sind auf ca. 50–100 m genau, Fotos fehlen bewusst (keine geprüften Bildquellen). Wichtige Befunde:

- **RE50** Dresden Hbf – Leipzig Hbf stündlich, ca. 1:45 h, hält auch in Dresden Mitte und Dresden-Neustadt; IC/ICE schneller (ca. 1:05 h), aber nicht mit Deutschlandticket.
- **Zum Arabischen Coffe Baum** ist seit 1. Juli 2025 wieder geöffnet.
- **Stadtgeschichtliches Museum (Altes Rathaus)**: Dauerausstellung inzwischen kostenlos; montags geschlossen (ebenso Bach-Museum und Zeitgeschichtliches Forum).
- **Spinnerei-Galerien**: Di–Sa 11–18 Uhr, So/Mo geschlossen – daher optional.
- Der Thüringer Hof wurde wegen eines Insolvenzantrags (2025) nicht aufgenommen.

> Bitte am Reisetag aktuelle Abfahrtszeiten und Öffnungszeiten prüfen.
