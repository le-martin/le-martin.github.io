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

      tagOut: "Hinfahrt", tagReturn: "Rückfahrt",
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

      tagOut: "Outbound", tagReturn: "Return",
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

      tagOut: "가는 길", tagReturn: "돌아오는 길",
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

  // ------------------------------------------------------------------ Prag-spezifische Oberfläche
  var trip = {
    de: {
      docTitle: "Tagesausflug Prag",
      heroEyebrow: "Reisebegleiter · Prag",
      heroTitle: "Tagesausflug Prag",
      heroRoute: "Dresden <span>→</span> Praha <span>→</span> Dresden",
      heroMeta: "Tagesausflug mit dem EuroCity · eigenes Ticket nötig (kein Deutschlandticket) · Beispielablauf",
      heroAria: "Prag",
      noticeText: "Der EuroCity fährt etwa alle 2 Stunden – die Uhrzeiten hier sind ein Beispiel. Bitte Hin- und Rückfahrt im DB Navigator wählen; das Deutschlandticket gilt im EC nicht.",
      foodLead: "Tschechische Küche mittags in der Altstadt, abends auf der Kleinseite. Bezahlt wird in Kronen (CZK) – mit Karte immer in CZK zahlen.",
      lunchHead: "Mittagessen in der Altstadt",
      dinnerHead: "Abendessen auf der Kleinseite",
      connLead: "EuroCity durchs Elbtal, in Prag Tram und Metro (PID-Tickets in Kronen).",
      nav_altstadt: "Altstadt", nav_burg: "Burg & Kleinseite",
      area_altstadt: "Altstadt", area_burg: "Kleinseite & Prager Burg",
      ar_altstadt_eyebrow: "Bereich 1 · ca. 10:30–14:15",
      ar_altstadt_title: 'Altstadt <span class="sorb">Staré Město</span>',
      ar_altstadt_lead: "Vom Wenzelsplatz über Pulverturm und Altstädter Ring mit der Astronomischen Uhr bis zur Karlsbrücke – alles zu Fuß.",
      ar_burg_eyebrow: "Bereich 2 · ca. 14:15–19:10",
      ar_burg_title: 'Kleinseite & Burg <span class="sorb">Malá Strana · Pražský hrad</span>',
      ar_burg_lead: "Barocke Kleinseite, mit der Tram hinauf zur Prager Burg mit Veitsdom und Goldenem Gässchen, zu Fuß über die Alte Schlossstiege zurück.",
      cityName: function (c) { return { Praha: "Prag" }[c] || c; },
      citiesVal: "2 in Prag",
      meetVal: function (t) { return "Dresden Hbf, " + t + " Uhr"; },
      meetSub: "EuroCity Richtung Praha, Beispielzeit 08:10 Uhr – Ticket vorher kaufen",
      doneSub: "Hoffentlich war es ein schöner Tag in Prag!",
      tagTram: "Nachmittag",
      ttTram: "Tram 22 (schematisch)", ttMetro: "Metro A + C (schematisch)",
      lgBus: "Tram/Metro",
      // Festes Reisedatum: Freitag, 9.10.2026
      heroMeta: "Freitag, 9. Oktober 2026 · Railjet/EuroCity · eigenes Ticket nötig (kein Deutschlandticket)",
      tripDate: "Freitag, 9. Oktober 2026",
      weatherTitle: "Wetter am Freitag, 9.10.",
      weatherNote: "Vorhersage: " + METEO + " für den Reisetag · wird beim Öffnen der Seite live geladen.",
      overviewHint: "Tippe auf einen Punkt, um zur passenden Stelle zu springen. Hinfahrt laut Suchergebnis, die übrigen Zeiten sind geplant.",
      noticeTitle: "Zugzeiten bitte bestätigen.",
      noticeText: "Hinfahrt laut Suchergebnis: Railjet RJ 257, Dresden Hbf 08:10 → Praha hl. n. 10:27. Die Rückfahrt ist noch nicht bestätigt – beides im DB Navigator für Fr, 9.10. prüfen und zuggebunden buchen; das Deutschlandticket gilt nicht.",
      connNoticeTitle: "Zugzeiten bitte bestätigen.",
      travelIntro: "Am Freitag, 9.10., zeigt dieser Modus automatisch die nächste Station, Abfahrt und Gehzeit; vorher zählt er bis zur Abfahrt herunter. Zum Ausprobieren unten „Uhrzeit simulieren“ nutzen.",
      connChecked: function (d) { return "Stand " + d + " · Hinfahrt laut Suchergebnis, Rückfahrt unbestätigt – bitte prüfen"; },
      travelFoot: function (d) { return "Zugzeiten im DB Navigator bestätigen · Stand " + d; },
      meetSub: "Railjet RJ 257 Richtung Graz ab 08:10 Uhr – Ticket vorher kaufen"
    },
    en: {
      docTitle: "Day Trip to Prague",
      heroEyebrow: "Travel companion · Prague",
      heroTitle: "Day Trip to Prague",
      heroRoute: "Dresden <span>→</span> Praha <span>→</span> Dresden",
      heroMeta: "Day trip by EuroCity · separate ticket needed (no Deutschlandticket) · example schedule",
      heroAria: "Prague",
      noticeText: "The EuroCity runs about every 2 hours – the times shown are an example. Please choose your outbound and return trains in DB Navigator; the Deutschlandticket is not valid on the EC.",
      foodLead: "Czech food for lunch in the Old Town and for dinner in the Lesser Town. You pay in crowns (CZK) – when paying by card, always pay in CZK.",
      lunchHead: "Lunch in the Old Town",
      dinnerHead: "Dinner in the Lesser Town",
      connLead: "EuroCity through the Elbe valley, then tram and metro in Prague (PID tickets in crowns).",
      nav_altstadt: "Old Town", nav_burg: "Castle & Lesser Town",
      area_altstadt: "Old Town", area_burg: "Lesser Town & Prague Castle",
      ar_altstadt_eyebrow: "Area 1 · approx. 10:30–14:15",
      ar_altstadt_title: 'Old Town <span class="sorb">Staré Město</span>',
      ar_altstadt_lead: "From Wenceslas Square via the Powder Tower and Old Town Square with the Astronomical Clock to Charles Bridge – all on foot.",
      ar_burg_eyebrow: "Area 2 · approx. 14:15–19:10",
      ar_burg_title: 'Lesser Town & Castle <span class="sorb">Malá Strana · Pražský hrad</span>',
      ar_burg_lead: "The Baroque Lesser Town, up to Prague Castle by tram with St. Vitus Cathedral and Golden Lane, and back down on foot via the Old Castle Steps.",
      cityName: function (c) { return { Praha: "Prague", Altstadt: "Old Town", "Prager Burg": "Prague Castle", Kleinseite: "Lesser Town", "Hlavní nádraží": "the main station" }[c] || c; },
      citiesVal: "2 in Prague",
      meetVal: function (t) { return "Dresden Hbf, " + t; },
      meetSub: "EuroCity towards Praha, example time 08:10 – buy your ticket in advance",
      doneSub: "Hope you had a lovely day in Prague!",
      tagTram: "Afternoon",
      ttTram: "Tram 22 (schematic)", ttMetro: "Metro A + C (schematic)",
      lgBus: "Tram/metro",
      heroMeta: "Friday, 9 October 2026 · Railjet/EuroCity · separate ticket needed (no Deutschlandticket)",
      tripDate: "Friday, 9 October 2026",
      weatherTitle: "Weather on Friday, 9 Oct",
      weatherNote: "Forecast: " + METEO + " for the travel day · loaded live when the page opens.",
      overviewHint: "Tap an entry to jump to the matching section. Outbound train per search results; the other times are planned.",
      noticeTitle: "Please confirm the train times.",
      noticeText: "Outbound per search results: Railjet RJ 257, Dresden Hbf 08:10 → Praha hl. n. 10:27. The return is not confirmed yet – check both in DB Navigator for Fri 9 Oct and book train-specific tickets; the Deutschlandticket is not valid.",
      connNoticeTitle: "Please confirm the train times.",
      travelIntro: "On Friday 9 Oct this mode automatically shows the next stop, departure and walking time; before that it counts down to departure. To try it out, use “Simulate time” below.",
      connChecked: function (d) { return "As of " + d + " · outbound per search results, return unconfirmed – please check"; },
      travelFoot: function (d) { return "Confirm train times in DB Navigator · as of " + d; },
      meetSub: "Railjet RJ 257 towards Graz at 08:10 – buy your ticket in advance"
    },
    ko: {
      docTitle: "프라하 당일 여행",
      heroEyebrow: "여행 가이드 · 프라하",
      heroTitle: "프라하 당일 여행",
      heroRoute: "드레스덴 <span>→</span> 프라하 <span>→</span> 드레스덴",
      heroMeta: "유로시티 당일 여행 · 별도 승차권 필요 (도이칠란트티켓 불가) · 예시 일정",
      heroAria: "프라하",
      noticeText: "유로시티는 약 2시간 간격으로 운행하며, 여기 시간은 예시입니다. DB Navigator에서 왕복 열차를 고르세요. 도이칠란트티켓은 EC에서 사용할 수 없습니다.",
      foodLead: "점심은 구시가지, 저녁은 말라스트라나에서 체코 요리를. 결제는 코루나(CZK)로 – 카드 결제 시 항상 CZK로 하세요.",
      lunchHead: "구시가지에서 점심",
      dinnerHead: "말라스트라나에서 저녁",
      connLead: "엘베 강 계곡을 따라가는 유로시티, 프라하 안에서는 트램과 지하철 (코루나로 PID 승차권).",
      nav_altstadt: "구시가지", nav_burg: "프라하 성 & 말라스트라나",
      area_altstadt: "구시가지", area_burg: "말라스트라나 & 프라하 성",
      ar_altstadt_eyebrow: "구역 1 · 약 10:30–14:15",
      ar_altstadt_title: '구시가지 <span class="sorb">Staré Město</span>',
      ar_altstadt_lead: "바츨라프 광장에서 화약탑, 천문시계가 있는 구시가지 광장을 지나 카를교까지 – 모두 걸어서.",
      ar_burg_eyebrow: "구역 2 · 약 14:15–19:10",
      ar_burg_title: '말라스트라나 & 프라하 성 <span class="sorb">Malá Strana · Pražský hrad</span>',
      ar_burg_lead: "바로크 양식의 말라스트라나, 트램으로 올라가는 성 비투스 대성당과 황금소로가 있는 프라하 성, 그리고 옛 성 계단으로 걸어 내려오기.",
      cityName: function (c) { return { Dresden: "드레스덴", Praha: "프라하", Altstadt: "구시가지", "Prager Burg": "프라하 성", Kleinseite: "말라스트라나", "Pražský hrad": "프라하 성 정류장", "Malostranské náměstí": "말로스트란스케 광장", Malostranská: "말로스트란스카역", "Hlavní nádraží": "중앙역" }[c] || c; },
      citiesVal: "프라하 2곳",
      meetVal: function (t) { return "드레스덴 중앙역, " + t; },
      meetSub: "프라하행 유로시티, 예시 시간 08:10 – 승차권은 미리 구입",
      doneSub: "프라하에서 즐거운 하루 보내셨기를!",
      tagTram: "오후",
      ttTram: "트램 22 (개략도)", ttMetro: "지하철 A + C (개략도)",
      lgBus: "트램/지하철",
      heroMeta: "2026년 10월 9일 (금) · 레일젯/유로시티 · 별도 승차권 필요 (도이칠란트티켓 불가)",
      tripDate: "2026년 10월 9일 (금)",
      weatherTitle: "10월 9일 (금) 날씨",
      weatherNote: "예보: " + METEO + " 여행 당일 기준 · 페이지를 열 때 실시간으로 불러옵니다.",
      overviewHint: "항목을 누르면 해당 섹션으로 이동합니다. 가는 열차는 검색 결과 기준이며 나머지 시간은 계획입니다.",
      noticeTitle: "열차 시간을 꼭 확인하세요.",
      noticeText: "가는 길 (검색 결과 기준): 레일젯 RJ 257, 드레스덴 중앙역 08:10 → 프라하 중앙역 10:27. 돌아오는 열차는 아직 확인되지 않았습니다 – 둘 다 DB Navigator에서 10월 9일(금)로 확인하고 해당 열차 전용 승차권을 예매하세요. 도이칠란트티켓은 사용할 수 없습니다.",
      connNoticeTitle: "열차 시간을 꼭 확인하세요.",
      travelIntro: "10월 9일(금)에는 다음 장소, 출발 시간, 도보 시간을 자동으로 보여 주고, 그 전에는 출발까지 남은 시간을 셉니다. 미리 체험하려면 아래 ‘시간 시뮬레이션’을 사용하세요.",
      connChecked: function (d) { return d + " 기준 · 가는 열차는 검색 결과, 돌아오는 열차는 미확인 – 확인 필요"; },
      travelFoot: function (d) { return "열차 시간은 DB Navigator에서 확인하세요 · " + d + " 기준"; },
      meetSub: "그라츠행 레일젯 RJ 257, 08:10 출발 – 승차권은 미리 구입"
    }
  };

  // ------------------------------------------------------------------ Inhalte nach id
  var content = {
    en: {
      "pr-wenzel": {
        name: "Wenceslas Square (Václavské náměstí)",
        text: "A boulevard some 750 m long with the National Museum at the top end and the equestrian statue of St. Wenceslas.",
        why: "The stage of 1968 and 1989 – Czech recent history comes alive here.",
        duration: "15 min", walkText: "approx. 650 m · 8 min from the main station",
        hoursNote: "Public square – always accessible."
      },
      "pr-pulverturm": {
        name: "Powder Tower & Municipal House",
        text: "The late-Gothic Powder Tower of 1475 marks the start of the Royal Route to the castle; right next to it stands the Art Nouveau Municipal House (Obecní dům) with Smetana Hall.",
        why: "Gothic and Art Nouveau side by side.",
        duration: "15 min", walkText: "approx. 700 m · 9 min from Wenceslas Square",
        hoursNote: "Tower open depending on the month (Jan–Mar 10–18, Apr–May 10–19, Jun–Sep 9–20:30, Oct–Nov 10–18, Dec 10–19:30). Municipal House: guided tours approx. 1 h, 320 CZK, box office daily 10–19.",
        hoursLabel: "Powder Tower"
      },
      "pr-ring": {
        name: "Old Town Square (Staroměstské náměstí)",
        text: "The historic main square of the Old Town with the Jan Hus Memorial, the Old Town Hall and the Týn Church.",
        why: "The heart of Prague – with the towers of the Týn Church as the classic postcard view.",
        duration: "15–20 min", walkText: "approx. 450 m · 6 min via Celetná",
        hoursNote: "Public square – always accessible."
      },
      "pr-orloj": {
        name: "Astronomical Clock (Orloj)",
        text: "In operation since 1410 – one of the oldest working astronomical clocks in the world, on the south side of the Old Town Hall.",
        why: "On the hour the twelve apostles parade past the window and Death rings the bell – watching is free.",
        duration: "10 min (on the hour)", walkText: "on Old Town Square",
        hoursNote: "Apostle procession hourly approx. 9:00–23:00 (one source says from 8:00). Town hall tower: Apr–Dec 9–20, Jan–Mar 10–19; 50% off in the first hour after opening.",
        extra: "It gets very crowded just before the hour – find a spot in good time.",
        hoursLabel: "Apostle procession"
      },
      "pr-teyn": {
        name: "Týn Church (Church of Our Lady before Týn)",
        text: "Gothic church with two 80 m towers; the entrance is through a passage on the square side.",
        why: "The striking twin-tower silhouette above Old Town Square.",
        duration: "15–20 min", walkText: "on Old Town Square",
        hoursNote: "Mar–Nov: Tue–Sat 10–13 and 15–17, closed Mon and Sun. Dec–Feb: also Sun 10:30–12. Donation recommended (approx. 50 CZK); no visits during mass."
      },
      "pr-karlsbruecke": {
        name: "Charles Bridge (Karlův most)",
        text: "The 516 m bridge was built in 1357–1402 and is lined with 30 Baroque statues of saints.",
        why: "The classic view of Prague Castle – much quieter early in the morning or in the evening.",
        duration: "20–30 min", walkText: "approx. 750 m · 10 min via Karlova",
        hoursNote: "Bridge freely accessible around the clock. Old Town Bridge Tower approx. 10–22 in high season (please check in winter)."
      },
      "pr-nikolaus": {
        name: "Lesser Town Square & St. Nicholas Church",
        text: "The High Baroque Jesuit church by the Dientzenhofer family of architects, with its great dome, dominates Lesser Town Square.",
        why: "One of Prague's most splendid Baroque interiors.",
        duration: "25–30 min", walkText: "approx. 550 m · 7 min via Mostecká",
        hoursNote: "Depending on the month approx. 9–16/17/18 (e.g. Jul–Oct Mon–Thu & Sun 9–18, Fri–Sat 9–17); last entry 15 min before closing. Admission 150 CZK, reduced 90 CZK."
      },
      "pr-burg": {
        name: "Prague Castle (Pražský hrad)",
        text: "One of the largest castle complexes in the world and seat of the Czech president – with courtyards, palaces, churches and gardens.",
        why: "The castle grounds are free; the circuit ticket gets you into the main buildings.",
        duration: "60–90 min", walkText: "approx. 5 min from the Pražský hrad stop to the 2nd courtyard",
        hoursNote: "Grounds daily 6:00–22:00, free. Buildings in summer (1 Apr–31 Oct) 9–17, in winter 9–16. “Main Circuit” ticket approx. 450 CZK according to research (check on hrad.cz).",
        extra: "Airport-style security checks at all entrances – leave large backpacks behind and expect queues in summer.",
        hoursLabel: "Castle grounds"
      },
      "pr-veitsdom": {
        name: "St. Vitus Cathedral (Katedrála sv. Víta)",
        text: "The Gothic cathedral was built from 1344 to 1929; it was the coronation church and holds the tomb of St. Wenceslas.",
        why: "The heart of the castle – huge, with magnificent stained-glass windows.",
        duration: "30–40 min", walkText: "in the 3rd castle courtyard",
        hoursNote: "Mon–Sat 9–17 (winter until 16), Sundays only from 12:00 because of services. Last entry 20 min before closing. Included in the castle ticket.",
        planB: "On Sundays the cathedral only opens at 12:00 – in the example schedule you are up there in the afternoon anyway."
      },
      "pr-gaesschen": {
        name: "Golden Lane (Zlatá ulička)",
        text: "Tiny colourful houses built into the castle wall – Franz Kafka lived for a while at No. 22.",
        why: "The most picturesque corner of the castle.",
        duration: "15–20 min", walkText: "approx. 300 m · 4 min from the cathedral",
        hoursNote: "During the day (until building closing time) only with a castle ticket; free in the evening until approx. 22:00 (from approx. 17:00 in summer, 16:00 in winter)."
      },
      "pr-juedisch": {
        name: "Jewish Museum (Josefov)",
        text: "The museum includes the Maisel, Pinkas, Klausen and Spanish synagogues and the Old Jewish Cemetery in the former Jewish quarter.",
        why: "One of Europe's most important Jewish museums – moving and historically unique.",
        duration: "60–90 min", walkText: "approx. 5 min from Old Town Square via Pařížská",
        hoursNote: "Closed on Saturdays and Jewish holidays (2026 incl. 2–3 Apr, 8–9 Apr, 22 May, 13 Sep, 21 Sep, 27 Sep, 4 Oct). 2026: Jan–Mar 9–16:30, Apr 9–18, May–Aug 9–19, 1 Sep–17 Oct 9–18, from 18 Oct 9–16:30.",
        reason: "Not in the main plan: with the Old Town, Charles Bridge and the castle, one day is otherwise too full. To visit it, it's best to skip Wenceslas Square and the Powder Tower."
      },
      "pr-altneu": {
        name: "Old-New Synagogue (Staronová synagoga)",
        text: "The early Gothic synagogue from the 13th century is Europe's oldest synagogue still in use.",
        why: "A unique monument – just a few steps from the Jewish Museum.",
        duration: "15–20 min", walkText: "approx. 2 min from the Jewish Museum",
        hoursNote: "Essentially like the Jewish Museum (winter until 17:00); on Fridays it closes about 1 h before the start of Shabbat, closed on Saturdays.",
        reason: "Not in the main plan – easy to combine with the Jewish Museum."
      },

      "lokal-dlouha": {
        cuisine: "Czech pub food, tank Pilsner",
        when: "lunch, approx. 12:30–13:30",
        text: "A long, lively beer hall with Pilsner Urquell straight from the tank and Czech classics such as svíčková or schnitzel.",
        why: "Real Czech food at fair prices, just a few minutes from Old Town Square.",
        hoursNote: "Mon–Sat 11:00–24:00, Sun 11:00–22:00.",
        price: "main course approx. 250–350 CZK (estimate)",
        note: "Usually no booking needed at lunchtime; book for the evening."
      },
      "pinkasu": {
        cuisine: "Traditional Czech food, Pilsner",
        when: "alternative for lunch, near Wenceslas Square",
        text: "Prague's first Pilsner pub since 1843 – steeped in tradition and centrally located.",
        hoursNote: "Daily 10:00–22:30.",
        price: "€€ (estimate)"
      },
      "kuzelka": {
        cuisine: "Czech pub food, tank Pilsner",
        when: "dinner, approx. 17:40–19:10",
        text: "A cosy pub right at the Lesser Town end of Charles Bridge – same concept as Lokál Dlouhááá.",
        why: "Perfectly placed on the way back from the castle.",
        hoursNote: "Mon–Sat 11:00–24:00, Sun 11:00–23:00; kitchen in the evening until approx. 21:45.",
        price: "main course approx. 250–350 CZK (estimate)",
        note: "Booking recommended for the evening."
      },
      "flek": {
        cuisine: "Brewery pub, dark house beer",
        when: "alternative for dinner, in the New Town",
        text: "Prague's oldest brewery pub with its own dark beer and large halls.",
        hoursNote: "Daily 11:00–23:00.",
        price: "€€ (estimate)",
        note: "Very touristy: waiters often bring Becherovka or beer unasked, which costs extra – simply decline if you don't want it."
      },

      "c-orient": {
        text: "The only Cubist café in the world, on the first floor of the Cubist “House of the Black Madonna”.",
        hoursNote: "Mon–Fri 9:00–22:00, Sat–Sun 10:00–22:00.",
        special: "Cubist cream pastry", price: "€ (estimate)", distance: "approx. 3 min from the Powder Tower"
      },
      "c-louvre": {
        text: "A traditional café since 1902 – Kafka and Einstein were guests here.",
        hoursNote: "Mon–Fri 8:00–23:30, Sat–Sun 9:00–23:30.",
        special: "Coffee-house classic", price: "€ (estimate)", distance: "approx. 10 min south of the Old Town"
      },
      "c-savoy": {
        text: "An elegant café with a Neo-Renaissance ceiling by the Legion Bridge – good for breakfast or a cake break.",
        hoursNote: "Mon–Fri 8:00–22:00, Sat–Sun & public holidays 9:00–22:00.",
        special: "Breakfast, cakes", price: "€–€€ (estimate)", distance: "approx. 10 min from Charles Bridge"
      }
    },
    ko: {
      "pr-wenzel": {
        name: "바츨라프 광장",
        text: "길이 약 750 m의 대로로, 위쪽 끝에 국립박물관과 성 바츨라프 기마상이 있습니다.",
        why: "1968년과 1989년의 무대 – 체코 현대사를 생생하게 느낄 수 있습니다.",
        duration: "15분", walkText: "중앙역에서 약 650 m · 8분",
        hoursNote: "공공 광장 – 언제나 개방."
      },
      "pr-pulverturm": {
        name: "화약탑 & 시민회관",
        text: "1475년의 후기 고딕 화약탑은 성으로 가는 ‘왕의 길’의 시작점이며, 바로 옆에 스메타나 홀이 있는 아르누보 양식의 시민회관(Obecní dům)이 있습니다.",
        why: "고딕과 아르누보가 나란히 서 있습니다.",
        duration: "15분", walkText: "바츨라프 광장에서 약 700 m · 9분",
        hoursNote: "탑은 월별로 운영 (1–3월 10–18, 4–5월 10–19, 6–9월 9–20:30, 10–11월 10–18, 12월 10–19:30). 시민회관: 가이드 투어 약 1시간, 320 CZK, 매표소 매일 10–19.",
        hoursLabel: "화약탑"
      },
      "pr-ring": {
        name: "구시가지 광장",
        text: "얀 후스 기념비, 구 시청사, 틴 성당이 있는 구시가지의 역사적인 중심 광장입니다.",
        why: "프라하의 심장 – 틴 성당의 탑이 엽서 속 풍경을 만듭니다.",
        duration: "15–20분", walkText: "첼레트나 거리로 약 450 m · 6분",
        hoursNote: "공공 광장 – 언제나 개방."
      },
      "pr-orloj": {
        name: "천문시계 (오를로이)",
        text: "1410년부터 작동 중인, 세계에서 가장 오래된 현역 천문시계 중 하나로 구 시청사 남쪽 벽에 있습니다.",
        why: "정각마다 열두 사도가 창문을 지나가고 해골이 종을 칩니다 – 구경은 무료입니다.",
        duration: "10분 (정각에)", walkText: "구시가지 광장",
        hoursNote: "사도 행진은 매시 약 9:00–23:00 (한 출처는 8:00부터). 시청 탑: 4–12월 9–20, 1–3월 10–19; 개장 후 첫 1시간 50% 할인.",
        extra: "정각 직전에는 매우 붐비니 미리 자리를 잡으세요.",
        hoursLabel: "사도 행진"
      },
      "pr-teyn": {
        name: "틴 성당",
        text: "높이 80 m의 두 탑을 가진 고딕 성당으로, 입구는 광장 쪽 통로에 있습니다.",
        why: "구시가지 광장 위로 솟은 인상적인 쌍탑 실루엣.",
        duration: "15–20분", walkText: "구시가지 광장",
        hoursNote: "3–11월: 화–토 10–13, 15–17, 월·일 휴무. 12–2월: 일 10:30–12 추가. 기부 권장 (약 50 CZK); 미사 중 관람 불가."
      },
      "pr-karlsbruecke": {
        name: "카를교",
        text: "1357–1402년에 지어진 길이 516 m의 다리로, 30개의 바로크 성인상이 늘어서 있습니다.",
        why: "프라하 성을 바라보는 고전적인 풍경 – 이른 아침이나 저녁에는 훨씬 한산합니다.",
        duration: "20–30분", walkText: "카를로바 거리로 약 750 m · 10분",
        hoursNote: "다리는 24시간 자유 통행. 구시가지 교탑은 성수기 약 10–22시 (겨울은 확인 필요)."
      },
      "pr-nikolaus": {
        name: "말라스트라나 광장 & 성 미쿨라시 성당",
        text: "딘첸호퍼 가문이 지은 거대한 돔의 전성기 바로크 예수회 성당이 말라스트라나 광장을 압도합니다.",
        why: "프라하에서 가장 화려한 바로크 실내 중 하나입니다.",
        duration: "25–30분", walkText: "모스테츠카 거리로 약 550 m · 7분",
        hoursNote: "월에 따라 약 9–16/17/18시 (예: 7–10월 월–목·일 9–18, 금–토 9–17); 마감 15분 전 마지막 입장. 입장료 150 CZK, 할인 90 CZK."
      },
      "pr-burg": {
        name: "프라하 성",
        text: "세계에서 가장 큰 성 단지 중 하나이자 체코 대통령 관저로, 안뜰·궁전·성당·정원이 있습니다.",
        why: "성 구역은 무료이며, 순환 관람권으로 주요 건물에 들어갈 수 있습니다.",
        duration: "60–90분", walkText: "프라하 성 정류장에서 제2안뜰까지 약 5분",
        hoursNote: "성 구역 매일 6:00–22:00, 무료. 건물은 여름(4.1–10.31) 9–17, 겨울 9–16. ‘메인 서킷’ 관람권 조사 기준 약 450 CZK (hrad.cz에서 확인).",
        extra: "모든 입구에서 공항식 보안 검색 – 큰 배낭은 두고 오고, 여름에는 대기 시간을 예상하세요.",
        hoursLabel: "성 구역"
      },
      "pr-veitsdom": {
        name: "성 비투스 대성당",
        text: "1344년부터 1929년까지 지어진 고딕 대성당으로, 대관식 성당이었으며 성 바츨라프의 무덤이 있습니다.",
        why: "성의 핵심 – 거대하고 화려한 스테인드글라스가 있습니다.",
        duration: "30–40분", walkText: "제3안뜰",
        hoursNote: "월–토 9–17 (겨울 16시까지), 일요일은 미사 때문에 12:00부터. 마감 20분 전 마지막 입장. 성 관람권에 포함.",
        planB: "일요일에는 12:00에야 문을 엽니다 – 예시 일정에서는 어차피 오후에 도착합니다."
      },
      "pr-gaesschen": {
        name: "황금소로",
        text: "성벽에 붙은 작고 알록달록한 집들 – 프란츠 카프카가 한동안 22번지에 살았습니다.",
        why: "성에서 가장 그림 같은 구석입니다.",
        duration: "15–20분", walkText: "대성당에서 약 300 m · 4분",
        hoursNote: "낮에는 (건물 마감 시각까지) 성 관람권이 필요하고, 저녁에는 약 22시까지 무료 (여름 약 17시부터, 겨울 약 16시부터)."
      },
      "pr-juedisch": {
        name: "유대인 박물관 (요세포프)",
        text: "옛 유대인 지구의 마이슬·핀카스·클라우센·스페인 시나고그와 옛 유대인 묘지로 이루어져 있습니다.",
        why: "유럽에서 가장 중요한 유대인 박물관 중 하나 – 감동적이고 역사적으로 독보적입니다.",
        duration: "60–90분", walkText: "구시가지 광장에서 파르지주스카 거리로 약 5분",
        hoursNote: "토요일과 유대교 명절에 휴관 (2026년 4.2–3, 4.8–9, 5.22, 9.13, 9.21, 9.27, 10.4 등). 2026년: 1–3월 9–16:30, 4월 9–18, 5–8월 9–19, 9.1–10.17 9–18, 10.18부터 9–16:30.",
        reason: "기본 일정에는 없음: 구시가지, 카를교, 성까지 하면 하루가 너무 빡빡합니다. 방문하려면 바츨라프 광장과 화약탑을 빼는 것이 좋습니다."
      },
      "pr-altneu": {
        name: "구신 시나고그",
        text: "13세기 초기 고딕 양식의 시나고그로, 지금도 사용되는 유럽에서 가장 오래된 시나고그입니다.",
        why: "독보적인 건축 유산 – 유대인 박물관에서 몇 걸음 거리입니다.",
        duration: "15–20분", walkText: "유대인 박물관에서 약 2분",
        hoursNote: "대체로 유대인 박물관과 같음 (겨울 17시까지); 금요일은 안식일 시작 약 1시간 전에 닫고, 토요일 휴관.",
        reason: "기본 일정에는 없음 – 유대인 박물관과 함께 둘러보기 좋습니다."
      },

      "lokal-dlouha": {
        name: "로칼 들로우하",
        cuisine: "체코 선술집 요리, 탱크 필스너",
        when: "점심, 약 12:30–13:30",
        text: "탱크에서 바로 따르는 필스너 우르켈과 스비치코바, 슈니첼 같은 체코 대표 요리를 내는 길고 활기찬 맥주홀입니다.",
        why: "구시가지 광장에서 몇 분 거리, 합리적인 가격의 진짜 체코 요리.",
        hoursNote: "월–토 11:00–24:00, 일 11:00–22:00.",
        price: "메인 요리 약 250–350 CZK (추정)",
        note: "점심은 보통 예약 없이 가능, 저녁은 예약하세요."
      },
      "pinkasu": {
        name: "우 핀카수",
        cuisine: "전통 체코 요리, 필스너",
        when: "점심 대안, 바츨라프 광장 근처",
        text: "1843년부터 프라하 최초의 필스너 술집 – 전통 깊고 중심가에 있습니다.",
        hoursNote: "매일 10:00–22:30.",
        price: "€€ (추정)"
      },
      "kuzelka": {
        name: "로칼 우 빌레 쿠젤키",
        cuisine: "체코 선술집 요리, 탱크 필스너",
        when: "저녁, 약 17:40–19:10",
        text: "카를교 말라스트라나 쪽 끝에 있는 아늑한 선술집 – 로칼 들로우하와 같은 콘셉트입니다.",
        why: "성에서 내려오는 길에 딱 맞는 위치입니다.",
        hoursNote: "월–토 11:00–24:00, 일 11:00–23:00; 저녁 주방은 약 21:45까지.",
        price: "메인 요리 약 250–350 CZK (추정)",
        note: "저녁에는 예약을 권합니다."
      },
      "flek": {
        name: "우 플레쿠",
        cuisine: "양조장 식당, 흑맥주",
        when: "저녁 대안, 신시가지",
        text: "자체 양조 흑맥주와 큰 홀이 있는 프라하에서 가장 오래된 양조장 식당입니다.",
        hoursNote: "매일 11:00–23:00.",
        price: "€€ (추정)",
        note: "매우 관광객 위주: 직원이 묻지 않고 베헤로브카나 맥주를 가져오는 경우가 많고 별도 요금입니다 – 원하지 않으면 거절하세요."
      },

      "c-orient": {
        name: "그랜드 카페 오리엔트",
        text: "세계 유일의 입체파 카페로, 입체파 건축물 ‘검은 성모의 집’ 2층에 있습니다.",
        hoursNote: "월–금 9:00–22:00, 토–일 10:00–22:00.",
        special: "입체파 크림 페이스트리", price: "€ (추정)", distance: "화약탑에서 약 3분"
      },
      "c-louvre": {
        name: "카페 루브르",
        text: "1902년부터 이어진 전통 카페 – 카프카와 아인슈타인이 손님이었습니다.",
        hoursNote: "월–금 8:00–23:30, 토–일 9:00–23:30.",
        special: "클래식 카페하우스", price: "€ (추정)", distance: "구시가지에서 남쪽으로 약 10분"
      },
      "c-savoy": {
        name: "카페 사보이",
        text: "레기이 다리 옆, 네오르네상스 천장이 있는 우아한 카페 – 아침 식사나 케이크 타임에 좋습니다.",
        hoursNote: "월–금 8:00–22:00, 토–일·공휴일 9:00–22:00.",
        special: "아침 식사, 케이크", price: "€–€€ (추정)", distance: "카를교에서 약 10분"
      }
    }
  };

  // ------------------------------------------------------------------ Kurztexte (deutsches Original als Schlüssel)
  var phrases = {
    en: {
      "Treffen am Dresden Hauptbahnhof": "Meet at Dresden Hauptbahnhof",
      "EuroCity Richtung Praha – Ticket vorher kaufen (Deutschlandticket gilt nicht)": "EuroCity towards Praha – buy your ticket in advance (Deutschlandticket not valid)",
      "EC Dresden Hbf → Praha hl. n.": "EC Dresden Hbf → Praha hl. n.",
      "Beispielzeit · ca. alle 2 Std. · durchs Elbtal": "example time · approx. every 2 h · through the Elbe valley",
      "Praha": "Prague",
      "Fußweg zum Wenzelsplatz": "Walk to Wenceslas Square",
      "Wenzelsplatz": "Wenceslas Square",
      "Schauplatz von 1968 und 1989": "stage of 1968 and 1989",
      "Fußweg zum Pulverturm": "Walk to the Powder Tower",
      "Pulverturm & Gemeindehaus": "Powder Tower & Municipal House",
      "Gotik und Jugendstil": "Gothic and Art Nouveau",
      "Über die Celetná zum Altstädter Ring": "Along Celetná to Old Town Square",
      "Altstädter Ring & Astronomische Uhr": "Old Town Square & Astronomical Clock",
      "Apostelumgang um 12:00 Uhr": "apostle procession at 12:00",
      "Teynkirche": "Týn Church",
      "Di–Sa bis 13 Uhr geöffnet": "open Tue–Sat until 13:00",
      "Mittagessen im Lokál Dlouhááá": "Lunch at Lokál Dlouhááá",
      "Svíčková & Pilsner vom Tank": "svíčková & tank Pilsner",
      "Fußweg zur Karlsbrücke": "Walk to Charles Bridge",
      "Karlsbrücke": "Charles Bridge",
      "Blick auf die Burg": "view of the castle",
      "Fußweg zum Kleinseitner Ring": "Walk to Lesser Town Square",
      "Kleinseite": "Lesser Town",
      "St.-Nikolaus-Kirche": "St. Nicholas Church",
      "Barock der Dientzenhofer": "Dientzenhofer Baroque",
      "Tram 22 → Pražský hrad": "Tram 22 → Pražský hrad",
      "ca. 8 Min. bergauf · PID-Ticket": "approx. 8 min uphill · PID ticket",
      "Fußweg in den Burghof": "Walk into the castle courtyard",
      "ca. 5 Min. · Sicherheitskontrolle": "approx. 5 min · security check",
      "Prager Burg": "Prague Castle",
      "Prager Burg & Veitsdom": "Prague Castle & St. Vitus Cathedral",
      "Gebäude bis 17 Uhr (Winter 16 Uhr)": "buildings until 17:00 (winter 16:00)",
      "Goldenes Gässchen": "Golden Lane",
      "mit Burg-Ticket": "with castle ticket",
      "Burgareal & Aussicht": "Castle grounds & view",
      "Areal kostenlos bis 22 Uhr": "grounds free until 22:00",
      "Abstieg über die Alte Schlossstiege": "Down via the Old Castle Steps",
      "Abendessen im Lokál U Bílé kuželky": "Dinner at Lokál U Bílé kuželky",
      "an der Karlsbrücke · reservieren": "by Charles Bridge · book ahead",
      "Fußweg zur Metro Malostranská": "Walk to Malostranská metro",
      "Metro A + C → Hlavní nádraží": "Metro A + C → Hlavní nádraží",
      "Umstieg in Muzeum · ca. 20 Min.": "change at Muzeum · approx. 20 min",
      "Puffer am Bahnhof": "Buffer at the station",
      "Proviant kaufen, zum Gleis gehen": "buy snacks, head to the platform",
      "EC Praha hl. n. → Dresden Hbf": "EC Praha hl. n. → Dresden Hbf",
      "Beispielzeit · Ticket zuggebunden": "example time · ticket tied to this train",
      "Dresden → Prag": "Dresden → Prague",
      "Railjet RJ 257 Dresden Hbf → Praha hl. n.": "Railjet RJ 257 Dresden Hbf → Praha hl. n.",
      "laut Suchergebnis · im DB Navigator bestätigen": "per search results · confirm in DB Navigator",
      "Zeit noch prüfen · Ticket zuggebunden": "time still to be confirmed · train-specific ticket",
      "Laut Suchergebnis fährt am Morgen der Railjet RJ 257 (Richtung Graz) ab Dresden Hbf 08:10, an Praha hl. n. 10:27 – bitte im DB Navigator für Fr, 9.10. bestätigen und das Ticket zuggebunden buchen. ⚠ Allgemein: Der EuroCity fährt etwa alle 2 Stunden (ca. 2:15–2:30 h) durchs Elbtal über Bad Schandau, Děčín und Ústí nad Labem; er hält auch in Dresden-Neustadt. Das Deutschlandticket gilt im EC NICHT – Ticket z. B. als DB Sparpreis Europa (ab ca. 18 €). Reservierung meist freiwillig, im Sommer teils Pflicht – bitte prüfen.": "According to search results the morning Railjet RJ 257 (towards Graz) leaves Dresden Hbf at 08:10 and arrives at Praha hl. n. at 10:27 – please confirm in DB Navigator for Fri 9 Oct and book a train-specific ticket. ⚠ In general: the EuroCity runs about every 2 hours (approx. 2:15–2:30 h) through the Elbe valley via Bad Schandau, Děčín and Ústí nad Labem; it also stops at Dresden-Neustadt. The Deutschlandticket is NOT valid on the EC – buy e.g. a DB Sparpreis Europa (from approx. €18). Seat reservation is usually optional, sometimes compulsory in summer – please check.",
      "⚠ Die Rückfahrzeiten sind nicht bestätigt (Suchergebnisse widersprechen sich). Vor der Buchung im DB Navigator für Fr, 9.10. prüfen – der Zug fährt etwa alle 2 Stunden; Ticket zuggebunden buchen.": "⚠ The return times are not confirmed (search results contradict each other). Check in DB Navigator for Fri 9 Oct before booking – trains run about every 2 hours; book a train-specific ticket.",
      "Laut Suchergebnis · dann ohne Abendessen in Prag": "per search results · then without dinner in Prague",
      "Gleis prüfen": "check platform",
      "⚠ Beispielzeit: Der EuroCity fährt etwa alle 2 Stunden (ca. 2:15–2:30 h) durchs Elbtal über Bad Schandau, Děčín und Ústí nad Labem; er hält auch in Dresden-Neustadt. Das Deutschlandticket gilt im EC NICHT – Ticket z. B. als DB Sparpreis Europa (ab ca. 18 €). Reservierung meist freiwillig, im Sommer teils Pflicht – bitte prüfen.": "⚠ Example time: the EuroCity runs about every 2 hours (approx. 2:15–2:30 h) through the Elbe valley via Bad Schandau, Děčín and Ústí nad Labem; it also stops at Dresden-Neustadt. The Deutschlandticket is NOT valid on the EC – buy e.g. a DB Sparpreis Europa (from approx. €18). Seat reservation is usually optional, sometimes compulsory in summer – please check.",
      "FlixBus ab Dresden Hbf nach Praha Florenc in ca. 1:50 h (ca. 15–20 Min. zu Fuß zur Altstadt).": "FlixBus from Dresden Hbf to Praha Florenc in approx. 1:50 h (approx. 15–20 min walk to the Old Town).",
      "Regional über Bad Schandau und Děčín: deutlich langsamer (ca. 3–3,5 h); das Deutschlandticket gilt nur bis Bad Schandau.": "Regional trains via Bad Schandau and Děčín: much slower (approx. 3–3.5 h); the Deutschlandticket is only valid as far as Bad Schandau.",
      "Kleinseite → Prager Burg": "Lesser Town → Prague Castle",
      "Haltestelle prüfen": "check stop",
      "Fahrschein (PID): 30-Minuten-Ticket 39 CZK am Automaten bzw. 36 CZK in der App „PID Lítačka“; Papiertickets beim Einsteigen entwerten.": "Ticket (PID): 30-minute ticket 39 CZK from the machine or 36 CZK in the “PID Lítačka” app; validate paper tickets when boarding.",
      "Zu Fuß über Nerudova und die Neue Schlossstiege: ca. 15–20 Min. bergauf.": "On foot via Nerudova and the New Castle Steps: approx. 15–20 min uphill.",
      "Prag → Dresden": "Prague → Dresden",
      "Empfohlen": "Recommended",
      "Umstieg in Muzeum": "change at Muzeum",
      "Beispielzeiten · letzte Direktverbindung laut Recherche ca. 20:47 Uhr": "example times · last direct train approx. 20:47 according to research",
      "Früher": "Earlier",
      "Nur mit kurzem, frühem Abendessen": "only with a short, early dinner",
      "⚠ Beispielzeiten. Der EC fährt etwa alle 2 Stunden – im DB Navigator die passende Rückfahrt wählen und das Ticket zuggebunden buchen.": "⚠ Example times. The EC runs about every 2 hours – choose a suitable return train in DB Navigator and book a train-specific ticket.",
      "Erste Empfehlung": "Top pick",
      "Alternative": "Alternative",
      "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)": "DB Navigator / bahn.de (please check the timetable on the day of travel)",
      "DB Sparpreis Europa Tschechien": "DB Sparpreis Europa Czech Republic",
      "České dráhy (ČD)": "České dráhy (Czech Railways)",
      "PID – Prager Nahverkehr (Tickets, Fahrplan)": "PID – Prague public transport (tickets, timetable)",
      "Prager Burg – Öffnungszeiten & Tickets (hrad.cz)": "Prague Castle – opening hours & tickets (hrad.cz)",
      "Prague City Tourism (prague.eu)": "Prague City Tourism (prague.eu)",
      "Jüdisches Museum in Prag": "Jewish Museum in Prague",
      "OpenStreetMap (Karten)": "OpenStreetMap (maps)",
      "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)": "Weather: Open-Meteo (free, no API key)"
    },
    ko: {
      "Treffen am Dresden Hauptbahnhof": "드레스덴 중앙역(Dresden Hbf)에서 만나기",
      "EuroCity Richtung Praha – Ticket vorher kaufen (Deutschlandticket gilt nicht)": "프라하행 유로시티 – 승차권 미리 구입 (도이칠란트티켓 불가)",
      "EC Dresden Hbf → Praha hl. n.": "EC 드레스덴 중앙역 → 프라하 중앙역",
      "Beispielzeit · ca. alle 2 Std. · durchs Elbtal": "예시 시간 · 약 2시간 간격 · 엘베 강 계곡 경유",
      "Praha": "프라하",
      "Fußweg zum Wenzelsplatz": "바츨라프 광장까지 도보",
      "Wenzelsplatz": "바츨라프 광장",
      "Schauplatz von 1968 und 1989": "1968년과 1989년의 무대",
      "Fußweg zum Pulverturm": "화약탑까지 도보",
      "Pulverturm & Gemeindehaus": "화약탑 & 시민회관",
      "Gotik und Jugendstil": "고딕과 아르누보",
      "Über die Celetná zum Altstädter Ring": "첼레트나 거리를 따라 구시가지 광장으로",
      "Altstädter Ring & Astronomische Uhr": "구시가지 광장 & 천문시계",
      "Apostelumgang um 12:00 Uhr": "12:00 사도 행진",
      "Teynkirche": "틴 성당",
      "Di–Sa bis 13 Uhr geöffnet": "화–토 13시까지 개방",
      "Mittagessen im Lokál Dlouhááá": "로칼 들로우하에서 점심",
      "Svíčková & Pilsner vom Tank": "스비치코바 & 탱크 필스너",
      "Fußweg zur Karlsbrücke": "카를교까지 도보",
      "Karlsbrücke": "카를교",
      "Blick auf die Burg": "프라하 성 전망",
      "Fußweg zum Kleinseitner Ring": "말라스트라나 광장까지 도보",
      "Kleinseite": "말라스트라나",
      "St.-Nikolaus-Kirche": "성 미쿨라시 성당",
      "Barock der Dientzenhofer": "딘첸호퍼의 바로크",
      "Tram 22 → Pražský hrad": "22번 트램 → 프라하 성",
      "ca. 8 Min. bergauf · PID-Ticket": "약 8분 오르막 · PID 승차권",
      "Fußweg in den Burghof": "성 안뜰까지 도보",
      "ca. 5 Min. · Sicherheitskontrolle": "약 5분 · 보안 검색",
      "Prager Burg": "프라하 성",
      "Prager Burg & Veitsdom": "프라하 성 & 성 비투스 대성당",
      "Gebäude bis 17 Uhr (Winter 16 Uhr)": "건물 17시까지 (겨울 16시)",
      "Goldenes Gässchen": "황금소로",
      "mit Burg-Ticket": "성 관람권으로",
      "Burgareal & Aussicht": "성 구역 & 전망",
      "Areal kostenlos bis 22 Uhr": "성 구역 22시까지 무료",
      "Abstieg über die Alte Schlossstiege": "옛 성 계단으로 내려가기",
      "Abendessen im Lokál U Bílé kuželky": "로칼 우 빌레 쿠젤키에서 저녁",
      "an der Karlsbrücke · reservieren": "카를교 옆 · 예약하기",
      "Fußweg zur Metro Malostranská": "말로스트란스카 지하철역까지 도보",
      "Metro A + C → Hlavní nádraží": "지하철 A + C → 중앙역",
      "Umstieg in Muzeum · ca. 20 Min.": "무제움에서 환승 · 약 20분",
      "Puffer am Bahnhof": "역에서 여유 시간",
      "Proviant kaufen, zum Gleis gehen": "간식 사고 승강장으로",
      "EC Praha hl. n. → Dresden Hbf": "EC 프라하 중앙역 → 드레스덴 중앙역",
      "Beispielzeit · Ticket zuggebunden": "예시 시간 · 해당 열차 전용 승차권",
      "Dresden → Prag": "드레스덴 → 프라하",
      "Railjet RJ 257 Dresden Hbf → Praha hl. n.": "레일젯 RJ 257 드레스덴 중앙역 → 프라하 중앙역",
      "laut Suchergebnis · im DB Navigator bestätigen": "검색 결과 기준 · DB Navigator에서 확인",
      "Zeit noch prüfen · Ticket zuggebunden": "시간 확인 필요 · 해당 열차 전용 승차권",
      "Laut Suchergebnis fährt am Morgen der Railjet RJ 257 (Richtung Graz) ab Dresden Hbf 08:10, an Praha hl. n. 10:27 – bitte im DB Navigator für Fr, 9.10. bestätigen und das Ticket zuggebunden buchen. ⚠ Allgemein: Der EuroCity fährt etwa alle 2 Stunden (ca. 2:15–2:30 h) durchs Elbtal über Bad Schandau, Děčín und Ústí nad Labem; er hält auch in Dresden-Neustadt. Das Deutschlandticket gilt im EC NICHT – Ticket z. B. als DB Sparpreis Europa (ab ca. 18 €). Reservierung meist freiwillig, im Sommer teils Pflicht – bitte prüfen.": "검색 결과에 따르면 아침 레일젯 RJ 257(그라츠행)이 드레스덴 중앙역 08:10 출발, 프라하 중앙역 10:27 도착입니다 – DB Navigator에서 10월 9일(금)로 확인하고 해당 열차 전용 승차권을 예매하세요. ⚠ 일반 정보: 유로시티는 약 2시간 간격(약 2시간 15–30분)으로 바트 샨다우, 데친, 우스티 나드 라벰을 거쳐 엘베 강 계곡을 따라 운행하며 드레스덴 노이슈타트에도 섭니다. 도이칠란트티켓은 EC에서 사용할 수 없으니 DB 슈파어프라이스 오이로파(약 18유로부터) 등을 구입하세요. 좌석 예약은 보통 선택이지만 여름에는 의무일 때가 있으니 확인하세요.",
      "⚠ Die Rückfahrzeiten sind nicht bestätigt (Suchergebnisse widersprechen sich). Vor der Buchung im DB Navigator für Fr, 9.10. prüfen – der Zug fährt etwa alle 2 Stunden; Ticket zuggebunden buchen.": "⚠ 돌아오는 열차 시간은 확인되지 않았습니다 (검색 결과가 서로 다름). 예매 전 DB Navigator에서 10월 9일(금)로 확인하세요 – 약 2시간 간격이며 해당 열차 전용 승차권을 예매하세요.",
      "Laut Suchergebnis · dann ohne Abendessen in Prag": "검색 결과 기준 · 이 경우 프라하에서 저녁 없이",
      "Gleis prüfen": "승강장 확인",
      "⚠ Beispielzeit: Der EuroCity fährt etwa alle 2 Stunden (ca. 2:15–2:30 h) durchs Elbtal über Bad Schandau, Děčín und Ústí nad Labem; er hält auch in Dresden-Neustadt. Das Deutschlandticket gilt im EC NICHT – Ticket z. B. als DB Sparpreis Europa (ab ca. 18 €). Reservierung meist freiwillig, im Sommer teils Pflicht – bitte prüfen.": "⚠ 예시 시간: 유로시티는 약 2시간 간격(약 2시간 15–30분)으로 바트 샨다우, 데친, 우스티 나드 라벰을 거쳐 엘베 강 계곡을 따라 운행하며 드레스덴 노이슈타트에도 섭니다. 도이칠란트티켓은 EC에서 사용할 수 없으니 DB 슈파어프라이스 오이로파(약 18유로부터) 등을 구입하세요. 좌석 예약은 보통 선택이지만 여름에는 의무일 때가 있으니 확인하세요.",
      "FlixBus ab Dresden Hbf nach Praha Florenc in ca. 1:50 h (ca. 15–20 Min. zu Fuß zur Altstadt).": "플릭스버스: 드레스덴 중앙역 → 프라하 플로렌츠 약 1시간 50분 (구시가지까지 도보 약 15–20분).",
      "Regional über Bad Schandau und Děčín: deutlich langsamer (ca. 3–3,5 h); das Deutschlandticket gilt nur bis Bad Schandau.": "바트 샨다우와 데친을 거치는 지역 열차: 훨씬 느림 (약 3–3.5시간); 도이칠란트티켓은 바트 샨다우까지만 유효합니다.",
      "Kleinseite → Prager Burg": "말라스트라나 → 프라하 성",
      "Haltestelle prüfen": "정류장 확인",
      "Fahrschein (PID): 30-Minuten-Ticket 39 CZK am Automaten bzw. 36 CZK in der App „PID Lítačka“; Papiertickets beim Einsteigen entwerten.": "승차권(PID): 30분권 자판기 39 CZK, ‘PID Lítačka’ 앱 36 CZK; 종이 승차권은 탑승 시 개표하세요.",
      "Zu Fuß über Nerudova und die Neue Schlossstiege: ca. 15–20 Min. bergauf.": "도보: 네루도바 거리와 새 성 계단으로 약 15–20분 오르막.",
      "Prag → Dresden": "프라하 → 드레스덴",
      "Empfohlen": "추천",
      "Umstieg in Muzeum": "무제움에서 환승",
      "Beispielzeiten · letzte Direktverbindung laut Recherche ca. 20:47 Uhr": "예시 시간 · 조사 기준 마지막 직행 약 20:47",
      "Früher": "더 이른 편",
      "Nur mit kurzem, frühem Abendessen": "저녁을 짧고 일찍 먹을 때만",
      "⚠ Beispielzeiten. Der EC fährt etwa alle 2 Stunden – im DB Navigator die passende Rückfahrt wählen und das Ticket zuggebunden buchen.": "⚠ 예시 시간. EC는 약 2시간 간격이니 DB Navigator에서 알맞은 귀국편을 고르고 해당 열차 전용 승차권을 예매하세요.",
      "Erste Empfehlung": "1순위 추천",
      "Alternative": "대안",
      "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)": "DB Navigator / bahn.de (여행 당일 시간표 확인)",
      "DB Sparpreis Europa Tschechien": "DB 슈파어프라이스 오이로파 체코",
      "České dráhy (ČD)": "체코 철도 (ČD)",
      "PID – Prager Nahverkehr (Tickets, Fahrplan)": "PID – 프라하 대중교통 (승차권, 시간표)",
      "Prager Burg – Öffnungszeiten & Tickets (hrad.cz)": "프라하 성 – 운영 시간 & 관람권 (hrad.cz)",
      "Prague City Tourism (prague.eu)": "프라하 관광청 (prague.eu)",
      "Jüdisches Museum in Prag": "프라하 유대인 박물관",
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
