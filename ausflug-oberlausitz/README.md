# Tagesausflug Oberlausitz

Interaktiver Reisebegleiter für einen Tagesausflug mit Bus und Bahn am **Freitag, 25. September 2026**:
Dresden Hbf → Bautzen → Löbau → Herrnhut → Zittau → Dresden (2 Personen, Deutschlandticket, nur Nahverkehr).

Live: <https://le-martin.github.io/ausflug-oberlausitz/>

## Funktionen

- **Tages-Timeline** mit zwei Varianten: „Entspannter Plan“ und „Plan mit Fastentuch“ (Umschalter, Auswahl wird gespeichert)
- **Karten** mit Leaflet + OpenStreetMap: Übersicht und je eine Rundgangskarte für Bautzen, Herrnhut und Zittau, mit echten Fußwegen und eigenen Markern für Bahnhof, Bus, Sehenswürdigkeit, Restaurant, Café und optionale Ziele
- **Sehenswürdigkeiten** als Karten mit Foto, Beschreibung, „Sehenswert“, Dauer, Öffnungszeiten, Gehzeit vom vorherigen Punkt sowie Links zu Google Maps und OSM
- **Öffnungszeiten-Ampel** (🟢 geöffnet / 🟡 schließt bald / 🔴 geschlossen / ⚪ bitte prüfen), live berechnet
- **„besucht“-Häkchen und ♥-Favoriten**, gespeichert in `localStorage`
- **Countdowns** wie „Bus nach Herrnhut in 34 Minuten“ (nur am Reisetag, rein clientseitig)
- **Reisemodus**: Vollbildansicht für unterwegs mit nächster Abfahrt, Gehzeit, aktueller Sehenswürdigkeit und nächster wichtiger Uhrzeit, dazu eine Zeitsimulation zum Ausprobieren. Direkt aufrufbar über `…/ausflug-oberlausitz/#reise`
- **Wetter** über [Open-Meteo](https://open-meteo.com/) (kostenlos, ohne API-Schlüssel). Ohne verfügbare Vorhersage wird das Modul ausgeblendet, es wird nichts simuliert
- **Dreisprachig**: Deutsch, Englisch, Koreanisch (Umschalter oben rechts und in der Navigation). Die Auswahl wird gespeichert und lässt sich per Link setzen: `?lang=de`, `?lang=en`, `?lang=ko`. Ohne Auswahl richtet sich die Sprache nach dem Browser.
- Hell- und Dunkelmodus, mobile-first

## Projektstruktur

```
ausflug-oberlausitz/
├── index.html      # Seitengerüst (Abschnitte, Navigation, Reisemodus)
├── css/style.css   # Gestaltung, Farbpalette, Dark Mode
├── js/data.js      # ALLE Inhalte (Deutsch): Zeiten, Orte, Öffnungszeiten, Restaurants, Cafés, Verbindungen, Pläne
├── js/i18n.js      # Übersetzungen Englisch + Koreanisch und alle Oberflächentexte
├── js/walks.js     # Fußwege (Distanz, Gehzeit, Linienverlauf) – generiert
├── js/app.js       # Rendering, Karten, Ampel, Countdown, Reisemodus, Wetter, Sprachwechsel
├── tools/check-i18n.js  # prüft, ob alle Texte übersetzt sind
└── README.md
```

Es gibt keinen Build-Schritt und keine npm-Abhängigkeiten. Leaflet 1.9.4 kommt von cdnjs, die Schriften (Fraunces, Inter) kommen von Google Fonts, die Fotos von Wikimedia Commons.

## Lokal starten

Die Seite besteht nur aus statischen Dateien. Wegen der Karten- und Wetter-Abrufe sollte sie über einen lokalen Webserver geöffnet werden und nicht per `file://`:

```bash
cd ausflug-oberlausitz
python3 -m http.server 8000
```

Danach <http://localhost:8000> öffnen. Alternativ `npx serve ausflug-oberlausitz`.

Im Zusammenhang der ganzen Jekyll-Seite: `bundle exec jekyll serve` im Repo-Root, dann <http://localhost:4000/ausflug-oberlausitz/>.

## Deployment auf GitHub Pages

Der Ordner liegt im Repo `le-martin.github.io`. Jekyll kopiert `index.html`, `css/` und `js/` unverändert, weil die Dateien keinen Front Matter haben. Daher reicht:

1. Änderungen auf `master` committen und pushen.
2. Der Workflow `.github/workflows/jekyll.yml` baut und veröffentlicht die Seite automatisch.
3. Nach ein bis zwei Minuten ist die Seite unter `https://le-martin.github.io/ausflug-oberlausitz/` erreichbar.

Soll die Seite in einem **eigenen** Repository laufen: Ordnerinhalt ins Repo-Root kopieren, unter *Settings → Pages* „Deploy from a branch“ mit `main` / `root` wählen, fertig. Alle Pfade sind relativ.

## Daten pflegen

Alle Zeiten stehen in `js/data.js`:

- `CHECKED_AT`: Datum der letzten Prüfung. Wird überall als „Zuletzt geprüft“ angezeigt
- `connections`: Zug- und Busverbindungen inklusive Gleis und Steig
- `plans.relaxed` / `plans.fastentuch`: Tagesablauf. `kind` legt das Icon fest, `dep: true` aktiviert Countdown und Reisemodus-Abfahrt, `ref` ist das Sprungziel
- `hours({ "Mo-Fr": [["09:00","18:00"]] })`: Öffnungszeiten für die Ampel. `alwaysOpen: true` steht für frei zugänglich, `uncertain: true` für „bitte prüfen“

### Übersetzungen

Deutsch ist die Quelle (`data.js`, `index.html`). Englisch und Koreanisch stehen in `js/i18n.js`:

- `ui`: Oberflächentexte für alle drei Sprachen. In `index.html` sind sie über `data-i18n`, `data-i18n-html` und `data-i18n-aria` verknüpft.
- `content`: Texte zu Sehenswürdigkeiten, Restaurants und Cafés, nach `id`
- `phrases`: kurze Texte aus Tagesplan, Verbindungen und Quellen, mit dem deutschen Originaltext als Schlüssel
- `rules`: Muster für wiederkehrende Angaben wie „Gleis 14“ oder „ca. 880 m · 12 Min.“

Fehlt eine Übersetzung, zeigt die Seite den deutschen Text. Wer etwas in `data.js` ändert, sollte anschließend prüfen, ob noch alles übersetzt ist:

```bash
node tools/check-i18n.js
```

Stations- und Haltestellennamen bleiben in allen Sprachen deutsch, damit sie zu den Anzeigen vor Ort und in DB Navigator passen.

Die Fußwege in `js/walks.js` wurden mit dem OSRM-Fußgängerprofil von `routing.openstreetmap.de` berechnet (Gehtempo ca. 4,5 km/h).

## Datenstand und Quellen

Stand: **23.09.2026**. Die Verbindungen stammen aus der VVO-Fahrplanauskunft für den 25.09.2026, die Öffnungszeiten von den offiziellen Seiten der Städte, Sehenswürdigkeiten und Restaurants. Für Cafés wurden teilweise OpenStreetMap-Daten verwendet. Wo Quellen sich widersprechen, zeigt die Seite „Bitte vor dem Besuch prüfen“.

Wichtige Befunde der Recherche:

- Der Bus ab Herrnhut fährt laut Auskunft um **15:30** und **16:00** Uhr. Einen Bus um 15:57 Uhr gibt es nicht. Der 16:00-Bus fährt bis **Zittau Ottokarplatz** (16:34) direkt an die Altstadt.
- **Alte Wasserkunst Bautzen:** Ob sie freitags geöffnet hat, ist unklar. Mehrere Quellen nennen „Mo–Do, Sa–So“, andere „täglich“. Vorher anrufen: 03591 41588. Die frühere Website `altewasserkunstbautzen.de` zeigt inzwischen Spam und wird deshalb nicht verlinkt.
- **Herrnhut:** Die Ausstellung im Kirchensaal ist freitags 10–12 und 14–17 Uhr geöffnet. Vom 26.09. bis 03.10.2026 tagt die Synode, dann ist der Kirchensaal nicht zugänglich.
- **Johanniskirche Zittau:** Mi–Sa 11–17 Uhr, im entspannten Plan also nur von außen.
- **„Alte Sackfabrik“:** Ein Lokal dieses Namens wurde nicht gefunden. Gemeint ist vermutlich das Wirtshaus **„Zum Alten Sack“** im Salzhaus.

> Bitte am Reisetag aktuelle Abfahrtszeiten und mögliche Fahrplanänderungen in DB Navigator bzw. ZVON prüfen.

Fotos: Wikimedia Commons. Urheber und Lizenz stehen auf der jeweils verlinkten Dateiseite. Karten: © OpenStreetMap-Mitwirkende.
