/*
 * Reisedaten: Tagesausflug Dresden → Prag (EuroCity).
 * Geplant für FREITAG, 9. Oktober 2026 (TRIP_DATE). Countdown, Reisemodus und Wetter
 * beziehen sich auf diesen Tag; saisonale Öffnungszeiten werden aus dem Reisedatum
 * berechnet. Für einen anderen Tag TRIP_DATE ändern (oder null = „heute“).
 *
 * Alle Inhalte der Seite kommen aus dieser Datei. Fahrzeiten sind BEISPIELE
 * (der EC fährt etwa alle 2 Stunden) – die passende Verbindung im DB Navigator wählen.
 * WICHTIG: Das Deutschlandticket gilt im EC nach Prag NICHT.
 * Öffnungszeiten stammen aus Recherche über Suchergebnisse (Stand CHECKED_AT),
 * viele sind saisonabhängig und werden unten nach Monat gesetzt.
 * Koordinaten sind auf ca. 50 m genau.
 */
(function () {
  "use strict";

  var DAY = { So: 0, Mo: 1, Di: 2, Mi: 3, Do: 4, Fr: 5, Sa: 6 };
  var ORDER = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  function hours(spec) {
    var out = {};
    Object.keys(spec).forEach(function (key) {
      key.split(",").forEach(function (part) {
        var range = part.split("-");
        var from = ORDER.indexOf(range[0]);
        var to = ORDER.indexOf(range[1] || range[0]);
        for (var i = from; i <= to; i++) out[DAY[ORDER[i]]] = spec[key];
      });
    });
    return out;
  }
  var TRIP_DATE = "2026-10-09";
  // Saison: Monat (0 = Januar) und Tag des Reisedatums (ohne Datum: heute)
  var NOW = TRIP_DATE ? new Date(TRIP_DATE + "T12:00") : new Date(), M = NOW.getMonth(), D = NOW.getDate();
  var SUMMER = M >= 3 && M <= 9; // April–Oktober (Prager Burg: 1.4.–31.10.)

  // Pulverturm (prague.eu 2026)
  var POWDER = M <= 2 ? "18:00" : M <= 4 ? "19:00" : M <= 8 ? "20:30" : M <= 10 ? "18:00" : "19:30";
  var POWDER_OPEN = (M >= 5 && M <= 8) ? "09:00" : "10:00";
  // Jüdisches Museum 2026: Jan–Mär 9–16:30, Apr 9–18, Mai–Aug 9–19, 1.9.–17.10. 9–18, ab 18.10. 9–16:30
  var JEWISH = M <= 2 ? "16:30" : M === 3 ? "18:00" : M <= 7 ? "19:00" : (M === 8 || (M === 9 && D <= 17)) ? "18:00" : "16:30";
  // St.-Nikolaus-Kirche Kleinseite (vereinfacht, Details im Hinweistext)
  var NICHOLAS = SUMMER
    ? hours({ "Mo-Do": [["09:00", "18:00"]], "Fr": [["09:00", "17:00"]], "Sa": [["09:00", M >= 4 && M <= 5 ? "18:00" : "17:00"]], "So": [["09:00", "18:00"]] })
    : hours({ "Mo-So": [["09:00", M === 0 ? "16:00" : "17:00"]] });
  var CASTLE_CLOSE = SUMMER ? "17:00" : "16:00";

  var CHECKED_AT = "07.10.2026";

  // ---------------------------------------------------------------- Bereiche
  var areas = [
    { key: "altstadt", q: "Praha", view: [[50.0790, 14.4090], [50.0915, 14.4370]] },
    { key: "burg", q: "Praha", view: [[50.0855, 14.3940], [50.0960, 14.4110]] }
  ];

  // ---------------------------------------------------------------- Orte (Bahnhöfe/Haltestellen)
  var places = {
    dd_hbf: { gmaps: "Dresden Hauptbahnhof", name: "Dresden Hauptbahnhof", dest: "Dresden", type: "station", lat: 51.04039, lon: 13.73147 },
    pr_hln: { gmaps: "Praha hlavní nádraží", name: "Praha hlavní nádraží", dest: "Praha", type: "station", lat: 50.08310, lon: 14.43540 },
    pr_malnam: { gmaps: "Tram Malostranské náměstí Praha", name: "Malostranské náměstí (Tram)", dest: "Malostranské náměstí", type: "bus", lat: 50.08840, lon: 14.40350 },
    pr_hrad: { gmaps: "Tram Pražský hrad Praha", name: "Pražský hrad (Tram)", dest: "Pražský hrad", type: "bus", lat: 50.09500, lon: 14.39800 },
    pr_malostr: { gmaps: "Metro Malostranská Praha", name: "Malostranská (Metro A)", dest: "Malostranská", type: "bus", lat: 50.09110, lon: 14.40940 }
  };

  // ---------------------------------------------------------------- Sehenswürdigkeiten
  var sights = [
    // ---------- Altstadt
    {
      id: "pr-wenzel", city: "altstadt", gmaps: "Václavské náměstí Praha", name: "Wenzelsplatz (Václavské náměstí)", lat: 50.08000, lon: 14.42940, photo: null,
      text: "Ein rund 750 m langer Boulevard mit dem Nationalmuseum am oberen Ende und dem Reiterstandbild des heiligen Wenzel.",
      why: "Schauplatz von 1968 und 1989 – hier wird die jüngere Geschichte Tschechiens greifbar.",
      duration: "15 Min.", walkFrom: { label: "vom Hauptbahnhof", text: "ca. 650 m · 8 Min. vom Hauptbahnhof" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "pr-pulverturm", city: "altstadt", gmaps: "Prašná brána Praha", name: "Pulverturm & Gemeindehaus", lat: 50.08710, lon: 14.42780, photo: null,
      text: "Der spätgotische Pulverturm von 1475 ist der Beginn des Königswegs zur Burg; direkt daneben steht das Jugendstil-Gemeindehaus (Obecní dům) mit dem Smetana-Saal.",
      why: "Gotik und Jugendstil direkt nebeneinander.",
      duration: "15 Min.", walkFrom: { label: "vom Wenzelsplatz", text: "ca. 700 m · 9 Min. vom Wenzelsplatz" },
      hours: hours({ "Mo-So": [[POWDER_OPEN, POWDER]] }), hoursLabel: "Pulverturm",
      hoursNote: "Turm je nach Monat geöffnet (Jan–März 10–18, Apr–Mai 10–19, Juni–Sep 9–20:30, Okt–Nov 10–18, Dez 10–19:30 Uhr). Gemeindehaus: Führungen ca. 1 Std., 320 CZK, Kasse täglich 10–19 Uhr.",
      verify: true
    },
    {
      id: "pr-ring", city: "altstadt", gmaps: "Staroměstské náměstí Praha", name: "Altstädter Ring (Staroměstské náměstí)", lat: 50.08750, lon: 14.42130, photo: null,
      text: "Der historische Hauptplatz der Altstadt mit dem Jan-Hus-Denkmal, dem Altstädter Rathaus und der Teynkirche.",
      why: "Das Herz Prags – mit den Türmen der Teynkirche als Postkartenmotiv.",
      duration: "15–20 Min.", walkFrom: { label: "vom Pulverturm", text: "ca. 450 m · 6 Min. über die Celetná" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "pr-orloj", city: "altstadt", gmaps: "Pražský orloj", name: "Astronomische Uhr (Orloj)", lat: 50.08700, lon: 14.42060, photo: null,
      text: "Seit 1410 in Betrieb – eine der ältesten noch funktionierenden astronomischen Uhren der Welt, an der Südseite des Altstädter Rathauses.",
      why: "Zur vollen Stunde ziehen die zwölf Apostel am Fenster vorbei und der Tod läutet – das Zuschauen ist kostenlos.",
      duration: "10 Min. (zur vollen Stunde)", walkFrom: { label: "am Altstädter Ring", text: "am Altstädter Ring" },
      hours: hours({ "Mo-So": [["09:00", "23:00"]] }), hoursLabel: "Apostelumgang",
      hoursNote: "Apostelumgang stündlich etwa 9–23 Uhr (eine Quelle nennt ab 8 Uhr). Rathausturm: Apr–Dez 9–20, Jan–März 10–19 Uhr; in der ersten Stunde nach Öffnung 50 % Rabatt.",
      extra: "Kurz vor der vollen Stunde wird es sehr voll – rechtzeitig einen Platz suchen.",
      verify: true
    },
    {
      id: "pr-teyn", city: "altstadt", gmaps: "Týnský chrám Praha", name: "Teynkirche (Kostel Matky Boží před Týnem)", lat: 50.08780, lon: 14.42280, photo: null,
      text: "Gotische Kirche mit zwei 80 m hohen Türmen; der Eingang liegt in einem Durchgang an der Platzseite.",
      why: "Die markante Doppelturm-Silhouette über dem Altstädter Ring.",
      duration: "15–20 Min.", walkFrom: { label: "am Altstädter Ring", text: "am Altstädter Ring" },
      hours: SUMMER || M === 2 || M === 10
        ? hours({ "Di-Sa": [["10:00", "13:00"], ["15:00", "17:00"]] })
        : hours({ "Di-Sa": [["10:00", "13:00"], ["15:00", "17:00"]], "So": [["10:30", "12:00"]] }),
      hoursNote: "März–Nov: Di–Sa 10–13 und 15–17 Uhr, Mo und So geschlossen. Dez–Feb: zusätzlich So 10:30–12 Uhr. Spende empfohlen (ca. 50 CZK); während Messen keine Besichtigung.",
      verify: true
    },
    {
      id: "pr-karlsbruecke", city: "altstadt", gmaps: "Karlův most Praha", name: "Karlsbrücke (Karlův most)", lat: 50.08650, lon: 14.41140, photo: null,
      text: "Die 516 m lange Brücke wurde 1357–1402 erbaut und ist mit 30 barocken Heiligenfiguren geschmückt.",
      why: "Der klassische Blick auf die Prager Burg – früh morgens oder abends deutlich ruhiger.",
      duration: "20–30 Min.", walkFrom: { label: "vom Altstädter Ring", text: "ca. 750 m · 10 Min. über die Karlova" },
      hoursNote: "Brücke rund um die Uhr frei zugänglich. Altstädter Brückenturm in der Hochsaison etwa 10–22 Uhr (Winter bitte prüfen).", hours: null, alwaysOpen: true
    },

    // ---------- Kleinseite & Burg
    {
      id: "pr-nikolaus", city: "burg", gmaps: "Kostel sv. Mikuláše Malá Strana", name: "Kleinseitner Ring & St.-Nikolaus-Kirche", lat: 50.08790, lon: 14.40370, photo: null,
      text: "Die hochbarocke Jesuitenkirche der Baumeisterfamilie Dientzenhofer mit ihrer großen Kuppel beherrscht den Kleinseitner Ring.",
      why: "Einer der prächtigsten Barockinnenräume Prags.",
      duration: "25–30 Min.", walkFrom: { label: "von der Karlsbrücke", text: "ca. 550 m · 7 Min. über die Mostecká" },
      hours: NICHOLAS,
      hoursNote: "Je nach Monat ca. 9–16/17/18 Uhr (z. B. Juli–Okt Mo–Do & So 9–18, Fr–Sa 9–17 Uhr); letzter Einlass 15 Min. vor Schluss. Eintritt 150 CZK, ermäßigt 90 CZK.",
      verify: true
    },
    {
      id: "pr-burg", city: "burg", gmaps: "Pražský hrad", name: "Prager Burg (Pražský hrad)", lat: 50.09060, lon: 14.39850, photo: null,
      text: "Einer der größten geschlossenen Burgkomplexe der Welt und Sitz des tschechischen Präsidenten – mit Höfen, Palästen, Kirchen und Gärten.",
      why: "Das Burgareal ist kostenlos; mit dem Rundgang-Ticket kommt man in die wichtigsten Gebäude.",
      duration: "60–90 Min.", walkFrom: { label: "von der Haltestelle", text: "ca. 5 Min. von der Haltestelle Pražský hrad zum 2. Burghof" },
      hours: hours({ "Mo-So": [["06:00", "22:00"]] }), hoursLabel: "Burgareal",
      hoursNote: "Areal täglich 6–22 Uhr, Eintritt frei. Gebäude im Sommer (1.4.–31.10.) 9–17 Uhr, im Winter 9–16 Uhr. Rundgang „Main Circuit“ laut Recherche ca. 450 CZK (auf hrad.cz prüfen).",
      extra: "Sicherheitskontrolle an allen Eingängen wie am Flughafen – keine großen Rucksäcke mitnehmen, im Sommer Wartezeiten einplanen.",
      verify: true, web: "https://www.hrad.cz/"
    },
    {
      id: "pr-veitsdom", city: "burg", gmaps: "Katedrála svatého Víta Praha", name: "Veitsdom (Katedrála sv. Víta)", lat: 50.09090, lon: 14.40050, photo: null,
      text: "Die gotische Kathedrale wurde von 1344 bis 1929 gebaut; sie war Krönungskirche und birgt das Grab des heiligen Wenzel.",
      why: "Das Herzstück der Burg – riesig, mit prachtvollen Glasfenstern.",
      duration: "30–40 Min.", walkFrom: { label: "im Burghof", text: "im 3. Burghof" },
      hours: hours({ "Mo-Sa": [["09:00", CASTLE_CLOSE]], "So": [["12:00", CASTLE_CLOSE]] }),
      hoursNote: "Mo–Sa 9–17 Uhr (Winter bis 16 Uhr), sonntags wegen der Gottesdienste erst ab 12 Uhr. Letzter Einlass 20 Min. vor Schluss. Im Burg-Ticket enthalten.",
      planB: "Sonntags öffnet der Dom erst um 12 Uhr – im Beispielablauf ist man ohnehin erst am Nachmittag oben.",
      verify: true
    },
    {
      id: "pr-gaesschen", city: "burg", gmaps: "Zlatá ulička Praha", name: "Goldenes Gässchen (Zlatá ulička)", lat: 50.09210, lon: 14.40390, photo: null,
      text: "Winzige bunte Häuschen an der Burgmauer – Franz Kafka wohnte eine Zeit lang in Nr. 22.",
      why: "Der malerischste Winkel der Burg.",
      duration: "15–20 Min.", walkFrom: { label: "vom Veitsdom", text: "ca. 300 m · 4 Min. vom Veitsdom" },
      hours: hours({ "Mo-So": [["09:00", "22:00"]] }),
      hoursNote: "Tagsüber (bis " + CASTLE_CLOSE + " Uhr) nur mit Burg-Ticket; abends frei zugänglich bis ca. 22 Uhr (Sommer ab ca. 17, Winter ab ca. 16 Uhr).",
      verify: true
    }
  ];

  var optionalSights = [
    {
      id: "pr-juedisch", city: "altstadt", gmaps: "Židovské muzeum v Praze", name: "Jüdisches Museum (Josefov)", lat: 50.08890, lon: 14.41900, optional: true, photo: null,
      text: "Zum Museum gehören Maisel-, Pinkas-, Klausen- und Spanische Synagoge sowie der Alte Jüdische Friedhof im ehemaligen jüdischen Viertel.",
      why: "Eines der bedeutendsten jüdischen Museen Europas – bewegend und historisch einzigartig.",
      duration: "60–90 Min.", walkFrom: { label: "vom Altstädter Ring", text: "ca. 5 Min. vom Altstädter Ring über die Pařížská" },
      hours: hours({ "Mo-Fr,So": [["09:00", JEWISH]] }),
      hoursNote: "Samstags und an jüdischen Feiertagen geschlossen (2026 u. a. 2.–3.4., 8.–9.4., 22.5., 13.9., 21.9., 27.9., 4.10.). 2026: Jan–März 9–16:30, Apr 9–18, Mai–Aug 9–19, 1.9.–17.10. 9–18, ab 18.10. 9–16:30 Uhr.",
      reason: "Nicht im Hauptplan: Mit Altstadt, Karlsbrücke und Burg wird ein Tag sonst zu voll. Wer es besuchen will, ersetzt am besten Wenzelsplatz und Pulverturm.",
      verify: true, web: "https://www.jewishmuseum.cz/"
    },
    {
      id: "pr-altneu", city: "altstadt", gmaps: "Staronová synagoga Praha", name: "Altneusynagoge (Staronová synagoga)", lat: 50.09030, lon: 14.41870, optional: true, photo: null,
      text: "Die frühgotische Synagoge aus dem 13. Jahrhundert ist die älteste noch genutzte Synagoge Europas.",
      why: "Ein einzigartiges Baudenkmal – nur wenige Schritte vom Jüdischen Museum.",
      duration: "15–20 Min.", walkFrom: { label: "vom Jüdischen Museum", text: "ca. 2 Min. vom Jüdischen Museum" },
      hours: hours({ "Mo-Fr,So": [["09:00", SUMMER ? "18:00" : "17:00"]] }),
      hoursNote: "Im Wesentlichen wie das Jüdische Museum (Winter bis 17 Uhr); freitags schließt sie ca. 1 Std. vor Schabbatbeginn, samstags geschlossen.",
      reason: "Nicht im Hauptplan – lässt sich gut mit dem Jüdischen Museum verbinden.",
      verify: true
    }
  ];

  // ---------------------------------------------------------------- Essen
  var restaurants = [
    {
      id: "lokal-dlouha", role: "lunch", priority: "Erste Empfehlung", city: "altstadt",
      name: "Lokál Dlouhááá", lat: 50.09030, lon: 14.42530,
      address: "Dlouhá 33, 110 00 Praha 1",
      cuisine: "Tschechische Wirtshausküche, Pilsner vom Tank",
      when: "Mittagessen, ca. 12:30–13:30 Uhr",
      text: "Lange, lebhafte Bierhalle mit Pilsner Urquell als Tankbier und tschechischen Klassikern wie Svíčková oder Schnitzel.",
      why: "Echte tschechische Küche zu fairen Preisen, nur wenige Minuten vom Altstädter Ring.",
      hours: hours({ "Mo-Sa": [["11:00", "23:59"]], "So": [["11:00", "22:00"]] }),
      hoursNote: "Mo–Sa 11–24, So 11–22 Uhr.",
      price: "Hauptgericht ca. 250–350 CZK (Schätzung)",
      rating: null,
      note: "Mittags meist ohne Reservierung, abends reservieren."
    },
    {
      id: "pinkasu", role: "lunch", priority: "Alternative", city: "altstadt",
      name: "U Pinkasů", lat: 50.08280, lon: 14.42320,
      address: "Jungmannovo nám. 15, 110 00 Praha 1",
      cuisine: "Traditionelle tschechische Küche, Pilsner",
      when: "Alternative mittags, nahe Wenzelsplatz",
      text: "Seit 1843 die erste Pilsner-Kneipe Prags – traditionsreich und zentral gelegen.",
      hours: hours({ "Mo-So": [["10:00", "22:30"]] }),
      hoursNote: "Täglich 10–22:30 Uhr.",
      price: "€€ (Einschätzung)",
      rating: null
    },
    {
      id: "kuzelka", role: "dinner", priority: "Erste Empfehlung", city: "burg",
      name: "Lokál U Bílé kuželky", lat: 50.08680, lon: 14.40750,
      address: "Míšeňská 12, 118 00 Praha 1 (Malá Strana)",
      cuisine: "Tschechische Wirtshausküche, Pilsner vom Tank",
      when: "Abendessen, ca. 17:40–19:10 Uhr",
      text: "Gemütliches Wirtshaus direkt am Kleinseitner Ende der Karlsbrücke – gleiches Konzept wie Lokál Dlouhááá.",
      why: "Liegt ideal auf dem Rückweg von der Burg.",
      hours: hours({ "Mo-Sa": [["11:00", "23:59"]], "So": [["11:00", "23:00"]] }),
      hoursNote: "Mo–Sa 11–24, So 11–23 Uhr; Küche abends bis ca. 21:45 Uhr.",
      price: "Hauptgericht ca. 250–350 CZK (Schätzung)",
      rating: null,
      note: "Abends reservieren empfohlen."
    },
    {
      id: "flek", role: "dinner", priority: "Alternative", city: "altstadt",
      name: "U Fleků", lat: 50.07860, lon: 14.41790,
      address: "Křemencova 11, 110 00 Praha 1 (Nové Město)",
      cuisine: "Brauereigaststätte, dunkles Hausbier",
      when: "Alternative abends, in der Neustadt",
      text: "Die älteste Brauereigaststätte Prags mit eigenem dunklem Bier und großen Sälen.",
      hours: hours({ "Mo-So": [["11:00", "23:00"]] }),
      hoursNote: "Täglich 11–23 Uhr.",
      price: "€€ (Einschätzung)",
      rating: null,
      note: "Sehr touristisch: Kellner bringen oft ungefragt Becherovka oder Bier, das extra kostet – einfach ablehnen, wenn nicht gewünscht."
    }
  ];

  var cafes = [
    {
      id: "c-orient", city: "altstadt", name: "Grand Café Orient", lat: 50.08700, lon: 14.42590,
      address: "Ovocný trh 19 (1. Stock, Haus zur Schwarzen Muttergottes), Praha 1",
      hours: hours({ "Mo-Fr": [["09:00", "22:00"]], "Sa-So": [["10:00", "22:00"]] }),
      hoursNote: "Mo–Fr 9–22, Sa–So 10–22 Uhr.",
      text: "Das einzige kubistische Café der Welt, im ersten Stock des kubistischen „Hauses zur Schwarzen Muttergottes“.",
      special: "Kubistische Cremeschnitte", price: "€ (Einschätzung)", distance: "ca. 3 Min. vom Pulverturm"
    },
    {
      id: "c-louvre", city: "altstadt", name: "Café Louvre", lat: 50.08220, lon: 14.41870,
      address: "Národní 22 (1. Stock), Praha 1",
      hours: hours({ "Mo-Fr": [["08:00", "23:30"]], "Sa-So": [["09:00", "23:30"]] }),
      hoursNote: "Mo–Fr 8–23:30, Sa–So 9–23:30 Uhr.",
      text: "Traditionscafé seit 1902 – Kafka und Einstein waren hier Gäste.",
      special: "Kaffeehaus-Klassiker", price: "€ (Einschätzung)", distance: "ca. 10 Min. südlich der Altstadt"
    },
    {
      id: "c-savoy", city: "burg", name: "Café Savoy", lat: 50.07980, lon: 14.40710,
      address: "Vítězná 5, Praha 5 (Malá Strana)",
      hours: hours({ "Mo-Fr": [["08:00", "22:00"]], "Sa-So": [["09:00", "22:00"]] }),
      hoursNote: "Mo–Fr 8–22, Sa–So & feiertags 9–22 Uhr.",
      text: "Elegantes Café mit Neorenaissance-Decke an der Legionsbrücke – gut zum Frühstücken oder für eine Kuchenpause.",
      special: "Frühstück, Kuchen", price: "€–€€ (Einschätzung)", distance: "ca. 10 Min. von der Karlsbrücke"
    }
  ];

  // ---------------------------------------------------------------- Verbindungen (BEISPIELZEITEN)
  var connections = {
    hin: {
      id: "hin", title: "Dresden → Prag", legs: [
        { mode: "train", line: "RJ 257", dir: "Graz Hbf", dep: "08:10", from: "Dresden Hbf", fromPl: "Gleis prüfen", arr: "10:27", to: "Praha hl. n.", toPl: "Gleis prüfen", toCity: "Praha" }
      ],
      note: "Laut Suchergebnis fährt am Morgen der Railjet RJ 257 (Richtung Graz) ab Dresden Hbf 08:10, an Praha hl. n. 10:27 – bitte im DB Navigator für Fr, 9.10. bestätigen und das Ticket zuggebunden buchen. ⚠ Allgemein: Der EuroCity fährt etwa alle 2 Stunden (ca. 2:15–2:30 h) durchs Elbtal über Bad Schandau, Děčín und Ústí nad Labem; er hält auch in Dresden-Neustadt. Das Deutschlandticket gilt im EC NICHT – Ticket z. B. als DB Sparpreis Europa (ab ca. 18 €). Reservierung meist freiwillig, im Sommer teils Pflicht – bitte prüfen.",
      alts: ["FlixBus ab Dresden Hbf nach Praha Florenc in ca. 1:50 h (ca. 15–20 Min. zu Fuß zur Altstadt).", "Regional über Bad Schandau und Děčín: deutlich langsamer (ca. 3–3,5 h); das Deutschlandticket gilt nur bis Bad Schandau."]
    },
    tram: {
      id: "tram", title: "Kleinseite → Prager Burg", legs: [
        { mode: "tram", line: "Tram 22", dir: "Bílá Hora", dep: "15:00", from: "Malostranské náměstí", fromPl: "Haltestelle prüfen", arr: "15:08", to: "Pražský hrad", toCity: "Pražský hrad" }
      ],
      note: "Fahrschein (PID): 30-Minuten-Ticket 39 CZK am Automaten bzw. 36 CZK in der App „PID Lítačka“; Papiertickets beim Einsteigen entwerten.",
      alts: ["Zu Fuß über Nerudova und die Neue Schlossstiege: ca. 15–20 Min. bergauf."]
    },
    rueck: {
      id: "rueck", title: "Prag → Dresden", options: [
        { label: "Empfohlen", legs: [
          { mode: "metro", line: "Metro A + C", dir: "Hlavní nádraží", dep: "19:20", from: "Malostranská", fromPl: "Umstieg in Muzeum", arr: "19:40", to: "Hlavní nádraží", toCity: "Hlavní nádraží" },
          { mode: "train", line: "EC", dir: "Dresden Hbf", dep: "20:47", from: "Praha hl. n.", fromPl: "Gleis prüfen", arr: "23:05", to: "Dresden Hbf", toPl: "Gleis prüfen", toCity: "Dresden" }
        ], info: "Beispielzeiten · letzte Direktverbindung laut Recherche ca. 20:47 Uhr" },
        { label: "Früher", legs: [
          { mode: "train", line: "EC", dir: "Dresden Hbf", dep: "17:02", from: "Praha hl. n.", fromPl: "Gleis prüfen", arr: "19:24", to: "Dresden Hbf", toPl: "Gleis prüfen", toCity: "Dresden" }
        ], info: "Laut Suchergebnis · dann ohne Abendessen in Prag" }
      ],
      note: "⚠ Die Rückfahrzeiten sind nicht bestätigt (Suchergebnisse widersprechen sich). Vor der Buchung im DB Navigator für Fr, 9.10. prüfen – der Zug fährt etwa alle 2 Stunden; Ticket zuggebunden buchen."
    }
  };
  var connOrder = [["hin", "tagOut"], ["tram", "tagTram"], ["rueck", "tagReturn"]];

  // ---------------------------------------------------------------- Tagesplan (BEISPIELZEITEN)
  var main = [
    { s: "07:50", e: "08:10", kind: "meet", title: "Treffen am Dresden Hauptbahnhof", sub: "EuroCity Richtung Praha – Ticket vorher kaufen (Deutschlandticket gilt nicht)", ref: "#oepnv", place: "dd_hbf" },
    { s: "08:10", e: "10:27", kind: "train", dep: true, title: "Railjet RJ 257 Dresden Hbf → Praha hl. n.", sub: "laut Suchergebnis · im DB Navigator bestätigen", ref: "#c-hin", place: "dd_hbf", to: "pr_hln", major: true },
    { s: "10:30", e: "10:40", kind: "walk", title: "Fußweg zum Wenzelsplatz", sub: "ca. 650 m · 8 Min.", ref: "#pr-wenzel", place: "pr_hln", city: "Praha" },
    { s: "10:40", e: "10:55", kind: "sight", title: "Wenzelsplatz", sub: "Schauplatz von 1968 und 1989", ref: "#pr-wenzel", sight: "pr-wenzel", major: true },
    { s: "10:55", e: "11:05", kind: "walk", title: "Fußweg zum Pulverturm", sub: "ca. 700 m · 9 Min.", ref: "#pr-pulverturm" },
    { s: "11:05", e: "11:20", kind: "sight", title: "Pulverturm & Gemeindehaus", sub: "Gotik und Jugendstil", ref: "#pr-pulverturm", sight: "pr-pulverturm" },
    { s: "11:20", e: "11:30", kind: "walk", title: "Über die Celetná zum Altstädter Ring", sub: "ca. 450 m · 6 Min.", ref: "#pr-ring" },
    { s: "11:30", e: "12:05", kind: "sight", title: "Altstädter Ring & Astronomische Uhr", sub: "Apostelumgang um 12:00 Uhr", ref: "#pr-orloj", sight: "pr-orloj", major: true },
    { s: "12:05", e: "12:25", kind: "sight", title: "Teynkirche", sub: "Di–Sa bis 13 Uhr geöffnet", ref: "#pr-teyn", sight: "pr-teyn" },
    { s: "12:30", e: "13:30", kind: "food", title: "Mittagessen im Lokál Dlouhááá", sub: "Svíčková & Pilsner vom Tank", ref: "#lokal-dlouha", major: true },
    { s: "13:30", e: "13:45", kind: "walk", title: "Fußweg zur Karlsbrücke", sub: "ca. 1,1 km · 14 Min.", ref: "#pr-karlsbruecke" },
    { s: "13:45", e: "14:15", kind: "sight", title: "Karlsbrücke", sub: "Blick auf die Burg", ref: "#pr-karlsbruecke", sight: "pr-karlsbruecke", major: true },
    { s: "14:15", e: "14:25", kind: "walk", title: "Fußweg zum Kleinseitner Ring", sub: "ca. 550 m · 7 Min.", ref: "#pr-nikolaus", city: "Kleinseite" },
    { s: "14:25", e: "14:55", kind: "sight", title: "St.-Nikolaus-Kirche", sub: "Barock der Dientzenhofer", ref: "#pr-nikolaus", sight: "pr-nikolaus" },
    { s: "15:00", e: "15:08", kind: "tram", dep: true, title: "Tram 22 → Pražský hrad", sub: "ca. 8 Min. bergauf · PID-Ticket", ref: "#c-tram", place: "pr_malnam", to: "pr_hrad", major: true },
    { s: "15:08", e: "15:15", kind: "walk", title: "Fußweg in den Burghof", sub: "ca. 5 Min. · Sicherheitskontrolle", ref: "#pr-burg", place: "pr_hrad", city: "Prager Burg" },
    { s: "15:15", e: "16:10", kind: "sight", title: "Prager Burg & Veitsdom", sub: "Gebäude bis 17 Uhr (Winter 16 Uhr)", ref: "#pr-veitsdom", sight: "pr-veitsdom", major: true },
    { s: "16:10", e: "16:40", kind: "sight", title: "Goldenes Gässchen", sub: "mit Burg-Ticket", ref: "#pr-gaesschen", sight: "pr-gaesschen" },
    { s: "16:40", e: "17:10", kind: "sight", title: "Burgareal & Aussicht", sub: "Areal kostenlos bis 22 Uhr", ref: "#pr-burg", sight: "pr-burg" },
    { s: "17:10", e: "17:35", kind: "walk", title: "Abstieg über die Alte Schlossstiege", sub: "ca. 1,2 km · 20 Min.", ref: "#kuzelka", city: "Kleinseite" },
    { s: "17:40", e: "19:10", kind: "food", title: "Abendessen im Lokál U Bílé kuželky", sub: "an der Karlsbrücke · reservieren", ref: "#kuzelka", major: true },
    { s: "19:10", e: "19:20", kind: "walk", title: "Fußweg zur Metro Malostranská", sub: "ca. 600 m · 8 Min.", ref: "#c-rueck", place: "pr_malostr" },
    { s: "19:20", e: "19:40", kind: "metro", dep: true, title: "Metro A + C → Hlavní nádraží", sub: "Umstieg in Muzeum · ca. 20 Min.", ref: "#c-rueck", place: "pr_malostr", to: "pr_hln", toCity: "Hlavní nádraží" },
    { s: "19:40", e: "20:35", kind: "buffer", title: "Puffer am Bahnhof", sub: "Proviant kaufen, zum Gleis gehen", ref: "#c-rueck" },
    { s: "20:47", e: "23:05", kind: "train", dep: true, title: "EC Praha hl. n. → Dresden Hbf", sub: "Zeit noch prüfen · Ticket zuggebunden", ref: "#c-rueck", place: "pr_hln", to: "dd_hbf", major: true }
  ];

  var mapLines = [
    { pts: ["dd_hbf", "pr_hln"], kind: "train", tt: "ttTrain" },
    { pts: ["pr_malnam", "pr_hrad"], kind: "tram", tt: "ttTram" },
    { pts: ["pr_malostr", "pr_hln"], kind: "ret", tt: "ttMetro" }
  ];

  var weatherSpots = [
    { name: "Altstadt", lat: 50.087, lon: 14.421, from: 10, to: 13 },
    { name: "Prager Burg", lat: 50.091, lon: 14.400, from: 14, to: 17 },
    { name: "Kleinseite", lat: 50.087, lon: 14.405, from: 18, to: 20 }
  ];

  var sources = [
    { label: "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)", url: "https://www.bahn.de/" },
    { label: "DB Sparpreis Europa Tschechien", url: "https://www.bahn.de/angebot/sparpreis-flexpreis/sparpreis-europa-tschechien" },
    { label: "České dráhy (ČD)", url: "https://www.cd.cz/" },
    { label: "PID – Prager Nahverkehr (Tickets, Fahrplan)", url: "https://pid.cz/" },
    { label: "Prager Burg – Öffnungszeiten & Tickets (hrad.cz)", url: "https://www.hrad.cz/" },
    { label: "Prague City Tourism (prague.eu)", url: "https://prague.eu/" },
    { label: "Jüdisches Museum in Prag", url: "https://www.jewishmuseum.cz/" },
    { label: "OpenStreetMap (Karten)", url: "https://www.openstreetmap.org/" },
    { label: "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)", url: "https://open-meteo.com/" }
  ];

  window.TRIP = {
    date: TRIP_DATE, checkedAt: CHECKED_AT, storeKey: "pr26", meet: "dd_hbf", simTime: "13:00", walkKm: 8,
    areas: areas, places: places, sights: sights, optionalSights: optionalSights,
    restaurants: restaurants, cafes: cafes, connections: connections, connOrder: connOrder,
    mapLines: mapLines, plans: { main: main }, routes: {}, weatherSpots: weatherSpots, sources: sources
  };
})();
