/*
 * Übersetzungen (Englisch, Koreanisch). Deutsch ist die Quelle in data.js bzw. index.html.
 *  - common:   Oberflächentexte, die für alle Ausflugs-Apps gleich sind
 *  - trip:     Oberflächentexte nur für diesen Ausflug (werden über common gelegt)
 *  - content:  Texte zu Sehenswürdigkeiten, Restaurants, Cafés – nach id
 *  - phrases:  kurze Texte aus Tagesplan, Verbindungen, Quellen – nach deutschem Originaltext
 *  - rules:    Muster für wiederkehrende Angaben (Gleis, Gehzeit …)
 * Prüfen, ob etwas fehlt:  node tools/check-i18n.js
 */
(function () {
  "use strict";

  var OSM = '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">';
  var METEO = '<a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>';

  // ------------------------------------------------------------------ Gemeinsame Oberfläche (für alle Ausflugs-Apps gleich)
  var common = {
    de: {
      skip: "Zum Inhalt springen",
      startTravel: "Reisemodus starten",
      seePlan: "Tagesplan ansehen",
      photo: "Foto",
      navAria: "Abschnitte",
      navOverview: "Übersicht", navFood: "Essen", navTransport: "Anreise",
      themeAria: "Hell/Dunkel umschalten",
      langAria: "Sprache",
      noticeTitle: "Beispielzeiten – bitte Fahrplan prüfen.",
      checked: function (d) { return "Recherche-Stand: " + d; },
      overviewTitle: "Der Tag im Überblick",
      overviewHint: "Tippe auf einen Punkt, um zur passenden Stelle zu springen. Die Uhrzeiten sind ein Beispielablauf.",
      timelineAria: "Tagesablauf",
      map: "Karte", mapAll: "Gesamt", mapOverviewAria: "Übersichtskarte",
      mapCityAria: function (c) { return "Karte " + c; },
      weatherTitle: "Wetter heute",
      weatherNote: "Vorhersage: " + METEO + " · wird beim Öffnen der Seite live für den heutigen Tag geladen.",
      rain: function (p) { return "Regen bis " + p + "%"; },
      hourRange: function (a, b) { return a + "–" + b + " Uhr"; },
      routeAria: "Rundgang",
      optionalHead: "Optional – nicht im Hauptplan",
      foodTitle: "Essen & Cafés",
      cafesHead: "Cafés entlang der Route",
      cafesNote: "Nur real existierende Cafés; Öffnungszeiten aus Recherche (Suchergebnisse), teils unvollständig. Preisniveau ist eine Einschätzung.",
      connTitle: "Anreise & Verbindungen",
      connNoticeTitle: "Alle Fahrzeiten sind Beispiele.",
      footerTitle: "Quellen & Hinweise",
      footerText: function (d) { return "Die Angaben wurden am " + d + " recherchiert (über Suchergebnisse, nicht jede einzeln vor Ort geprüft). Fahrzeiten sind Beispielzeiten. Wo Quellen sich widersprechen oder nichts verlässlich zu finden war, steht „bitte prüfen“."; },
      footerFine: "Karten © " + OSM + "OpenStreetMap-Mitwirkende</a>. „Besucht“ und Favoriten werden nur lokal in diesem Browser gespeichert.",
      reset: "Gespeicherte Häkchen & Favoriten zurücksetzen",
      resetConfirm: "Alle Häkchen und Favoriten auf diesem Gerät löschen?",
      fab: "Reisemodus",
      travelTitle: "Jetzt unterwegs",
      travelClose: "Reisemodus beenden",
      simSummary: "Uhrzeit simulieren (zum Ausprobieren)",
      simLabel: "Datum/Uhrzeit",
      simApply: "Übernehmen", simClear: "Echte Uhrzeit", simBadge: "Simulation",

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
      depPhrase: function (kind, city) { return ({ train: "Zug", tram: "Straßenbahn", metro: "U-Bahn" }[kind] || "Bus") + " nach " + city; },
      departsNow: function (label) { return label + " fährt jetzt"; },

      statDuration: "Gesamtdauer", statCities: "Bereiche", statWalk: "Gehstrecke", statStart: "Start", statReturn: "Rückkehr",
      durHM: function (h, m) { return h + " Std. " + m + " Min."; },

      stFree: "frei zugänglich", stCheck: "bitte prüfen",
      stSoon: function (t) { return "schließt bald (" + t + ")"; },
      stOpenUntil: function (t) { return "geöffnet bis " + t; },
      stClosedOpens: function (t) { return "geschlossen · öffnet " + t; },
      stClosedNow: "jetzt geschlossen", stClosedToday: "heute geschlossen",
      stTitle: "Jetzt, laut hinterlegten Öffnungszeiten",
      verifyBadge: "vor Besuch prüfen",

      favAria: function (n) { return n + " als Favorit markieren"; },
      optional: "Optional",
      recommended: function (d) { return "<strong>" + d + "</strong> empfohlen"; },
      aDuration: "Dauer", aWalk: "Fußweg", aHours: "Öffnungszeiten", aTip: "Tipp",
      visited: "besucht",
      website: "Website", reserve: "Reservieren", call: "Anrufen", details: "Details",
      osmAria: function (n) { return n + " in OpenStreetMap"; },
      planned: "Geplant",
      noRating: "Keine verlässliche Bewertungsübersicht gefunden – siehe Google Maps",

      tagOut: "Hinfahrt", tagReturn: "Rückfahrt", planSwitchAria: "Tagesplan wählen",
      alternatives: "Alternativen",
      dirShort: function (d) { return "Ri. " + d; },
      connChecked: function (d) { return "Stand " + d + " · Beispielzeiten, bitte am Reisetag prüfen"; },

      popStop: "Haltestelle", popStation: "Bahnhof", popCafe: "Café", popOptional: "optional", popDetails: "Details ↓",
      ttTrain: "Zug (schematisch)", ttReturn: "Rückfahrt (schematisch)",
      lgStation: "Bahnhof", lgSight: "Sehenswürdigkeit", lgFood: "Restaurant", lgCafe: "Café", lgOptional: "Optional",
      mapFail: "Karte konnte nicht geladen werden (offline?). Links bei den Orten funktionieren weiterhin.",

      wx: { clear: "klar", mainly: "überwiegend klar", partly: "teils bewölkt", overcast: "bedeckt", fog: "Nebel", drizzle: "Niesel", rain: "Regen", heavyRain: "starker Regen", showers: "Schauer", heavyShowers: "heftige Schauer", storm: "Gewitter" },

      notYet: "Noch nicht unterwegs",
      tripDate: "Tagesausflug ab Dresden",
      untilFirst: function (title, t) { return "bis zur ersten Abfahrt: " + title + " um " + t + " Uhr"; },
      meetLabel: "Treffpunkt",
      travelIntro: "Der Reisemodus folgt dem Beispielablauf für heute: nächste Station, Abfahrt und Gehzeit. Zum Ausprobieren unten „Uhrzeit simulieren“ nutzen.",
      doneLabel: "Geschafft", doneBig: "Der Ausflug ist vorbei.",
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
      travelFoot: function (d) { return "Beispielzeiten – echte Abfahrten im DB Navigator prüfen · Stand " + d; }
    },

    en: {
      skip: "Skip to content",
      startTravel: "Start travel mode",
      seePlan: "View day plan",
      photo: "Photo",
      navAria: "Sections",
      navOverview: "Overview", navFood: "Food", navTransport: "Getting there",
      themeAria: "Toggle light/dark mode",
      langAria: "Language",
      noticeTitle: "Example times – please check the timetable.",
      checked: function (d) { return "Researched: " + d; },
      overviewTitle: "The day at a glance",
      overviewHint: "Tap an entry to jump to the matching section. The times are an example schedule.",
      timelineAria: "Schedule",
      map: "Map", mapAll: "All", mapOverviewAria: "Overview map",
      mapCityAria: function (c) { return "Map " + c; },
      weatherTitle: "Weather today",
      weatherNote: "Forecast: " + METEO + " · loaded live for today when the page opens.",
      rain: function (p) { return "Rain up to " + p + "%"; },
      hourRange: function (a, b) { return a + ":00–" + b + ":00"; },
      routeAria: "Walking route",
      optionalHead: "Optional – not in the main plan",
      foodTitle: "Food & cafés",
      cafesHead: "Cafés along the route",
      cafesNote: "Only cafés that actually exist; opening hours from research (search results), partly incomplete. Price level is an estimate.",
      connTitle: "Getting there & connections",
      connNoticeTitle: "All travel times are examples.",
      footerTitle: "Sources & notes",
      footerText: function (d) { return "This information was researched on " + d + " (via search results, not each item checked on site). Travel times are examples. Where sources contradict each other or nothing reliable could be found, the page says “please check”."; },
      footerFine: "Maps © " + OSM + "OpenStreetMap contributors</a>. “Visited” marks and favourites are only stored locally in this browser.",
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
      depPhrase: function (kind, city) { return ({ train: "Train", tram: "Tram", metro: "Metro" }[kind] || "Bus") + " to " + city; },
      departsNow: function (label) { return label + " departs now"; },

      statDuration: "Total duration", statCities: "Areas", statWalk: "Walking", statStart: "Start", statReturn: "Back",
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

      tagOut: "Outbound", tagReturn: "Return", planSwitchAria: "Choose day plan",
      alternatives: "Alternatives",
      dirShort: function (d) { return "to " + d; },
      connChecked: function (d) { return "As of " + d + " · example times, please check on the day of travel"; },

      popStop: "Stop", popStation: "Train station", popCafe: "Café", popOptional: "optional", popDetails: "Details ↓",
      ttTrain: "Train (schematic)", ttReturn: "Return (schematic)",
      lgStation: "Station", lgSight: "Sight", lgFood: "Restaurant", lgCafe: "Café", lgOptional: "Optional",
      mapFail: "The map could not be loaded (offline?). The links for each place still work.",

      wx: { clear: "clear", mainly: "mainly clear", partly: "partly cloudy", overcast: "overcast", fog: "fog", drizzle: "drizzle", rain: "rain", heavyRain: "heavy rain", showers: "showers", heavyShowers: "heavy showers", storm: "thunderstorm" },

      notYet: "Not on the road yet",
      tripDate: "Day trip from Dresden",
      untilFirst: function (title, t) { return "until the first departure: " + title + " at " + t; },
      meetLabel: "Meeting point",
      travelIntro: "Travel mode follows today's example schedule: next stop, departure and walking time. To try it out, use “Simulate time” below.",
      doneLabel: "Done", doneBig: "The trip is over.",
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
      travelFoot: function (d) { return "Example times – check real departures in DB Navigator · as of " + d; }
    },

    ko: {
      skip: "본문으로 건너뛰기",
      startTravel: "여행 모드 시작",
      seePlan: "일정 보기",
      photo: "사진",
      navAria: "섹션",
      navOverview: "개요", navFood: "식사", navTransport: "교통",
      themeAria: "라이트/다크 모드 전환",
      langAria: "언어",
      noticeTitle: "예시 시간입니다 – 시간표를 꼭 확인하세요.",
      checked: function (d) { return "조사 기준일: " + d; },
      overviewTitle: "하루 일정 한눈에 보기",
      overviewHint: "항목을 누르면 해당 섹션으로 이동합니다. 시간은 예시 일정입니다.",
      timelineAria: "하루 일정",
      map: "지도", mapAll: "전체", mapOverviewAria: "전체 지도",
      mapCityAria: function (c) { return c + " 지도"; },
      weatherTitle: "오늘 날씨",
      weatherNote: "예보: " + METEO + " · 페이지를 열 때 오늘 날씨를 실시간으로 불러옵니다.",
      rain: function (p) { return "강수 확률 최대 " + p + "%"; },
      hourRange: function (a, b) { return a + "–" + b + "시"; },
      routeAria: "도보 코스",
      optionalHead: "선택 사항 – 기본 일정에는 없음",
      foodTitle: "식당 & 카페",
      cafesHead: "코스 주변 카페",
      cafesNote: "실제로 있는 카페만 소개합니다. 영업시간은 검색 결과 기준이라 일부 불완전하며, 가격대는 추정치입니다.",
      connTitle: "가는 방법 & 교통편",
      connNoticeTitle: "모든 이동 시간은 예시입니다.",
      footerTitle: "출처 및 참고",
      footerText: function (d) { return "정보는 " + d + "에 검색 결과를 통해 조사했으며, 하나하나 현장에서 확인한 것은 아닙니다. 이동 시간은 예시입니다. 출처가 서로 다르거나 믿을 만한 정보를 찾지 못한 곳에는 ‘확인 필요’라고 표시했습니다."; },
      footerFine: "지도 © " + OSM + "OpenStreetMap 기여자</a>. ‘방문함’ 표시와 즐겨찾기는 이 브라우저에만 저장됩니다.",
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
      depPhrase: function (kind, city) { return city + "행 " + ({ train: "기차", tram: "트램", metro: "지하철" }[kind] || "버스"); },
      departsNow: function (label) { return label + " 지금 출발"; },

      statDuration: "총 소요 시간", statCities: "구역", statWalk: "도보 거리", statStart: "출발", statReturn: "귀환",
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

      tagOut: "가는 길", tagReturn: "돌아오는 길", planSwitchAria: "일정 선택",
      alternatives: "다른 교통편",
      dirShort: function (d) { return d + " 방면"; },
      connChecked: function (d) { return d + " 기준 · 예시 시간이니 여행 당일 확인하세요"; },

      popStop: "정류장", popStation: "기차역", popCafe: "카페", popOptional: "선택", popDetails: "자세히 ↓",
      ttTrain: "기차 (개략도)", ttReturn: "귀가 (개략도)",
      lgStation: "기차역", lgSight: "명소", lgFood: "식당", lgCafe: "카페", lgOptional: "선택",
      mapFail: "지도를 불러오지 못했습니다 (오프라인?). 각 장소의 링크는 계속 사용할 수 있습니다.",

      wx: { clear: "맑음", mainly: "대체로 맑음", partly: "구름 조금", overcast: "흐림", fog: "안개", drizzle: "이슬비", rain: "비", heavyRain: "강한 비", showers: "소나기", heavyShowers: "강한 소나기", storm: "뇌우" },

      notYet: "아직 출발 전",
      tripDate: "드레스덴 출발 당일 여행",
      untilFirst: function (title, t) { return "첫 출발까지: " + title + ", " + t; },
      meetLabel: "만나는 곳",
      travelIntro: "여행 모드는 오늘의 예시 일정을 따라 다음 장소, 출발 시간, 도보 시간을 보여 줍니다. 미리 체험하려면 아래 ‘시간 시뮬레이션’을 사용하세요.",
      doneLabel: "완료", doneBig: "여행이 끝났습니다.",
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
      travelFoot: function (d) { return "예시 시간 – 실제 출발은 DB Navigator에서 확인하세요 · " + d + " 기준"; }
    }
  };

  // ------------------------------------------------------------------ Leipzig-spezifische Oberfläche
  var trip = {
    de: {
      docTitle: "Tagesausflug Leipzig",
      heroEyebrow: "Reisebegleiter · Leipzig",
      heroTitle: "Tagesausflug Leipzig",
      heroRoute: "Dresden <span>→</span> Leipzig <span>→</span> Dresden",
      heroMeta: "Tagesausflug mit der Bahn · RE50 mit Deutschlandticket · Beispielablauf",
      heroAria: "Leipzig",
      noticeText: "Der RE50 fährt stündlich – die Uhrzeiten hier sind ein Beispiel. Bitte die passende Abfahrt im DB Navigator wählen; Straßenbahnzeiten in der LVB-App prüfen.",
      foodLead: "Mittags in der Innenstadt, abends am Karl-Heine-Kanal – Reservierung empfohlen.",
      lunchHead: "Mittagessen in der Innenstadt",
      dinnerHead: "Abendessen in Plagwitz",
      connLead: "Regionalzug RE50 und Leipziger Straßenbahn – alles mit dem Deutschlandticket. Keine Reservierung nötig.",
      nav_zentrum: "Innenstadt", nav_voelkerschlacht: "Völkerschlachtdenkmal", nav_plagwitz: "Plagwitz",
      area_zentrum: "Innenstadt", area_voelkerschlacht: "Völkerschlachtdenkmal", area_plagwitz: "Plagwitz",
      ar_zentrum_eyebrow: "Bereich 1 · ca. 10:00–14:30",
      ar_zentrum_title: "Innenstadt",
      ar_zentrum_lead: "Vom größten Kopfbahnhof Europas über Augustusplatz und Nikolaikirche zum Markt, zu Auerbachs Keller und Bachs Thomaskirche – alles kompakt zu Fuß.",
      ar_voelkerschlacht_eyebrow: "Bereich 2 · ca. 15:00–16:30",
      ar_voelkerschlacht_title: "Völkerschlachtdenkmal",
      ar_voelkerschlacht_lead: "Das 91 m hohe Denkmal im Südosten der Stadt – mit der Straßenbahn in einer Viertelstunde erreichbar.",
      ar_plagwitz_eyebrow: "Bereich 3 · ca. 17:15–19:45",
      ar_plagwitz_title: "Plagwitz",
      ar_plagwitz_lead: "Ehemaliges Industrieviertel am Karl-Heine-Kanal: sanierte Fabriken, Kunst in der Spinnerei und ein Abendessen über dem Wasser.",
      cityName: function (c) { return c; },
      citiesVal: "3 in Leipzig",
      meetVal: function (t) { return "Dresden Hbf, " + t + " Uhr"; },
      meetSub: "RE50 Richtung Leipzig, Beispielzeit 08:10 Uhr (stündlich – Gleis prüfen)",
      doneSub: "Hoffentlich war es ein schöner Tag in Leipzig!",
      tagTram1: "Nachmittag", tagTram2: "Spätnachmittag",
      ttTram: "Straßenbahn 15 (schematisch)", ttTram2: "Straßenbahn 15 + 14 (schematisch)",
      lgBus: "Straßenbahn"
    },
    en: {
      docTitle: "Day Trip to Leipzig",
      heroEyebrow: "Travel companion · Leipzig",
      heroTitle: "Day Trip to Leipzig",
      heroRoute: "Dresden <span>→</span> Leipzig <span>→</span> Dresden",
      heroMeta: "Day trip by train · RE50 with the Deutschlandticket · example schedule",
      heroAria: "Leipzig",
      noticeText: "The RE50 runs hourly – the times shown are an example. Please pick a suitable departure in DB Navigator and check tram times in the LVB app.",
      foodLead: "Lunch in the city centre, dinner on the Karl-Heine canal – booking recommended.",
      lunchHead: "Lunch in the city centre",
      dinnerHead: "Dinner in Plagwitz",
      connLead: "Regional train RE50 and Leipzig's trams – all covered by the Deutschlandticket. No reservations needed.",
      nav_zentrum: "City centre", nav_voelkerschlacht: "Battle monument", nav_plagwitz: "Plagwitz",
      area_zentrum: "City centre", area_voelkerschlacht: "Monument to the Battle of the Nations", area_plagwitz: "Plagwitz",
      ar_zentrum_eyebrow: "Area 1 · approx. 10:00–14:30",
      ar_zentrum_title: "City centre",
      ar_zentrum_lead: "From Europe's largest terminus station via Augustusplatz and St. Nicholas' Church to the market square, Auerbachs Keller and Bach's St. Thomas' Church – all compact and walkable.",
      ar_voelkerschlacht_eyebrow: "Area 2 · approx. 15:00–16:30",
      ar_voelkerschlacht_title: "Monument to the Battle of the Nations",
      ar_voelkerschlacht_lead: "The 91 m monument in the south-east of the city – a quarter of an hour away by tram.",
      ar_plagwitz_eyebrow: "Area 3 · approx. 17:15–19:45",
      ar_plagwitz_title: "Plagwitz",
      ar_plagwitz_lead: "A former industrial district on the Karl-Heine canal: restored factories, art at the Spinnerei and dinner above the water.",
      cityName: function (c) { return { "Völkerschlachtdenkmal": "the Battle monument", "Hauptbahnhof": "the main station" }[c] || c; },
      citiesVal: "3 in Leipzig",
      meetVal: function (t) { return "Dresden Hbf, " + t; },
      meetSub: "RE50 towards Leipzig, example time 08:10 (hourly – check the platform)",
      doneSub: "Hope you had a lovely day in Leipzig!",
      tagTram1: "Afternoon", tagTram2: "Late afternoon",
      ttTram: "Tram 15 (schematic)", ttTram2: "Tram 15 + 14 (schematic)",
      lgBus: "Tram"
    },
    ko: {
      docTitle: "라이프치히 당일 여행",
      heroEyebrow: "여행 가이드 · 라이프치히",
      heroTitle: "라이프치히 당일 여행",
      heroRoute: "드레스덴 <span>→</span> 라이프치히 <span>→</span> 드레스덴",
      heroMeta: "기차 당일 여행 · 도이칠란트티켓으로 RE50 · 예시 일정",
      heroAria: "라이프치히",
      noticeText: "RE50은 1시간 간격으로 운행하며, 여기 시간은 예시입니다. DB Navigator에서 알맞은 출발편을 고르고, 트램 시간은 LVB 앱에서 확인하세요.",
      foodLead: "점심은 구시가지, 저녁은 카를-하이네 운하에서 – 예약을 권합니다.",
      lunchHead: "구시가지에서 점심",
      dinnerHead: "플라크비츠에서 저녁",
      connLead: "지역 열차 RE50과 라이프치히 트램만 이용하며 모두 도이칠란트티켓으로 탈 수 있습니다. 예약은 필요 없습니다.",
      nav_zentrum: "구시가지", nav_voelkerschlacht: "전투기념비", nav_plagwitz: "플라크비츠",
      area_zentrum: "구시가지", area_voelkerschlacht: "라이프치히 전투 기념비", area_plagwitz: "플라크비츠",
      ar_zentrum_eyebrow: "구역 1 · 약 10:00–14:30",
      ar_zentrum_title: '구시가지 <span class="sorb">Innenstadt</span>',
      ar_zentrum_lead: "유럽에서 가장 큰 종착역에서 아우구스투스 광장과 니콜라이 교회를 지나 마르크트 광장, 아우어바흐스 켈러, 바흐의 토마스 교회까지 – 모두 걸어서 다닐 수 있습니다.",
      ar_voelkerschlacht_eyebrow: "구역 2 · 약 15:00–16:30",
      ar_voelkerschlacht_title: '라이프치히 전투 기념비 <span class="sorb">Völkerschlachtdenkmal</span>',
      ar_voelkerschlacht_lead: "도시 남동쪽에 있는 높이 91 m의 기념비로, 트램으로 15분 거리입니다.",
      ar_plagwitz_eyebrow: "구역 3 · 약 17:15–19:45",
      ar_plagwitz_title: '플라크비츠 <span class="sorb">Plagwitz</span>',
      ar_plagwitz_lead: "카를-하이네 운하를 따라 있는 옛 공업 지구: 복원된 공장, 슈피너라이의 예술, 그리고 물 위에서의 저녁 식사.",
      cityName: function (c) { return { Dresden: "드레스덴", Leipzig: "라이프치히", Augustusplatz: "아우구스투스 광장", "Völkerschlachtdenkmal": "전투기념비", Plagwitz: "플라크비츠", Hauptbahnhof: "중앙역" }[c] || c; },
      citiesVal: "라이프치히 3곳",
      meetVal: function (t) { return "드레스덴 중앙역, " + t; },
      meetSub: "라이프치히행 RE50, 예시 시간 08:10 (1시간 간격 – 승강장 확인)",
      doneSub: "라이프치히에서 즐거운 하루 보내셨기를!",
      tagTram1: "오후", tagTram2: "늦은 오후",
      ttTram: "트램 15 (개략도)", ttTram2: "트램 15 + 14 (개략도)",
      lgBus: "트램"
    }
  };

  // ------------------------------------------------------------------ Inhalte nach id
  var content = {
    en: {
      "le-hbf": {
        name: "Main station & Promenaden",
        text: "With 83,640 m² of floor space, Europe's largest terminus station by area; the “Promenaden” mall has around 140 shops on three levels.",
        why: "An impressive station hall – the natural start to the day.",
        duration: "10–15 min", walkText: "right on arrival",
        hoursNote: "Station open around the clock; Promenaden shops Mon–Sat 9:30–21:00, Sun 12:00–18:00 (please check Sunday)."
      },
      "le-augustus": {
        name: "Augustusplatz: Gewandhaus, Opera & Paulinum",
        text: "One of Germany's largest squares (laid out from 1831), with the 1981 Gewandhaus concert hall, the 1960 opera house and the new university buildings including the Paulinum, which recalls the University Church blown up in 1968.",
        why: "Leipzig's musical and university life in one place.",
        duration: "10 min", walkText: "approx. 700 m · 10 min from the main station",
        hoursNote: "Public square – always accessible."
      },
      "le-panorama": {
        name: "Panorama Tower (City-Hochhaus)",
        text: "The 142.5 m City-Hochhaus on Augustusplatz has a viewing platform on the 31st floor, about 120 m up.",
        why: "The best view over Leipzig – ideal for getting your bearings at the start.",
        duration: "20–30 min", walkText: "right on Augustusplatz",
        hoursNote: "Platform daily from 9:00 until 30 min before the restaurant closes (approx. Mon–Thu 22:00, Fri–Sat 23:00, Sun 21:30) – not confirmed as current.",
        extra: "Admission approx. €5 (coin machine at the lift).",
        hoursLabel: "Viewing platform"
      },
      "le-nikolai": {
        name: "St. Nicholas' Church (Nikolaikirche)",
        text: "Leipzig's largest church. The peace prayers held here since 1982 became the starting point of the Monday demonstrations and the Peaceful Revolution of 1989.",
        why: "A key site of German reunification – with a classicist interior and palm-like columns.",
        duration: "20–25 min", walkText: "approx. 250 m · 3 min from Augustusplatz",
        hoursNote: "Mon–Fri 11:00–18:00, Sat 11:00–16:00, Sun 10:00–14:30 (secondary source). Free admission.",
        extra: "The peace prayer still takes place every Monday at 17:00."
      },
      "le-markt": {
        name: "Market square & Old Town Hall",
        text: "The Renaissance town hall of 1556/57 dominates the market square; inside, the Museum of City History tells Leipzig's story on three floors.",
        why: "One of Germany's finest Renaissance town halls – and the permanent exhibition is now free.",
        duration: "30–45 min", walkText: "approx. 300 m · 4 min from St. Nicholas' Church",
        hoursNote: "Square always accessible. Museum in the Old Town Hall Tue–Sun & public holidays 10:00–18:00, closed Mondays; permanent exhibition free.",
        hoursLabel: "Museum of City History"
      },
      "le-maedler": {
        name: "Mädler-Passage",
        text: "The 1912–14 shopping arcade with the statues of Faust and Mephisto at the stairs down to Auerbachs Keller, a setting in Goethe's “Faust”.",
        why: "Leipzig's most famous arcade and a literary landmark.",
        duration: "10 min", walkText: "approx. 150 m · 2 min from the market square",
        hoursNote: "Arcade open during the day."
      },
      "le-thomas": {
        name: "St. Thomas' Church (Thomaskirche)",
        text: "Johann Sebastian Bach was Thomaskantor here from 1723 to 1750; his grave is in the church. It is home to the St. Thomas Boys Choir.",
        why: "Bach's place of work – with luck you'll hear the Thomanerchor live.",
        duration: "20–30 min", walkText: "approx. 300 m · 4 min from the Mädler-Passage",
        hoursNote: "Visits daily approx. 12:00–16:00 according to research; may change at short notice because of rehearsals – please check.",
        extra: "Motets with the Thomanerchor: Fri 18:00, Sat 15:00 (programme at the door, entry from approx. 45 min before, no advance sales)."
      },
      "le-vsd": {
        name: "Monument to the Battle of the Nations",
        text: "The 91 m monument of 1913 commemorates the Battle of the Nations of 1813 – with a crypt, a viewing platform and the “Forum 1813” museum.",
        why: "One of Europe's largest monuments, with a wide view over the city.",
        duration: "60–75 min", walkText: "approx. 500 m · 7 min from the tram stop",
        hoursNote: "April–October daily 10:00–18:00, November–March daily 10:00–16:00.",
        extra: "Admission €10, reduced €8, families €20, children under 6 free.",
        planB: "In winter the monument closes at 16:00 – then visit it before lunch or shorten the city centre."
      },
      "le-kanal": {
        name: "Karl-Heine canal",
        text: "Begun by Karl Heine in 1856, the canal runs past restored factories – the whole district is a listed monument – with a walking and cycling path along the bank.",
        why: "Leipzig's industrial history turned into a lively neighbourhood – in summer people paddle on the canal.",
        duration: "45–60 min", walkText: "a few minutes from the S-Bf. Plagwitz tram stop",
        hoursNote: "Always accessible."
      },
      "le-zfl": {
        name: "Forum of Contemporary History",
        text: "The exhibition “Our History. Dictatorship and Democracy after 1945” shows around 2,000 objects on German division and the Peaceful Revolution.",
        why: "Free and brings 1989 to life – a perfect match for St. Nicholas' Church.",
        duration: "45–60 min", walkText: "next to the Mädler-Passage",
        hoursNote: "Tue–Fri 9:00–18:00, Sat/Sun & public holidays 10:00–18:00, closed Mondays. Free admission.",
        reason: "Not in the main plan: together with the monument and Plagwitz the day would get too full – a good alternative when it rains."
      },
      "le-bach": {
        name: "Bach Museum",
        text: "The museum in the Bosehaus opposite St. Thomas' Church is devoted to the life and work of Johann Sebastian Bach.",
        why: "The ideal complement to St. Thomas' Church.",
        duration: "45–60 min", walkText: "opposite St. Thomas' Church",
        hoursNote: "Tue–Sun 10:00–18:00, closed Mondays. Please check admission prices.",
        reason: "Not in the main plan – worthwhile for music lovers instead of the café break."
      },
      "le-spinnerei": {
        name: "Spinnerei (former cotton mill)",
        text: "The former cotton mill now houses around 100 studios and some 11 galleries – closely linked to the “New Leipzig School”.",
        why: "A centre of contemporary art in impressive industrial architecture; free entry to the galleries.",
        duration: "45–60 min", walkText: "approx. 5 min from the S-Bf. Plagwitz tram stop",
        hoursNote: "Galleries Tue–Sat 11:00–18:00, closed Sundays and Mondays.",
        reason: "Not in the main plan: you only reach Plagwitz around 17:15 and the galleries close at 18:00. To see them, shorten the monument."
      },

      "auerbach": {
        cuisine: "Saxon and seasonal cuisine",
        when: "lunch, approx. 12:30–13:30",
        text: "The famous restaurant beneath the Mädler-Passage is a setting in Goethe's “Faust”; there is the Large Cellar and the Historic Wine Rooms.",
        why: "A slice of literary history for lunch – right on the route.",
        hoursNote: "According to older information daily 11:30–24:00 – please check.",
        price: "€€–€€€ (estimate)",
        note: "Booking recommended, especially at weekends."
      },
      "zills": {
        cuisine: "Traditional inn, Saxon food, Gose beer",
        when: "alternative for lunch – or for dinner if you'd rather eat in the centre",
        text: "A traditional inn since 1841 in the “Drallewatsch” pub quarter, known for Saxon dishes and Leipzig Gose.",
        hoursNote: "According to research daily 11:30–24:00 – please check.",
        price: "€€ (estimate)"
      },
      "stelzenhaus": {
        cuisine: "Modern, creative cuisine",
        when: "dinner, approx. 18:15–19:45",
        text: "A restaurant in a 1939 rolling-mill building that stands on stilts above the Karl-Heine canal.",
        why: "Industrial charm right on the water – a perfect fit after the canal walk.",
        hoursNote: "According to a business directory Mon–Sat 11:00–22:30, Sun 9:00–22:30 – please check.",
        price: "€€–€€€ (estimate)",
        note: "Booking recommended. If you'd rather eat in the centre: Zill's Tunnel (see above)."
      },

      "c-kandler": {
        text: "Confectionery café opposite St. Thomas' Church, known for the Leipziger Lerche pastry and the “Bachtaler”.",
        hoursNote: "Opening hours only partly documented (Mon–Thu approx. 10:00–20:00) – please check.",
        special: "Leipziger Lerche", price: "€ (estimate)", distance: "opposite St. Thomas' Church"
      },
      "c-coffebaum": {
        text: "One of Germany's oldest coffee houses – coffee has been served here since 1711; with a free coffee museum.",
        hoursNote: "Reopened on 1 July 2025 after renovation; daily approx. 11:00–19:00 (please check).",
        special: "Coffee museum (free)", price: "€–€€ (estimate)", distance: "approx. 3 min from the market square"
      },
      "c-riquet": {
        text: "Coffee house with Art Nouveau and Chinese-inspired façade – copper elephant heads guard the entrance.",
        hoursNote: "Conflicting information (sometimes daily 9:00–24:00) – please check.",
        special: "Coffee-house atmosphere", price: "€–€€ (estimate)", distance: "approx. 2 min from St. Nicholas' Church"
      }
    },
    ko: {
      "le-hbf": {
        name: "중앙역 & 프로메나덴",
        text: "면적 83,640 m²로 유럽에서 가장 큰 종착역이며, ‘프로메나덴’에는 3개 층에 약 140개 상점이 있습니다.",
        why: "인상적인 역 홀 – 하루를 시작하기에 딱 좋은 곳입니다.",
        duration: "10–15분", walkText: "도착하자마자",
        hoursNote: "역은 24시간 개방; 프로메나덴 상점 월–토 9:30–21:00, 일 12:00–18:00 (일요일은 확인 필요)."
      },
      "le-augustus": {
        name: "아우구스투스 광장: 게반트하우스, 오페라, 파울리눔",
        text: "1831년부터 조성된 독일에서 가장 큰 광장 중 하나로, 1981년 게반트하우스, 1960년 오페라 극장, 그리고 1968년 폭파된 대학 교회를 기리는 파울리눔이 포함된 새 대학 건물이 있습니다.",
        why: "라이프치히의 음악과 대학 생활을 한곳에서 볼 수 있습니다.",
        duration: "10분", walkText: "중앙역에서 약 700 m · 10분",
        hoursNote: "공공 광장 – 언제나 개방."
      },
      "le-panorama": {
        name: "파노라마 타워 (시티 고층빌딩)",
        text: "아우구스투스 광장의 높이 142.5 m 건물로, 31층 약 120 m 높이에 전망대가 있습니다.",
        why: "라이프치히 최고의 전망 – 처음에 도시를 한눈에 파악하기 좋습니다.",
        duration: "20–30분", walkText: "아우구스투스 광장 바로 옆",
        hoursNote: "전망대는 매일 9:00부터 레스토랑 마감 30분 전까지 (대략 월–목 22:00, 금–토 23:00, 일 21:30) – 최신 정보인지 확인 필요.",
        extra: "입장료 약 5유로 (엘리베이터 앞 동전 기계).",
        hoursLabel: "전망대"
      },
      "le-nikolai": {
        name: "니콜라이 교회",
        text: "라이프치히에서 가장 큰 교회. 1982년부터 열린 평화 기도회는 월요 시위와 1989년 평화 혁명의 출발점이 되었습니다.",
        why: "독일 통일의 핵심 장소 – 고전주의 내부와 야자나무 모양 기둥이 인상적입니다.",
        duration: "20–25분", walkText: "아우구스투스 광장에서 약 250 m · 3분",
        hoursNote: "월–금 11:00–18:00, 토 11:00–16:00, 일 10:00–14:30 (2차 출처). 무료 입장.",
        extra: "평화 기도회는 지금도 매주 월요일 17:00에 열립니다."
      },
      "le-markt": {
        name: "마르크트 광장 & 구 시청사",
        text: "1556/57년의 르네상스 시청사가 광장을 압도하며, 내부의 시립 역사 박물관이 3개 층에 걸쳐 라이프치히의 역사를 보여 줍니다.",
        why: "독일에서 가장 아름다운 르네상스 시청사 중 하나 – 상설 전시는 이제 무료입니다.",
        duration: "30–45분", walkText: "니콜라이 교회에서 약 300 m · 4분",
        hoursNote: "광장은 언제나 개방. 구 시청사 박물관 화–일 및 공휴일 10:00–18:00, 월요일 휴관; 상설 전시 무료.",
        hoursLabel: "시립 역사 박물관"
      },
      "le-maedler": {
        name: "메들러 파사주",
        text: "1912–14년에 지어진 쇼핑 아케이드로, 괴테의 『파우스트』 무대인 아우어바흐스 켈러로 내려가는 계단에 파우스트와 메피스토 조각상이 있습니다.",
        why: "라이프치히에서 가장 유명한 아케이드이자 문학 명소입니다.",
        duration: "10분", walkText: "마르크트 광장에서 약 150 m · 2분",
        hoursNote: "아케이드는 낮 동안 개방."
      },
      "le-thomas": {
        name: "토마스 교회",
        text: "요한 제바스티안 바흐가 1723–1750년 토마스 칸토르로 일한 곳으로, 교회 안에 그의 무덤이 있습니다. 토마스 합창단의 본거지입니다.",
        why: "바흐가 일한 곳 – 운이 좋으면 토마스 합창단의 노래를 직접 들을 수 있습니다.",
        duration: "20–30분", walkText: "메들러 파사주에서 약 300 m · 4분",
        hoursNote: "조사 기준 매일 약 12:00–16:00 관람 가능; 리허설로 갑자기 바뀔 수 있으니 확인하세요.",
        extra: "토마스 합창단 모테트: 금 18:00, 토 15:00 (입구에서 프로그램 판매, 약 45분 전 입장, 예매 없음)."
      },
      "le-vsd": {
        name: "라이프치히 전투 기념비",
        text: "1913년에 세워진 높이 91 m의 기념비로 1813년 라이프치히 전투를 기립니다. 지하 묘실, 전망대, ‘포룸 1813’ 박물관이 있습니다.",
        why: "유럽에서 가장 큰 기념물 중 하나로, 도시를 넓게 내려다볼 수 있습니다.",
        duration: "60–75분", walkText: "트램 정류장에서 약 500 m · 7분",
        hoursNote: "4–10월 매일 10:00–18:00, 11–3월 매일 10:00–16:00.",
        extra: "입장료 10유로, 할인 8유로, 가족 20유로, 6세 미만 무료.",
        planB: "겨울에는 16:00에 문을 닫으니, 점심 전에 방문하거나 구시가지 일정을 줄이세요."
      },
      "le-kanal": {
        name: "카를-하이네 운하",
        text: "1856년 카를 하이네가 조성하기 시작한 운하로, 복원된 공장들 사이를 지나며(지구 전체가 문화재) 둑을 따라 산책·자전거 길이 있습니다.",
        why: "라이프치히의 산업 역사가 활기찬 동네로 변신한 곳 – 여름에는 운하에서 카누를 탑니다.",
        duration: "45–60분", walkText: "S-Bf. Plagwitz 트램 정류장에서 몇 분",
        hoursNote: "언제나 개방."
      },
      "le-zfl": {
        name: "현대사 포럼",
        text: "전시 ‘우리의 역사. 1945년 이후의 독재와 민주주의’에서 독일 분단과 평화 혁명에 관한 약 2,000점의 물건을 보여 줍니다.",
        why: "무료이며 1989년을 생생하게 느낄 수 있어 니콜라이 교회와 잘 어울립니다.",
        duration: "45–60분", walkText: "메들러 파사주 옆",
        hoursNote: "화–금 9:00–18:00, 토/일 및 공휴일 10:00–18:00, 월요일 휴관. 무료 입장.",
        reason: "기본 일정에는 없음: 기념비와 플라크비츠까지 넣으면 하루가 너무 빡빡합니다 – 비 오는 날 좋은 대안입니다."
      },
      "le-bach": {
        name: "바흐 박물관",
        text: "토마스 교회 맞은편 보제하우스에 있는 박물관으로, 요한 제바스티안 바흐의 삶과 작품을 다룹니다.",
        why: "토마스 교회 방문을 완벽하게 보완해 줍니다.",
        duration: "45–60분", walkText: "토마스 교회 맞은편",
        hoursNote: "화–일 10:00–18:00, 월요일 휴관. 입장료는 확인하세요.",
        reason: "기본 일정에는 없음 – 음악을 좋아한다면 카페 대신 들를 만합니다."
      },
      "le-spinnerei": {
        name: "슈피너라이 (옛 면방적 공장)",
        text: "옛 면방적 공장에 지금은 약 100개의 작업실과 11개 정도의 갤러리가 있으며, ‘신 라이프치히 화파’와 깊은 관련이 있습니다.",
        why: "인상적인 산업 건축 속 현대 미술의 중심지; 갤러리 입장은 무료입니다.",
        duration: "45–60분", walkText: "S-Bf. Plagwitz 트램 정류장에서 약 5분",
        hoursNote: "갤러리 화–토 11:00–18:00, 일·월 휴관.",
        reason: "기본 일정에는 없음: 플라크비츠 도착이 17:15쯤이라 18:00에 닫는 갤러리를 볼 시간이 거의 없습니다. 보고 싶다면 기념비 일정을 줄이세요."
      },

      "auerbach": {
        name: "아우어바흐스 켈러",
        cuisine: "작센 향토 및 계절 요리",
        when: "점심, 약 12:30–13:30",
        text: "메들러 파사주 아래의 유명한 식당으로 괴테의 『파우스트』 무대이며, 대형 켈러와 역사적인 와인 홀이 있습니다.",
        why: "점심으로 즐기는 문학의 역사 – 코스 바로 위에 있습니다.",
        hoursNote: "예전 정보 기준 매일 11:30–24:00 – 확인 필요.",
        price: "€€–€€€ (추정)",
        note: "예약 권장, 특히 주말."
      },
      "zills": {
        name: "칠스 터널 (Zill's Tunnel)",
        cuisine: "전통 식당, 작센 요리, 고제 맥주",
        when: "점심 대안 – 또는 구시가지에서 저녁을 먹고 싶을 때",
        text: "‘드랄레바치’ 술집 거리에 있는 1841년부터 이어진 전통 식당으로, 작센 요리와 라이프치히 고제 맥주로 유명합니다.",
        hoursNote: "조사 기준 매일 11:30–24:00 – 확인 필요.",
        price: "€€ (추정)"
      },
      "stelzenhaus": {
        name: "슈텔첸하우스",
        cuisine: "현대적이고 창의적인 요리",
        when: "저녁, 약 18:15–19:45",
        text: "카를-하이네 운하 위에 기둥을 세워 지은 1939년 압연 공장 건물에 있는 레스토랑입니다.",
        why: "물 바로 위의 산업적인 매력 – 운하 산책 뒤에 딱 맞습니다.",
        hoursNote: "업체 목록 기준 월–토 11:00–22:30, 일 9:00–22:30 – 확인 필요.",
        price: "€€–€€€ (추정)",
        note: "예약 권장. 구시가지에서 먹고 싶다면 칠스 터널(위 참고)."
      },

      "c-kandler": {
        name: "카페 칸들러",
        text: "토마스 교회 맞은편의 제과 카페로, 라이프치히 레르헤와 ‘바흐탈러’로 유명합니다.",
        hoursNote: "영업시간이 일부만 확인됨 (월–목 약 10:00–20:00) – 확인 필요.",
        special: "라이프치히 레르헤", price: "€ (추정)", distance: "토마스 교회 맞은편"
      },
      "c-coffebaum": {
        name: "춤 아라비셴 코페 바움",
        text: "독일에서 가장 오래된 커피하우스 중 하나 – 1711년부터 커피를 팔았으며, 무료 커피 박물관이 있습니다.",
        hoursNote: "2025년 7월 1일 리모델링 후 재개장; 매일 약 11:00–19:00 (확인 필요).",
        special: "커피 박물관 (무료)", price: "€–€€ (추정)", distance: "마르크트 광장에서 약 3분"
      },
      "c-riquet": {
        name: "카페하우스 리케",
        text: "아르누보와 중국풍 외관의 커피하우스 – 입구를 구리 코끼리 머리가 지킵니다.",
        hoursNote: "정보가 서로 다름 (때로 매일 9:00–24:00) – 확인 필요.",
        special: "커피하우스 분위기", price: "€–€€ (추정)", distance: "니콜라이 교회에서 약 2분"
      }
    }
  };

  // ------------------------------------------------------------------ Kurztexte (deutsches Original als Schlüssel)
  var phrases = {
    en: {
      "Treffen am Dresden Hauptbahnhof": "Meet at Dresden Hauptbahnhof",
      "RE50 Richtung Leipzig – Gleis in der App prüfen": "RE50 towards Leipzig – check the platform in the app",
      "RE50 Dresden Hbf → Leipzig Hbf": "RE50 Dresden Hbf → Leipzig Hbf",
      "Beispielzeit · stündlich · ca. 1:45 h": "example time · hourly · approx. 1:45 h",
      "Leipzig": "Leipzig",
      "Hauptbahnhof & Promenaden": "Main station & Promenaden",
      "größter Kopfbahnhof Europas": "Europe's largest terminus station",
      "Fußweg zum Augustusplatz": "Walk to Augustusplatz",
      "Augustusplatz & Panorama Tower": "Augustusplatz & Panorama Tower",
      "Aussicht aus 120 m Höhe": "view from 120 m up",
      "Nikolaikirche": "St. Nicholas' Church",
      "öffnet Mo–Sa um 11 Uhr": "opens Mon–Sat at 11:00",
      "Markt & Altes Rathaus": "Market square & Old Town Hall",
      "Stadtgeschichtliches Museum, Eintritt frei (Mo zu)": "Museum of City History, free (closed Mon)",
      "Mädler-Passage": "Mädler-Passage",
      "Faust & Mephisto": "Faust & Mephisto",
      "Mittagessen in Auerbachs Keller": "Lunch at Auerbachs Keller",
      "oder Zill's Tunnel": "or Zill's Tunnel",
      "Thomaskirche": "St. Thomas' Church",
      "Bachs Grab": "Bach's grave",
      "Leipziger Lerche im Café Kandler": "Leipziger Lerche at Café Kandler",
      "gegenüber der Thomaskirche": "opposite St. Thomas' Church",
      "Straßenbahn 15 → Völkerschlachtdenkmal": "Tram 15 → Battle monument",
      "Richtung Meusdorf · ca. 15 Min.": "towards Meusdorf · approx. 15 min",
      "Fußweg zum Denkmal": "Walk to the monument",
      "Völkerschlachtdenkmal": "Battle monument",
      "Krypta & Aussichtsplattform (Nov–März nur bis 16 Uhr)": "crypt & viewing platform (Nov–Mar only until 16:00)",
      "Zurück zur Haltestelle": "Back to the stop",
      "Straßenbahn nach Plagwitz": "Tram to Plagwitz",
      "Linie 15 bis Hauptbahnhof, dann Linie 14 · ca. 45 Min.": "line 15 to the main station, then line 14 · approx. 45 min",
      "Karl-Heine-Kanal": "Karl-Heine canal",
      "Spaziergang am Wasser": "a walk by the water",
      "Plagwitz": "Plagwitz",
      "Abendessen im Stelzenhaus": "Dinner at the Stelzenhaus",
      "am Karl-Heine-Kanal · reservieren": "on the Karl-Heine canal · book ahead",
      "Straßenbahn 14 → Hauptbahnhof": "Tram 14 → main station",
      "ca. 20 Min.": "approx. 20 min",
      "RE50 Leipzig Hbf → Dresden": "RE50 Leipzig Hbf → Dresden",
      "Beispielzeit · hält auch in Dresden-Neustadt und Mitte": "example time · also stops at Dresden-Neustadt and Mitte",
      "Dresden → Leipzig": "Dresden → Leipzig",
      "Gleis prüfen": "check platform",
      "Haltestelle prüfen": "check stop",
      "⚠ Beispielzeit: Der RE50 fährt stündlich (ca. 1:45 h, Deutschlandticket gilt) und hält auch in Dresden Mitte und Dresden-Neustadt. Passende Abfahrt im DB Navigator wählen.": "⚠ Example time: the RE50 runs hourly (approx. 1:45 h, Deutschlandticket valid) and also stops at Dresden Mitte and Dresden-Neustadt. Pick a suitable departure in DB Navigator.",
      "Schneller: IC/ICE in ca. 1:05 h – kostet extra, das Deutschlandticket gilt dort nicht.": "Faster: IC/ICE in approx. 1:05 h – costs extra, the Deutschlandticket is not valid there.",
      "Innenstadt → Völkerschlachtdenkmal": "City centre → Battle monument",
      "Ca. 15 Min. im dichten Takt. Das Deutschlandticket gilt in Leipzigs Straßenbahnen und Bussen (LVB).": "Approx. 15 min, frequent service. The Deutschlandticket is valid on Leipzig's trams and buses (LVB).",
      "Alternativ S-Bahn S1/S4 bis Haltepunkt Völkerschlachtdenkmal.": "Alternatively S-Bahn S1/S4 to the Völkerschlachtdenkmal stop.",
      "Völkerschlachtdenkmal → Plagwitz": "Battle monument → Plagwitz",
      "Umstieg am Hauptbahnhof": "Change at the main station",
      "ca. 5 Min.": "approx. 5 min",
      "⚠ Zeiten geschätzt, Linienführung bitte in der LVB-App prüfen.": "⚠ Times estimated, please check the routes in the LVB app.",
      "Leipzig → Dresden": "Leipzig → Dresden",
      "Empfohlen": "Recommended",
      "Beispielzeiten, ca. 2:15 h ab Plagwitz": "example times, approx. 2:15 h from Plagwitz",
      "Später": "Later",
      "Beispielzeit, eine Stunde später": "example time, one hour later",
      "⚠ Beispielzeiten. Die letzte bequeme RE50-Verbindung fährt etwa um 21–22 Uhr – im DB Navigator prüfen.": "⚠ Example times. The last convenient RE50 runs at about 21:00–22:00 – check in DB Navigator.",
      "Erste Empfehlung": "Top pick",
      "Alternative": "Alternative",
      "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)": "DB Navigator / bahn.de (please check the timetable on the day of travel)",
      "LVB – Leipziger Verkehrsbetriebe (Straßenbahn)": "LVB – Leipzig transport company (trams)",
      "Leipzig Tourismus (leipzig.travel)": "Leipzig Tourism (leipzig.travel)",
      "Stadtgeschichtliches Museum Leipzig (Altes Rathaus, Völkerschlachtdenkmal)": "Museum of City History Leipzig (Old Town Hall, Battle monument)",
      "Nikolaikirche Leipzig": "St. Nicholas' Church, Leipzig",
      "Thomaskirche Leipzig": "St. Thomas' Church, Leipzig",
      "Zeitgeschichtliches Forum Leipzig": "Forum of Contemporary History, Leipzig",
      "Panorama Tower Leipzig": "Panorama Tower Leipzig",
      "Spinnerei Leipzig": "Spinnerei Leipzig",
      "OpenStreetMap (Karten)": "OpenStreetMap (maps)",
      "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)": "Weather: Open-Meteo (free, no API key)"
    },
    ko: {
      "Treffen am Dresden Hauptbahnhof": "드레스덴 중앙역(Dresden Hbf)에서 만나기",
      "RE50 Richtung Leipzig – Gleis in der App prüfen": "라이프치히행 RE50 – 앱에서 승강장 확인",
      "RE50 Dresden Hbf → Leipzig Hbf": "RE50 드레스덴 중앙역 → 라이프치히 중앙역",
      "Beispielzeit · stündlich · ca. 1:45 h": "예시 시간 · 1시간 간격 · 약 1시간 45분",
      "Leipzig": "라이프치히",
      "Hauptbahnhof & Promenaden": "중앙역 & 프로메나덴",
      "größter Kopfbahnhof Europas": "유럽 최대 종착역",
      "Fußweg zum Augustusplatz": "아우구스투스 광장까지 도보",
      "Augustusplatz & Panorama Tower": "아우구스투스 광장 & 파노라마 타워",
      "Aussicht aus 120 m Höhe": "120 m 높이 전망",
      "Nikolaikirche": "니콜라이 교회",
      "öffnet Mo–Sa um 11 Uhr": "월–토 11:00 개방",
      "Markt & Altes Rathaus": "마르크트 광장 & 구 시청사",
      "Stadtgeschichtliches Museum, Eintritt frei (Mo zu)": "시립 역사 박물관, 무료 (월 휴관)",
      "Mädler-Passage": "메들러 파사주",
      "Faust & Mephisto": "파우스트 & 메피스토",
      "Mittagessen in Auerbachs Keller": "아우어바흐스 켈러에서 점심",
      "oder Zill's Tunnel": "또는 칠스 터널",
      "Thomaskirche": "토마스 교회",
      "Bachs Grab": "바흐의 무덤",
      "Leipziger Lerche im Café Kandler": "카페 칸들러에서 라이프치히 레르헤",
      "gegenüber der Thomaskirche": "토마스 교회 맞은편",
      "Straßenbahn 15 → Völkerschlachtdenkmal": "15번 트램 → 전투기념비",
      "Richtung Meusdorf · ca. 15 Min.": "모이스도르프 방면 · 약 15분",
      "Fußweg zum Denkmal": "기념비까지 도보",
      "Völkerschlachtdenkmal": "라이프치히 전투 기념비",
      "Krypta & Aussichtsplattform (Nov–März nur bis 16 Uhr)": "지하 묘실 & 전망대 (11–3월은 16:00까지)",
      "Zurück zur Haltestelle": "정류장으로 복귀",
      "Straßenbahn nach Plagwitz": "플라크비츠행 트램",
      "Linie 15 bis Hauptbahnhof, dann Linie 14 · ca. 45 Min.": "15번으로 중앙역까지, 이후 14번 · 약 45분",
      "Karl-Heine-Kanal": "카를-하이네 운하",
      "Spaziergang am Wasser": "물가 산책",
      "Plagwitz": "플라크비츠",
      "Abendessen im Stelzenhaus": "슈텔첸하우스에서 저녁",
      "am Karl-Heine-Kanal · reservieren": "카를-하이네 운하 · 예약하기",
      "Straßenbahn 14 → Hauptbahnhof": "14번 트램 → 중앙역",
      "ca. 20 Min.": "약 20분",
      "RE50 Leipzig Hbf → Dresden": "RE50 라이프치히 중앙역 → 드레스덴",
      "Beispielzeit · hält auch in Dresden-Neustadt und Mitte": "예시 시간 · 드레스덴 노이슈타트와 미테에도 정차",
      "Dresden → Leipzig": "드레스덴 → 라이프치히",
      "Gleis prüfen": "승강장 확인",
      "Haltestelle prüfen": "정류장 확인",
      "⚠ Beispielzeit: Der RE50 fährt stündlich (ca. 1:45 h, Deutschlandticket gilt) und hält auch in Dresden Mitte und Dresden-Neustadt. Passende Abfahrt im DB Navigator wählen.": "⚠ 예시 시간: RE50은 1시간 간격으로 운행하며(약 1시간 45분, 도이칠란트티켓 유효) 드레스덴 미테와 드레스덴 노이슈타트에도 섭니다. DB Navigator에서 알맞은 출발편을 고르세요.",
      "Schneller: IC/ICE in ca. 1:05 h – kostet extra, das Deutschlandticket gilt dort nicht.": "더 빠른 편: IC/ICE 약 1시간 5분 – 추가 요금, 도이칠란트티켓은 유효하지 않습니다.",
      "Innenstadt → Völkerschlachtdenkmal": "구시가지 → 전투기념비",
      "Ca. 15 Min. im dichten Takt. Das Deutschlandticket gilt in Leipzigs Straßenbahnen und Bussen (LVB).": "약 15분, 자주 운행합니다. 도이칠란트티켓은 라이프치히 트램과 버스(LVB)에서도 유효합니다.",
      "Alternativ S-Bahn S1/S4 bis Haltepunkt Völkerschlachtdenkmal.": "대안: S반 S1/S4로 전투기념비 정류장까지.",
      "Völkerschlachtdenkmal → Plagwitz": "전투기념비 → 플라크비츠",
      "Umstieg am Hauptbahnhof": "중앙역에서 환승",
      "ca. 5 Min.": "약 5분",
      "⚠ Zeiten geschätzt, Linienführung bitte in der LVB-App prüfen.": "⚠ 시간은 추정치이며, 노선은 LVB 앱에서 확인하세요.",
      "Leipzig → Dresden": "라이프치히 → 드레스덴",
      "Empfohlen": "추천",
      "Beispielzeiten, ca. 2:15 h ab Plagwitz": "예시 시간, 플라크비츠에서 약 2시간 15분",
      "Später": "늦은 편",
      "Beispielzeit, eine Stunde später": "예시 시간, 1시간 뒤",
      "⚠ Beispielzeiten. Die letzte bequeme RE50-Verbindung fährt etwa um 21–22 Uhr – im DB Navigator prüfen.": "⚠ 예시 시간. 편하게 탈 수 있는 마지막 RE50은 약 21–22시입니다 – DB Navigator에서 확인하세요.",
      "Erste Empfehlung": "1순위 추천",
      "Alternative": "대안",
      "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)": "DB Navigator / bahn.de (여행 당일 시간표 확인)",
      "LVB – Leipziger Verkehrsbetriebe (Straßenbahn)": "LVB – 라이프치히 교통공사 (트램)",
      "Leipzig Tourismus (leipzig.travel)": "라이프치히 관광청 (leipzig.travel)",
      "Stadtgeschichtliches Museum Leipzig (Altes Rathaus, Völkerschlachtdenkmal)": "라이프치히 시립 역사 박물관 (구 시청사, 전투기념비)",
      "Nikolaikirche Leipzig": "라이프치히 니콜라이 교회",
      "Thomaskirche Leipzig": "라이프치히 토마스 교회",
      "Zeitgeschichtliches Forum Leipzig": "라이프치히 현대사 포럼",
      "Panorama Tower Leipzig": "라이프치히 파노라마 타워",
      "Spinnerei Leipzig": "라이프치히 슈피너라이",
      "OpenStreetMap (Karten)": "OpenStreetMap (지도)",
      "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)": "날씨: Open-Meteo (무료, API 키 불필요)"
    }
  };

  // Bewusst unübersetzt
  var keep = { en: [], ko: [] };

  var ui = {};
  ["de", "en", "ko"].forEach(function (l) {
    ui[l] = {};
    [common[l], trip[l]].forEach(function (src) { Object.keys(src).forEach(function (k) { ui[l][k] = src[k]; }); });
  });

  // ------------------------------------------------------------------ Muster
  var rules = {
    en: [
      [/^ca\. ([\d,]+) (k?m) · (\d+) Min\.$/, function (m, a, u, n) { return "approx. " + a.replace(",", ".") + " " + u + " · " + n + " min"; }],
      [/^(\d+(?:–\d+)?) Min\.$/, function (m, a) { return a + " min"; }],
      [/^Gleis (\w+)$/, function (m, a) { return "Platform " + a; }]
    ],
    ko: [
      [/^ca\. ([\d,]+) (k?m) · (\d+) Min\.$/, function (m, a, u, n) { return "약 " + a.replace(",", ".") + " " + u + " · " + n + "분"; }],
      [/^(\d+(?:–\d+)?) Min\.$/, function (m, a) { return a + "분"; }],
      [/^Gleis (\w+)$/, function (m, a) { return a + "번 승강장"; }]
    ]
  };

  window.I18N = { langs: ["de", "en", "ko"], labels: { de: "DE", en: "EN", ko: "한" }, ui: ui, content: content, phrases: phrases, rules: rules, keep: keep };
})();
