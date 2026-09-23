/*
 * Übersetzungen (Englisch, Koreanisch). Deutsch ist die Quelle in data.js bzw. index.html.
 *  - ui:       Oberflächentexte (alle drei Sprachen)
 *  - content:  Texte zu Sehenswürdigkeiten, Restaurants, Cafés – nach id
 *  - phrases:  kurze Texte aus Tagesplan, Verbindungen, Quellen – nach deutschem Originaltext
 *  - rules:    Muster für wiederkehrende Angaben (Gleis, Gehzeit …)
 *  - keep:     Texte, die bewusst unverändert bleiben (Eigennamen, Liniennamen)
 * Prüfen, ob etwas fehlt:  node tools/check-i18n.js
 */
(function () {
  "use strict";

  var OSM = '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">';
  var METEO = '<a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>';

  // ------------------------------------------------------------------ Oberfläche
  var ui = {
    de: {
      docTitle: "Tagesausflug Oberlausitz",
      skip: "Zum Inhalt springen",
      heroEyebrow: "Reisebegleiter · Oberlausitz",
      heroTitle: "Tagesausflug Oberlausitz",
      heroRoute: "Dresden <span>→</span> Bautzen <span>→</span> Herrnhut <span>→</span> Zittau",
      heroMeta: "Freitag, 25. September 2026 · ÖPNV · 2 Personen · Deutschlandticket",
      heroAria: "Panorama von Bautzen über der Spree",
      startTravel: "Reisemodus starten",
      seePlan: "Tagesplan ansehen",
      photo: "Foto",
      navAria: "Abschnitte",
      navOverview: "Übersicht", navBautzen: "Bautzen", navHerrnhut: "Herrnhut", navZittau: "Zittau",
      navFood: "Essen", navTransport: "ÖPNV", navAlt: "Alternativplan",
      themeAria: "Hell/Dunkel umschalten",
      langAria: "Sprache",
      noticeTitle: "Fahrplandaten bitte prüfen.",
      noticeText: "Bitte am Reisetag aktuelle Abfahrtszeiten und mögliche Fahrplanänderungen in DB Navigator bzw. ZVON prüfen.",
      checked: function (d) { return "Zuletzt geprüft: " + d; },
      overviewTitle: "Der Tag im Überblick",
      overviewHint: "Tippe auf einen Punkt, um zur passenden Stelle zu springen.",
      planAria: "Tagesplan wählen",
      planRelaxed: "Entspannter Plan",
      planFast: "Plan mit Fastentuch",
      planHintRelaxed: "Mehr Zeit in Herrnhut (Kirchensaal und Gottesacker), Bus um 16:00 Uhr, Ankunft in Zittau 16:34 Uhr.",
      planHintFast: "Mit dem Großen Zittauer Fastentuch (15:45 Uhr). Diese Variante verkürzt den Aufenthalt in Herrnhut deutlich.",
      timelineAria: "Tagesablauf",
      map: "Karte", mapAll: "Gesamt", mapOverviewAria: "Übersichtskarte",
      mapCityAria: function (c) { return "Karte Rundgang " + c; },
      weatherTitle: "Wetter am 25.09.",
      weatherNote: "Vorhersage: " + METEO + " · wird beim Öffnen der Seite live geladen.",
      rain: function (p) { return "Regen bis " + p + "%"; },
      hourRange: function (a, b) { return a + "–" + b + " Uhr"; },
      cityBautzen: "Bautzen", cityHerrnhut: "Herrnhut", cityZittau: "Zittau",
      bzEyebrow: "Station 1 · ca. 09:15–13:05",
      bzTitle: 'Bautzen <span class="sorb">Budyšin</span>',
      bzLead: "Die „Stadt der Türme“ über der Spree ist das kulturelle Zentrum der Sorben. Die Altstadt ist kompakt – alles ist gut zu Fuß erreichbar.",
      routeAria: "Rundgang",
      chipStation: "Bahnhof", chipOldTown: "Altstadt",
      hhEyebrow: "Station 2 · ca. 13:57–16:00",
      hhTitle: "Herrnhut",
      hhLead: "Die 1722 gegründete Siedlung der Herrnhuter Brüdergemeine ist seit 2024 UNESCO-Welterbe. Klein, ruhig und sehr besonders.",
      optionalHead: "Optional – nicht im Hauptplan",
      ziEyebrow: "Station 3 · ca. 16:34–21:01",
      ziTitle: "Zittau",
      ziLead: "Die einst reiche Handelsstadt im Dreiländereck mit großzügigen Plätzen, Brunnen und prächtigen Bauten – ideal für einen Rundgang bis zum Abendessen.",
      foodTitle: "Essen & Cafés",
      foodLead: "Reservierung für Mittag und Abend empfohlen – an beiden Stellen hängt ein fester Anschluss daran.",
      lunchHead: "Mittagessen in Bautzen",
      dinnerHead: "Abendessen in Zittau",
      cafesHead: "Cafés entlang der Route",
      cafesNote: "Nur real existierende Cafés; Öffnungszeiten aus offiziellen Seiten bzw. OpenStreetMap. Preisniveau ist eine Einschätzung.",
      connTitle: "Verbindungen",
      connLead: "Nur Regionalzüge und Busse – alles mit dem Deutschlandticket. Keine Reservierung nötig.",
      connNoticeTitle: "Alle Fahrplandaten sind überprüfungsbedürftig.",
      altEyebrow: "Wenn ihr früher in Zittau seid",
      altTitle: "Alternativplan mit dem Großen Zittauer Fastentuch",
      altFlow: "Ablauf ab Herrnhut",
      altWarn: "Diese Variante verkürzt den Aufenthalt in Herrnhut deutlich.",
      altNote: "Das Museum schließt um 17:00 Uhr – deshalb fahrt ihr schon um 15:00 Uhr in Herrnhut ab. Der Gottesacker fällt dafür weitgehend weg.",
      altActivate: "Diesen Plan aktivieren",
      footerTitle: "Quellen & Hinweise",
      footerText: function (d) { return "Alle zeitabhängigen Angaben wurden am " + d + " online geprüft. Wo Quellen sich widersprechen oder nichts verlässlich zu finden war, steht „Bitte vor dem Besuch prüfen“."; },
      footerFine: "Karten © " + OSM + "OpenStreetMap-Mitwirkende</a>. Fotos: Wikimedia Commons (Urheber und Lizenz auf der jeweils verlinkten Dateiseite). „Besucht“ und Favoriten werden nur lokal in diesem Browser gespeichert.",
      reset: "Gespeicherte Häkchen & Favoriten zurücksetzen",
      resetConfirm: "Alle Häkchen und Favoriten auf diesem Gerät löschen?",
      fab: "Reisemodus",
      travelTitle: "Jetzt unterwegs",
      travelClose: "Reisemodus beenden",
      simSummary: "Uhrzeit simulieren (zum Ausprobieren)",
      simLabel: "Datum/Uhrzeit",
      simApply: "Übernehmen", simClear: "Echte Uhrzeit", simBadge: "Simulation",

      // Formate
      decimal: ",",
      clock: function (t) { return t + " Uhr"; },
      min: function (n) { return n + " Min."; },
      approx: function (x) { return "ca. " + x; },
      walkWithLabel: function (w, label) { return w + " " + label; },
      dur: function (min, dative) {
        if (min === 1) return "1 Minute";
        if (min < 60) return min + " Minuten";
        var h = Math.floor(min / 60), m = min % 60;
        if (h < 24) return h + " Std." + (m ? " " + m + " Min." : "");
        var d = Math.ceil(min / 1440);
        return d + (d === 1 ? " Tag" : dative ? " Tagen" : " Tage");
      },
      inTime: function (x) { return "in " + x; },
      nowWord: "jetzt",
      depPhrase: function (kind, city) { return (kind === "train" ? "Zug" : "Bus") + " nach " + city; },
      departsNow: function (label) { return label + " fährt jetzt"; },
      cityName: function (c) { return c; },

      // Statistik
      statDuration: "Gesamtdauer", statCities: "Städte", citiesVal: "3 + Dresden", statWalk: "Gehstrecke", statStart: "Start", statReturn: "Rückkehr",
      durHM: function (h, m) { return h + " Std. " + m + " Min."; },

      // Ampel
      stFree: "frei zugänglich", stCheck: "bitte prüfen",
      stSoon: function (t) { return "schließt bald (" + t + ")"; },
      stOpenUntil: function (t) { return "geöffnet bis " + t; },
      stClosedOpens: function (t) { return "geschlossen · öffnet " + t; },
      stClosedNow: "jetzt geschlossen", stClosedToday: "heute geschlossen",
      stTitle: "Jetzt, laut hinterlegten Öffnungszeiten",
      verifyBadge: "vor Besuch prüfen",

      // Karten-Elemente
      favAria: function (n) { return n + " als Favorit markieren"; },
      optional: "Optional",
      recommended: function (d) { return "<strong>" + d + "</strong> empfohlen"; },
      aDuration: "Dauer", aWalk: "Fußweg", aHours: "Öffnungszeiten", aTip: "Tipp",
      visited: "besucht",
      website: "Website", reserve: "Reservieren", call: "Anrufen", details: "Details",
      osmAria: function (n) { return n + " in OpenStreetMap"; },
      planned: "Geplant",
      noRating: "Keine verlässliche Bewertungsübersicht gefunden – siehe Google Maps",

      // Ankunft Zittau
      arrTitle: "Ankunft mit dem Bus", arrDep: "Abfahrt", arrLine: "Linie", arrTime: "Fahrzeit", arrDest: "Ziel", arrWalk: "Gehroute",
      direction: function (d) { return "Richtung " + d; },
      arrDestNote: function (stop, t) { return stop + ", an " + t + " Uhr – am Bahnhof Zittau sitzen bleiben"; },
      walkFast: function (w) { return "vom Ottokarplatz nach Norden über die Frauenstraße zur Kirche zum Heiligen Kreuz (" + w + ")"; },
      walkRelaxed: function (w) { return "vom Ottokarplatz nordwestlich durch die Altstadt zum Markt (" + w + ")"; },
      activeFast: "Fastentuch-Variante aktiv.", activeRelaxed: "Entspannter Plan aktiv.",
      checkOnDay: "Fahrplandaten bitte am Reisetag prüfen.",

      // Verbindungen
      tagOut: "Hinfahrt", tagMidday: "Mittag", tagAfternoon: "Nachmittag", tagFast: "Fastentuch-Variante", tagReturn: "Rückfahrt",
      alternatives: "Alternativen",
      dirShort: function (d) { return "Ri. " + d; },
      connChecked: function (d) { return "Zuletzt geprüft: " + d + " (VVO-Fahrplanauskunft) · bitte am Reisetag prüfen"; },

      // Karte
      popStop: "Bushaltestelle", popStation: "Bahnhof", popCafe: "Café", popOptional: "optional", popDetails: "Details ↓",
      ttTrain: "Zug (schematisch)", ttBus: "PlusBus 10 (schematisch)", ttReturn: "Rückfahrt RB61 (schematisch)",
      lgStation: "Bahnhof", lgBus: "Bus", lgSight: "Sehenswürdigkeit", lgFood: "Restaurant", lgCafe: "Café", lgOptional: "Optional",
      mapFail: "Karte konnte nicht geladen werden (offline?). Links bei den Orten funktionieren weiterhin.",

      // Wetter
      wx: { clear: "klar", mainly: "überwiegend klar", partly: "teils bewölkt", overcast: "bedeckt", fog: "Nebel", drizzle: "Niesel", rain: "Regen", heavyRain: "starker Regen", showers: "Schauer", heavyShowers: "heftige Schauer", storm: "Gewitter" },

      // Reisemodus
      notYet: "Noch nicht unterwegs",
      tripDate: "Freitag, 25. September 2026",
      untilFirst: function (title, t) { return "bis zur ersten Abfahrt: " + title + " um " + t + " Uhr"; },
      meetLabel: "Treffpunkt",
      meetVal: function (t) { return "Dresden Hbf, " + t + " Uhr"; },
      meetSub: "Abfahrt RB60 um 08:23 Uhr, Gleis 14 (bitte prüfen)",
      travelIntro: "Am Reisetag zeigt dieser Modus automatisch die nächste Station, Abfahrt und Gehzeit. Zum Ausprobieren unten „Uhrzeit simulieren“ nutzen.",
      doneLabel: "Geschafft", doneBig: "Der Ausflug ist vorbei.", doneSub: "Hoffentlich war es ein schöner Tag in der Oberlausitz!",
      onTheWay: "Unterwegs",
      arrivalAt: function (t) { return "Ankunft " + t + " Uhr"; },
      untilArrival: "bis zur Ankunft",
      nextDep: "Nächste Abfahrt",
      walkTime: "Gehzeit",
      walkRunning: function (t) { return " (läuft, Ankunft ca. " + t + ")"; },
      walkStart: function (t) { return " (los um " + t + ")"; },
      seeConn: "Verbindung ansehen",
      nowLabel: "Jetzt", freeTime: "Freie Zeit",
      until: function (t) { return "bis " + t + " Uhr"; },
      nextImportant: "Nächste wichtige Uhrzeit",
      currentSight: "Aktuelle Sehenswürdigkeit",
      nextSight: function (t) { return "Nächste Sehenswürdigkeit · " + t + " Uhr"; },
      after: "Danach",
      travelFoot: function (d) { return "Fahrzeiten bitte in DB Navigator bzw. ZVON prüfen · Stand " + d; }
    },

    en: {
      docTitle: "Day Trip to Upper Lusatia",
      skip: "Skip to content",
      heroEyebrow: "Travel companion · Upper Lusatia",
      heroTitle: "Day Trip to Upper Lusatia",
      heroRoute: "Dresden <span>→</span> Bautzen <span>→</span> Herrnhut <span>→</span> Zittau",
      heroMeta: "Friday, 25 September 2026 · Public transport · 2 people · Deutschlandticket",
      heroAria: "Panorama of Bautzen above the Spree",
      startTravel: "Start travel mode",
      seePlan: "View day plan",
      photo: "Photo",
      navAria: "Sections",
      navOverview: "Overview", navBautzen: "Bautzen", navHerrnhut: "Herrnhut", navZittau: "Zittau",
      navFood: "Food", navTransport: "Transport", navAlt: "Alternative",
      themeAria: "Toggle light/dark mode",
      langAria: "Language",
      noticeTitle: "Please check timetable data.",
      noticeText: "On the day of travel, please check current departure times and possible timetable changes in DB Navigator or ZVON.",
      checked: function (d) { return "Last checked: " + d; },
      overviewTitle: "The day at a glance",
      overviewHint: "Tap an entry to jump to the matching section.",
      planAria: "Choose day plan",
      planRelaxed: "Relaxed plan",
      planFast: "Plan with Lenten Veil",
      planHintRelaxed: "More time in Herrnhut (church hall and God's Acre), bus at 16:00, arrival in Zittau at 16:34.",
      planHintFast: "Including the Great Zittau Lenten Veil (15:45). This option noticeably shortens your stay in Herrnhut.",
      timelineAria: "Schedule",
      map: "Map", mapAll: "All", mapOverviewAria: "Overview map",
      mapCityAria: function (c) { return "Walking route map " + c; },
      weatherTitle: "Weather on 25 Sep",
      weatherNote: "Forecast: " + METEO + " · loaded live when the page opens.",
      rain: function (p) { return "Rain up to " + p + "%"; },
      hourRange: function (a, b) { return a + ":00–" + b + ":00"; },
      cityBautzen: "Bautzen", cityHerrnhut: "Herrnhut", cityZittau: "Zittau",
      bzEyebrow: "Stop 1 · approx. 09:15–13:05",
      bzTitle: 'Bautzen <span class="sorb">Budyšin</span>',
      bzLead: "The “city of towers” above the Spree is the cultural centre of the Sorbs. The old town is compact – everything is within easy walking distance.",
      routeAria: "Walking route",
      chipStation: "Station", chipOldTown: "Old town",
      hhEyebrow: "Stop 2 · approx. 13:57–16:00",
      hhTitle: "Herrnhut",
      hhLead: "Founded in 1722 as the settlement of the Moravian Church (Herrnhuter Brüdergemeine), Herrnhut has been a UNESCO World Heritage Site since 2024. Small, quiet and very special.",
      optionalHead: "Optional – not in the main plan",
      ziEyebrow: "Stop 3 · approx. 16:34–21:01",
      ziTitle: "Zittau",
      ziLead: "Once a wealthy trading town where Germany, Czechia and Poland meet, Zittau has spacious squares, fountains and grand buildings – ideal for a stroll before dinner.",
      foodTitle: "Food & cafés",
      foodLead: "Booking lunch and dinner is recommended – both are followed by a fixed connection.",
      lunchHead: "Lunch in Bautzen",
      dinnerHead: "Dinner in Zittau",
      cafesHead: "Cafés along the route",
      cafesNote: "Only cafés that actually exist; opening hours from official websites or OpenStreetMap. Price level is an estimate.",
      connTitle: "Connections",
      connLead: "Regional trains and buses only – all covered by the Deutschlandticket. No reservations needed.",
      connNoticeTitle: "All timetable data must be double-checked.",
      altEyebrow: "If you get to Zittau earlier",
      altTitle: "Alternative plan with the Great Zittau Lenten Veil",
      altFlow: "Schedule from Herrnhut",
      altWarn: "This option noticeably shortens your stay in Herrnhut.",
      altNote: "The museum closes at 17:00, so you leave Herrnhut as early as 15:00. In exchange you'll mostly skip God's Acre.",
      altActivate: "Activate this plan",
      footerTitle: "Sources & notes",
      footerText: function (d) { return "All time-sensitive information was checked online on " + d + ". Where sources contradict each other or nothing reliable could be found, the page says “please check before visiting”."; },
      footerFine: "Maps © " + OSM + "OpenStreetMap contributors</a>. Photos: Wikimedia Commons (author and licence on the linked file page). “Visited” marks and favourites are only stored locally in this browser.",
      reset: "Reset saved check marks & favourites",
      resetConfirm: "Delete all check marks and favourites on this device?",
      fab: "Travel mode",
      travelTitle: "On the road",
      travelClose: "Close travel mode",
      simSummary: "Simulate time (to try it out)",
      simLabel: "Date/time",
      simApply: "Apply", simClear: "Real time", simBadge: "Simulation",

      decimal: ".",
      clock: function (t) { return t; },
      min: function (n) { return n + " min"; },
      approx: function (x) { return "approx. " + x; },
      walkWithLabel: function (w, label) { return w + " " + label; },
      dur: function (min) {
        if (min === 1) return "1 minute";
        if (min < 60) return min + " minutes";
        var h = Math.floor(min / 60), m = min % 60;
        if (h < 24) return h + " h" + (m ? " " + m + " min" : "");
        var d = Math.ceil(min / 1440);
        return d + (d === 1 ? " day" : " days");
      },
      inTime: function (x) { return "in " + x; },
      nowWord: "now",
      depPhrase: function (kind, city) { return (kind === "train" ? "Train" : "Bus") + " to " + city; },
      departsNow: function (label) { return label + " departs now"; },
      cityName: function (c) { return c; },

      statDuration: "Total duration", statCities: "Towns", citiesVal: "3 + Dresden", statWalk: "Walking", statStart: "Start", statReturn: "Back",
      durHM: function (h, m) { return h + " h " + m + " min"; },

      stFree: "freely accessible", stCheck: "please check",
      stSoon: function (t) { return "closing soon (" + t + ")"; },
      stOpenUntil: function (t) { return "open until " + t; },
      stClosedOpens: function (t) { return "closed · opens " + t; },
      stClosedNow: "closed now", stClosedToday: "closed today",
      stTitle: "Right now, based on the stored opening hours",
      verifyBadge: "check before visiting",

      favAria: function (n) { return "Mark " + n + " as favourite"; },
      optional: "Optional",
      recommended: function (d) { return "<strong>" + d + "</strong> recommended"; },
      aDuration: "Duration", aWalk: "Walk", aHours: "Opening hours", aTip: "Tip",
      visited: "visited",
      website: "Website", reserve: "Book", call: "Call", details: "Details",
      osmAria: function (n) { return n + " on OpenStreetMap"; },
      planned: "Planned",
      noRating: "No reliable rating summary found – see Google Maps",

      arrTitle: "Arriving by bus", arrDep: "Departure", arrLine: "Line", arrTime: "Travel time", arrDest: "Destination", arrWalk: "Walking route",
      direction: function (d) { return "towards " + d; },
      arrDestNote: function (stop, t) { return stop + ", arr. " + t + " – stay on the bus at Zittau Bahnhof"; },
      walkFast: function (w) { return "from Ottokarplatz north along Frauenstraße to the Church of the Holy Cross (" + w + ")"; },
      walkRelaxed: function (w) { return "from Ottokarplatz north-west through the old town to the market square (" + w + ")"; },
      activeFast: "Lenten Veil option active.", activeRelaxed: "Relaxed plan active.",
      checkOnDay: "Please check the timetable on the day of travel.",

      tagOut: "Outbound", tagMidday: "Midday", tagAfternoon: "Afternoon", tagFast: "Lenten Veil option", tagReturn: "Return",
      alternatives: "Alternatives",
      dirShort: function (d) { return "to " + d; },
      connChecked: function (d) { return "Last checked: " + d + " (VVO journey planner) · please check on the day of travel"; },

      popStop: "Bus stop", popStation: "Train station", popCafe: "Café", popOptional: "optional", popDetails: "Details ↓",
      ttTrain: "Train (schematic)", ttBus: "PlusBus 10 (schematic)", ttReturn: "Return RB61 (schematic)",
      lgStation: "Station", lgBus: "Bus", lgSight: "Sight", lgFood: "Restaurant", lgCafe: "Café", lgOptional: "Optional",
      mapFail: "The map could not be loaded (offline?). The links for each place still work.",

      wx: { clear: "clear", mainly: "mainly clear", partly: "partly cloudy", overcast: "overcast", fog: "fog", drizzle: "drizzle", rain: "rain", heavyRain: "heavy rain", showers: "showers", heavyShowers: "heavy showers", storm: "thunderstorm" },

      notYet: "Not on the road yet",
      tripDate: "Friday, 25 September 2026",
      untilFirst: function (title, t) { return "until the first departure: " + title + " at " + t; },
      meetLabel: "Meeting point",
      meetVal: function (t) { return "Dresden Hbf, " + t; },
      meetSub: "RB60 departs 08:23, platform 14 (please check)",
      travelIntro: "On the day of travel this mode automatically shows the next stop, departure and walking time. To try it out, use “Simulate time” below.",
      doneLabel: "Done", doneBig: "The trip is over.", doneSub: "Hope you had a lovely day in Upper Lusatia!",
      onTheWay: "On the way",
      arrivalAt: function (t) { return "Arrival " + t; },
      untilArrival: "until arrival",
      nextDep: "Next departure",
      walkTime: "Walking time",
      walkRunning: function (t) { return " (under way, arrive approx. " + t + ")"; },
      walkStart: function (t) { return " (leave at " + t + ")"; },
      seeConn: "View connection",
      nowLabel: "Now", freeTime: "Free time",
      until: function (t) { return "until " + t; },
      nextImportant: "Next key time",
      currentSight: "Current sight",
      nextSight: function (t) { return "Next sight · " + t; },
      after: "Coming up",
      travelFoot: function (d) { return "Please check times in DB Navigator or ZVON · as of " + d; }
    },

    ko: {
      docTitle: "오버라우지츠 당일 여행",
      skip: "본문으로 건너뛰기",
      heroEyebrow: "여행 가이드 · 오버라우지츠",
      heroTitle: "오버라우지츠 당일 여행",
      heroRoute: "드레스덴 <span>→</span> 바우첸 <span>→</span> 헤른후트 <span>→</span> 치타우",
      heroMeta: "2026년 9월 25일 (금) · 대중교통 · 2인 · 도이칠란트티켓",
      heroAria: "슈프레강 위 바우첸 전경",
      startTravel: "여행 모드 시작",
      seePlan: "일정 보기",
      photo: "사진",
      navAria: "섹션",
      navOverview: "개요", navBautzen: "바우첸", navHerrnhut: "헤른후트", navZittau: "치타우",
      navFood: "식사", navTransport: "교통", navAlt: "대안 일정",
      themeAria: "라이트/다크 모드 전환",
      langAria: "언어",
      noticeTitle: "시간표를 꼭 확인하세요.",
      noticeText: "여행 당일 DB Navigator 또는 ZVON에서 최신 출발 시간과 시간표 변경 여부를 확인하세요.",
      checked: function (d) { return "마지막 확인: " + d; },
      overviewTitle: "하루 일정 한눈에 보기",
      overviewHint: "항목을 누르면 해당 섹션으로 이동합니다.",
      planAria: "일정 선택",
      planRelaxed: "여유 일정",
      planFast: "사순절 휘장 포함 일정",
      planHintRelaxed: "헤른후트에서 더 여유롭게 (교회당과 묘지), 16:00 버스, 치타우 16:34 도착.",
      planHintFast: "치타우 대형 사순절 휘장 관람 포함 (15:45). 이 일정은 헤른후트 체류 시간이 크게 줄어듭니다.",
      timelineAria: "하루 일정",
      map: "지도", mapAll: "전체", mapOverviewAria: "전체 지도",
      mapCityAria: function (c) { return c + " 도보 코스 지도"; },
      weatherTitle: "9월 25일 날씨",
      weatherNote: "예보: " + METEO + " · 페이지를 열 때 실시간으로 불러옵니다.",
      rain: function (p) { return "강수 확률 최대 " + p + "%"; },
      hourRange: function (a, b) { return a + "–" + b + "시"; },
      cityBautzen: "바우첸", cityHerrnhut: "헤른후트", cityZittau: "치타우",
      bzEyebrow: "첫 번째 방문지 · 약 09:15–13:05",
      bzTitle: '바우첸 <span class="sorb">Bautzen · Budyšin</span>',
      bzLead: "슈프레강 위의 ‘탑의 도시’ 바우첸은 소르브족 문화의 중심지입니다. 구시가지가 아담해서 모두 걸어서 다닐 수 있습니다.",
      routeAria: "도보 코스",
      chipStation: "기차역", chipOldTown: "구시가지",
      hhEyebrow: "두 번째 방문지 · 약 13:57–16:00",
      hhTitle: '헤른후트 <span class="sorb">Herrnhut</span>',
      hhLead: "1722년 헤른후트 형제단(모라비아 교회)의 정착지로 세워졌고, 2024년부터 유네스코 세계유산입니다. 작고 조용하지만 아주 특별한 곳입니다.",
      optionalHead: "선택 사항 – 기본 일정에는 없음",
      ziEyebrow: "세 번째 방문지 · 약 16:34–21:01",
      ziTitle: '치타우 <span class="sorb">Zittau</span>',
      ziLead: "독일·체코·폴란드가 만나는 국경 지대의 옛 부유한 상업 도시로, 넓은 광장과 분수, 웅장한 건물이 많아 저녁 식사 전 산책하기 좋습니다.",
      foodTitle: "식당 & 카페",
      foodLead: "점심과 저녁 모두 예약을 권합니다. 식사 후 바로 정해진 교통편을 타야 합니다.",
      lunchHead: "바우첸에서 점심",
      dinnerHead: "치타우에서 저녁",
      cafesHead: "코스 주변 카페",
      cafesNote: "실제로 있는 카페만 소개합니다. 영업시간은 공식 웹사이트 또는 OpenStreetMap 기준이며, 가격대는 추정치입니다.",
      connTitle: "교통편",
      connLead: "지역 열차와 버스만 이용하며 모두 도이칠란트티켓으로 탈 수 있습니다. 예약은 필요 없습니다.",
      connNoticeTitle: "모든 시간표 정보는 다시 확인이 필요합니다.",
      altEyebrow: "치타우에 더 일찍 도착한다면",
      altTitle: "치타우 대형 사순절 휘장을 포함한 대안 일정",
      altFlow: "헤른후트 이후 일정",
      altWarn: "이 일정은 헤른후트 체류 시간이 크게 줄어듭니다.",
      altNote: "박물관이 17:00에 문을 닫기 때문에 헤른후트에서 15:00에 출발합니다. 그 대신 묘지(Gottesacker)는 거의 둘러보지 못합니다.",
      altActivate: "이 일정으로 전환",
      footerTitle: "출처 및 참고",
      footerText: function (d) { return "시간 관련 정보는 모두 " + d + "에 온라인으로 확인했습니다. 출처가 서로 다르거나 믿을 만한 정보를 찾지 못한 곳에는 ‘방문 전 확인’이라고 표시했습니다."; },
      footerFine: "지도 © " + OSM + "OpenStreetMap 기여자</a>. 사진: Wikimedia Commons (저작자와 라이선스는 링크된 파일 페이지 참고). ‘방문함’ 표시와 즐겨찾기는 이 브라우저에만 저장됩니다.",
      reset: "저장된 체크 표시와 즐겨찾기 초기화",
      resetConfirm: "이 기기의 모든 체크 표시와 즐겨찾기를 삭제할까요?",
      fab: "여행 모드",
      travelTitle: "지금 여행 중",
      travelClose: "여행 모드 닫기",
      simSummary: "시간 시뮬레이션 (미리 체험)",
      simLabel: "날짜/시간",
      simApply: "적용", simClear: "실제 시간", simBadge: "시뮬레이션",

      decimal: ".",
      clock: function (t) { return t; },
      min: function (n) { return n + "분"; },
      approx: function (x) { return "약 " + x; },
      walkWithLabel: function (w, label) { return label + " " + w; },
      dur: function (min) {
        if (min < 60) return min + "분";
        var h = Math.floor(min / 60), m = min % 60;
        if (h < 24) return h + "시간" + (m ? " " + m + "분" : "");
        return Math.ceil(min / 1440) + "일";
      },
      inTime: function (x) { return x + " 후"; },
      nowWord: "지금",
      depPhrase: function (kind, city) { return city + "행 " + (kind === "train" ? "기차" : "버스"); },
      departsNow: function (label) { return label + " 지금 출발"; },
      cityName: function (c) { return { Dresden: "드레스덴", Bautzen: "바우첸", "Löbau": "뢰바우", Herrnhut: "헤른후트", Zittau: "치타우" }[c] || c; },

      statDuration: "총 소요 시간", statCities: "방문 도시", citiesVal: "3곳 + 드레스덴", statWalk: "도보 거리", statStart: "출발", statReturn: "귀환",
      durHM: function (h, m) { return h + "시간 " + m + "분"; },

      stFree: "자유 관람", stCheck: "확인 필요",
      stSoon: function (t) { return "곧 마감 (" + t + ")"; },
      stOpenUntil: function (t) { return t + "까지 운영"; },
      stClosedOpens: function (t) { return "닫힘 · " + t + " 오픈"; },
      stClosedNow: "지금 닫힘", stClosedToday: "오늘 휴무",
      stTitle: "지금 기준, 저장된 운영 시간에 따름",
      verifyBadge: "방문 전 확인",

      favAria: function (n) { return n + " 즐겨찾기"; },
      optional: "선택",
      recommended: function (d) { return "권장 <strong>" + d + "</strong>"; },
      aDuration: "소요 시간", aWalk: "도보", aHours: "운영 시간", aTip: "팁",
      visited: "방문함",
      website: "웹사이트", reserve: "예약", call: "전화", details: "자세히",
      osmAria: function (n) { return "OpenStreetMap에서 " + n; },
      planned: "예정",
      noRating: "믿을 만한 평점 정보를 찾지 못했습니다 – Google 지도 참고",

      arrTitle: "버스로 도착", arrDep: "출발", arrLine: "노선", arrTime: "소요 시간", arrDest: "도착지", arrWalk: "도보 경로",
      direction: function (d) { return d + " 방면"; },
      arrDestNote: function (stop, t) { return stop + ", " + t + " 도착 – 치타우역(Zittau Bahnhof)에서 내리지 마세요"; },
      walkFast: function (w) { return "오토카르 광장에서 북쪽으로 Frauenstraße를 따라 성 십자가 교회까지 (" + w + ")"; },
      walkRelaxed: function (w) { return "오토카르 광장에서 북서쪽으로 구시가지를 지나 마르크트 광장까지 (" + w + ")"; },
      activeFast: "휘장 일정 적용 중.", activeRelaxed: "여유 일정 적용 중.",
      checkOnDay: "여행 당일 시간표를 확인하세요.",

      tagOut: "가는 길", tagMidday: "점심 이후", tagAfternoon: "오후", tagFast: "휘장 일정", tagReturn: "돌아오는 길",
      alternatives: "다른 교통편",
      dirShort: function (d) { return d + " 방면"; },
      connChecked: function (d) { return "마지막 확인: " + d + " (VVO 시간표 조회) · 여행 당일 다시 확인하세요"; },

      popStop: "버스 정류장", popStation: "기차역", popCafe: "카페", popOptional: "선택", popDetails: "자세히 ↓",
      ttTrain: "기차 (개략도)", ttBus: "PlusBus 10 (개략도)", ttReturn: "귀가 RB61 (개략도)",
      lgStation: "기차역", lgBus: "버스", lgSight: "명소", lgFood: "식당", lgCafe: "카페", lgOptional: "선택",
      mapFail: "지도를 불러오지 못했습니다 (오프라인?). 각 장소의 링크는 계속 사용할 수 있습니다.",

      wx: { clear: "맑음", mainly: "대체로 맑음", partly: "구름 조금", overcast: "흐림", fog: "안개", drizzle: "이슬비", rain: "비", heavyRain: "강한 비", showers: "소나기", heavyShowers: "강한 소나기", storm: "뇌우" },

      notYet: "아직 출발 전",
      tripDate: "2026년 9월 25일 (금)",
      untilFirst: function (title, t) { return "첫 출발까지: " + title + ", " + t; },
      meetLabel: "만나는 곳",
      meetVal: function (t) { return "드레스덴 중앙역, " + t; },
      meetSub: "RB60 08:23 출발, 14번 승강장 (확인 필요)",
      travelIntro: "여행 당일에는 다음 장소, 출발 시간, 도보 시간을 자동으로 보여 줍니다. 미리 체험하려면 아래 ‘시간 시뮬레이션’을 사용하세요.",
      doneLabel: "완료", doneBig: "여행이 끝났습니다.", doneSub: "오버라우지츠에서 즐거운 하루 보내셨기를!",
      onTheWay: "이동 중",
      arrivalAt: function (t) { return t + " 도착"; },
      untilArrival: "도착까지",
      nextDep: "다음 출발",
      walkTime: "도보 시간",
      walkRunning: function (t) { return " (이동 중, 약 " + t + " 도착)"; },
      walkStart: function (t) { return " (" + t + " 출발)"; },
      seeConn: "교통편 보기",
      nowLabel: "지금", freeTime: "자유 시간",
      until: function (t) { return t + "까지"; },
      nextImportant: "다음 주요 시각",
      currentSight: "지금 있는 명소",
      nextSight: function (t) { return "다음 명소 · " + t; },
      after: "이후 일정",
      travelFoot: function (d) { return "시간은 DB Navigator 또는 ZVON에서 확인하세요 · " + d + " 기준"; }
    }
  };

  // ------------------------------------------------------------------ Inhalte nach id
  var content = {
    en: {
      "bz-kornmarkt": {
        name: "Kornmarkt & Reichenstraße",
        text: "From the Kornmarkt, Reichenstraße – the main axis of the old town – leads straight to the Hauptmarkt, lined with Baroque townhouses.",
        why: "At the end of the street stands the Reichenturm, Bautzen's “leaning tower” (about 1.4 m out of plumb).",
        duration: "15 min", walkLabel: "from the station",
        hoursNote: "Public space – always accessible.",
        extra: "Reichenturm (viewing platform): according to the city of Bautzen open April–October daily 10:00–17:00, small admission fee – please check before visiting."
      },
      "bz-hauptmarkt": {
        name: "Hauptmarkt & Town Hall",
        text: "Bautzen's historic centre with the Baroque town hall (present form 1729–1732), surrounded by splendid patrician houses.",
        why: "This is where you feel the town's history as the capital of Upper Lusatia most strongly – perfect for the first photos.",
        duration: "15–20 min", walkLabel: "from Reichenstraße",
        hoursNote: "Public square – always accessible."
      },
      "bz-dom": {
        name: "St. Peter's Cathedral (Dom St. Petri)",
        text: "One of the oldest simultaneum churches in Germany: since 1524 the Protestant and Catholic congregations have shared the cathedral – separated only by a railing.",
        why: "Two denominations sharing one church for almost 500 years is unique; also note the “bent” floor plan of the nave.",
        duration: "15–20 min", walkLabel: "from the Hauptmarkt",
        hoursNote: "April–October: Mon–Sat 10:00–17:30, Sun 13:00–17:30 (parish). No visits during services. Cathedral tower only Sat/Sun/public holidays."
      },
      "bz-ortenburg": {
        name: "Ortenburg Castle",
        text: "For centuries the castle on the rocky plateau above the Spree was the seat of the rulers of Upper Lusatia. Striking: the late Gothic Matthias Tower gate with a relief of the Hungarian king Matthias Corvinus.",
        why: "Historic architecture, views of the Spree valley – and in the courtyard the Sorbian Museum, the centre of Sorbian culture.",
        duration: "20–30 min", walkLabel: "from the cathedral",
        hoursNote: "Castle courtyard freely accessible. Sorbian Museum (Ortenburg 3): Tue–Sun 10:00–18:00.",
        hoursLabel: "Sorbian Museum"
      },
      "bz-wasserkunst": {
        name: "Old Waterworks (Alte Wasserkunst)",
        text: "Built in 1558, the water tower supplied the town with water from the Spree for centuries and was also part of the town fortifications. Today it is a technical museum with its historic pumping system.",
        why: "A technical monument, views from the tower and the classic postcard motif: the waterworks and St. Michael's Church above the Spree valley.",
        duration: "30 min", walkLabel: "from Ortenburg Castle",
        hoursNote: "Friday warning: sources disagree. Several list April–October “Mon–Thu, Sat–Sun 10:00–17:00” (i.e. closed on Fridays), others “daily 10:00–17:00”. Please call ahead: +49 3591 41588.",
        planB: "If it's closed: the best view is from outside anyway – from the Friedensbrücke bridge (approx. 200 m south). For a viewpoint instead, climb the Reichenturm."
      },
      "hh-zinzendorfplatz": {
        name: "Zinzendorfplatz",
        text: "The historic centre of the Moravian Church settlement founded in 1722 – simple Baroque buildings, a clear layout and lots of peace.",
        why: "Since 2024 Herrnhut has been part of the UNESCO World Heritage Site “Moravian Church Settlements”. The bus stop is right on the square.",
        duration: "10–15 min", walkText: "right on the square",
        hoursNote: "Public square – always accessible."
      },
      "hh-kirchensaal": {
        name: "Church hall & exhibition “gemeinsam glauben leben”",
        text: "The white, unadorned church hall is the spiritual centre of the Moravian Church. The exhibition, opened in 2026, is also the UNESCO World Heritage information point.",
        why: "Topics: history of the Moravian Church, community life today, worldwide connections, UNESCO World Heritage and Herrnhut's cultural significance – including difficult chapters such as slavery and the Nazi era.",
        duration: "approx. 30 min (14:00–14:30)", walkLabel: "from Zinzendorfplatz",
        hoursNote: "Exhibition: Mon, Tue, Thu, Fri, Sat 10:00–12:00 and 14:00–17:00; closed Wed. Note: from 26 Sep to 3 Oct 2026 the synod meets and the church hall is closed to visitors. 25 Sep is the day before – please check in advance whether preparations restrict visits."
      },
      "hh-gottesacker": {
        name: "God's Acre (Gottesacker)",
        text: "The Moravian cemetery on the Hutberg: thousands of identical, flat gravestones in strictly ordered rows, divided by lime-tree avenues.",
        why: "The uniform graves express the equality of all before God – a central testimony of Moravian faith and part of the World Heritage Site. Quiet and impressive, culturally far more than an ordinary cemetery.",
        duration: "30–45 min", walkLabel: "from the church hall",
        hoursNote: "Generally open during the day. Please respect the peace and dignity of the place."
      },
      "zi-markt": {
        name: "Market square (Markt)",
        text: "The wide market square with Baroque townhouses and the Mars Fountain (Roland Fountain) is the heart of the old town.",
        why: "A good starting point for the walk – all other stops are just a few minutes away.",
        duration: "15–20 min", walkLabel: "from Ottokarplatz",
        hoursNote: "Public square – always accessible."
      },
      "zi-rathaus": {
        name: "Town hall (Rathaus)",
        text: "The town hall was built in 1840–1845 to designs in the spirit of Karl Friedrich Schinkel – in the style of an Italian Renaissance palazzo, with a striking tower on the market square.",
        why: "Unusual for Saxony: an “Italian” palace in the middle of Upper Lusatia, expressing the confidence of the wealthy trading town.",
        duration: "10 min (outside)", walkLabel: "from the market square",
        hoursNote: "Exterior viewing any time."
      },
      "zi-johannis": {
        name: "St. John's Church (Johanniskirche)",
        text: "Zittau's main church got its current Neoclassical look in the 19th century, partly to designs by Karl Friedrich Schinkel. You can climb the tower – 266 steps.",
        why: "From the tower you can see across Zittau to the Zittau, Jizera and Giant Mountains; almost every day at 11:50 the tower keeper plays music.",
        duration: "20 min", walkLabel: "from the town hall",
        hoursNote: "Church & tower until end of October Wed–Sat 11:00–17:00 (run by volunteers, not guaranteed). In the relaxed plan you arrive after 17:00 – exterior only. In the Lenten Veil option you can go inside."
      },
      "zi-salzhaus": {
        name: "Salt House & Neustadt",
        text: "The Salt House (built 1511, later a granary) with its huge mansard roof is one of the largest historic secular buildings in town. It stands on the square called “Neustadt”, which has several fountains.",
        why: "A reminder of the wealth Zittau gained from the salt and grain trade; today home to the city library, a shopping passage and restaurants.",
        duration: "20–30 min", walkLabel: "from St. John's Church",
        hoursNote: "Exterior any time; passage during shop hours."
      },
      "zi-kloster": {
        name: "Klosterplatz",
        text: "A quiet square by the former Franciscan monastery with the monastery church of St. Peter and Paul and the Museum of Cultural History.",
        why: "One of the oldest parts of town and a lovely end to the walk – the Dornspachhaus is only 3 minutes away.",
        duration: "15–20 min", walkLabel: "from the Salt House",
        hoursNote: "Square always accessible. Museum of Cultural History (Franciscan monastery): Tue–Sun 10:00–17:00.",
        hoursLabel: "Museum of Cultural History"
      },
      "hh-hutberg": {
        name: "Hutberg & Altan",
        text: "The Hutberg rises directly above God's Acre; on its top stands the Altan, a small lookout tower.",
        why: "Views over Herrnhut and the Upper Lusatian uplands, a short walk (approx. 4 min from the upper end of God's Acre).",
        duration: "20–30 min extra", walkLabel: "from God's Acre",
        hoursNote: "Opening of the Altan not verified – please check before visiting.",
        reason: "Not in the main plan: with the 16:00 bus, time would otherwise get too tight."
      },
      "hh-sterne": {
        name: "Herrnhut Star Manufactory",
        text: "The famous Herrnhut stars have been made by hand here for more than 125 years. There is a show workshop, a small exhibition with a film, a visitor centre, a shop and the café “Bei Sterns”.",
        why: "Culturally very well known: the Herrnhut star is the town's symbol around the world.",
        duration: "45–60 min incl. walking", walkLabel: "from Zinzendorfplatz",
        hoursNote: "Show workshop Mon–Fri 9:00–18:00, Sat 10:00–17:00, free admission. Oderwitzer Str. 8.",
        reason: "Not in the main plan: by public transport (approx. 11 min walk each way) your time in Herrnhut would become too rushed.",
        swapHint: "If the Herrnhut stars matter more to you than God's Acre and the church hall, the day plan can be adjusted accordingly."
      },
      "zi-fastentuch": {
        name: "Great Zittau Lenten Veil",
        text: "The Great Zittau Lenten Veil from 1472 measures about 8.20 × 6.80 metres and shows biblical scenes from the Creation to the Last Judgement in around 90 panels.",
        why: "During Lent, Lenten veils covered the altar or chancel of a church. The Zittau veil is one of the exceptionally well-preserved large medieval Lenten veils – today it hangs in the Museum Kirche zum Heiligen Kreuz in one of the largest museum display cases in the world.",
        duration: "30–40 min", walkLabel: "from Ottokarplatz",
        hoursNote: "April–October daily 10:00–17:00 (lunch break 12:30–13:00). Admission €6, reduced €4; combined ticket with the Museum of Cultural History €10. Frauenstraße 23."
      },

      "wjelbik": {
        name: "Wjelbik – Sorbian restaurant",
        cuisine: "Sorbian and regional Lusatian cuisine",
        when: "approx. 11:30–12:30",
        text: "The name means “little vault” or “pantry”. The family-run restaurant is housed in a listed, roughly 600-year-old vaulted building near the cathedral. Recommended by Slow Food and Falstaff.",
        why: "Bautzen is the centre of Sorbian culture – so a Sorbian restaurant is the natural choice here.",
        hoursNote: "Tue–Sat 11:30–15:00 and 17:00–21:30, closed Sun/Mon. Lunch kitchen until 14:00.",
        price: "€€–€€€ (estimate, upscale regional cuisine – check the current menu)",
        rating: "OpenTable: 4.9 / 5 (636 reviews, at time of research)",
        note: "Booking recommended – you need to catch the 13:14 train afterwards. When booking, mention that you'd like to pay around 12:30."
      },
      "moenchshof": {
        cuisine: "Historic inn, hearty food based on traditional recipes",
        when: "if Wjelbik is fully booked or closed",
        text: "Historic inn with medieval furnishings between the old town and Ortenburg Castle; home-baked bread, its own beers and liqueurs, beer garden.",
        hoursNote: "Fri 11:00–23:00 (website). Other days according to third-party sources: closed Mon, Tue–Thu 11:00–22:00, Sat 11:00–23:00, Sun 11:00–21:00 – please check.",
        price: "€€ (estimate – check the menu)"
      },
      "dornspachhaus": {
        cuisine: "Historic inn, Upper Lusatian specialities",
        when: "approx. 19:00–20:20",
        text: "One of the oldest townhouses in Zittau, named after mayor Nikolaus von Dornspach, with a historic vaulted room and a “Knights' Cellar”.",
        pros: ["central (2 min from the market square)", "historic atmosphere", "easy to combine with the old-town walk", "11 min walk to the station"],
        hoursNote: "July–September daily 11:30–21:30 non-stop (October–June: 11:30–14:00 and 17:30–21:30).",
        price: "€€ (estimate – check the menu)",
        rating: "Recommended by Tripadvisor (according to the website) – for current reviews see the map link or Tripadvisor",
        note: "Book for Friday evening – by phone or via the contact form."
      },
      "altersack": {
        name: "Inn “Zum Alten Sack” in the Salt House",
        cuisine: "Rustic inn, Upper Lusatian cuisine",
        when: "alternative to the Dornspachhaus",
        text: "This rustic inn in the historic Salt House deliberately cooks typical Upper Lusatian dishes. Menus also in English, Czech and Polish. Note: this is probably the place meant by “Alte Sackfabrik”; we found no restaurant by that name in Zittau.",
        hoursNote: "Tue–Sun 11:00–14:00 and 17:00–22:00, closed Mon (website).",
        price: "€–€€ (estimate – check the menu)"
      },

      "c-evis": {
        text: "Café and decoration shop in one. Home-made tartlets and cakes, coffee from a Dresden roastery, plus breakfast, crêpes and soups.",
        hoursNote: "Mon–Sat 9:00–18:00", special: "Home-made tartlets", price: "€ (estimate)", distance: "right on the route (Reichenstraße)"
      },
      "c-coffeetime": {
        text: "Small roastery café at the Hauptmarkt end of Reichenstraße – good for an espresso after lunch.",
        hoursNote: "Fri 12:00–17:00 (according to OpenStreetMap, please check)", special: "Coffee from its own roastery", price: "€ (estimate)", distance: "right on the route, 1 min from the Hauptmarkt"
      },
      "c-schwerdtner-bz": {
        name: "Schwerdtner (bakery café)",
        text: "Regional bakery with café seating – handy for a coffee right after arrival, when much is still closed.",
        hoursNote: "Mon–Sat 7:00–18:00 (according to OpenStreetMap, please check)", special: "Breakfast, Upper Lusatian baked goods", price: "€ (estimate)", distance: "right on the route"
      },
      "c-foerster": {
        text: "Very cosy café with an ice-cream garden – according to the town of Herrnhut with Upper Lusatian cake specialities and home-made ice cream.",
        hoursNote: "Tue–Sun from 11:00 (town of Herrnhut); closing time not stated, please check", special: "Cheesecake, Kleckselkuchen, 35 ice-cream sundaes", price: "€ (estimate)", distance: "approx. 250 m / 4 min from Zinzendorfplatz"
      },
      "c-sterns": {
        name: "Café “Bei Sterns”",
        text: "The star manufactory's café with regional specialities – only worthwhile if you visit the manufactory.",
        hoursNote: "Mon–Sat 9:00–17:00 (town of Herrnhut)", special: "Regional cakes", price: "€ (estimate)", distance: "approx. 860 m / 11 min from Zinzendorfplatz (off the route)"
      },
      "c-marsbrunnen": {
        name: "Schwerdtner's Café “Am Marsbrunnen”",
        text: "Café right on the market square overlooking the Mars Fountain, ideal for a break between the walk and dinner.",
        hoursNote: "Mon–Sat 7:00–19:00 (according to OpenStreetMap, please check)", special: "Cake & coffee on the market square", price: "€ (estimate)", distance: "right on the market square"
      },
      "c-mocca": {
        text: "Ice-cream café and cocktail bar next to the Salt House, with coffee, ice cream and hot food all day.",
        hoursNote: "Fri from 9:30 until the evening (sources say 22:00 or midnight – please check)", special: "Sundaes, coffee, cocktails", price: "€–€€ (estimate)", distance: "right on the route (Neustadt)"
      },
      "c-rosengarten": {
        text: "Small café right next to the Church of the Holy Cross – fits the Lenten Veil option.",
        hoursNote: "Conflicting information: one source says daily 10:00–18:00, another closed on Fridays. Please check beforehand.", special: "Coffee & cake", price: "€ (estimate)", distance: "next to the Lenten Veil museum (Lenten Veil option only)"
      }
    },

    ko: {
      "bz-kornmarkt": {
        name: "코른마르크트 & 라이헨 거리 (Kornmarkt & Reichenstraße)",
        text: "코른마르크트에서 구시가지의 중심 거리인 라이헨 거리가 바로크 양식의 시민 주택들 사이로 하우프트마르크트까지 곧게 이어집니다.",
        why: "거리 끝에는 약 1.4 m 기울어진 바우첸의 ‘사탑’ 라이헨 탑(Reichenturm)이 서 있습니다.",
        duration: "15분", walkLabel: "기차역에서",
        hoursNote: "공공장소 – 언제든 방문 가능.",
        extra: "라이헨 탑 전망대: 바우첸시에 따르면 4–10월 매일 10:00–17:00 개방, 소액 입장료 – 방문 전 확인하세요."
      },
      "bz-hauptmarkt": {
        name: "하우프트마르크트 & 시청 (Hauptmarkt & Rathaus)",
        text: "바로크 양식의 시청(현재 모습은 1729–1732년)과 화려한 귀족 저택들이 둘러싼 바우첸의 역사적 중심지입니다.",
        why: "오버라우지츠의 수도였던 도시의 역사를 가장 잘 느낄 수 있는 곳으로, 첫 사진을 찍기에 좋습니다.",
        duration: "15–20분", walkLabel: "라이헨 거리에서",
        hoursNote: "공공 광장 – 언제든 방문 가능."
      },
      "bz-dom": {
        name: "성 베드로 대성당 (Dom St. Petri)",
        text: "독일에서 가장 오래된 공동 사용 교회 중 하나입니다. 1524년부터 개신교와 가톨릭 신자들이 난간 하나를 사이에 두고 이 성당을 함께 사용합니다.",
        why: "두 교파가 500년 가까이 한 교회를 함께 쓰는 것은 매우 독특합니다. 신랑(身廊)이 살짝 ‘꺾인’ 평면도 눈여겨보세요.",
        duration: "15–20분", walkLabel: "하우프트마르크트에서",
        hoursNote: "4–10월: 월–토 10:00–17:30, 일 13:00–17:30 (교구 정보). 예배 중에는 관람 불가. 대성당 탑은 토·일·공휴일만 개방."
      },
      "bz-ortenburg": {
        name: "오르텐부르크 성 (Ortenburg)",
        text: "슈프레강 위 바위 고원에 자리한 이 성은 수백 년 동안 오버라우지츠 영주들의 거처였습니다. 헝가리 왕 마티아스 코르비누스의 부조가 새겨진 후기 고딕 양식의 마티아스 탑 성문이 인상적입니다.",
        why: "역사적인 건축물과 슈프레 계곡 전망, 그리고 성 안뜰에는 소르브 문화의 중심인 소르브 박물관이 있습니다.",
        duration: "20–30분", walkLabel: "대성당에서",
        hoursNote: "성 안뜰은 자유 관람. 소르브 박물관(Ortenburg 3): 화–일 10:00–18:00.",
        hoursLabel: "소르브 박물관"
      },
      "bz-wasserkunst": {
        name: "옛 급수탑 (Alte Wasserkunst)",
        text: "1558년에 지어진 이 급수탑은 수백 년 동안 슈프레강 물을 도시에 공급했고 성벽의 일부이기도 했습니다. 지금은 옛 펌프 설비를 볼 수 있는 기술 박물관입니다.",
        why: "기술 문화재이자 탑 전망대가 있고, 슈프레 계곡 위 급수탑과 미하엘 교회가 어우러진 바우첸의 대표 엽서 풍경을 볼 수 있습니다.",
        duration: "30분", walkLabel: "오르텐부르크 성에서",
        hoursNote: "금요일 주의: 정보가 서로 다릅니다. 여러 출처는 4–10월 ‘월–목, 토–일 10:00–17:00’(즉 금요일 휴무), 다른 출처는 ‘매일 10:00–17:00’이라고 합니다. 미리 전화로 확인하세요: +49 3591 41588.",
        planB: "문을 닫았다면: 가장 멋진 풍경은 어차피 바깥, 약 200 m 남쪽의 프리덴스 다리(Friedensbrücke)에서 보입니다. 전망대 대신 라이헨 탑에 올라가도 좋습니다."
      },
      "hh-zinzendorfplatz": {
        name: "진첸도르프 광장 (Zinzendorfplatz)",
        text: "1722년에 세워진 헤른후트 형제단 정착지의 역사적 중심지입니다. 소박한 바로크 건물, 반듯한 구조, 그리고 고요함이 특징입니다.",
        why: "헤른후트는 2024년부터 유네스코 세계유산 ‘모라비아 교회 정착지’에 속합니다. 버스 정류장이 광장 바로 앞에 있습니다.",
        duration: "10–15분", walkText: "광장 바로 앞",
        hoursNote: "공공 광장 – 언제든 방문 가능."
      },
      "hh-kirchensaal": {
        name: "교회당 & 전시 ‘gemeinsam glauben leben’ (함께 믿고 살아가기)",
        text: "장식 없는 하얀 교회당은 헤른후트 형제단의 영적 중심입니다. 2026년에 문을 연 전시는 유네스코 세계유산 안내소 역할도 합니다.",
        why: "주제: 형제단의 역사, 오늘날의 공동체 생활, 전 세계와의 연결, 유네스코 세계유산, 헤른후트의 문화적 의미 – 노예제와 나치 시대 같은 어두운 역사도 다룹니다.",
        duration: "약 30분 (14:00–14:30)", walkLabel: "진첸도르프 광장에서",
        hoursNote: "전시: 월·화·목·금·토 10:00–12:00, 14:00–17:00, 수요일 휴관. 참고: 2026년 9월 26일–10월 3일에는 총회(시노드)가 열려 교회당 관람이 불가합니다. 9월 25일은 그 전날이므로 준비 때문에 관람이 제한되는지 미리 확인하세요."
      },
      "hh-gottesacker": {
        name: "고테스아커 묘지 (Gottesacker)",
        text: "후트베르크 언덕에 있는 형제단 묘지입니다. 똑같은 크기의 평평한 묘석 수천 개가 보리수 가로수길 사이에 엄격하게 줄지어 있습니다.",
        why: "똑같은 무덤은 하나님 앞에서 모두가 평등하다는 믿음을 보여 줍니다. 형제단 신앙의 핵심 증거이자 세계유산의 일부로, 조용하고 인상적이며 평범한 묘지 이상의 문화적 의미가 있습니다.",
        duration: "30–45분", walkLabel: "교회당에서",
        hoursNote: "보통 낮에는 자유롭게 들어갈 수 있습니다. 조용히 예의를 지켜 주세요."
      },
      "zi-markt": {
        name: "마르크트 광장 (Markt)",
        text: "바로크 시민 주택과 마르스 분수(롤란트 분수)가 있는 넓은 광장으로 구시가지의 중심입니다.",
        why: "산책을 시작하기 좋은 곳으로, 다른 명소들이 모두 몇 분 거리에 있습니다.",
        duration: "15–20분", walkLabel: "오토카르 광장에서",
        hoursNote: "공공 광장 – 언제든 방문 가능."
      },
      "zi-rathaus": {
        name: "시청 (Rathaus)",
        text: "시청은 카를 프리드리히 싱켈의 구상을 바탕으로 1840–1845년에 지어졌습니다. 이탈리아 르네상스 궁전 양식이며 광장 쪽의 탑이 눈에 띕니다.",
        why: "작센에서는 보기 드문 ‘이탈리아식’ 궁전으로, 부유한 상업 도시의 자신감을 보여 줍니다.",
        duration: "10분 (외관)", walkLabel: "마르크트 광장에서",
        hoursNote: "외관은 언제든 관람 가능."
      },
      "zi-johannis": {
        name: "요한 교회 (Johanniskirche)",
        text: "치타우의 주 교회로, 19세기에 일부 카를 프리드리히 싱켈의 설계에 따라 지금의 신고전주의 모습이 되었습니다. 266계단을 올라 탑에 오를 수 있습니다.",
        why: "탑에서는 치타우 너머 치타우 산지, 이제라 산맥, 크르코노셰 산맥까지 보입니다. 거의 매일 11:50에 탑지기가 연주를 합니다.",
        duration: "20분", walkLabel: "시청에서",
        hoursNote: "교회와 탑은 10월 말까지 수–토 11:00–17:00 (자원봉사 운영, 보장 불가). 여유 일정에서는 17:00 이후 도착하므로 외관만 볼 수 있고, 휘장 일정에서는 내부 관람이 가능합니다."
      },
      "zi-salzhaus": {
        name: "잘츠하우스 & 노이슈타트 (Salzhaus & Neustadt)",
        text: "1511년에 지어져 나중에 곡물 창고로 쓰인 잘츠하우스는 거대한 망사르드 지붕을 가진, 도시에서 가장 큰 역사적 세속 건물 중 하나입니다. 분수가 여러 개 있는 ‘노이슈타트’ 광장에 서 있습니다.",
        why: "소금과 곡물 무역으로 번성했던 치타우의 부를 보여 줍니다. 지금은 시립 도서관, 상점가, 식당이 들어서 있습니다.",
        duration: "20–30분", walkLabel: "요한 교회에서",
        hoursNote: "외관은 언제든, 상점가는 영업시간에 방문 가능."
      },
      "zi-kloster": {
        name: "클로스터 광장 (Klosterplatz)",
        text: "옛 프란치스코회 수도원 옆의 조용한 광장으로, 성 베드로와 바오로 수도원 교회와 문화사 박물관이 있습니다.",
        why: "도시에서 가장 오래된 구역 중 하나로 산책을 마무리하기 좋습니다. 도른슈파흐하우스까지 3분 거리입니다.",
        duration: "15–20분", walkLabel: "잘츠하우스에서",
        hoursNote: "광장은 언제든 방문 가능. 문화사 박물관(프란치스코회 수도원): 화–일 10:00–17:00.",
        hoursLabel: "문화사 박물관"
      },
      "hh-hutberg": {
        name: "후트베르크 & 알탄 전망대 (Hutberg & Altan)",
        text: "후트베르크 언덕은 묘지 바로 위에 있고, 꼭대기에 작은 전망탑 알탄이 서 있습니다.",
        why: "헤른후트와 오버라우지츠 구릉지가 내려다보이며, 묘지 위쪽 끝에서 약 4분 걸리는 짧은 산책 코스입니다.",
        duration: "추가 20–30분", walkLabel: "묘지에서",
        hoursNote: "알탄 개방 여부는 확인되지 않았습니다 – 방문 전 확인하세요.",
        reason: "기본 일정에서 제외: 16:00 버스를 타려면 시간이 너무 빠듯합니다."
      },
      "hh-sterne": {
        name: "헤른후트 별 공방 (Herrnhuter Sterne Manufaktur)",
        text: "유명한 헤른후트 별을 125년 넘게 손으로 만들어 온 곳입니다. 시연 공방, 영상이 있는 작은 전시, 방문자 센터, 상점, 카페 ‘Bei Sterns’가 있습니다.",
        why: "문화적으로 매우 유명합니다. 헤른후트 별은 전 세계에서 이 마을의 상징입니다.",
        duration: "도보 포함 45–60분", walkLabel: "진첸도르프 광장에서",
        hoursNote: "시연 공방 월–금 9:00–18:00, 토 10:00–17:00, 무료 입장. Oderwitzer Str. 8.",
        reason: "기본 일정에서 제외: 대중교통 일정상 (편도 도보 약 11분) 헤른후트 일정이 너무 촉박해집니다.",
        swapHint: "묘지와 교회당보다 헤른후트 별이 더 중요하다면 일정을 그에 맞게 바꿀 수 있습니다."
      },
      "zi-fastentuch": {
        name: "치타우 대형 사순절 휘장 (Großes Zittauer Fastentuch)",
        text: "1472년에 만들어진 치타우 대형 사순절 휘장은 약 8.20 × 6.80 m 크기로, 약 90개의 그림 칸에 천지창조부터 최후의 심판까지 성경 장면이 담겨 있습니다.",
        why: "사순절 휘장은 사순절 기간에 교회의 제단이나 성가대석을 가리던 천입니다. 치타우 휘장은 보존 상태가 매우 뛰어난 중세 대형 휘장 중 하나로, 지금은 성 십자가 교회 박물관(Museum Kirche zum Heiligen Kreuz)의 세계 최대급 전시 케이스에 걸려 있습니다.",
        duration: "30–40분", walkLabel: "오토카르 광장에서",
        hoursNote: "4–10월 매일 10:00–17:00 (점심 휴식 12:30–13:00). 입장료 6유로, 할인 4유로, 문화사 박물관 통합권 10유로. Frauenstraße 23."
      },

      "wjelbik": {
        name: "비엘빅 – 소르브 레스토랑 (Wjelbik)",
        cuisine: "소르브 및 라우지츠 향토 요리",
        when: "약 11:30–12:30",
        text: "이름은 ‘작은 둥근 천장’ 또는 ‘식료품 저장실’이라는 뜻입니다. 대성당 근처, 약 600년 된 문화재 아치형 건물에 있는 가족 운영 식당으로 슬로푸드와 팔슈타프(Falstaff)의 추천을 받았습니다.",
        why: "바우첸은 소르브 문화의 중심지이므로 일부러 소르브 식당을 골랐습니다.",
        hoursNote: "화–토 11:30–15:00, 17:00–21:30, 일·월 휴무. 점심 주문은 14:00까지.",
        price: "€€–€€€ (추정, 고급 향토 요리 – 최신 메뉴 확인)",
        rating: "OpenTable: 4.9 / 5 (리뷰 636개, 조사 시점 기준)",
        note: "예약 권장 – 식사 후 13:14 기차를 타야 합니다. 예약할 때 12:30쯤 계산하고 싶다고 말해 두세요."
      },
      "moenchshof": {
        name: "묀히스호프 (Mönchshof)",
        cuisine: "역사적인 여관, 전통 조리법의 든든한 요리",
        when: "비엘빅이 만석이거나 문을 닫았을 때",
        text: "구시가지와 오르텐부르크 성 사이에 있는 중세풍 인테리어의 역사적인 여관입니다. 직접 구운 빵, 자체 맥주와 리큐어, 비어가든이 있습니다.",
        hoursNote: "금 11:00–23:00 (웹사이트). 다른 요일은 제3자 정보 기준: 월 휴무, 화–목 11:00–22:00, 토 11:00–23:00, 일 11:00–21:00 – 확인 필요.",
        price: "€€ (추정 – 메뉴 확인)"
      },
      "dornspachhaus": {
        name: "도른슈파흐하우스 (Dornspachhaus)",
        cuisine: "역사적인 여관, 오버라우지츠 향토 요리",
        when: "약 19:00–20:20",
        text: "치타우에서 가장 오래된 시민 주택 중 하나로, 시장 니콜라우스 폰 도른슈파흐의 이름을 땄습니다. 역사적인 아치형 홀과 ‘기사의 지하실(Ritterkeller)’이 있습니다.",
        pros: ["중심가 위치 (마르크트 광장에서 2분)", "역사적인 분위기", "구시가지 산책과 연결하기 좋음", "기차역까지 도보 11분"],
        hoursNote: "7–9월 매일 11:30–21:30 연속 영업 (10–6월: 11:30–14:00, 17:30–21:30).",
        price: "€€ (추정 – 메뉴 확인)",
        rating: "트립어드바이저 추천 (웹사이트 기준) – 최신 리뷰는 지도 링크나 트립어드바이저에서 확인",
        note: "금요일 저녁이니 전화나 문의 양식으로 예약하세요."
      },
      "altersack": {
        name: "‘춤 알텐 자크’ 식당 (Zum Alten Sack, 잘츠하우스 내)",
        cuisine: "소박한 여관, 오버라우지츠 요리",
        when: "도른슈파흐하우스 대안",
        text: "역사적인 잘츠하우스 안에 있는 소박한 식당으로, 전형적인 오버라우지츠 요리를 냅니다. 영어·체코어·폴란드어 메뉴도 있습니다. 참고: ‘Alte Sackfabrik’라고 한 곳이 아마 이 식당일 것입니다. 치타우에서 그 이름의 식당은 찾지 못했습니다.",
        hoursNote: "화–일 11:00–14:00, 17:00–22:00, 월 휴무 (웹사이트).",
        price: "€–€€ (추정 – 메뉴 확인)"
      },

      "c-evis": {
        text: "카페와 인테리어 소품 가게를 겸한 곳입니다. 직접 만든 타르트와 케이크, 드레스덴 로스터리 커피, 아침 식사, 크레페, 수프가 있습니다.",
        hoursNote: "월–토 9:00–18:00", special: "수제 타르트", price: "€ (추정)", distance: "코스 바로 위 (라이헨 거리)"
      },
      "c-coffeetime": {
        text: "라이헨 거리의 하우프트마르크트 쪽 끝에 있는 작은 로스터리 카페로, 점심 후 에스프레소 한 잔 하기 좋습니다.",
        hoursNote: "금 12:00–17:00 (OpenStreetMap 기준, 확인 필요)", special: "자가 로스팅 커피", price: "€ (추정)", distance: "코스 바로 위, 하우프트마르크트에서 1분"
      },
      "c-schwerdtner-bz": {
        name: "슈베르트너 (베이커리 카페, Schwerdtner)",
        text: "좌석이 있는 지역 베이커리로, 아직 많은 곳이 문을 열기 전 도착 직후 커피 한 잔 하기 좋습니다.",
        hoursNote: "월–토 7:00–18:00 (OpenStreetMap 기준, 확인 필요)", special: "아침 식사, 오버라우지츠 빵", price: "€ (추정)", distance: "코스 바로 위"
      },
      "c-foerster": {
        name: "카페 푀르스터 (Café Förster)",
        text: "아이스크림 정원이 있는 아늑한 카페로, 헤른후트시에 따르면 오버라우지츠 전통 케이크와 직접 만든 아이스크림이 있습니다.",
        hoursNote: "화–일 11:00부터 (헤른후트시 정보), 마감 시간 미기재 – 확인 필요", special: "치즈케이크, 클레크셀쿠헨, 아이스크림 선데 35종", price: "€ (추정)", distance: "진첸도르프 광장에서 약 250 m / 4분"
      },
      "c-sterns": {
        name: "카페 ‘Bei Sterns’",
        text: "별 공방에 딸린 카페로 지역 특산 메뉴가 있습니다. 공방을 방문할 때만 추천합니다.",
        hoursNote: "월–토 9:00–17:00 (헤른후트시 정보)", special: "지역 케이크", price: "€ (추정)", distance: "진첸도르프 광장에서 약 860 m / 11분 (코스에서 벗어남)"
      },
      "c-marsbrunnen": {
        name: "슈베르트너 카페 ‘Am Marsbrunnen’",
        text: "마르스 분수가 보이는 광장 바로 앞 카페로, 산책과 저녁 식사 사이에 쉬어 가기 좋습니다.",
        hoursNote: "월–토 7:00–19:00 (OpenStreetMap 기준, 확인 필요)", special: "광장에서 즐기는 커피와 케이크", price: "€ (추정)", distance: "마르크트 광장 바로 앞"
      },
      "c-mocca": {
        text: "잘츠하우스 옆 아이스크림 카페 겸 칵테일 바로, 커피와 아이스크림, 하루 종일 따뜻한 식사를 제공합니다.",
        hoursNote: "금 9:30부터 저녁까지 (22시 또는 24시로 정보가 다름 – 확인 필요)", special: "아이스크림 선데, 커피, 칵테일", price: "€–€€ (추정)", distance: "코스 바로 위 (노이슈타트)"
      },
      "c-rosengarten": {
        name: "카페 로젠가르텐 (Café Rosengarten)",
        text: "성 십자가 교회 바로 옆 작은 카페로, 휘장 일정과 잘 맞습니다.",
        hoursNote: "정보가 엇갈립니다: 한 곳은 매일 10:00–18:00, 다른 곳은 금요일 휴무라고 합니다. 미리 확인하세요.", special: "커피와 케이크", price: "€ (추정)", distance: "휘장 박물관 옆 (휘장 일정 전용)"
      }
    }
  };

  // ------------------------------------------------------------------ Kurztexte (Tagesplan, Verbindungen, Quellen)
  var phrases = {
    en: {
      "Treffen am Dresden Hauptbahnhof": "Meet at Dresden Hauptbahnhof",
      "Abfahrt an Gleis 14 prüfen": "Check departure at platform 14",
      "Gleis 14 → Gleis 2 · 50 Min.": "Platform 14 → platform 2 · 50 min",
      "Fußweg zum Kornmarkt": "Walk to the Kornmarkt",
      "Reichenturm · Kaffee bei Schwerdtner möglich": "Reichenturm · coffee at Schwerdtner possible",
      "Hauptmarkt & Rathaus": "Hauptmarkt & town hall",
      "Dom St. Petri": "St. Peter's Cathedral",
      "öffnet 10:00": "opens 10:00",
      "Ortenburg": "Ortenburg Castle",
      "Burghof, Spreeblick, Sorbisches Museum": "Castle courtyard, Spree view, Sorbian Museum",
      "Alte Wasserkunst": "Old Waterworks",
      "⚠ Freitagsöffnung unklar – sonst Blick von der Friedensbrücke": "⚠ Friday opening unclear – otherwise enjoy the view from the Friedensbrücke",
      "Mittagessen im Wjelbik": "Lunch at Wjelbik",
      "Kornstraße 7 · reservieren": "Kornstraße 7 · book ahead",
      "Puffer / Espresso in der Reichenstraße": "Buffer / espresso on Reichenstraße",
      "spätestens 12:45 losgehen": "leave by 12:45 at the latest",
      "Fußweg zum Bahnhof Bautzen": "Walk to Bautzen station",
      "ca. 1,2 km · 16 Min. · ~9 Min. Puffer": "approx. 1.2 km · 16 min · ~9 min buffer",
      "Gleis 2 → Gleis 1": "Platform 2 → platform 1",
      "Umstieg in Löbau": "Change in Löbau",
      "2 Min. zum Busbahnhof · 9 Min. Puffer": "2 min to the bus station · 9 min buffer",
      "bis Zinzendorfplatz · 21 Min.": "to Zinzendorfplatz · 21 min",
      "Ankunft direkt am Platz": "Arrival right on the square",
      "Kirchensaal & Ausstellung": "Church hall & exhibition",
      "„gemeinsam glauben leben“ · öffnet 14:00": "“gemeinsam glauben leben” · opens 14:00",
      "Fußweg zum Gottesacker": "Walk to God's Acre",
      "Gottesacker": "God's Acre",
      "Rückweg zum Zinzendorfplatz": "Walk back to Zinzendorfplatz",
      "Puffer: Kuchen im Café Förster": "Buffer: cake at Café Förster",
      "4 Min. vom Platz · um 15:55 an der Haltestelle sein": "4 min from the square · be at the stop by 15:55",
      "Zinzendorfplatz Steig 2 → Ottokarplatz · 34 Min.": "Zinzendorfplatz stop 2 → Ottokarplatz · 34 min",
      "Fußweg Ottokarplatz → Markt": "Walk Ottokarplatz → market square",
      "Markt": "Market square",
      "Marsbrunnen, Bürgerhäuser": "Mars Fountain, townhouses",
      "Rathaus": "Town hall",
      "von außen": "from outside",
      "Johanniskirche": "St. John's Church",
      "innen nur bis 17:00 – außen": "inside only until 17:00 – see it from outside",
      "Salzhaus & Neustadt": "Salt House & Neustadt",
      "Abschluss des Rundgangs": "End of the walk",
      "Freie Zeit": "Free time",
      "Café am Markt oder Bummel": "Café on the market square or a stroll",
      "Abendessen im Dornspachhaus": "Dinner at the Dornspachhaus",
      "Bautzner Str. 2 · reservieren": "Bautzner Str. 2 · book ahead",
      "Fußweg zum Bahnhof Zittau": "Walk to Zittau station",
      "ca. 850 m · 11 Min. · 10 Min. Puffer": "approx. 850 m · 11 min · 10 min buffer",
      "Gleis 2b → Gleis 11 · direkt": "Platform 2b → platform 11 · direct",
      "Zinzendorfplatz + Kirchensaal": "Zinzendorfplatz + church hall",
      "kurzer Besuch der Ausstellung": "short visit to the exhibition",
      "Kurzer Rundgang": "Short walk",
      "Richtung Gottesacker (unterer Teil) und zurück": "towards God's Acre (lower part) and back",
      "Zurück zur Haltestelle": "Back to the bus stop",
      "Zinzendorfplatz, Steig 2": "Zinzendorfplatz, stop 2",
      "→ Ottokarplatz · 34 Min.": "→ Ottokarplatz · 34 min",
      "Fußweg zur Kirche zum Heiligen Kreuz": "Walk to the Church of the Holy Cross",
      "Großes Zittauer Fastentuch": "Great Zittau Lenten Veil",
      "Museum schließt 17:00": "museum closes 17:00",
      "Fußweg zum Markt": "Walk to the market square",
      "Johanniskirche (innen bis 17:00)": "St. John's Church (inside until 17:00)",
      "zuerst hierhin": "go here first",
      "Markt & Rathaus": "Market square & town hall",
      "07:53 → 08:53 (RB60, früher)": "07:53 → 08:53 (RB60, earlier)",
      "08:53 → 09:55 (RB60, falls der 08:23 verpasst wird)": "08:53 → 09:55 (RB60, if you miss the 08:23)",
      "Früher: RE1 12:19 → Löbau 12:33, Bus 10 12:38 → Herrnhut 13:00": "Earlier: RE1 12:19 → Löbau 12:33, bus 10 12:38 → Herrnhut 13:00",
      "Später (Notfall): RE1 14:19 → Löbau 14:32, Bus 10 14:38 → Herrnhut 15:00": "Later (emergency): RE1 14:19 → Löbau 14:32, bus 10 14:38 → Herrnhut 15:00",
      "Umstieg: ca. 2 Min. Fußweg zum Busbahnhof direkt am Bahnhof": "Change: approx. 2 min walk to the bus station right next to the train station",
      "9 Min. Umstiegszeit": "9 min to change",
      "Steig Ri. 1 Zittau": "Stop “Ri. 1 Zittau”",
      "Früher: Bus 10 um 15:30 → Zittau Bahnhof 15:54 (dann ca. 15 Min. zu Fuß in die Altstadt)": "Earlier: bus 10 at 15:30 → Zittau Bahnhof 15:54 (then approx. 15 min walk to the old town)",
      "Der Bus hält vorher auch am Zittau Bahnhof (16:28). Für die Altstadt bis Ottokarplatz sitzen bleiben.": "The bus also stops at Zittau Bahnhof first (16:28). For the old town, stay on until Ottokarplatz.",
      "Hinweis: Einen Bus um 15:57 Uhr gibt es laut Auskunft nicht – die Fahrten sind um 15:30 und 16:00 Uhr.": "Note: according to the journey planner there is no bus at 15:57 – buses run at 15:30 and 16:00.",
      "Steig 2 – Ri. Zittau": "Stop 2 – towards Zittau",
      "Endhaltestelle": "Terminus",
      "Herrnhut → Zittau (Fastentuch-Variante)": "Herrnhut → Zittau (Lenten Veil option)",
      "Noch früher: Bus 10 um 14:30 → Zittau Bahnhof 14:54": "Even earlier: bus 10 at 14:30 → Zittau Bahnhof 14:54",
      "Empfohlen": "Recommended",
      "Direkt, ohne Umstieg, 1:56 h": "Direct, no change, 1:56 h",
      "Spät-Alternative": "Late alternative",
      "1 Umstieg in Löbau (20 Min.), Ankunft 23:57": "1 change in Löbau (20 min), arrival 23:57",
      "Letzte Möglichkeit": "Last option",
      "Direkt, Ankunft nach Mitternacht": "Direct, arrives after midnight",
      "Früher": "Earlier",
      "Nur mit kurzem Abendessen (bis ca. 19:45)": "Only with a short dinner (until approx. 19:45)",
      "Erste Empfehlung": "Top pick",
      "VVO-Fahrplanauskunft (Verbindungen am 25.09.2026)": "VVO journey planner (connections on 25 Sep 2026)",
      "ZVON – Zweckverband Verkehrsverbund Oberlausitz-Niederschlesien": "ZVON – Upper Lusatia–Lower Silesia transport association",
      "Stadt Bautzen – Öffnungszeiten ausgewählter Sehenswürdigkeiten (PDF)": "City of Bautzen – opening hours of selected sights (PDF)",
      "Ausstellung „gemeinsam glauben leben“, Herrnhut": "Exhibition “gemeinsam glauben leben”, Herrnhut",
      "Stadt Herrnhut – Gastronomie": "Town of Herrnhut – restaurants & cafés",
      "Stadt Zittau – Städtische Museen, Besucherservice": "City of Zittau – municipal museums, visitor information",
      "Johanniskirche Zittau": "St. John's Church, Zittau",
      "OpenStreetMap (Café-Öffnungszeiten, Karten, Fußwege)": "OpenStreetMap (café opening hours, maps, walking routes)",
      "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)": "Weather: Open-Meteo (free, no API key)"
    },
    ko: {
      "Treffen am Dresden Hauptbahnhof": "드레스덴 중앙역(Dresden Hbf)에서 만나기",
      "Abfahrt an Gleis 14 prüfen": "14번 승강장 출발 확인",
      "Gleis 14 → Gleis 2 · 50 Min.": "14번 → 2번 승강장 · 50분",
      "Fußweg zum Kornmarkt": "코른마르크트까지 도보",
      "Kornmarkt & Reichenstraße": "코른마르크트 & 라이헨 거리",
      "Reichenturm · Kaffee bei Schwerdtner möglich": "라이헨 탑 · 슈베르트너에서 커피 가능",
      "Bautzen": "바우첸",
      "Hauptmarkt & Rathaus": "하우프트마르크트 & 시청",
      "Dom St. Petri": "성 베드로 대성당",
      "öffnet 10:00": "10:00 개방",
      "Ortenburg": "오르텐부르크 성",
      "Burghof, Spreeblick, Sorbisches Museum": "성 안뜰, 슈프레강 전망, 소르브 박물관",
      "Alte Wasserkunst": "옛 급수탑",
      "⚠ Freitagsöffnung unklar – sonst Blick von der Friedensbrücke": "⚠ 금요일 개방 불확실 – 닫았으면 프리덴스 다리에서 감상",
      "Mittagessen im Wjelbik": "비엘빅에서 점심",
      "Kornstraße 7 · reservieren": "Kornstraße 7 · 예약하기",
      "Puffer / Espresso in der Reichenstraße": "여유 시간 / 라이헨 거리에서 에스프레소",
      "spätestens 12:45 losgehen": "늦어도 12:45에 출발",
      "Fußweg zum Bahnhof Bautzen": "바우첸역까지 도보",
      "ca. 1,2 km · 16 Min. · ~9 Min. Puffer": "약 1.2 km · 16분 · 여유 약 9분",
      "Gleis 2 → Gleis 1": "2번 → 1번 승강장",
      "Umstieg in Löbau": "뢰바우에서 환승",
      "2 Min. zum Busbahnhof · 9 Min. Puffer": "버스 터미널까지 2분 · 여유 9분",
      "bis Zinzendorfplatz · 21 Min.": "진첸도르프 광장까지 · 21분",
      "Zinzendorfplatz": "진첸도르프 광장",
      "Ankunft direkt am Platz": "광장 바로 앞 도착",
      "Herrnhut": "헤른후트",
      "Kirchensaal & Ausstellung": "교회당 & 전시",
      "„gemeinsam glauben leben“ · öffnet 14:00": "‘gemeinsam glauben leben’ · 14:00 개방",
      "Fußweg zum Gottesacker": "묘지(Gottesacker)까지 도보",
      "Gottesacker": "고테스아커 묘지",
      "Rückweg zum Zinzendorfplatz": "진첸도르프 광장으로 복귀",
      "Puffer: Kuchen im Café Förster": "여유 시간: 카페 푀르스터에서 케이크",
      "4 Min. vom Platz · um 15:55 an der Haltestelle sein": "광장에서 4분 · 15:55까지 정류장 도착",
      "Zinzendorfplatz Steig 2 → Ottokarplatz · 34 Min.": "진첸도르프 광장 2번 정류장 → 오토카르 광장 · 34분",
      "Fußweg Ottokarplatz → Markt": "오토카르 광장 → 마르크트 광장 도보",
      "Zittau": "치타우",
      "Markt": "마르크트 광장",
      "Marsbrunnen, Bürgerhäuser": "마르스 분수, 시민 주택",
      "Rathaus": "시청",
      "von außen": "외관",
      "Johanniskirche": "요한 교회",
      "innen nur bis 17:00 – außen": "내부는 17:00까지 – 외관 감상",
      "Salzhaus & Neustadt": "잘츠하우스 & 노이슈타트",
      "Klosterplatz": "클로스터 광장",
      "Abschluss des Rundgangs": "산책 마무리",
      "Freie Zeit": "자유 시간",
      "Café am Markt oder Bummel": "광장 카페 또는 산책",
      "Abendessen im Dornspachhaus": "도른슈파흐하우스에서 저녁",
      "Bautzner Str. 2 · reservieren": "Bautzner Str. 2 · 예약하기",
      "Fußweg zum Bahnhof Zittau": "치타우역까지 도보",
      "ca. 850 m · 11 Min. · 10 Min. Puffer": "약 850 m · 11분 · 여유 10분",
      "Gleis 2b → Gleis 11 · direkt": "2b번 → 11번 승강장 · 직행",
      "Zinzendorfplatz + Kirchensaal": "진첸도르프 광장 + 교회당",
      "kurzer Besuch der Ausstellung": "전시 짧게 관람",
      "Kurzer Rundgang": "짧은 산책",
      "Richtung Gottesacker (unterer Teil) und zurück": "묘지 아래쪽까지 갔다가 돌아오기",
      "Zurück zur Haltestelle": "정류장으로 복귀",
      "Zinzendorfplatz, Steig 2": "진첸도르프 광장, 2번 정류장",
      "→ Ottokarplatz · 34 Min.": "→ 오토카르 광장 · 34분",
      "Fußweg zur Kirche zum Heiligen Kreuz": "성 십자가 교회까지 도보",
      "Großes Zittauer Fastentuch": "치타우 대형 사순절 휘장",
      "Museum schließt 17:00": "박물관 17:00 마감",
      "Fußweg zum Markt": "마르크트 광장까지 도보",
      "Johanniskirche (innen bis 17:00)": "요한 교회 (내부 17:00까지)",
      "zuerst hierhin": "여기 먼저",
      "Markt & Rathaus": "마르크트 광장 & 시청",
      "Dresden → Bautzen": "드레스덴 → 바우첸",
      "07:53 → 08:53 (RB60, früher)": "07:53 → 08:53 (RB60, 더 이른 열차)",
      "08:53 → 09:55 (RB60, falls der 08:23 verpasst wird)": "08:53 → 09:55 (RB60, 08:23 열차를 놓쳤을 때)",
      "Bautzen → Löbau → Herrnhut": "바우첸 → 뢰바우 → 헤른후트",
      "Früher: RE1 12:19 → Löbau 12:33, Bus 10 12:38 → Herrnhut 13:00": "더 이른 편: RE1 12:19 → 뢰바우 12:33, 10번 버스 12:38 → 헤른후트 13:00",
      "Später (Notfall): RE1 14:19 → Löbau 14:32, Bus 10 14:38 → Herrnhut 15:00": "늦은 편 (비상시): RE1 14:19 → 뢰바우 14:32, 10번 버스 14:38 → 헤른후트 15:00",
      "Umstieg: ca. 2 Min. Fußweg zum Busbahnhof direkt am Bahnhof": "환승: 기차역 바로 옆 버스 터미널까지 도보 약 2분",
      "9 Min. Umstiegszeit": "환승 시간 9분",
      "Steig Ri. 1 Zittau": "‘Ri. 1 Zittau’ 정류장",
      "Herrnhut → Zittau": "헤른후트 → 치타우",
      "Früher: Bus 10 um 15:30 → Zittau Bahnhof 15:54 (dann ca. 15 Min. zu Fuß in die Altstadt)": "더 이른 편: 15:30 10번 버스 → 치타우역 15:54 (이후 구시가지까지 도보 약 15분)",
      "Der Bus hält vorher auch am Zittau Bahnhof (16:28). Für die Altstadt bis Ottokarplatz sitzen bleiben.": "버스는 먼저 치타우역(16:28)에도 섭니다. 구시가지로 가려면 오토카르 광장까지 계속 타고 가세요.",
      "Hinweis: Einen Bus um 15:57 Uhr gibt es laut Auskunft nicht – die Fahrten sind um 15:30 und 16:00 Uhr.": "참고: 시간표 조회 결과 15:57 버스는 없습니다. 버스는 15:30과 16:00에 있습니다.",
      "Steig 2 – Ri. Zittau": "2번 정류장 – 치타우 방면",
      "Endhaltestelle": "종점",
      "Herrnhut → Zittau (Fastentuch-Variante)": "헤른후트 → 치타우 (휘장 일정)",
      "Noch früher: Bus 10 um 14:30 → Zittau Bahnhof 14:54": "더 이른 편: 14:30 10번 버스 → 치타우역 14:54",
      "Zittau → Dresden": "치타우 → 드레스덴",
      "Empfohlen": "추천",
      "Direkt, ohne Umstieg, 1:56 h": "환승 없는 직행, 1시간 56분",
      "Spät-Alternative": "늦은 대안",
      "1 Umstieg in Löbau (20 Min.), Ankunft 23:57": "뢰바우 1회 환승 (20분), 23:57 도착",
      "Letzte Möglichkeit": "마지막 편",
      "Direkt, Ankunft nach Mitternacht": "직행, 자정 이후 도착",
      "Früher": "더 이른 편",
      "Nur mit kurzem Abendessen (bis ca. 19:45)": "저녁을 짧게 먹을 때만 (약 19:45까지)",
      "Erste Empfehlung": "1순위 추천",
      "Alternative": "대안",
      "VVO-Fahrplanauskunft (Verbindungen am 25.09.2026)": "VVO 시간표 조회 (2026년 9월 25일 교통편)",
      "ZVON – Zweckverband Verkehrsverbund Oberlausitz-Niederschlesien": "ZVON – 오버라우지츠·니더슐레지엔 교통 연합",
      "Stadt Bautzen – Öffnungszeiten ausgewählter Sehenswürdigkeiten (PDF)": "바우첸시 – 주요 명소 운영 시간 (PDF)",
      "Ausstellung „gemeinsam glauben leben“, Herrnhut": "전시 ‘gemeinsam glauben leben’, 헤른후트",
      "Stadt Herrnhut – Gastronomie": "헤른후트시 – 식당 및 카페",
      "Stadt Zittau – Städtische Museen, Besucherservice": "치타우시 – 시립 박물관 방문 안내",
      "Johanniskirche Zittau": "치타우 요한 교회",
      "OpenStreetMap (Café-Öffnungszeiten, Karten, Fußwege)": "OpenStreetMap (카페 영업시간, 지도, 도보 경로)",
      "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)": "날씨: Open-Meteo (무료, API 키 불필요)"
    }
  };

  // ------------------------------------------------------------------ Muster
  var rules = {
    en: [
      [/^ca\. ([\d,]+) (k?m) · (\d+) Min\.$/, function (m, a, u, n) { return "approx. " + a.replace(",", ".") + " " + u + " · " + n + " min"; }],
      [/^(\d+(?:–\d+)?) Min\.$/, function (m, a) { return a + " min"; }],
      [/^Gleis (\w+)$/, function (m, a) { return "Platform " + a; }],
      [/^Steig (\w+)$/, function (m, a) { return "Stop " + a; }]
    ],
    ko: [
      [/^ca\. ([\d,]+) (k?m) · (\d+) Min\.$/, function (m, a, u, n) { return "약 " + a.replace(",", ".") + " " + u + " · " + n + "분"; }],
      [/^(\d+(?:–\d+)?) Min\.$/, function (m, a) { return a + "분"; }],
      [/^Gleis (\w+)$/, function (m, a) { return a + "번 승강장"; }],
      [/^Steig (\w+)$/, function (m, a) { return a + "번 정류장"; }]
    ]
  };

  // Bewusst unübersetzt (Liniennamen, Eigennamen)
  var keep = {
    en: ["RB60 Dresden Hbf → Bautzen", "RB60 Bautzen → Löbau", "PlusBus 10 Löbau → Herrnhut", "PlusBus 10 Herrnhut → Zittau", "RB61 Zittau → Dresden Hbf",
      "Bautzen", "Herrnhut", "Zittau", "Zinzendorfplatz", "Klosterplatz", "Kornmarkt & Reichenstraße", "Dresden → Bautzen", "Bautzen → Löbau → Herrnhut",
      "Herrnhut → Zittau", "Zittau → Dresden", "Alternative", "DB Navigator / bahn.de", "Wjelbik", "Mönchshof Bautzen", "Dornspachhaus Zittau", "Zum Alten Sack Zittau"],
    ko: ["RB60 Dresden Hbf → Bautzen", "RB60 Bautzen → Löbau", "PlusBus 10 Löbau → Herrnhut", "PlusBus 10 Herrnhut → Zittau", "RB61 Zittau → Dresden Hbf",
      "DB Navigator / bahn.de", "Wjelbik", "Mönchshof Bautzen", "Dornspachhaus Zittau", "Zum Alten Sack Zittau"]
  };

  window.I18N = { langs: ["de", "en", "ko"], labels: { de: "DE", en: "EN", ko: "한" }, ui: ui, content: content, phrases: phrases, rules: rules, keep: keep };
})();
