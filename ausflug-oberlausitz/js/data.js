/*
 * Reisedaten für den Tagesausflug Oberlausitz (Fr, 25.09.2026).
 * Alle Inhalte der Seite kommen aus dieser Datei. Zum Aktualisieren von Zeiten
 * nur hier ändern. CHECKED_AT bei jeder Prüfung anpassen.
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
  var CHECKED_AT = "23.09.2026";

  // ---------------------------------------------------------------- Orte
  // type: station | bus | sight | food | cafe
  var places = {
    dd_hbf: { name: "Dresden Hauptbahnhof", type: "station", lat: 51.04039, lon: 13.73147 },
    bz_bhf: { name: "Bautzen Bahnhof", type: "station", lat: 51.17334, lon: 14.42895 },
    lb_bhf: { name: "Löbau Bahnhof", type: "station", lat: 51.09923, lon: 14.67179 },
    lb_bus: { name: "Löbau Busbahnhof", type: "bus", lat: 51.09906, lon: 14.67103 },
    hh_zp_bus: { name: "Herrnhut Zinzendorfplatz (Bus)", type: "bus", lat: 51.01560, lon: 14.74400 },
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
      duration: "30 Min.", walkFrom: { label: "von der Ortenburg", key: "bz_orten>bz_wk" },
      hours: null, uncertain: true,
      hoursNote: "Achtung Freitag: Die Angaben widersprechen sich. Mehrere Quellen nennen April–Oktober „Mo–Do, Sa–So 10–17 Uhr“ (also freitags geschlossen), andere „täglich 10–17 Uhr“. Bitte vorher anrufen: 03591 41588.",
      planB: "Falls geschlossen: Das schönste Motiv ist ohnehin von außen – von der Friedensbrücke (ca. 200 m südlich). Als Aussichts-Ersatz eignet sich der Reichenturm."
    },

    // ---------- Herrnhut
    {
      id: "hh-zinzendorfplatz", city: "herrnhut", name: "Zinzendorfplatz", lat: 51.01574, lon: 14.74423,
      photo: photo("Zinzendorfplatz (Herrnhut).jpg"),
      text: "Das historische Zentrum der 1722 gegründeten Siedlung der Herrnhuter Brüdergemeine – schlichte Barockbauten, klare Ordnung, viel Ruhe.",
      why: "Seit 2024 ist Herrnhut Teil des UNESCO-Welterbes „Siedlungen der Herrnhuter Brüdergemeine“. Die Bushaltestelle liegt direkt am Platz.",
      duration: "10–15 Min.", walkFrom: { label: "Bushaltestelle", text: "direkt am Platz" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "hh-kirchensaal", city: "herrnhut", name: "Kirchensaal & Ausstellung „gemeinsam glauben leben“", lat: 51.01609, lon: 14.74519,
      photo: photo("Herrnhut Kirchensaal 14.jpg"),
      text: "Der weiße, schmucklose Kirchensaal ist das geistliche Zentrum der Brüdergemeine. Die 2026 eröffnete Ausstellung ist zugleich UNESCO-Welterbe-Infopunkt.",
      why: "Themen: Geschichte der Brüdergemeine, heutiges Gemeindeleben, weltweite Verbindungen, UNESCO-Welterbe und die kulturelle Bedeutung Herrnhuts – auch schwierige Kapitel wie Sklaverei und NS-Zeit.",
      duration: "ca. 30 Min. (14:00–14:30)", walkFrom: { label: "vom Zinzendorfplatz", key: "hh_zp>hh_ks" },
      hours: hours({ "Mo,Di,Do,Fr,Sa": [["10:00", "12:00"], ["14:00", "17:00"]] }),
      hoursNote: "Ausstellung: Mo, Di, Do, Fr, Sa 10–12 und 14–17 Uhr; Mi geschlossen. Hinweis: Vom 26.09. bis 03.10.2026 tagt die Synode – der Kirchensaal ist dann nicht zugänglich. Der 25.09. liegt einen Tag davor; bitte vorab prüfen, ob Vorbereitungen den Besuch einschränken.",
      verify: true, web: "https://www.herrnhut-entdecken.de/ausstellung"
    },
    {
      id: "hh-gottesacker", city: "herrnhut", name: "Gottesacker", lat: 51.01856, lon: 14.74936,
      photo: photo("Herrnhut Gottesacker aerial.jpg"),
      text: "Der Friedhof der Brüdergemeine am Hutberg: Tausende gleich große, flach liegende Grabsteine in streng geordneten Reihen, gegliedert durch Lindenalleen.",
      why: "Die einheitlichen Gräber stehen für die Gleichheit aller vor Gott – ein zentrales Zeugnis Herrnhuter Glaubens und Teil des Welterbes. Ruhig und eindrucksvoll, kulturgeschichtlich weit mehr als ein gewöhnlicher Friedhof.",
      duration: "30–45 Min.", walkFrom: { label: "vom Kirchensaal", key: "hh_ks>hh_ga" },
      hoursNote: "In der Regel tagsüber frei zugänglich. Bitte Ruhe und Würde des Ortes beachten.", hours: null, alwaysOpen: true
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
      duration: "20 Min.", walkFrom: { label: "vom Rathaus", key: "zi_rh>zi_joh" },
      hours: hours({ "Mi-Sa": [["11:00", "17:00"]] }),
      hoursNote: "Kirche & Turm bis Ende Oktober Mi–Sa 11–17 Uhr (ehrenamtlich, ohne Gewähr). Im entspannten Plan seid ihr nach 17 Uhr da – dann nur von außen. In der Fastentuch-Variante klappt der Innenbesuch.",
      verify: true, web: "https://www.johannis-kirche-zittau.de/"
    },
    {
      id: "zi-salzhaus", city: "zittau", name: "Salzhaus & Neustadt", lat: 50.89598, lon: 14.81035,
      photo: photo("Neustadt_(Zittau).jpg"),
      text: "Das Salzhaus (erbaut 1511, später Kornspeicher) ist mit seinem riesigen Mansarddach eines der größten historischen Profangebäude der Stadt. Es steht am Platz „Neustadt“ mit mehreren Brunnen.",
      why: "Erinnert an Zittaus Reichtum durch den Salz- und Getreidehandel; heute mit Stadtbibliothek, Passage und Gastronomie.",
      duration: "20–30 Min.", walkFrom: { label: "von der Johanniskirche", key: "zi_joh>zi_salz" },
      hoursNote: "Außen jederzeit; Passage zu den Geschäftszeiten.", hours: null, alwaysOpen: true
    },
    {
      id: "zi-kloster", city: "zittau", name: "Klosterplatz", lat: 50.89735, lon: 14.80837,
      photo: null,
      text: "Ruhiger Platz am ehemaligen Franziskanerkloster mit der Klosterkirche St. Peter und Paul und dem Kulturhistorischen Museum.",
      why: "Einer der ältesten Teile der Stadt und schöner Abschluss des Rundgangs – vom Platz sind es nur 3 Minuten zum Dornspachhaus.",
      duration: "15–20 Min.", walkFrom: { label: "vom Salzhaus", key: "zi_salz>zi_kloster" },
      hours: hours({ "Di-So": [["10:00", "17:00"]] }), hoursLabel: "Kulturhist. Museum",
      hoursNote: "Platz jederzeit zugänglich. Kulturhistorisches Museum Franziskanerkloster: Di–So 10–17 Uhr."
    }
  ];

  var optionalSights = [
    {
      id: "hh-hutberg", city: "herrnhut", name: "Hutberg & Altan", lat: 51.02049, lon: 14.74841, optional: true,
      photo: photo("Herrnhut Hutberg Altan 22.jpg"),
      text: "Der Hutberg liegt direkt oberhalb des Gottesackers; auf seiner Kuppe steht der Altan, ein kleiner Aussichtsturm.",
      why: "Aussicht über Herrnhut und das Oberlausitzer Bergland, kurzer Spaziergang (ca. 4 Min. vom oberen Ende des Gottesackers).",
      duration: "20–30 Min. zusätzlich", walkFrom: { label: "vom Gottesacker", key: "hh_ga>hh_hb" },
      hoursNote: "Öffnung des Altans nicht verifiziert – bitte vor dem Besuch prüfen.", hours: null, uncertain: true,
      reason: "Nicht im Hauptplan: Mit dem Bus um 16:00 Uhr wird die Zeit sonst zu knapp."
    },
    {
      id: "hh-sterne", city: "herrnhut", name: "Herrnhuter Sterne Manufaktur", lat: 51.01656, lon: 14.73779, optional: true,
      photo: photo("Herrnhuter_Sterne.jpg"),
      text: "Hier entstehen seit über 125 Jahren die berühmten Herrnhuter Sterne von Hand. Es gibt eine Schauwerkstatt, eine kleine Ausstellung mit Film, ein Besucherzentrum, einen Laden und das Café „Bei Sterns“.",
      why: "Kulturell sehr bekannt: Der Herrnhuter Stern ist weltweit das Symbol des Ortes.",
      duration: "45–60 Min. inkl. Wege", walkFrom: { label: "vom Zinzendorfplatz", key: "hh_zp>hh_st" },
      hours: hours({ "Mo-Fr": [["09:00", "18:00"]], "Sa": [["10:00", "17:00"]] }),
      hoursNote: "Schauwerkstatt Mo–Fr 9–18, Sa 10–17 Uhr, Eintritt frei. Oderwitzer Str. 8.",
      verify: true, web: "https://www.herrnhuter-sterne.de/de/Schauwerkstatt-2.html",
      reason: "Nicht im Hauptplan: Mit ÖPNV (ca. 11 Min. Fußweg pro Richtung) würde der Aufenthalt in Herrnhut zu hektisch.",
      swapHint: "Wenn die Herrnhuter Sterne wichtiger sind als Gottesacker und Kirchensaal, kann der Tagesplan entsprechend angepasst werden."
    },
    {
      id: "zi-fastentuch", city: "zittau", name: "Großes Zittauer Fastentuch", lat: 50.89791, lon: 14.81113, optional: true,
      photo: photo("Großes Zittauer Fastentuch 1472.jpg"),
      text: "Das Große Zittauer Fastentuch von 1472 misst etwa 8,20 × 6,80 Meter und zeigt in rund 90 Bildfeldern biblische Szenen von der Schöpfung bis zum Jüngsten Gericht.",
      why: "Fastentücher verhüllten in der Fastenzeit den Altar bzw. Chorraum. Das Zittauer Tuch ist eines der außergewöhnlich gut erhaltenen großen mittelalterlichen Fastentücher – heute im Museum Kirche zum Heiligen Kreuz in einer der größten Museumsvitrinen der Welt.",
      duration: "30–40 Min.", walkFrom: { label: "vom Ottokarplatz", key: "zi_otto>zi_kreuz" },
      hours: hours({ "Mo-So": [["10:00", "12:30"], ["13:00", "17:00"]] }),
      hoursNote: "April–Oktober täglich 10–17 Uhr (Mittagspause 12:30–13:00). Eintritt 6 €, ermäßigt 4 €; Kombiticket mit Kulturhistorischem Museum 10 €. Frauenstraße 23.",
      verify: true, web: "https://zittau.de/tourismus-kultur-freizeit/sehenswertes/staedtische-museen/besucherservice"
    }
  ];

  // ---------------------------------------------------------------- Essen
  var restaurants = [
    {
      id: "wjelbik", role: "lunch", priority: "Erste Empfehlung", city: "bautzen",
      name: "Wjelbik – Sorbisches Restaurant", lat: 51.18204, lon: 14.42514,
      address: "Kornstraße 7, 02625 Bautzen",
      cuisine: "Sorbische und regionale Lausitzer Küche",
      when: "ca. 11:30–12:30 Uhr",
      text: "Der Name bedeutet „kleines Gewölbe“ bzw. „Vorratskammer“. Das Restaurant liegt in einem rund 600 Jahre alten, denkmalgeschützten Gewölbebau nahe dem Dom und wird von einer Familie geführt. Empfohlen von Slow Food und Falstaff.",
      why: "Bautzen ist das Zentrum der sorbischen Kultur – hier bietet sich bewusst ein sorbisches Restaurant an.",
      hours: hours({ "Di-Sa": [["11:30", "15:00"], ["17:00", "21:30"]] }),
      hoursNote: "Di–Sa 11:30–15:00 und 17:00–21:30, So/Mo Ruhetag. Küche mittags bis 14:00.",
      price: "€€–€€€ (Einschätzung, gehobene Regionalküche – aktuelle Karte prüfen)",
      rating: "OpenTable: 4,9 / 5 (636 Bewertungen, Stand Recherche)",
      phone: "+49359142060",
      web: "https://www.wjelbik.de/",
      reserve: "https://www.opentable.com/wjelbik-sorbisches-restaurant",
      note: "Reservierung empfohlen – danach muss um 13:14 Uhr der Zug erreicht werden. Beim Reservieren erwähnen, dass ihr gegen 12:30 Uhr zahlen möchtet."
    },
    {
      id: "moenchshof", role: "lunch", priority: "Alternative", city: "bautzen",
      name: "Mönchshof", lat: 51.18162, lon: 14.42113,
      address: "Burglehn 1, 02625 Bautzen",
      cuisine: "Historisches Gasthaus, deftige Küche nach überlieferten Rezepten",
      when: "falls Wjelbik ausgebucht oder geschlossen ist",
      text: "Historisches Gasthaus mit mittelalterlicher Einrichtung zwischen Altstadt und Ortenburg; hausgebackenes Brot, eigene Biere und Liköre, Biergarten.",
      hours: hours({ "Di-Do": [["11:00", "22:00"]], "Fr-Sa": [["11:00", "23:00"]], "So": [["11:00", "21:00"]] }),
      hoursNote: "Fr 11–23 Uhr (Website). Andere Tage laut Drittquellen: Mo Ruhetag, Di–Do 11–22, Sa 11–23, So 11–21 Uhr – bitte prüfen.",
      price: "€€ (Einschätzung – Karte prüfen)",
      rating: null,
      phone: "+493591490141",
      web: "https://www.moenchshof.de/",
      reserve: "https://www.opentable.com/monchshof-zu-bautzen"
    },
    {
      id: "dornspachhaus", role: "dinner", priority: "Erste Empfehlung", city: "zittau",
      name: "Dornspachhaus", lat: 50.89701, lon: 14.80592,
      address: "Bautzner Straße 2, 02763 Zittau",
      cuisine: "Historisches Wirtshaus, Oberlausitzer Spezialitäten",
      when: "ca. 19:00–20:20 Uhr",
      text: "Eines der ältesten Bürgerhäuser Zittaus, benannt nach Bürgermeister Nikolaus von Dornspach, mit historischem Gewölbe und „Ritterkeller“.",
      pros: ["zentral gelegen (2 Min. vom Markt)", "historisches Ambiente", "gut mit dem Altstadtrundgang kombinierbar", "11 Min. zu Fuß zum Bahnhof"],
      hours: hours({ "Mo-So": [["11:30", "21:30"]] }),
      hoursNote: "Juli–September täglich 11:30–21:30 durchgehend (Oktober–Juni: 11:30–14:00 und 17:30–21:30).",
      price: "€€ (Einschätzung – Karte prüfen)",
      rating: "Von Tripadvisor empfohlen (laut Website) – aktuelle Bewertungen siehe Karte/Tripadvisor",
      phone: "+493583795883",
      web: "https://www.dornspachhaus.de/",
      reserve: "https://www.dornspachhaus.de/kontakt/",
      note: "Für Freitagabend reservieren – telefonisch oder über das Kontaktformular."
    },
    {
      id: "altersack", role: "dinner", priority: "Alternative", city: "zittau",
      name: "Wirtshaus „Zum Alten Sack“ im Salzhaus", lat: 50.89577, lon: 14.81034,
      address: "Neustadt 47, 02763 Zittau",
      cuisine: "Rustikales Wirtshaus, Oberlausitzer Küche",
      when: "Alternative zum Dornspachhaus",
      text: "Das rustikale Wirtshaus liegt im historischen Salzhaus und kocht bewusst typisch Oberlausitzer Gerichte. Speisekarten auch auf Englisch, Tschechisch und Polnisch. Hinweis: Vermutlich ist dies das als „Alte Sackfabrik“ gemeinte Lokal; ein Restaurant dieses Namens haben wir in Zittau nicht gefunden.",
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
      id: "c-schwerdtner-bz", city: "bautzen", name: "Schwerdtner (Bäckerei-Café)", lat: 51.18126, lon: 14.42474,
      address: "Reichenstraße 3, Bautzen",
      hours: hours({ "Mo-Sa": [["07:00", "18:00"]], "So": [["08:00", "18:00"]] }),
      hoursNote: "Mo–Sa 7–18 Uhr (laut OpenStreetMap, bitte prüfen)", verify: true,
      text: "Regionale Bäckerei mit Café-Plätzen – praktisch für einen Kaffee gleich nach der Ankunft, wenn vieles noch geschlossen ist.",
      special: "Frühstück, Oberlausitzer Backwaren", price: "€ (Einschätzung)", distance: "direkt an der Route"
    },
    {
      id: "c-foerster", city: "herrnhut", name: "Café Förster", lat: 51.01788, lon: 14.74349,
      address: "August-Bebel-Straße 16, Herrnhut",
      hours: hours({ "Di-So": [["11:00", "18:00"]] }),
      hoursNote: "Di–So ab 11 Uhr (Stadt Herrnhut); Schließzeit nicht angegeben, bitte prüfen", verify: true,
      text: "Sehr gemütliches Café mit Eisgarten – laut Stadt Herrnhut mit Oberlausitzer Kuchenspezialitäten und Eis aus eigener Herstellung.",
      special: "Käsekuchen, Kleckselkuchen, 35 Eisbecher", price: "€ (Einschätzung)", distance: "ca. 250 m / 4 Min. vom Zinzendorfplatz",
      web: "http://www.cafe-herrnhut.de/"
    },
    {
      id: "c-sterns", city: "herrnhut", name: "Café „Bei Sterns“", lat: 51.01656, lon: 14.73779,
      address: "Oderwitzer Straße 8, Herrnhut (Herrnhuter Sterne)",
      hours: hours({ "Mo-Sa": [["09:00", "17:00"]] }), hoursNote: "Mo–Sa 9–17 Uhr (Stadt Herrnhut)",
      text: "Das Café der Sterne-Manufaktur mit regionalen Spezialitäten – nur sinnvoll, wenn ihr die Manufaktur besucht.",
      special: "Regionale Kuchen", price: "€ (Einschätzung)", distance: "ca. 860 m / 11 Min. vom Zinzendorfplatz (abseits der Route)",
      web: "https://www.herrnhuter-sterne.de/"
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
      text: "Eiscafé und Cocktailbar neben dem Salzhaus, mit Kaffee, Eis und durchgehend warmer Küche.",
      special: "Eisbecher, Kaffee, Cocktails", price: "€–€€ (Einschätzung)", distance: "direkt an der Route (Neustadt)"
    },
    {
      id: "c-rosengarten", city: "zittau", name: "Café Rosengarten", lat: 50.89723, lon: 14.81083,
      address: "Frauenstraße 20, Zittau",
      hours: null, uncertain: true,
      hoursNote: "Widersprüchliche Angaben: eine Quelle nennt täglich 10–18 Uhr, eine andere freitags geschlossen. Bitte vorher prüfen.",
      text: "Kleines Café direkt neben der Kirche zum Heiligen Kreuz – passt zur Fastentuch-Variante.",
      special: "Kaffee & Kuchen", price: "€ (Einschätzung)", distance: "neben dem Fastentuch-Museum (nur Fastentuch-Variante)"
    }
  ];

  // ---------------------------------------------------------------- ÖPNV
  // Quelle: VVO-Fahrplanauskunft (webapi.vvo-online.de), Abfrage für Fr, 25.09.2026.
  var connections = {
    hin: {
      id: "hin", title: "Dresden → Bautzen", legs: [
        { mode: "train", line: "RB60", dir: "Görlitz", dep: "08:23", from: "Dresden Hbf", fromPl: "Gleis 14", arr: "09:13", to: "Bautzen", toPl: "Gleis 2" }
      ],
      alts: ["07:53 → 08:53 (RB60, früher)", "08:53 → 09:55 (RB60, falls der 08:23 verpasst wird)"]
    },
    herrnhut: {
      id: "herrnhut", title: "Bautzen → Löbau → Herrnhut", legs: [
        { mode: "train", line: "RB60", dir: "Görlitz", dep: "13:14", from: "Bautzen", fromPl: "Gleis 2", arr: "13:27", to: "Löbau (Sachs)", toPl: "Gleis 1" },
        { mode: "walk", text: "Umstieg: ca. 2 Min. Fußweg zum Busbahnhof direkt am Bahnhof", buffer: "9 Min. Umstiegszeit" },
        { mode: "bus", line: "PlusBus 10", dir: "Zittau Ottokarplatz", dep: "13:36", from: "Löbau Busbahnhof", fromPl: "Steig Ri. 1 Zittau", arr: "13:57", to: "Herrnhut Zinzendorfplatz", toPl: "" }
      ],
      alts: ["Früher: RE1 12:19 → Löbau 12:33, Bus 10 12:38 → Herrnhut 13:00", "Später (Notfall): RE1 14:19 → Löbau 14:32, Bus 10 14:38 → Herrnhut 15:00"]
    },
    zittau: {
      id: "zittau", title: "Herrnhut → Zittau", legs: [
        { mode: "bus", line: "PlusBus 10", dir: "Zittau Ottokarplatz", dep: "16:00", from: "Herrnhut Zinzendorfplatz", fromPl: "Steig 2 – Ri. Zittau", arr: "16:34", to: "Zittau Ottokarplatz", toPl: "Endhaltestelle" }
      ],
      alts: ["Früher: Bus 10 um 15:30 → Zittau Bahnhof 15:54 (dann ca. 15 Min. zu Fuß in die Altstadt)", "Der Bus hält vorher auch am Zittau Bahnhof (16:28). Für die Altstadt bis Ottokarplatz sitzen bleiben."],
      note: "Hinweis: Einen Bus um 15:57 Uhr gibt es laut Auskunft nicht – die Fahrten sind um 15:30 und 16:00 Uhr."
    },
    zittauFastentuch: {
      id: "zittauFastentuch", title: "Herrnhut → Zittau (Fastentuch-Variante)", legs: [
        { mode: "bus", line: "PlusBus 10", dir: "Zittau Ottokarplatz", dep: "15:00", from: "Herrnhut Zinzendorfplatz", fromPl: "Steig 2 – Ri. Zittau", arr: "15:34", to: "Zittau Ottokarplatz", toPl: "Endhaltestelle" }
      ],
      alts: ["Noch früher: Bus 10 um 14:30 → Zittau Bahnhof 14:54"]
    },
    rueck: {
      id: "rueck", title: "Zittau → Dresden", options: [
        { label: "Empfohlen", legs: [{ mode: "train", line: "RB61", dir: "Dresden Hbf", dep: "21:01", from: "Zittau", fromPl: "Gleis 2b", arr: "22:57", to: "Dresden Hbf", toPl: "Gleis 11" }], info: "Direkt, ohne Umstieg, 1:56 h" },
        { label: "Spät-Alternative", legs: [
          { mode: "bus", line: "PlusBus 10", dir: "Löbau", dep: "21:30", from: "Zittau Bahnhof", fromPl: "Steig 6", arr: "22:18", to: "Löbau Busbahnhof", toPl: "" },
          { mode: "train", line: "RB60", dir: "Dresden Hbf", dep: "22:38", from: "Löbau", fromPl: "Gleis 2", arr: "23:57", to: "Dresden Hbf", toPl: "Gleis 2" }
        ], info: "1 Umstieg in Löbau (20 Min.), Ankunft 23:57" },
        { label: "Letzte Möglichkeit", legs: [{ mode: "train", line: "RB61", dir: "Dresden Hbf", dep: "23:01", from: "Zittau", fromPl: "Gleis 3b", arr: "00:57", to: "Dresden Hbf", toPl: "Gleis 1" }], info: "Direkt, Ankunft nach Mitternacht" },
        { label: "Früher", legs: [{ mode: "train", line: "RB61", dir: "Dresden Hbf", dep: "20:05", from: "Zittau", fromPl: "Gleis 1a", arr: "22:03", to: "Dresden Hbf", toPl: "Gleis 13" }], info: "Nur mit kurzem Abendessen (bis ca. 19:45)" }
      ]
    }
  };

  // ---------------------------------------------------------------- Tagespläne
  // kind: meet | train | bus | walk | sight | food | buffer | cafe
  // dep: true = zeitkritische Abfahrt (Countdown); ref: Anker der Sektion
  var shared = [
    { s: "08:00", e: "08:15", kind: "meet", title: "Treffen am Dresden Hauptbahnhof", sub: "Abfahrt an Gleis 14 prüfen", ref: "#oepnv", place: "dd_hbf" },
    { s: "08:23", e: "09:13", kind: "train", dep: true, title: "RB60 Dresden Hbf → Bautzen", sub: "Gleis 14 → Gleis 2 · 50 Min.", ref: "#c-hin", place: "dd_hbf", to: "bz_bhf", major: true },
    { s: "09:13", e: "09:25", kind: "walk", title: "Fußweg zum Kornmarkt", sub: "ca. 880 m · 12 Min.", ref: "#bz-kornmarkt", place: "bz_bhf" },
    { s: "09:25", e: "09:40", kind: "sight", title: "Kornmarkt & Reichenstraße", sub: "Reichenturm · Kaffee bei Schwerdtner möglich", ref: "#bz-kornmarkt", sight: "bz-kornmarkt", city: "Bautzen", major: true },
    { s: "09:40", e: "10:00", kind: "sight", title: "Hauptmarkt & Rathaus", sub: "15–20 Min.", ref: "#bz-hauptmarkt", sight: "bz-hauptmarkt" },
    { s: "10:00", e: "10:20", kind: "sight", title: "Dom St. Petri", sub: "öffnet 10:00", ref: "#bz-dom", sight: "bz-dom" },
    { s: "10:25", e: "10:55", kind: "sight", title: "Ortenburg", sub: "Burghof, Spreeblick, Sorbisches Museum", ref: "#bz-ortenburg", sight: "bz-ortenburg" },
    { s: "11:00", e: "11:25", kind: "sight", title: "Alte Wasserkunst", sub: "⚠ Freitagsöffnung unklar – sonst Blick von der Friedensbrücke", ref: "#bz-wasserkunst", sight: "bz-wasserkunst" },
    { s: "11:30", e: "12:30", kind: "food", title: "Mittagessen im Wjelbik", sub: "Kornstraße 7 · reservieren", ref: "#wjelbik", major: true },
    { s: "12:30", e: "12:45", kind: "buffer", title: "Puffer / Espresso in der Reichenstraße", sub: "spätestens 12:45 losgehen", ref: "#cafes" },
    { s: "12:45", e: "13:05", kind: "walk", title: "Fußweg zum Bahnhof Bautzen", sub: "ca. 1,2 km · 16 Min. · ~9 Min. Puffer", ref: "#c-herrnhut", place: "bz_bhf" },
    { s: "13:14", e: "13:27", kind: "train", dep: true, title: "RB60 Bautzen → Löbau", sub: "Gleis 2 → Gleis 1", ref: "#c-herrnhut", place: "bz_bhf", to: "lb_bhf", major: true },
    { s: "13:27", e: "13:36", kind: "walk", title: "Umstieg in Löbau", sub: "2 Min. zum Busbahnhof · 9 Min. Puffer", ref: "#c-herrnhut", place: "lb_bus" },
    { s: "13:36", e: "13:57", kind: "bus", dep: true, title: "PlusBus 10 Löbau → Herrnhut", sub: "bis Zinzendorfplatz · 21 Min.", ref: "#c-herrnhut", place: "lb_bus", to: "hh_zp_bus", major: true }
  ];

  var relaxed = shared.concat([
    { s: "13:57", e: "14:00", kind: "sight", title: "Zinzendorfplatz", sub: "Ankunft direkt am Platz", ref: "#hh-zinzendorfplatz", sight: "hh-zinzendorfplatz", city: "Herrnhut", major: true },
    { s: "14:00", e: "14:30", kind: "sight", title: "Kirchensaal & Ausstellung", sub: "„gemeinsam glauben leben“ · öffnet 14:00", ref: "#hh-kirchensaal", sight: "hh-kirchensaal" },
    { s: "14:30", e: "14:40", kind: "walk", title: "Fußweg zum Gottesacker", sub: "ca. 420 m · 6 Min.", ref: "#hh-gottesacker" },
    { s: "14:40", e: "15:25", kind: "sight", title: "Gottesacker", sub: "30–45 Min.", ref: "#hh-gottesacker", sight: "hh-gottesacker" },
    { s: "15:25", e: "15:35", kind: "walk", title: "Rückweg zum Zinzendorfplatz", sub: "ca. 530 m · 7 Min.", ref: "#hh-zinzendorfplatz" },
    { s: "15:35", e: "15:55", kind: "buffer", title: "Puffer: Kuchen im Café Förster", sub: "4 Min. vom Platz · um 15:55 an der Haltestelle sein", ref: "#cafes" },
    { s: "16:00", e: "16:34", kind: "bus", dep: true, title: "PlusBus 10 Herrnhut → Zittau", sub: "Zinzendorfplatz Steig 2 → Ottokarplatz · 34 Min.", ref: "#c-zittau", place: "hh_zp_bus", to: "zi_otto", major: true },
    { s: "16:34", e: "16:42", kind: "walk", title: "Fußweg Ottokarplatz → Markt", sub: "ca. 470 m · 6 Min.", ref: "#zi-markt", place: "zi_otto", city: "Zittau" },
    { s: "16:45", e: "17:05", kind: "sight", title: "Markt", sub: "Marsbrunnen, Bürgerhäuser", ref: "#zi-markt", sight: "zi-markt", major: true },
    { s: "17:05", e: "17:15", kind: "sight", title: "Rathaus", sub: "von außen", ref: "#zi-rathaus", sight: "zi-rathaus" },
    { s: "17:15", e: "17:35", kind: "sight", title: "Johanniskirche", sub: "innen nur bis 17:00 – außen", ref: "#zi-johannis", sight: "zi-johannis" },
    { s: "17:40", e: "18:10", kind: "sight", title: "Salzhaus & Neustadt", sub: "20–30 Min.", ref: "#zi-salzhaus", sight: "zi-salzhaus" },
    { s: "18:15", e: "18:35", kind: "sight", title: "Klosterplatz", sub: "Abschluss des Rundgangs", ref: "#zi-kloster", sight: "zi-kloster" },
    { s: "18:35", e: "19:00", kind: "buffer", title: "Freie Zeit", sub: "Café am Markt oder Bummel", ref: "#cafes" },
    { s: "19:00", e: "20:20", kind: "food", title: "Abendessen im Dornspachhaus", sub: "Bautzner Str. 2 · reservieren", ref: "#dornspachhaus", major: true },
    { s: "20:35", e: "20:50", kind: "walk", title: "Fußweg zum Bahnhof Zittau", sub: "ca. 850 m · 11 Min. · 10 Min. Puffer", ref: "#c-rueck", place: "zi_bhf" },
    { s: "21:01", e: "22:57", kind: "train", dep: true, title: "RB61 Zittau → Dresden Hbf", sub: "Gleis 2b → Gleis 11 · direkt", ref: "#c-rueck", place: "zi_bhf", to: "dd_hbf", major: true }
  ]);

  var fastentuch = shared.concat([
    { s: "13:57", e: "14:25", kind: "sight", title: "Zinzendorfplatz + Kirchensaal", sub: "kurzer Besuch der Ausstellung", ref: "#hh-kirchensaal", sight: "hh-kirchensaal", city: "Herrnhut", major: true },
    { s: "14:25", e: "14:50", kind: "sight", title: "Kurzer Rundgang", sub: "Richtung Gottesacker (unterer Teil) und zurück", ref: "#hh-gottesacker", sight: "hh-gottesacker" },
    { s: "14:50", e: "15:00", kind: "buffer", title: "Zurück zur Haltestelle", sub: "Zinzendorfplatz, Steig 2", ref: "#c-zittauFastentuch" },
    { s: "15:00", e: "15:34", kind: "bus", dep: true, title: "PlusBus 10 Herrnhut → Zittau", sub: "→ Ottokarplatz · 34 Min.", ref: "#c-zittauFastentuch", place: "hh_zp_bus", to: "zi_otto", major: true },
    { s: "15:34", e: "15:42", kind: "walk", title: "Fußweg zur Kirche zum Heiligen Kreuz", sub: "ca. 570 m · 8 Min.", ref: "#zi-fastentuch", place: "zi_otto", city: "Zittau" },
    { s: "15:45", e: "16:30", kind: "sight", title: "Großes Zittauer Fastentuch", sub: "Museum schließt 17:00", ref: "#zi-fastentuch", sight: "zi-fastentuch", major: true },
    { s: "16:30", e: "16:40", kind: "walk", title: "Fußweg zum Markt", sub: "ca. 460 m · 6 Min.", ref: "#zi-markt" },
    { s: "16:40", e: "17:00", kind: "sight", title: "Johanniskirche (innen bis 17:00)", sub: "zuerst hierhin", ref: "#zi-johannis", sight: "zi-johannis" },
    { s: "17:00", e: "17:30", kind: "sight", title: "Markt & Rathaus", sub: "", ref: "#zi-markt", sight: "zi-markt" },
    { s: "17:35", e: "18:15", kind: "sight", title: "Salzhaus & Neustadt", sub: "", ref: "#zi-salzhaus", sight: "zi-salzhaus" },
    { s: "18:20", e: "18:40", kind: "sight", title: "Klosterplatz", sub: "", ref: "#zi-kloster", sight: "zi-kloster" },
    { s: "18:40", e: "19:00", kind: "buffer", title: "Freie Zeit", sub: "", ref: "#cafes" },
    { s: "19:00", e: "20:20", kind: "food", title: "Abendessen im Dornspachhaus", sub: "Bautzner Str. 2 · reservieren", ref: "#dornspachhaus", major: true },
    { s: "20:35", e: "20:50", kind: "walk", title: "Fußweg zum Bahnhof Zittau", sub: "ca. 850 m · 11 Min.", ref: "#c-rueck", place: "zi_bhf" },
    { s: "21:01", e: "22:57", kind: "train", dep: true, title: "RB61 Zittau → Dresden Hbf", sub: "Gleis 2b → Gleis 11 · direkt", ref: "#c-rueck", place: "zi_bhf", to: "dd_hbf", major: true }
  ]);

  // Rundgang-Reihenfolge für die Karten (Schlüssel in window.WALKS)
  var routes = {
    bautzen: ["bz_bhf>bz_korn", "bz_korn>bz_reichen", "bz_reichen>bz_haupt", "bz_haupt>bz_dom", "bz_dom>bz_orten", "bz_orten>bz_wk", "bz_wk>bz_wjelbik", "bz_wjelbik>bz_bhf"],
    herrnhut: ["hh_zp>hh_ks", "hh_ks>hh_ga", "hh_ga>hh_zp"],
    zittau: ["zi_otto>zi_markt", "zi_markt>zi_rh", "zi_rh>zi_joh", "zi_joh>zi_salz", "zi_salz>zi_kloster", "zi_kloster>zi_dorn", "zi_dorn>zi_bhf"],
    zittauFastentuch: ["zi_otto>zi_kreuz", "zi_kreuz>zi_markt"]
  };

  var weatherSpots = [
    { name: "Bautzen", lat: 51.181, lon: 14.424, from: 9, to: 13 },
    { name: "Herrnhut", lat: 51.016, lon: 14.744, from: 14, to: 16 },
    { name: "Zittau", lat: 50.896, lon: 14.807, from: 16, to: 21 }
  ];

  var sources = [
    { label: "VVO-Fahrplanauskunft (Verbindungen am 25.09.2026)", url: "https://www.vvo-online.de/" },
    { label: "ZVON – Zweckverband Verkehrsverbund Oberlausitz-Niederschlesien", url: "https://www.zvon.de/" },
    { label: "DB Navigator / bahn.de", url: "https://www.bahn.de/" },
    { label: "Stadt Bautzen – Öffnungszeiten ausgewählter Sehenswürdigkeiten (PDF)", url: "https://www.bautzen.de/fileadmin/media/info_tourismus/oeffnungszeiten-ausgewaehlter-sehenswuerdigkeiten.pdf" },
    { label: "Ausstellung „gemeinsam glauben leben“, Herrnhut", url: "https://www.herrnhut-entdecken.de/ausstellung" },
    { label: "Stadt Herrnhut – Gastronomie", url: "https://www.herrnhut.de/tourismus/gastronomie" },
    { label: "Stadt Zittau – Städtische Museen, Besucherservice", url: "https://zittau.de/tourismus-kultur-freizeit/sehenswertes/staedtische-museen/besucherservice" },
    { label: "Johanniskirche Zittau", url: "https://www.johannis-kirche-zittau.de/" },
    { label: "Wjelbik", url: "https://www.wjelbik.de/" },
    { label: "Mönchshof Bautzen", url: "https://www.moenchshof.de/" },
    { label: "Dornspachhaus Zittau", url: "https://www.dornspachhaus.de/" },
    { label: "Zum Alten Sack Zittau", url: "https://www.zumaltensack.de/" },
    { label: "OpenStreetMap (Café-Öffnungszeiten, Karten, Fußwege)", url: "https://www.openstreetmap.org/" },
    { label: "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)", url: "https://open-meteo.com/" }
  ];

  window.TRIP = {
    date: TRIP_DATE, checkedAt: CHECKED_AT,
    places: places, sights: sights, optionalSights: optionalSights,
    restaurants: restaurants, cafes: cafes, connections: connections,
    plans: { relaxed: relaxed, fastentuch: fastentuch },
    routes: routes, weatherSpots: weatherSpots, sources: sources
  };
})();
