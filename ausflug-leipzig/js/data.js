/*
 * Reisedaten: Tagesausflug Dresden → Leipzig (Bahn).
 * Kein festes Reisedatum (date: null): Der Ablauf ist ein Beispieltag, die
 * Öffnungs-Ampel und der Reisemodus beziehen sich immer auf den heutigen Tag.
 *
 * Alle Inhalte der Seite kommen aus dieser Datei. Fahrzeiten sind BEISPIELE
 * (RE50 fährt stündlich) – die passende Abfahrt im DB Navigator wählen.
 * Öffnungszeiten stammen aus Recherche über Suchergebnisse (Stand CHECKED_AT)
 * und sind teils saisonabhängig; Koordinaten sind auf ca. 50–100 m genau.
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
  // Sommerhalbjahr (April–Oktober) – für saisonale Öffnungszeiten
  var SUMMER = (function () { var m = new Date().getMonth(); return m >= 3 && m <= 9; })();

  var CHECKED_AT = "07.10.2026";

  // ---------------------------------------------------------------- Bereiche
  // key = city-Wert der Orte; q = Stadt für die Google-Maps-Suche; view = Kartenausschnitt
  var areas = [
    { key: "zentrum", q: "Leipzig", view: [[51.3375, 12.3700], [51.3465, 12.3840]] },
    { key: "voelkerschlacht", q: "Leipzig", view: [[51.3100, 12.4060], [51.3165, 12.4170]] },
    { key: "plagwitz", q: "Leipzig", view: [[51.3255, 12.3170], [51.3350, 12.3400]] }
  ];

  // ---------------------------------------------------------------- Orte (Bahnhöfe/Haltestellen)
  var places = {
    dd_hbf: { gmaps: "Dresden Hauptbahnhof", name: "Dresden Hauptbahnhof", dest: "Dresden", type: "station", lat: 51.04039, lon: 13.73147 },
    le_hbf: { gmaps: "Leipzig Hauptbahnhof", name: "Leipzig Hauptbahnhof", dest: "Leipzig", type: "station", lat: 51.34550, lon: 12.38210 },
    le_aug: { gmaps: "Haltestelle Augustusplatz Leipzig", name: "Augustusplatz (Straßenbahn)", dest: "Augustusplatz", type: "bus", lat: 51.33920, lon: 12.38120 },
    le_vsd: { gmaps: "Haltestelle Völkerschlachtdenkmal Leipzig", name: "Völkerschlachtdenkmal (Straßenbahn)", dest: "Völkerschlachtdenkmal", type: "bus", lat: 51.31480, lon: 12.41060 },
    le_plag: { gmaps: "S-Bahnhof Leipzig-Plagwitz", name: "S-Bf. Plagwitz (Straßenbahn)", dest: "Plagwitz", type: "bus", lat: 51.32680, lon: 12.33680 }
  };

  // ---------------------------------------------------------------- Sehenswürdigkeiten
  var sights = [
    // ---------- Innenstadt
    {
      id: "le-hbf", city: "zentrum", gmaps: "Leipzig Hauptbahnhof", name: "Hauptbahnhof & Promenaden", lat: 51.34550, lon: 12.38210, photo: null,
      text: "Mit 83.640 m² Grundfläche der flächenmäßig größte Kopfbahnhof Europas; in den „Promenaden“ gibt es rund 140 Geschäfte auf drei Ebenen.",
      why: "Eindrucksvolle Bahnhofshalle – der natürliche Start in den Tag.",
      duration: "10–15 Min.", walkFrom: { label: "Ankunft", text: "direkt bei Ankunft" },
      hoursNote: "Bahnhof rund um die Uhr; Promenaden-Geschäfte Mo–Sa 9:30–21 Uhr, So 12–18 Uhr (Sonntag bitte prüfen).", hours: null, alwaysOpen: true
    },
    {
      id: "le-augustus", city: "zentrum", gmaps: "Augustusplatz Leipzig", name: "Augustusplatz: Gewandhaus, Oper & Paulinum", lat: 51.33890, lon: 12.38100, photo: null,
      text: "Einer der größten Plätze Deutschlands (angelegt ab 1831) mit dem Gewandhaus von 1981, der Oper von 1960 und dem Universitätsneubau samt Paulinum, das an die 1968 gesprengte Universitätskirche erinnert.",
      why: "Leipzigs Musik- und Universitätsleben an einem Ort.",
      duration: "10 Min.", walkFrom: { label: "vom Hauptbahnhof", text: "ca. 700 m · 10 Min. vom Hauptbahnhof" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "le-panorama", city: "zentrum", gmaps: "Panorama Tower Leipzig", name: "Panorama Tower (City-Hochhaus)", lat: 51.33830, lon: 12.37900, photo: null,
      text: "Das 142,5 m hohe City-Hochhaus am Augustusplatz hat im 31. Stock in rund 120 m Höhe eine Aussichtsplattform.",
      why: "Der beste Blick über Leipzig – gut für den Überblick zu Beginn.",
      duration: "20–30 Min.", walkFrom: { label: "vom Augustusplatz", text: "direkt am Augustusplatz" },
      hours: hours({ "Mo-Do": [["09:00", "22:00"]], "Fr-Sa": [["09:00", "23:00"]], "So": [["09:00", "21:30"]] }), hoursLabel: "Aussichtsplattform",
      hoursNote: "Plattform täglich ab 9 Uhr bis 30 Min. vor Schließung des Restaurants (Mo–Do ca. 22, Fr–Sa ca. 23, So ca. 21:30 Uhr) – Stand nicht gesichert.",
      extra: "Eintritt ca. 5 € (Münzautomat am Aufzug).",
      verify: true, web: "https://panorama-leipzig.de/"
    },
    {
      id: "le-nikolai", city: "zentrum", gmaps: "Nikolaikirche Leipzig", name: "Nikolaikirche", lat: 51.34050, lon: 12.37860, photo: null,
      text: "Leipzigs größte Kirche. Die seit 1982 abgehaltenen Friedensgebete wurden zum Ausgangspunkt der Montagsdemonstrationen und der Friedlichen Revolution 1989.",
      why: "Ein Schlüsselort der deutschen Einheit – mit klassizistischem Innenraum und palmenartigen Säulen.",
      duration: "20–25 Min.", walkFrom: { label: "vom Augustusplatz", text: "ca. 250 m · 3 Min. vom Augustusplatz" },
      hours: hours({ "Mo-Fr": [["11:00", "18:00"]], "Sa": [["11:00", "16:00"]], "So": [["10:00", "14:30"]] }),
      hoursNote: "Mo–Fr 11–18, Sa 11–16, So 10–14:30 Uhr (Sekundärquelle). Eintritt frei.",
      extra: "Das Friedensgebet findet weiterhin jeden Montag um 17 Uhr statt.",
      verify: true, web: "https://www.nikolaikirche.de/"
    },
    {
      id: "le-markt", city: "zentrum", gmaps: "Altes Rathaus Leipzig", name: "Markt & Altes Rathaus", lat: 51.34040, lon: 12.37500, photo: null,
      text: "Das Renaissance-Rathaus von 1556/57 beherrscht den Marktplatz; darin zeigt das Stadtgeschichtliche Museum auf drei Etagen die Geschichte Leipzigs.",
      why: "Eines der schönsten Renaissance-Rathäuser Deutschlands – und die Dauerausstellung ist inzwischen kostenlos.",
      duration: "30–45 Min.", walkFrom: { label: "von der Nikolaikirche", text: "ca. 300 m · 4 Min. von der Nikolaikirche" },
      hours: hours({ "Di-So": [["10:00", "18:00"]] }), hoursLabel: "Stadtgeschichtliches Museum",
      hoursNote: "Platz jederzeit. Museum im Alten Rathaus Di–So & feiertags 10–18 Uhr, Montag geschlossen; Dauerausstellung kostenlos.",
      web: "https://www.stadtgeschichtliches-museum-leipzig.de/"
    },
    {
      id: "le-maedler", city: "zentrum", gmaps: "Mädler-Passage Leipzig", name: "Mädler-Passage", lat: 51.33940, lon: 12.37590, photo: null,
      text: "Die Ladenpassage von 1912–14 mit den Figurengruppen von Faust und Mephisto am Abgang zu Auerbachs Keller, einem Schauplatz aus Goethes „Faust“.",
      why: "Leipzigs berühmteste Passage und ein literarischer Ort.",
      duration: "10 Min.", walkFrom: { label: "vom Markt", text: "ca. 150 m · 2 Min. vom Markt" },
      hoursNote: "Passage tagsüber geöffnet.", hours: null, alwaysOpen: true
    },
    {
      id: "le-thomas", city: "zentrum", gmaps: "Thomaskirche Leipzig", name: "Thomaskirche", lat: 51.33930, lon: 12.37260, photo: null,
      text: "Johann Sebastian Bach war hier 1723–1750 Thomaskantor; sein Grab liegt in der Kirche. Sie ist Heimat des Thomanerchors.",
      why: "Bachs Wirkungsstätte – mit etwas Glück hört man den Thomanerchor live.",
      duration: "20–30 Min.", walkFrom: { label: "von der Mädler-Passage", text: "ca. 300 m · 4 Min. von der Mädler-Passage" },
      hours: hours({ "Mo-So": [["12:00", "16:00"]] }),
      hoursNote: "Besichtigung laut Recherche täglich ca. 12–16 Uhr; kann wegen Proben kurzfristig abweichen – bitte prüfen.",
      extra: "Motetten mit dem Thomanerchor: Fr 18 Uhr, Sa 15 Uhr (Programmheft an der Tür, Einlass ab ca. 45 Min. vorher, kein Vorverkauf).",
      verify: true, web: "https://www.thomaskirche.org/"
    },

    // ---------- Völkerschlachtdenkmal
    {
      id: "le-vsd", city: "voelkerschlacht", gmaps: "Völkerschlachtdenkmal Leipzig", name: "Völkerschlachtdenkmal", lat: 51.31230, lon: 12.41320, photo: null,
      text: "Das 91 m hohe Denkmal von 1913 erinnert an die Völkerschlacht von 1813 – mit Krypta, Aussichtsplattform und dem Museum „Forum 1813“.",
      why: "Eines der größten Denkmäler Europas, mit weitem Blick über die Stadt.",
      duration: "60–75 Min.", walkFrom: { label: "von der Haltestelle", text: "ca. 500 m · 7 Min. von der Haltestelle" },
      hours: hours({ "Mo-So": [["10:00", SUMMER ? "18:00" : "16:00"]] }),
      hoursNote: "April–Oktober täglich 10–18 Uhr, November–März täglich 10–16 Uhr.",
      extra: "Eintritt 10 €, ermäßigt 8 €, Familien 20 €, Kinder unter 6 frei.",
      planB: "Im Winterhalbjahr schließt das Denkmal schon um 16 Uhr – dann den Besuch vor das Mittagessen legen oder die Innenstadt kürzen.",
      web: "https://www.stadtgeschichtliches-museum-leipzig.de/"
    },

    // ---------- Plagwitz
    {
      id: "le-kanal", city: "plagwitz", gmaps: "Karl-Heine-Kanal Leipzig", name: "Karl-Heine-Kanal", lat: 51.33350, lon: 12.33650, photo: null,
      text: "Der ab 1856 von Karl Heine angelegte Kanal führt vorbei an sanierten Fabriken – das ganze Viertel steht unter Denkmalschutz; am Ufer verläuft ein Rad- und Fußweg.",
      why: "Leipzigs Industriegeschichte als lebendiges Szeneviertel – im Sommer wird auf dem Kanal gepaddelt.",
      duration: "45–60 Min.", walkFrom: { label: "von der Haltestelle", text: "wenige Minuten von der Haltestelle S-Bf. Plagwitz" },
      hoursNote: "Jederzeit zugänglich.", hours: null, alwaysOpen: true
    }
  ];

  var optionalSights = [
    {
      id: "le-zfl", city: "zentrum", gmaps: "Zeitgeschichtliches Forum Leipzig", name: "Zeitgeschichtliches Forum", lat: 51.33970, lon: 12.37670, optional: true, photo: null,
      text: "Die Ausstellung „Unsere Geschichte. Diktatur und Demokratie nach 1945“ zeigt rund 2.000 Objekte zur deutschen Teilung und zur Friedlichen Revolution.",
      why: "Kostenlos und macht 1989 greifbar – passt direkt zur Nikolaikirche.",
      duration: "45–60 Min.", walkFrom: { label: "neben der Mädler-Passage", text: "neben der Mädler-Passage" },
      hours: hours({ "Di-Fr": [["09:00", "18:00"]], "Sa-So": [["10:00", "18:00"]] }),
      hoursNote: "Di–Fr 9–18, Sa/So & feiertags 10–18 Uhr, Montag geschlossen. Eintritt frei.",
      reason: "Nicht im Hauptplan: Mit Völkerschlachtdenkmal und Plagwitz wird der Tag sonst zu voll – gute Alternative bei Regen.",
      web: "https://www.hdg.de/zeitgeschichtliches-forum"
    },
    {
      id: "le-bach", city: "zentrum", gmaps: "Bach-Museum Leipzig", name: "Bach-Museum", lat: 51.33900, lon: 12.37310, optional: true, photo: null,
      text: "Das Museum im Bosehaus gegenüber der Thomaskirche widmet sich Leben und Werk Johann Sebastian Bachs.",
      why: "Ergänzt den Besuch der Thomaskirche ideal.",
      duration: "45–60 Min.", walkFrom: { label: "gegenüber der Thomaskirche", text: "gegenüber der Thomaskirche" },
      hours: hours({ "Di-So": [["10:00", "18:00"]] }),
      hoursNote: "Di–So 10–18 Uhr, Montag geschlossen. Eintrittspreis bitte prüfen.",
      reason: "Nicht im Hauptplan – lohnt sich für Musikinteressierte statt Café-Pause.",
      verify: true, web: "https://www.bachmuseumleipzig.de/"
    },
    {
      id: "le-spinnerei", city: "plagwitz", gmaps: "Spinnerei Leipzig", name: "Spinnerei (Baumwollspinnerei)", lat: 51.33050, lon: 12.31950, optional: true, photo: null,
      text: "Die einstige Baumwollspinnerei beherbergt heute rund 100 Ateliers und etwa 11 Galerien – eng verbunden mit der „Neuen Leipziger Schule“.",
      why: "Ein Zentrum zeitgenössischer Kunst in eindrucksvoller Industriearchitektur; Eintritt in die Galerien frei.",
      duration: "45–60 Min.", walkFrom: { label: "von der Haltestelle", text: "ca. 5 Min. von der Haltestelle S-Bf. Plagwitz" },
      hours: hours({ "Di-Sa": [["11:00", "18:00"]] }),
      hoursNote: "Galerien Di–Sa 11–18 Uhr, Sonntag und Montag geschlossen.",
      reason: "Nicht im Hauptplan: Ankunft in Plagwitz erst gegen 17:15 Uhr, die Galerien schließen um 18 Uhr. Wer sie sehen will, kürzt das Völkerschlachtdenkmal.",
      web: "https://www.spinnerei.de/"
    }
  ];

  // ---------------------------------------------------------------- Essen
  var restaurants = [
    {
      id: "auerbach", role: "lunch", priority: "Erste Empfehlung", city: "zentrum",
      name: "Auerbachs Keller", lat: 51.33940, lon: 12.37590,
      address: "Grimmaische Straße 2–4 (Mädler-Passage), 04109 Leipzig",
      cuisine: "Sächsische und saisonale Küche",
      when: "Mittagessen, ca. 12:30–13:30 Uhr",
      text: "Das berühmte Lokal unter der Mädler-Passage ist Schauplatz in Goethes „Faust“; es gibt den Großen Keller und die Historischen Weinstuben.",
      why: "Ein Stück Literaturgeschichte zum Mittagessen – direkt an der Route.",
      hours: hours({ "Mo-So": [["11:30", "23:59"]] }),
      hoursNote: "Laut älteren Angaben täglich 11:30–24 Uhr – bitte prüfen.",
      price: "€€–€€€ (Einschätzung)",
      rating: null,
      web: "https://www.auerbachs-keller-leipzig.de/",
      note: "Reservierung empfohlen, besonders am Wochenende."
    },
    {
      id: "zills", role: "lunch", priority: "Alternative", city: "zentrum",
      name: "Zill's Tunnel", lat: 51.34100, lon: 12.37390,
      address: "Barfußgäßchen 9, 04109 Leipzig",
      cuisine: "Traditionsgaststätte, sächsische Küche, Gose",
      when: "Alternative mittags – oder abends, wer in der Innenstadt essen will",
      text: "Traditionsgaststätte seit 1841 im Kneipenviertel „Drallewatsch“, bekannt für sächsische Gerichte und Leipziger Gose.",
      hours: hours({ "Mo-So": [["11:30", "23:59"]] }),
      hoursNote: "Laut Recherche täglich 11:30–24 Uhr – bitte prüfen.",
      price: "€€ (Einschätzung)",
      rating: null
    },
    {
      id: "stelzenhaus", role: "dinner", priority: "Erste Empfehlung", city: "plagwitz",
      name: "Stelzenhaus", lat: 51.33130, lon: 12.32500,
      address: "Weißenfelser Straße 65H, 04229 Leipzig",
      cuisine: "Moderne, kreative Küche",
      when: "Abendessen, ca. 18:15–19:45 Uhr",
      text: "Restaurant in einem Walzwerk-Gebäude von 1939, das auf Stelzen über dem Karl-Heine-Kanal steht.",
      why: "Industriecharme direkt am Wasser – passt perfekt zum Spaziergang am Kanal.",
      hours: hours({ "Mo-Sa": [["11:00", "22:30"]], "So": [["09:00", "22:30"]] }),
      hoursNote: "Laut Branchenverzeichnis Mo–Sa 11–22:30, So 9–22:30 Uhr – bitte prüfen.",
      price: "€€–€€€ (Einschätzung)",
      rating: null,
      note: "Reservierung empfohlen. Wer lieber in der Innenstadt isst: Zill's Tunnel (siehe oben)."
    }
  ];

  var cafes = [
    {
      id: "c-kandler", city: "zentrum", name: "Café Kandler", lat: 51.33920, lon: 12.37350,
      address: "Thomaskirchhof 11, Leipzig",
      hours: null, uncertain: true,
      hoursNote: "Öffnungszeiten nur teilweise belegt (Mo–Do ca. 10–20 Uhr) – bitte prüfen.",
      text: "Konditorei-Café gegenüber der Thomaskirche, bekannt für die Leipziger Lerche und den „Bachtaler“.",
      special: "Leipziger Lerche", price: "€ (Einschätzung)", distance: "gegenüber der Thomaskirche"
    },
    {
      id: "c-coffebaum", city: "zentrum", name: "Zum Arabischen Coffe Baum", lat: 51.34090, lon: 12.37250,
      address: "Kleine Fleischergasse 4, Leipzig",
      hours: hours({ "Mo-So": [["11:00", "19:00"]] }),
      hoursNote: "Seit 1. Juli 2025 nach Renovierung wieder geöffnet; täglich ca. 11–19 Uhr (bitte prüfen).",
      text: "Eines der ältesten Kaffeehäuser Deutschlands – hier wird seit 1711 Kaffee ausgeschenkt; mit kostenlosem Kaffeemuseum.",
      special: "Kaffeemuseum (Eintritt frei)", price: "€–€€ (Einschätzung)", distance: "ca. 3 Min. vom Markt"
    },
    {
      id: "c-riquet", city: "zentrum", name: "Kaffeehaus Riquet", lat: 51.34110, lon: 12.37780,
      address: "Schuhmachergäßchen 1, Leipzig",
      hours: null, uncertain: true,
      hoursNote: "Angaben widersprüchlich (teils täglich 9–24 Uhr) – bitte prüfen.",
      text: "Kaffeehaus mit Jugendstil und chinesisch inspirierter Fassade – am Eingang wachen kupferne Elefantenköpfe.",
      special: "Kaffeehaus-Atmosphäre", price: "€–€€ (Einschätzung)", distance: "ca. 2 Min. von der Nikolaikirche"
    }
  ];

  // ---------------------------------------------------------------- Verbindungen (BEISPIELZEITEN)
  var connections = {
    hin: {
      id: "hin", title: "Dresden → Leipzig", legs: [
        { mode: "train", line: "RE50", dir: "Leipzig Hbf", dep: "08:10", from: "Dresden Hbf", fromPl: "Gleis prüfen", arr: "09:55", to: "Leipzig Hbf", toPl: "Gleis prüfen", toCity: "Leipzig" }
      ],
      note: "⚠ Beispielzeit: Der RE50 fährt stündlich (ca. 1:45 h, Deutschlandticket gilt) und hält auch in Dresden Mitte und Dresden-Neustadt. Passende Abfahrt im DB Navigator wählen.",
      alts: ["Schneller: IC/ICE in ca. 1:05 h – kostet extra, das Deutschlandticket gilt dort nicht."]
    },
    tram1: {
      id: "tram1", title: "Innenstadt → Völkerschlachtdenkmal", legs: [
        { mode: "tram", line: "Tram 15", dir: "Meusdorf", dep: "14:45", from: "Augustusplatz", fromPl: "Haltestelle prüfen", arr: "15:00", to: "Völkerschlachtdenkmal", toCity: "Völkerschlachtdenkmal" }
      ],
      note: "Ca. 15 Min. im dichten Takt. Das Deutschlandticket gilt in Leipzigs Straßenbahnen und Bussen (LVB).",
      alts: ["Alternativ S-Bahn S1/S4 bis Haltepunkt Völkerschlachtdenkmal."]
    },
    tram2: {
      id: "tram2", title: "Völkerschlachtdenkmal → Plagwitz", legs: [
        { mode: "tram", line: "Tram 15", dir: "Innenstadt", dep: "16:30", from: "Völkerschlachtdenkmal", fromPl: "Haltestelle prüfen", arr: "16:50", to: "Hauptbahnhof", toCity: "Hauptbahnhof" },
        { mode: "walk", text: "Umstieg am Hauptbahnhof", buffer: "ca. 5 Min." },
        { mode: "tram", line: "Tram 14", dir: "S-Bf. Plagwitz", dep: "16:55", from: "Hauptbahnhof", fromPl: "Haltestelle prüfen", arr: "17:15", to: "S-Bf. Plagwitz", toCity: "Plagwitz" }
      ],
      note: "⚠ Zeiten geschätzt, Linienführung bitte in der LVB-App prüfen."
    },
    rueck: {
      id: "rueck", title: "Leipzig → Dresden", options: [
        { label: "Empfohlen", legs: [
          { mode: "tram", line: "Tram 14", dir: "Hauptbahnhof", dep: "19:45", from: "S-Bf. Plagwitz", fromPl: "Haltestelle prüfen", arr: "20:05", to: "Hauptbahnhof", toCity: "Hauptbahnhof" },
          { mode: "train", line: "RE50", dir: "Dresden Hbf", dep: "20:15", from: "Leipzig Hbf", fromPl: "Gleis prüfen", arr: "22:00", to: "Dresden Hbf", toPl: "Gleis prüfen", toCity: "Dresden" }
        ], info: "Beispielzeiten, ca. 2:15 h ab Plagwitz" },
        { label: "Später", legs: [
          { mode: "train", line: "RE50", dir: "Dresden Hbf", dep: "21:15", from: "Leipzig Hbf", fromPl: "Gleis prüfen", arr: "23:00", to: "Dresden Hbf", toPl: "Gleis prüfen", toCity: "Dresden" }
        ], info: "Beispielzeit, eine Stunde später" }
      ],
      note: "⚠ Beispielzeiten. Die letzte bequeme RE50-Verbindung fährt etwa um 21–22 Uhr – im DB Navigator prüfen."
    }
  };
  var connOrder = [["hin", "tagOut"], ["tram1", "tagTram1"], ["tram2", "tagTram2"], ["rueck", "tagReturn"]];

  // ---------------------------------------------------------------- Tagesplan (BEISPIELZEITEN)
  var main = [
    { s: "07:55", e: "08:10", kind: "meet", title: "Treffen am Dresden Hauptbahnhof", sub: "RE50 Richtung Leipzig – Gleis in der App prüfen", ref: "#oepnv", place: "dd_hbf" },
    { s: "08:10", e: "09:55", kind: "train", dep: true, title: "RE50 Dresden Hbf → Leipzig Hbf", sub: "Beispielzeit · stündlich · ca. 1:45 h", ref: "#c-hin", place: "dd_hbf", to: "le_hbf", major: true },
    { s: "09:55", e: "10:10", kind: "sight", title: "Hauptbahnhof & Promenaden", sub: "größter Kopfbahnhof Europas", ref: "#le-hbf", sight: "le-hbf", city: "Leipzig", major: true },
    { s: "10:10", e: "10:20", kind: "walk", title: "Fußweg zum Augustusplatz", sub: "ca. 700 m · 10 Min.", ref: "#le-augustus", place: "le_hbf" },
    { s: "10:20", e: "11:00", kind: "sight", title: "Augustusplatz & Panorama Tower", sub: "Aussicht aus 120 m Höhe", ref: "#le-panorama", sight: "le-panorama" },
    { s: "11:05", e: "11:30", kind: "sight", title: "Nikolaikirche", sub: "öffnet Mo–Sa um 11 Uhr", ref: "#le-nikolai", sight: "le-nikolai" },
    { s: "11:35", e: "12:20", kind: "sight", title: "Markt & Altes Rathaus", sub: "Stadtgeschichtliches Museum, Eintritt frei (Mo zu)", ref: "#le-markt", sight: "le-markt" },
    { s: "12:20", e: "12:30", kind: "sight", title: "Mädler-Passage", sub: "Faust & Mephisto", ref: "#le-maedler", sight: "le-maedler" },
    { s: "12:30", e: "13:30", kind: "food", title: "Mittagessen in Auerbachs Keller", sub: "oder Zill's Tunnel", ref: "#auerbach", major: true },
    { s: "13:35", e: "14:05", kind: "sight", title: "Thomaskirche", sub: "Bachs Grab", ref: "#le-thomas", sight: "le-thomas" },
    { s: "14:05", e: "14:30", kind: "cafe", title: "Leipziger Lerche im Café Kandler", sub: "gegenüber der Thomaskirche", ref: "#c-kandler" },
    { s: "14:30", e: "14:45", kind: "walk", title: "Fußweg zum Augustusplatz", sub: "ca. 800 m · 11 Min.", ref: "#c-tram1", place: "le_aug" },
    { s: "14:45", e: "15:00", kind: "tram", dep: true, title: "Straßenbahn 15 → Völkerschlachtdenkmal", sub: "Richtung Meusdorf · ca. 15 Min.", ref: "#c-tram1", place: "le_aug", to: "le_vsd", major: true },
    { s: "15:00", e: "15:10", kind: "walk", title: "Fußweg zum Denkmal", sub: "ca. 500 m · 7 Min.", ref: "#le-vsd", place: "le_vsd", city: "Völkerschlachtdenkmal" },
    { s: "15:10", e: "16:20", kind: "sight", title: "Völkerschlachtdenkmal", sub: "Krypta & Aussichtsplattform (Nov–März nur bis 16 Uhr)", ref: "#le-vsd", sight: "le-vsd", major: true },
    { s: "16:20", e: "16:30", kind: "walk", title: "Zurück zur Haltestelle", sub: "ca. 500 m · 7 Min.", ref: "#c-tram2", place: "le_vsd" },
    { s: "16:30", e: "17:15", kind: "tram", dep: true, title: "Straßenbahn nach Plagwitz", sub: "Linie 15 bis Hauptbahnhof, dann Linie 14 · ca. 45 Min.", ref: "#c-tram2", place: "le_vsd", to: "le_plag", major: true },
    { s: "17:15", e: "18:15", kind: "sight", title: "Karl-Heine-Kanal", sub: "Spaziergang am Wasser", ref: "#le-kanal", sight: "le-kanal", city: "Plagwitz", major: true },
    { s: "18:15", e: "19:45", kind: "food", title: "Abendessen im Stelzenhaus", sub: "am Karl-Heine-Kanal · reservieren", ref: "#stelzenhaus", major: true },
    { s: "19:45", e: "20:05", kind: "tram", dep: true, title: "Straßenbahn 14 → Hauptbahnhof", sub: "ca. 20 Min.", ref: "#c-rueck", place: "le_plag", to: "le_hbf" },
    { s: "20:15", e: "22:00", kind: "train", dep: true, title: "RE50 Leipzig Hbf → Dresden", sub: "Beispielzeit · hält auch in Dresden-Neustadt und Mitte", ref: "#c-rueck", place: "le_hbf", to: "dd_hbf", major: true }
  ];

  var mapLines = [
    { pts: ["dd_hbf", "le_hbf"], kind: "train", tt: "ttTrain" },
    { pts: ["le_aug", "le_vsd"], kind: "tram", tt: "ttTram" },
    { pts: ["le_vsd", "le_hbf", "le_plag"], kind: "tram", tt: "ttTram2" }
  ];

  var weatherSpots = [
    { name: "Leipzig", lat: 51.340, lon: 12.375, from: 10, to: 14 },
    { name: "Völkerschlachtdenkmal", lat: 51.312, lon: 12.413, from: 15, to: 16 },
    { name: "Plagwitz", lat: 51.331, lon: 12.330, from: 17, to: 20 }
  ];

  var sources = [
    { label: "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)", url: "https://www.bahn.de/" },
    { label: "LVB – Leipziger Verkehrsbetriebe (Straßenbahn)", url: "https://www.l.de/verkehrsbetriebe/" },
    { label: "Leipzig Tourismus (leipzig.travel)", url: "https://www.leipzig.travel/" },
    { label: "Stadtgeschichtliches Museum Leipzig (Altes Rathaus, Völkerschlachtdenkmal)", url: "https://www.stadtgeschichtliches-museum-leipzig.de/" },
    { label: "Nikolaikirche Leipzig", url: "https://www.nikolaikirche.de/" },
    { label: "Thomaskirche Leipzig", url: "https://www.thomaskirche.org/" },
    { label: "Zeitgeschichtliches Forum Leipzig", url: "https://www.hdg.de/zeitgeschichtliches-forum" },
    { label: "Panorama Tower Leipzig", url: "https://panorama-leipzig.de/" },
    { label: "Spinnerei Leipzig", url: "https://www.spinnerei.de/" },
    { label: "OpenStreetMap (Karten)", url: "https://www.openstreetmap.org/" },
    { label: "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)", url: "https://open-meteo.com/" }
  ];

  window.TRIP = {
    date: null, checkedAt: CHECKED_AT, storeKey: "lz26", meet: "dd_hbf", simTime: "11:00", walkKm: 6,
    areas: areas, places: places, sights: sights, optionalSights: optionalSights,
    restaurants: restaurants, cafes: cafes, connections: connections, connOrder: connOrder,
    mapLines: mapLines, plans: { main: main }, routes: {}, weatherSpots: weatherSpots, sources: sources
  };
})();
