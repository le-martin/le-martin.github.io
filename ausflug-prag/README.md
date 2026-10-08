# Tagesausflug Prag

Interaktiver Reisebegleiter für einen Tagesausflug mit dem **EuroCity von Dresden nach Prag**. Der Freitagsplan ist um gespeicherte Lieblingsorte gebaut: Antiquariat Dlážděná, Burger bei Naše maso, Astronomische Uhr, Kloster Strahov und Prager Burg, Malatang-Snack, Sonnenuntergang im Riegrovy sady und Abendessen bei U Houdků.

Live: <https://le-martin.github.io/ausflug-prag/>

> ⚠ **Das Deutschlandticket gilt im EC nach Prag nicht** – ein eigenes Ticket ist nötig (z. B. DB Sparpreis Europa).
>
> **Geplant für Freitag, 9. Oktober 2026** (`TRIP_DATE` in `js/data.js`): Countdown, Reisemodus und Wetter beziehen sich auf diesen Tag, saisonale Öffnungszeiten werden aus dem Reisedatum berechnet. Für einen anderen Tag `TRIP_DATE` ändern (`null` = Beispielplan für „heute“).
>
> **Zwei Tagespläne** (Umschalter über der Timeline, `plans` + `planList` in `js/data.js`):
> - *Früh*: **EC 459** Dresden Hbf 07:08 → Praha hl. n. 09:25 – alle Wunschorte.
> - *Später*: **RJ 171** 09:10 → 11:25 – Teynkirche nur von außen, Burg kurz und kostenlos. Eine Direktverbindung um 10:10 gibt es nicht.
> - Rückfahrt in beiden Plänen: **RJ 170** Praha hl. n. 20:47 → Dresden Hbf 23:19 – der letzte sinnvolle Direktzug am selben Abend; um 20:00 bei U Houdků aufbrechen.
>
> Die Zugzeiten für den 9.10.2026 wurden am 8.10.2026 direkt bei ČD geprüft. Metro- und Tramzeiten sind ungeprüfte Beispielzeiten und tragen „ca.“; nur bestätigte Zugfahrplanzeiten erhalten Abfahrts-Countdowns. Aktuellen Betrieb vor Abfahrt prüfen.

## Funktionen

Wie beim [Oberlausitz-Reisebegleiter](../ausflug-oberlausitz/): Tages-Timeline, Karten je Bereich, Sehenswürdigkeiten mit Öffnungs-Ampel, „besucht“-Häkchen und Favoriten, Essen & Cafés, Verbindungen (EC, Tram 22, Metro) mit Countdown, Reisemodus mit Zeitsimulation, Wetter, Hell/Dunkel, Deutsch/Englisch/Koreanisch (`?lang=de|en|ko`).

## Struktur

```
ausflug-prag/
├── index.html           # Seitengerüst (Bereiche: altstadt, burg, vinohrady)
├── css/style.css        # Gestaltung und responsive Fotodarstellung
├── js/data.js           # ALLE Inhalte (Deutsch), inkl. monatsabhängiger Öffnungszeiten
├── js/i18n.js           # Oberflächentexte (common + trip) und EN/KO-Übersetzungen
├── js/walks.js          # leer – Gehzeiten stehen als Text in data.js
├── js/app.js            # datengetriebene App-Logik (identisch mit ausflug-leipzig/js/app.js)
└── tools/check-i18n.js  # prüft, ob alle Texte übersetzt sind
```

## Daten pflegen

Viele Prager Öffnungszeiten wechseln monatlich. `data.js` berechnet sie beim Laden aus dem aktuellen Datum (`POWDER`, `JEWISH`, `NICHOLAS`, `CASTLE_CLOSE`, `SUMMER`). Bei neuen Saisonzeiten dort anpassen und anschließend `node tools/check-i18n.js` ausführen.

## Datenstand

Verkehrsdaten: **08.10.2026**, anhand offizieller ČD-, PID- und DPP-Quellen geprüft. Öffnungszeiten und Ortsangaben: Recherche vom **07.10.2026**. Koordinaten sind auf ca. 50 m genau. Die Ortskarten und das Titelbild verwenden lokal gespeicherte, frei lizenzierte Fotos. Wichtige Befunde:

- **Züge am 9.10.2026**: EC 459 07:08–09:25, RJ 171 09:10–11:25 (09:07 ist die Ankunft in Dresden), RJ 170 zurück 20:47–23:19. Reservierung möglich, nicht verpflichtend. DB Super Sparpreis Europa ab 14,99 € nach Verfügbarkeit, kein bestätigter Fahrtpreis.
- **Bauarbeiten Roudnice nad Labem–Hrobce** bis 16.10.2026: bis zu 5 Minuten zusätzliche Verspätung. Keine bestätigte spätere Rückfallverbindung.
- **Metro A Malostranská → Můstek**: zwei Stationen über Staroměstská.
- **Prager Burg**: Areal 6–22 Uhr kostenlos, Gebäude Sommer 9–17, Winter 9–16 Uhr; Sicherheitskontrolle an allen Eingängen. Ticketpreis („Main Circuit“ ca. 450 CZK) auf hrad.cz prüfen.
- **Veitsdom** sonntags erst ab 12 Uhr.
- **Jüdisches Museum** samstags und an jüdischen Feiertagen geschlossen.
- **Trdelník** ist entgegen der Werbung kein traditionell tschechisches Gebäck.
- Bezahlt wird in **Kronen (CZK)**; bei Kartenzahlung immer in CZK zahlen.
- **Sonnenuntergang** am 9.10.2026 um 18:24 Uhr (eigene Berechnung, timeanddate: 18:23), hinter dem Burghügel einige Minuten früher; bürgerliche Dämmerung bis ca. 18:57. Noch Sommerzeit (Umstellung am 25.10.).
- **PID-Tarif**: 30 Min. 36 CZK (App) / 39 CZK (Papier), 90 Min. 46 / 50 CZK, 24 Std. 140 / 150 CZK. Für Metro + Tram nach Strahov bietet das 90-Minuten-Ticket mehr Puffer. App-Ticket aktivieren und eine Minute vor Einstieg/Metrozugang warten; Papierfahrschein vor der ersten Fahrt einmal entwerten.
- **Teynkirche**: freitags Messe um 15 Uhr, währenddessen keine Besichtigung.
- **Laut Google Maps** (vom Nutzer übermittelt): Zubang 11:45–16 und 17–22, Malatang No.1 11–22, K-Remember (vietnamesisch) 11–21:30, U Houdků 11–24, The Kimchi freitags 11–15 und 16:30–21 Uhr; Adressen Budvarka (Wuchterlova 336/22), U Houdků (Bořivojova 693/110) und K-Food (Koněvova 1185/102, Kartenpunkt ungefähr).

> Bitte am Reisetag aktuelle Abfahrtszeiten und Öffnungszeiten prüfen.

## Unterwegs-Ansichten und Quellen

- Die Karte **Als Nächstes** steht über dem Tagesplan und im Reisemodus. Sie folgt dem gewählten Plan und der Uhrzeit (auch bei Simulation), zeigt den nächsten Ort, die geplante Uhrzeit und vorhandene Gehhinweise. **Route öffnen** öffnet Google Maps zum Ziel; die Seite ortet den Nutzer nicht.
- Die **Rückfahrtleiste** bleibt auch im Reisemodus sichtbar: 20:00 Restaurant verlassen, RJ 170 ab 20:47, Dresden 23:19. Sie verlinkt die Bahnhofsroute und den datierten ČD-Fahrplan; am Reisetag erinnert sie ab 19:45 an den Aufbruch. Das ist eine Erinnerung nach Plan, kein Live-Zugstatus.
- Jede Ortskarte nennt den Status der **Öffnungszeiten**, das Recherche-/Prüfdatum und einen Quellenlink. `hoursEvidence` in `js/data.js` kennzeichnet tatsächlich geprüfte Betreiberangaben als `official`; andere Zeiten bleiben `unconfirmed`. Freier öffentlicher Zugang wird getrennt angezeigt. Das Prüfzeichen bezieht sich auf Öffnungszeiten, nicht auf Bewertungen, Preise oder andere Kartentexte.

## Fotos

Alle 15 Sehenswürdigkeiten haben lokale WebP-Fotos; das Burgpanorama dient auch als Titelbild. Bilder außerhalb des sichtbaren Bereichs werden verzögert geladen. Urheber und Lizenz sind direkt an jedem Foto verlinkt; vollständige Quellen stehen in `images/credits.json`. Die Fotos behalten ihre jeweilige Creative-Commons-Lizenz und wurden verkleinert bzw. für die Anzeige zugeschnitten.

Das Antiquariat wird durch ein ausdrücklich als Umgebung gekennzeichnetes Foto der Straßenecke Hybernská/Dlážděná dargestellt. Beim Jüdischen Museum zeigt die Bildunterschrift die Spanische Synagoge als Teil des Museums. Diese Hinweise sind auf Deutsch, Englisch und Koreanisch vorhanden.
