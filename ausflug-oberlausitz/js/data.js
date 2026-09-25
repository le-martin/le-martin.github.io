/*
 * Reisedaten für den Tagesausflug Oberlausitz (Fr, 25.09.2026).
 * Angepasste Route: verspäteter Start – Dresden Mitte 12:27 → Bautzen → Löbau → Zittau.
 * Herrnhut wird ausgelassen (der PlusBus 10 nach Zittau fährt zwar durch Herrnhut,
 * es wird dort aber nicht ausgestiegen).
 *
 * Alle Inhalte der Seite kommen aus dieser Datei. Zum Aktualisieren von Zeiten
 * nur hier ändern. CHECKED_AT bei jeder Prüfung anpassen.
 *
 * WICHTIG: Die Fahrplan-Uhrzeiten in diesem verspäteten Plan sind SCHÄTZUNGEN
 * (Größenordnungen), nicht aus der Fahrplanauskunft verifiziert. Vor der Fahrt
 * bitte in DB Navigator / ZVON / trilex prüfen. Öffnungszeiten stammen aus
 * Sekundärquellen und sind teils saisonabhängig.
 */
(function () {
  "use strict";

  // Öffnungszeiten-Helfer: Tage als "Mo-Fr", "Sa", "Mo,Di,Do" -> {1:[["10:00","17:00"]], ...}
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

  function commons(file, width) {
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=" + (width || 960);
  }
  function commonsPage(file) {
    return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file.replace(/ /g, "_"));
  }
  function photo(file) {
    return { src: commons(file), credit: commonsPage(file) };
  }

  var TRIP_DATE = "2026-09-25";
  var CHECKED_AT = "25.09.2026";

  // ---------------------------------------------------------------- Orte
  // type: station | bus | sight | food | cafe
  var places = {
    dd_mitte: { name: "Dresden Mitte", type: "station", lat: 51.05530, lon: 13.72130 },
    dd_hbf: { name: "Dresden Hauptbahnhof", type: "station", lat: 51.04039, lon: 13.73147 },
    bz_bhf: { name: "Bautzen Bahnhof", type: "station", lat: 51.17334, lon: 14.42895 },
    lb_bhf: { name: "Löbau Bahnhof", type: "station", lat: 51.09923, lon: 14.67179 },
    lb_bus: { name: "Löbau Busbahnhof", type: "bus", lat: 51.09906, lon: 14.67103 },
    zi_otto: { name: "Zittau Ottokarplatz (Bus)", type: "bus", lat: 50.89321, lon: 14.80973 },
    zi_bhf: { name: "Zittau Bahnhof", type: "station", lat: 50.90426, lon: 14.80576 }
  };

  // ---------------------------------------------------------------- Sehenswürdigkeiten
  var sights = [
    // ---------- Bautzen
    {
      id: "bz-kornmarkt", city: "bautzen", name: "Kornmarkt & Reichenstraße", lat: 51.18000, lon: 14.42650,
      photo: photo("Bautzen_-_Kornmarkt_01_ies.jpg"),
      text: "Vom Kornmarkt führt die Reichenstraße als Hauptachse der Altstadt direkt zum Hauptmarkt – gesäumt von barocken Bürgerhäusern.",
      why: "Am Ende der Straße steht der Reichenturm, Bautzens „schiefer Turm“ (rund 1,4 m aus dem Lot).",
      duration: "15 Min.", walkFrom: { label: "vom Bahnhof", key: "bz_bhf>bz_korn" },
      hoursNote: "Öffentlicher Raum – jederzeit zugänglich.",
      extra: "Reichenturm (Aussichtsplattform): laut Stadt Bautzen April–Oktober täglich 10–17 Uhr, kleiner Eintritt – bitte vor dem Besuch prüfen.",
      hours: null, alwaysOpen: true
    },
    {
      id: "bz-hauptmarkt", city: "bautzen", name: "Hauptmarkt & Rathaus", lat: 51.18139, lon: 14.42407,
      photo: photo("Bautzen - Hauptmarkt 03 ies.jpg"),
      text: "Das historische Zentrum Bautzens mit dem barocken Rathaus (heutige Form 1729–1732) und prächtigen Patrizierhäusern ringsum.",
      why: "Hier spürt man die Geschichte der Stadt als Hauptort der Oberlausitz am deutlichsten – ideal für die ersten Fotos.",
      duration: "15–20 Min.", walkFrom: { label: "von der Reichenstraße", key: "bz_reichen>bz_haupt" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "bz-dom", city: "bautzen", name: "Dom St. Petri", lat: 51.18245, lon: 14.42375,
      photo: photo("St_Petri_church_Bautzen_101.JPG"),
      text: "Eine der ältesten Simultankirchen Deutschlands: Seit 1524 teilen sich evangelische und katholische Gemeinde den Dom – getrennt nur durch ein Gitter.",
      why: "Die gemeinsame Nutzung durch zwei Konfessionen seit fast 500 Jahren ist einzigartig; auffällig ist auch der „geknickte“ Grundriss des Langhauses.",
      duration: "15–20 Min.", walkFrom: { label: "vom Hauptmarkt", key: "bz_haupt>bz_dom" },
      hours: hours({ "Mo-Sa": [["10:00", "17:30"]], "So": [["13:00", "17:30"]] }),
      hoursNote: "April–Oktober: Mo–Sa 10:00–17:30, So 13:00–17:30 (Kirchgemeinde). Während Gottesdiensten keine Besichtigung. Domturm nur Sa/So/Feiertag.",
      verify: true, web: "https://www.st-petri-bautzen.de/"
    },
    {
      id: "bz-ortenburg", city: "bautzen", name: "Ortenburg", lat: 51.18315, lon: 14.42028,
      photo: photo("Ortenburg_Bautzen_100.JPG"),
      text: "Die Burganlage auf dem Felsplateau über der Spree war über Jahrhunderte Sitz der Landesherren der Oberlausitz. Markant: das spätgotische Matthiasturm-Tor mit dem Relief des ungarischen Königs Matthias Corvinus.",
      why: "Historische Architektur, Blick ins Spreetal – und im Burghof das Sorbische Museum als Zentrum sorbischer Kultur.",
      duration: "20–30 Min.", walkFrom: { label: "vom Dom", key: "bz_dom>bz_orten" },
      hoursNote: "Burghof frei zugänglich. Sorbisches Museum (Ortenburg 3): Di–So 10–18 Uhr.",
      hours: hours({ "Di-So": [["10:00", "18:00"]] }), hoursLabel: "Sorbisches Museum",
      web: "https://sorbisches-museum.de/"
    },
    {
      id: "bz-wasserkunst", city: "bautzen", name: "Alte Wasserkunst", lat: 51.18062, lon: 14.42073,
      photo: photo("Alte_Wasserkunst_Bautzen_101.jpg"),
      text: "Der Wasserturm von 1558 versorgte die Stadt über Jahrhunderte mit Spreewasser und war zugleich Teil der Stadtbefestigung. Heute technisches Museum mit historischer Pumpenanlage.",
      why: "Technisches Denkmal, Aussicht vom Turm und das klassische Postkartenmotiv: Wasserkunst und Michaeliskirche über dem Spreetal.",
      duration: "20–30 Min.", walkFrom: { label: "von der Ortenburg", key: "bz_orten>bz_wk" },
      hours: null, uncertain: true,
      hoursNote: "Achtung Freitag: Die Angaben widersprechen sich. Mehrere Quellen nennen April–Oktober „Mo–Do, Sa–So 10–17 Uhr“ (also freitags geschlossen), andere „täglich 10–17 Uhr“. Bitte vorher anrufen: 03591 41588.",
      planB: "Falls geschlossen: Das schönste Motiv ist ohnehin von außen – von der Friedensbrücke (ca. 200 m südlich). Als Aussichts-Ersatz eignet sich der Reichenturm."
    },

    // ---------- Löbau
    {
      id: "lb-altmarkt", city: "loebau", name: "Altmarkt & Historisches Rathaus", lat: 51.09700, lon: 14.66900,
      photo: photo("Löbau, Rathaus.jpg"),
      text: "Der Altmarkt ist das barocke Herz Löbaus. Das Rathaus wurde 1711–1714 vom Zittauer Baumeister Prescher wieder aufgebaut und beherbergt eine der ursprünglich 14 Löbauer „Fleischbänke“; am Turm hängt eine Mondphasenuhr.",
      why: "Ein geschlossenes barockes Marktplatz-Ensemble – das „Wohnzimmer“ der Stadt und guter Startpunkt für den Rundgang.",
      duration: "15–20 Min.", walkFrom: { label: "vom Bahnhof", text: "ca. 0,5 km · 6 Min." },
      hoursNote: "Platz jederzeit zugänglich; Rathaus-Inneres nur zu Amtszeiten.", hours: null, alwaysOpen: true
    },
    {
      id: "lb-nikolai", city: "loebau", name: "Nikolaikirche", lat: 51.09720, lon: 14.66830,
      photo: null,
      text: "Die evangelische Hauptkirche, erstmals 1293 erwähnt, ist eine spätgotische Hallenkirche des 14. Jahrhunderts; 1742 wurde ein drittes, südliches Seitenschiff ergänzt.",
      why: "Ältestes Bauwerk und geistliches Zentrum der Altstadt – nur wenige Schritte vom Altmarkt.",
      duration: "10–15 Min.", walkFrom: { label: "vom Altmarkt", text: "wenige Schritte" },
      hours: null, uncertain: true,
      hoursNote: "Öffnungszeiten der Kirche variieren und sind nicht verlässlich belegt – bitte vor Ort bzw. bei der Kirchgemeinde prüfen. Außenansicht jederzeit."
    },
    {
      id: "lb-schminke", city: "loebau", name: "Haus Schminke", lat: 51.09300, lon: 14.68100,
      photo: photo("Haus Schminke Löbau.jpg"),
      text: "Wohnhaus des Nudelfabrikanten Fritz Schminke, 1930–1933 von Hans Scharoun erbaut – ein Hauptwerk der klassischen Moderne. Es gilt neben Villa Tugendhat, Villa Savoye und Fallingwater als eines der vier bedeutendsten modernen Wohnhäuser weltweit.",
      why: "Weltweit ikonische Architektur der Moderne – für Architekturinteressierte der eigentliche Grund, in Löbau auszusteigen.",
      duration: "45–60 Min. (nur mit früherer Ankunft)", walkFrom: { label: "vom Bahnhof", text: "ca. 0,9 km · 12 Min." },
      hours: hours({ "Do-So": [["12:00", "17:00"]] }),
      hoursNote: "Do–So 12:00–17:00 Uhr, letzter Einlass 15:45; öffentliche Führungen Sa/So 13:00 & 15:00 Uhr. Eintritt inkl. Führung 15 € / erm. 10 €. Mo–Mi geschlossen.",
      verify: true, web: "https://www.stiftung-hausschminke.eu/",
      planB: "⚠ Wichtig bei diesem späten Plan: Bei Ankunft in Löbau gegen 16 Uhr ist Haus Schminke praktisch nicht mehr zu besichtigen (letzter Einlass 15:45, letzte Führung 15:00). Nur sinnvoll, wenn ihr Bautzen deutlich kürzt und früher in Löbau seid – sonst nur von außen."
    },

    // ---------- Zittau
    {
      id: "zi-markt", city: "zittau", name: "Markt", lat: 50.89594, lon: 14.80645,
      photo: photo("Marktplatz Zittau 2016.jpg"),
      text: "Der weite Marktplatz mit barocken Bürgerhäusern und dem Marsbrunnen (Rolandbrunnen) ist das Herz der Altstadt.",
      why: "Guter Startpunkt für den Rundgang – alle weiteren Stationen liegen in wenigen Minuten Entfernung.",
      duration: "15–20 Min.", walkFrom: { label: "vom Ottokarplatz", key: "zi_otto>zi_markt" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "zi-rathaus", city: "zittau", name: "Rathaus", lat: 50.89598, lon: 14.80792,
      photo: photo("Rathaus Zittau 2022.jpg"),
      text: "Das Rathaus entstand 1840–1845 nach Plänen im Geist Karl Friedrich Schinkels – im Stil eines italienischen Renaissance-Palazzo, mit markantem Turm am Markt.",
      why: "Ungewöhnlich für Sachsen: ein „italienischer“ Palast mitten in der Oberlausitz, Ausdruck des Selbstbewusstseins der reichen Handelsstadt.",
      duration: "10 Min. (außen)", walkFrom: { label: "vom Markt", key: "zi_markt>zi_rh" },
      hoursNote: "Außenbesichtigung jederzeit.", hours: null, alwaysOpen: true
    },
    {
      id: "zi-johannis", city: "zittau", name: "Johanniskirche", lat: 50.89681, lon: 14.80659,
      photo: photo("Kirche_(Zittau_6).jpg"),
      text: "Die Hauptkirche Zittaus erhielt ihre heutige klassizistische Gestalt im 19. Jahrhundert, u. a. nach Entwürfen Karl Friedrich Schinkels. Der Turm ist über 266 Stufen zu besteigen.",
      why: "Vom Turm reicht der Blick über Zittau bis ins Zittauer, Iser- und Riesengebirge; fast täglich um 11:50 Uhr spielt der Türmer.",
      duration: "15–20 Min. (außen)", walkFrom: { label: "vom Rathaus", key: "zi_rh>zi_joh" },
      hours: hours({ "Mi-Sa": [["11:00", "17:00"]] }),
      hoursNote: "Kirche & Turm bis Ende Oktober Mi–Sa 11–17 Uhr (ehrenamtlich, ohne Gewähr). Bei der späten Ankunft am Abend ist innen zu – also von außen.",
      verify: true, web: "https://www.johannis-kirche-zittau.de/"
    },
    {
      id: "zi-salzhaus", city: "zittau", name: "Salzhaus & Neustadt", lat: 50.89598, lon: 14.81035,
      photo: photo("Neustadt_(Zittau).jpg"),
      text: "Das Salzhaus (erbaut 1511, später Kornspeicher) ist mit seinem riesigen Mansarddach eines der größten historischen Profangebäude der Stadt. Es steht am Platz „Neustadt“ mit mehreren Brunnen.",
      why: "Erinnert an Zittaus Reichtum durch den Salz- und Getreidehandel; heute mit Stadtbibliothek, Passage und Gastronomie.",
      duration: "15–20 Min.", walkFrom: { label: "von der Johanniskirche", key: "zi_joh>zi_salz" },
      hoursNote: "Außen jederzeit; Passage zu den Geschäftszeiten.", hours: null, alwaysOpen: true
    },
    {
      id: "zi-kloster", city: "zittau", name: "Klosterplatz", lat: 50.89735, lon: 14.80837,
      photo: null,
      text: "Ruhiger Platz am ehemaligen Franziskanerkloster mit der Klosterkirche St. Peter und Paul und dem Kulturhistorischen Museum.",
      why: "Einer der ältesten Teile der Stadt und schöner Abschluss des Rundgangs – vom Platz sind es nur 3 Minuten zum Dornspachhaus.",
      duration: "10–15 Min.", walkFrom: { label: "vom Salzhaus", key: "zi_salz>zi_kloster" },
      hours: hours({ "Di-So": [["10:00", "17:00"]] }), hoursLabel: "Kulturhist. Museum",
      hoursNote: "Platz jederzeit zugänglich. Kulturhistorisches Museum Franziskanerkloster: Di–So 10–17 Uhr (am Abend zu)."
    }
  ];

  var optionalSights = [
    {
      id: "lb-turm", city: "loebau", name: "König-Friedrich-August-Turm (Löbauer Berg)", lat: 51.09110, lon: 14.69280, optional: true,
      photo: photo("Loebau Koenig-Friedrich-August-Turm.jpg"),
      text: "Der 28 m hohe Aussichtsturm auf dem Löbauer Berg (447,9 m) wurde 1854 aus rund 1000 gusseisernen Teilen errichtet und gilt als einziger erhaltener vollständig gusseiserner Aussichtsturm.",
      why: "Einzigartiges technisches Denkmal mit Rundblick über die Oberlausitz bis ins Zittauer, Iser- und Riesengebirge – und in der Sommersaison bis in den Abend geöffnet, also das beste späte-Nachmittags-Ziel.",
      duration: "60–90 Min. inkl. Aufstieg", walkFrom: { label: "vom Bahnhof", text: "ca. 2,5 km bergauf · 40–50 Min. (oder per Taxi)" },
      hours: null, uncertain: true,
      hoursNote: "Laut Suche Mai–Sep Mo–Fr 9–20, Sa/So 9–22 Uhr; Okt–Apr früher zu. Saisonabhängig – bitte prüfen.",
      reason: "Nicht im Hauptplan: Der Berg liegt außerhalb der Stadt (~40–50 Min. Aufstieg). Nur sinnvoll, wenn ihr Bautzen kürzt oder Löbau als Schwerpunkt wählt.",
      web: "https://www.loebau.de/freizeit-und-tourismus/stadtrundgang/k%C3%B6nig-friedrich-august-turm/"
    }
  ];

  // ---------------------------------------------------------------- Essen
  var restaurants = [
    {
      id: "wjelbik", role: "lunch", priority: "Erste Empfehlung", city: "bautzen",
      name: "Wjelbik – Sorbisches Restaurant", lat: 51.18204, lon: 14.42514,
      address: "Kornstraße 7, 02625 Bautzen",
      cuisine: "Sorbische und regionale Lausitzer Küche",
      when: "spätes Mittagessen, ca. 13:30–14:30 Uhr",
      text: "Der Name bedeutet „kleines Gewölbe“ bzw. „Vorratskammer“. Das Restaurant liegt in einem rund 600 Jahre alten, denkmalgeschützten Gewölbebau nahe dem Dom und wird von einer Familie geführt. Empfohlen von Slow Food und Falstaff.",
      why: "Bautzen ist das Zentrum der sorbischen Kultur – hier bietet sich bewusst ein sorbisches Restaurant an.",
      hours: hours({ "Di-Sa": [["11:30", "15:00"], ["17:00", "21:30"]] }),
      hoursNote: "Di–Sa 11:30–15:00 und 17:00–21:30, So/Mo Ruhetag. Küche mittags bis 14:00.",
      price: "€€–€€€ (Einschätzung, gehobene Regionalküche – aktuelle Karte prüfen)",
      rating: "OpenTable: 4,9 / 5 (636 Bewertungen, Stand Recherche)",
      phone: "+49359142060",
      web: "https://www.wjelbik.de/",
      reserve: "https://www.opentable.com/wjelbik-sorbisches-restaurant",
      note: "Bei diesem späten Start knapp: Ankunft in Bautzen erst gegen 13:20 Uhr, Küche mittags nur bis 14:00. Reservierung empfohlen und beim Reservieren die späte Ankunft erwähnen – sonst ein Café/Imbiss und dafür abends in Zittau essen."
    },
    {
      id: "moenchshof", role: "lunch", priority: "Alternative", city: "bautzen",
      name: "Mönchshof", lat: 51.18162, lon: 14.42113,
      address: "Burglehn 1, 02625 Bautzen",
      cuisine: "Historisches Gasthaus, deftige Küche nach überlieferten Rezepten",
      when: "durchgehend warme Küche – gut bei später Ankunft",
      text: "Historisches Gasthaus mit mittelalterlicher Einrichtung zwischen Altstadt und Ortenburg; hausgebackenes Brot, eigene Biere und Liköre, Biergarten.",
      hours: hours({ "Di-Do": [["11:00", "22:00"]], "Fr-Sa": [["11:00", "23:00"]], "So": [["11:00", "21:00"]] }),
      hoursNote: "Fr 11–23 Uhr (Website), durchgehend warme Küche. Andere Tage laut Drittquellen: Mo Ruhetag, Di–Do 11–22, So 11–21 Uhr – bitte prüfen.",
      price: "€€ (Einschätzung – Karte prüfen)",
      rating: null,
      phone: "+493591490141",
      web: "https://www.moenchshof.de/",
      reserve: "https://www.opentable.com/monchshof-zu-bautzen",
      note: "Wegen der durchgehenden Küche die entspanntere Wahl, wenn ihr erst gegen 13:30 Uhr in Bautzen seid."
    },
    {
      id: "dornspachhaus", role: "dinner", priority: "Erste Empfehlung", city: "zittau",
      name: "Dornspachhaus", lat: 50.89701, lon: 14.80592,
      address: "Bautzner Straße 2, 02763 Zittau",
      cuisine: "Historisches Wirtshaus, Oberlausitzer Spezialitäten",
      when: "Abendessen, ca. 19:00–20:30 Uhr",
      text: "Eines der ältesten Bürgerhäuser Zittaus, benannt nach Bürgermeister Nikolaus von Dornspach, mit historischem Gewölbe und „Ritterkeller“.",
      pros: ["zentral gelegen (2 Min. vom Markt)", "historisches Ambiente", "gut mit dem Altstadtrundgang kombinierbar", "11 Min. zu Fuß zum Bahnhof"],
      hours: hours({ "Mo-So": [["11:30", "21:30"]] }),
      hoursNote: "Juli–September täglich 11:30–21:30 durchgehend (Oktober–Juni: 11:30–14:00 und 17:30–21:30).",
      price: "€€ (Einschätzung – Karte prüfen)",
      rating: "Von Tripadvisor empfohlen (laut Website) – aktuelle Bewertungen siehe Karte/Tripadvisor",
      phone: "+493583795883",
      web: "https://www.dornspachhaus.de/",
      reserve: "https://www.dornspachhaus.de/kontakt/",
      note: "Für Freitagabend reservieren – telefonisch oder über das Kontaktformular. Vor der Rückfahrt genug Zeit einplanen (11 Min. zum Bahnhof)."
    },
    {
      id: "altersack", role: "dinner", priority: "Alternative", city: "zittau",
      name: "Wirtshaus „Zum Alten Sack“ im Salzhaus", lat: 50.89577, lon: 14.81034,
      address: "Neustadt 47, 02763 Zittau",
      cuisine: "Rustikales Wirtshaus, Oberlausitzer Küche",
      when: "Alternative zum Dornspachhaus",
      text: "Das rustikale Wirtshaus liegt im historischen Salzhaus und kocht bewusst typisch Oberlausitzer Gerichte. Speisekarten auch auf Englisch, Tschechisch und Polnisch.",
      hours: hours({ "Di-So": [["11:00", "14:00"], ["17:00", "22:00"]] }),
      hoursNote: "Di–So 11–14 und 17–22 Uhr, Mo Ruhetag (Website).",
      price: "€–€€ (Einschätzung – Karte prüfen)",
      rating: null,
      phone: "+493583540459",
      web: "https://www.zumaltensack.de/"
    }
  ];

  var cafes = [
    {
      id: "c-evis", city: "bautzen", name: "Evis Deko & Café", lat: 51.18106, lon: 14.42688,
      address: "Reichenstraße 24, Bautzen",
      hours: hours({ "Mo-Sa": [["09:00", "18:00"]] }), hoursNote: "Mo–Sa 9–18 Uhr",
      text: "Café und Dekoladen in einem. Hausgemachte Törtchen und Kuchen, Kaffee einer Dresdner Rösterei, außerdem Frühstück, Crêpes und Suppen.",
      special: "Hausgemachte Törtchen", price: "€ (Einschätzung)", distance: "direkt an der Route (Reichenstraße)",
      web: "https://evis-deko-cafe.de/"
    },
    {
      id: "c-coffeetime", city: "bautzen", name: "Café Coffee Time Kaffeerösterei", lat: 51.18111, lon: 14.42454,
      address: "Reichenstraße 2, Bautzen",
      hours: hours({ "Mo-Fr": [["12:00", "17:00"]], "Sa": [["11:00", "18:00"]], "So": [["13:00", "18:00"]] }),
      hoursNote: "Fr 12–17 Uhr (laut OpenStreetMap, bitte prüfen)", verify: true,
      text: "Kleine Rösterei-Café am Hauptmarkt-Ende der Reichenstraße – gut für einen Espresso nach dem Mittagessen.",
      special: "Kaffee aus eigener Röstung", price: "€ (Einschätzung)", distance: "direkt an der Route, 1 Min. vom Hauptmarkt"
    },
    {
      id: "c-hof", city: "loebau", name: "Café im Hof", lat: 51.09680, lon: 14.66980,
      address: "Teichgasse 3, 02708 Löbau",
      hours: null, uncertain: true,
      hoursNote: "Öffnungszeiten nicht verlässlich belegt; kleine Cafés dieser Art schließen meist gegen 17–18 Uhr – bei später Ankunft knapp, bitte prüfen.", verify: true,
      text: "Kleines, gemütliches Hofcafé in der Löbauer Altstadt mit hausgebackenem Kuchen und Eis.",
      special: "Hausgebackener Kuchen, Eis", price: "€ (Einschätzung)", distance: "in der Altstadt, wenige Minuten vom Altmarkt",
      web: "https://www.pension-cafe-loebau.de/unser-cafe/"
    },
    {
      id: "c-marsbrunnen", city: "zittau", name: "Schwerdtners Café „Am Marsbrunnen“", lat: 50.89629, lon: 14.80567,
      address: "Markt 22, Zittau",
      hours: hours({ "Mo-Sa": [["07:00", "19:00"]], "So": [["07:30", "19:00"]] }),
      hoursNote: "Mo–Sa 7–19 Uhr (laut OpenStreetMap, bitte prüfen)", verify: true,
      text: "Café direkt am Markt mit Blick auf den Marsbrunnen, ideal für eine Pause zwischen Rundgang und Abendessen.",
      special: "Kuchen & Kaffee am Markt", price: "€ (Einschätzung)", distance: "direkt am Markt",
      web: "https://www.baeckerei-schwerdtner.de/"
    },
    {
      id: "c-mocca", city: "zittau", name: "Mocca-Bar am Marstall", lat: 50.89558, lon: 14.81047,
      address: "Neustadt 46, Zittau",
      hours: hours({ "Mo-Fr": [["09:30", "22:00"]], "Sa-So": [["13:00", "22:00"]] }),
      hoursNote: "Fr ab 9:30 Uhr bis abends (Quellen nennen 22 bzw. 24 Uhr – bitte prüfen)", verify: true,
      text: "Eiscafé und Cocktailbar neben dem Salzhaus, mit Kaffee, Eis und durchgehend warmer Küche – auch am Abend offen.",
      special: "Eisbecher, Kaffee, Cocktails", price: "€–€€ (Einschätzung)", distance: "direkt an der Route (Neustadt)"
    }
  ];

  // ---------------------------------------------------------------- ÖPNV
  // ACHTUNG: Uhrzeiten sind SCHÄTZUNGEN (Größenordnungen), NICHT aus der
  // Fahrplanauskunft verifiziert. Vor der Fahrt in DB Navigator / ZVON / trilex prüfen.
  var connections = {
    hin: {
      id: "hin", title: "Dresden Mitte → Bautzen", legs: [
        { mode: "train", line: "RE1", dir: "Görlitz", dep: "12:27", from: "Dresden Mitte", fromPl: "Gleis prüfen", arr: "13:17", to: "Bautzen", toPl: "Gleis prüfen" }
      ],
      note: "⚠ Zeiten geschätzt (ca. 50 Min., direkt, trilex RE1/RB60). Exakte Abfahrt ab Dresden Mitte in DB Navigator prüfen.",
      alts: ["Der langsamere RB60 hält überall und braucht länger.", "Bei verpasstem Zug fährt die Linie i. d. R. etwa stündlich."]
    },
    loebau: {
      id: "loebau", title: "Bautzen → Löbau", legs: [
        { mode: "train", line: "RE1", dir: "Görlitz", dep: "15:41", from: "Bautzen", fromPl: "Gleis prüfen", arr: "16:01", to: "Löbau (Sachs)", toPl: "Gleis prüfen" }
      ],
      note: "⚠ Zeiten geschätzt (ca. 15–25 Min., direkt auf derselben Linie Richtung Görlitz). In DB Navigator prüfen.",
      alts: ["Löbau liegt zwischen Bautzen und Görlitz auf der RE1/RB60 – kein Umstieg."]
    },
    zittau: {
      id: "zittau", title: "Löbau → Zittau (PlusBus)", legs: [
        { mode: "bus", line: "PlusBus 10", dir: "Zittau", dep: "18:10", from: "Löbau Busbahnhof", fromPl: "Steig prüfen", arr: "19:05", to: "Zittau Ottokarplatz", toPl: "Endhaltestelle" }
      ],
      note: "⚠ Wichtig: Es gibt KEINEN durchgehenden Zug Löbau↔Zittau (Strecke stillgelegt). Der PlusBus 10 (Löbau–Herrnhut–Zittau) ist die praktikable Verbindung, ca. 50–60 Min. Er fährt durch Herrnhut, ihr steigt aber erst in Zittau aus. Takt/Wochenendfahrten und exakte Zeit über ZVON prüfen.",
      alts: ["Der Bus hält vorher auch am Zittau Bahnhof – für die Altstadt bis Ottokarplatz sitzen bleiben.", "Rein per Bahn nur mit großem Umweg über Görlitz (Löbau→Görlitz→Zittau) – deutlich länger."]
    },
    rueck: {
      id: "rueck", title: "Zittau → Dresden", options: [
        { label: "Empfohlen", legs: [{ mode: "train", line: "RB61", dir: "Dresden Hbf", dep: "21:01", from: "Zittau", fromPl: "Gleis prüfen", arr: "22:57", to: "Dresden Hbf", toPl: "Gleis prüfen" }], info: "Direkt, ohne Umstieg, ca. 1:56 h (geschätzt)" },
        { label: "Letzte Möglichkeit", legs: [{ mode: "train", line: "RB61", dir: "Dresden Hbf", dep: "23:01", from: "Zittau", fromPl: "Gleis prüfen", arr: "00:57", to: "Dresden Hbf", toPl: "Gleis prüfen" }], info: "Direkt, Ankunft nach Mitternacht (geschätzt)" },
        { label: "Früher", legs: [{ mode: "train", line: "RB61", dir: "Dresden Hbf", dep: "20:05", from: "Zittau", fromPl: "Gleis prüfen", arr: "22:03", to: "Dresden Hbf", toPl: "Gleis prüfen" }], info: "Nur mit kurzem/frühem Abendessen" }
      ],
      note: "⚠ Zeiten geschätzt (trilex RE2/RB61, direkt, ca. 1:40–2:00 h; bei Baustellen/SEV länger). Der Zug hält auch in Dresden Mitte. In DB Navigator prüfen."
    }
  };

  // ---------------------------------------------------------------- Tagesplan
  // kind: meet | train | bus | walk | sight | food | buffer | cafe
  // dep: true = zeitkritische Abfahrt (Countdown); ref: Anker der Sektion
  // ⚠ Alle Uhrzeiten sind Schätzungen – siehe Verbindungen.
  var main = [
    { s: "12:15", e: "12:27", kind: "meet", title: "Start am Dresden Mitte", sub: "Gleis für RE1 Richtung Görlitz prüfen", ref: "#oepnv", place: "dd_mitte" },
    { s: "12:27", e: "13:17", kind: "train", dep: true, title: "RE1 Dresden Mitte → Bautzen", sub: "direkt · ca. 50 Min. (Zeit prüfen)", ref: "#c-hin", place: "dd_mitte", to: "bz_bhf", major: true },
    { s: "13:17", e: "13:30", kind: "walk", title: "Fußweg zum Kornmarkt", sub: "ca. 880 m · 12 Min.", ref: "#bz-kornmarkt", place: "bz_bhf" },
    { s: "13:30", e: "14:30", kind: "food", title: "Spätes Mittagessen (Wjelbik / Mönchshof)", sub: "Küche im Wjelbik nur bis 14:00 – ggf. Mönchshof", ref: "#wjelbik", major: true },
    { s: "14:30", e: "14:50", kind: "sight", title: "Hauptmarkt & Rathaus", sub: "kurzer Halt", ref: "#bz-hauptmarkt", sight: "bz-hauptmarkt", city: "Bautzen", major: true },
    { s: "14:50", e: "15:10", kind: "sight", title: "Dom St. Petri", sub: "Simultankirche", ref: "#bz-dom", sight: "bz-dom" },
    { s: "15:10", e: "15:25", kind: "sight", title: "Ortenburg", sub: "Burghof & Spreeblick", ref: "#bz-ortenburg", sight: "bz-ortenburg" },
    { s: "15:25", e: "15:41", kind: "walk", title: "Fußweg zum Bahnhof Bautzen", sub: "ca. 1,2 km · 16 Min. – zügig gehen", ref: "#c-loebau", place: "bz_bhf" },
    { s: "15:41", e: "16:01", kind: "train", dep: true, title: "RE1 Bautzen → Löbau", sub: "direkt · ca. 20 Min. (Zeit prüfen)", ref: "#c-loebau", place: "bz_bhf", to: "lb_bhf", major: true },
    { s: "16:01", e: "16:07", kind: "walk", title: "Fußweg zum Altmarkt Löbau", sub: "ca. 0,5 km · 6 Min.", ref: "#lb-altmarkt", place: "lb_bhf" },
    { s: "16:07", e: "16:30", kind: "sight", title: "Altmarkt & Rathaus", sub: "barockes Ensemble, Mondphasenuhr", ref: "#lb-altmarkt", sight: "lb-altmarkt", city: "Löbau", major: true },
    { s: "16:30", e: "16:45", kind: "sight", title: "Nikolaikirche", sub: "spätgotisch, von außen", ref: "#lb-nikolai", sight: "lb-nikolai" },
    { s: "16:45", e: "17:45", kind: "buffer", title: "Freie Zeit in Löbau", sub: "Café im Hof oder optional Löbauer Berg / Haus Schminke (Zeiten prüfen)", ref: "#lb-turm" },
    { s: "17:55", e: "18:10", kind: "walk", title: "Fußweg zum Busbahnhof Löbau", sub: "direkt am Bahnhof", ref: "#c-zittau", place: "lb_bus" },
    { s: "18:10", e: "19:05", kind: "bus", dep: true, title: "PlusBus 10 Löbau → Zittau", sub: "über Herrnhut (nicht aussteigen) · ca. 55 Min. (Zeit prüfen)", ref: "#c-zittau", place: "lb_bus", to: "zi_otto", major: true },
    { s: "19:05", e: "19:12", kind: "walk", title: "Fußweg Ottokarplatz → Markt", sub: "ca. 470 m · 6 Min.", ref: "#zi-markt", place: "zi_otto", city: "Zittau" },
    { s: "19:12", e: "19:30", kind: "sight", title: "Markt & Rathaus", sub: "Marsbrunnen, „italienisches“ Rathaus", ref: "#zi-markt", sight: "zi-markt", major: true },
    { s: "19:30", e: "19:45", kind: "sight", title: "Salzhaus & Neustadt", sub: "kurzer Bummel", ref: "#zi-salzhaus", sight: "zi-salzhaus" },
    { s: "19:45", e: "20:50", kind: "food", title: "Abendessen im Dornspachhaus", sub: "Bautzner Str. 2 · reservieren", ref: "#dornspachhaus", major: true },
    { s: "20:50", e: "21:01", kind: "walk", title: "Fußweg zum Bahnhof Zittau", sub: "ca. 850 m · 11 Min.", ref: "#c-rueck", place: "zi_bhf" },
    { s: "21:01", e: "22:57", kind: "train", dep: true, title: "RB61 Zittau → Dresden", sub: "direkt · hält auch in Dresden Mitte (Zeit prüfen)", ref: "#c-rueck", place: "zi_bhf", to: "dd_hbf", major: true }
  ];

  // Rundgang-Reihenfolge für die Karten (Schlüssel in window.WALKS; fehlende werden ignoriert)
  var routes = {
    bautzen: ["bz_bhf>bz_korn", "bz_korn>bz_reichen", "bz_reichen>bz_haupt", "bz_haupt>bz_dom", "bz_dom>bz_orten", "bz_orten>bz_wk", "bz_wk>bz_wjelbik", "bz_wjelbik>bz_bhf"],
    loebau: [],
    zittau: ["zi_otto>zi_markt", "zi_markt>zi_rh", "zi_rh>zi_joh", "zi_joh>zi_salz", "zi_salz>zi_kloster", "zi_kloster>zi_dorn", "zi_dorn>zi_bhf"]
  };

  var weatherSpots = [
    { name: "Bautzen", lat: 51.181, lon: 14.424, from: 13, to: 15 },
    { name: "Löbau", lat: 51.097, lon: 14.669, from: 16, to: 18 },
    { name: "Zittau", lat: 50.896, lon: 14.807, from: 19, to: 22 }
  ];

  var sources = [
    { label: "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)", url: "https://www.bahn.de/" },
    { label: "ZVON – Verkehrsverbund Oberlausitz-Niederschlesien (PlusBus 10)", url: "https://www.zvon.de/de/plusbus-und-taktbus" },
    { label: "trilex / Die Länderbahn (RE1/RB60, RE2/RB61)", url: "https://www.laenderbahn.com/trilex" },
    { label: "VVO-Fahrplanauskunft", url: "https://www.vvo-online.de/" },
    { label: "Stadt Bautzen – Öffnungszeiten ausgewählter Sehenswürdigkeiten (PDF)", url: "https://www.bautzen.de/fileadmin/media/info_tourismus/oeffnungszeiten-ausgewaehlter-sehenswuerdigkeiten.pdf" },
    { label: "Stiftung Haus Schminke, Löbau", url: "https://www.stiftung-hausschminke.eu/" },
    { label: "Stadt Löbau – König-Friedrich-August-Turm / Stadtrundgang", url: "https://www.loebau.de/freizeit-und-tourismus/stadtrundgang/" },
    { label: "Stadt Zittau – Städtische Museen, Besucherservice", url: "https://zittau.de/tourismus-kultur-freizeit/sehenswertes/staedtische-museen/besucherservice" },
    { label: "Johanniskirche Zittau", url: "https://www.johannis-kirche-zittau.de/" },
    { label: "Wjelbik Bautzen", url: "https://www.wjelbik.de/" },
    { label: "Mönchshof Bautzen", url: "https://www.moenchshof.de/" },
    { label: "Dornspachhaus Zittau", url: "https://www.dornspachhaus.de/" },
    { label: "OpenStreetMap (Café-Öffnungszeiten, Karten, Fußwege)", url: "https://www.openstreetmap.org/" },
    { label: "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)", url: "https://open-meteo.com/" }
  ];

  window.TRIP = {
    date: TRIP_DATE, checkedAt: CHECKED_AT,
    places: places, sights: sights, optionalSights: optionalSights,
    restaurants: restaurants, cafes: cafes, connections: connections,
    plans: { main: main },
    routes: routes, weatherSpots: weatherSpots, sources: sources
  };
})();
