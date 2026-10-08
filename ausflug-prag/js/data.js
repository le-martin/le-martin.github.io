/*
 * Reisedaten: Tagesausflug Dresden → Prag (EuroCity).
 * Geplant für FREITAG, 9. Oktober 2026 (TRIP_DATE), zwei Pläne (EC 459 ab 07:08 / RJ 171 ab 09:10), Tagesausflug mit Yeji rund um
 * gespeicherte Essens-Tipps und den Sonnenuntergang im Riegrovy sady. Countdown, Reisemodus und Wetter
 * beziehen sich auf diesen Tag; saisonale Öffnungszeiten werden aus dem Reisedatum
 * berechnet. Für einen anderen Tag TRIP_DATE ändern (oder null = „heute“).
 *
 * Alle Inhalte der Seite kommen aus dieser Datei. Zugzeiten für den 9.10.2026 sind bei ČD geprüft.
 * Metro-/Tramzeiten sind ungeprüfte Beispiele; aktuelle Verbindungen in PID Lítačka prüfen.
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

  var CHECKED_AT = "08.10.2026";

  // ---------------------------------------------------------------- Bereiche
  var areas = [
    { key: "altstadt", q: "Praha", view: [[50.0790, 14.4090], [50.0930, 14.4370]] },
    { key: "burg", q: "Praha", view: [[50.0840, 14.3860], [50.1030, 14.4110]] },
    { key: "vinohrady", q: "Praha", view: [[50.0760, 14.4280], [50.0850, 14.4540]] }
  ];

  // ---------------------------------------------------------------- Orte (Bahnhöfe/Haltestellen)
  var places = {
    dd_hbf: { gmaps: "Dresden Hauptbahnhof", name: "Dresden Hauptbahnhof", dest: "Dresden", type: "station", lat: 51.04039, lon: 13.73147 },
    pr_hln: { gmaps: "Praha hlavní nádraží", name: "Praha hlavní nádraží", dest: "Praha", type: "station", lat: 50.08310, lon: 14.43540 },
    pr_starom: { gmaps: "Metro Staroměstská Praha", name: "Staroměstská (Metro A)", dest: "Malostranská", type: "bus", lat: 50.08840, lon: 14.41700 },
    pr_malostr: { gmaps: "Metro Malostranská Praha", name: "Malostranská (Metro A / Tram 22)", dest: "Malostranská", type: "bus", lat: 50.09110, lon: 14.40940 },
    pr_pohor: { gmaps: "Tram Pohořelec Praha", name: "Pohořelec (Tram)", dest: "Pohořelec", type: "bus", lat: 50.08830, lon: 14.38870 },
    pr_mustek: { gmaps: "Metro Můstek Praha", name: "Můstek (Metro A)", dest: "Můstek", type: "bus", lat: 50.08380, lon: 14.42370 },
    pr_muzeum: { gmaps: "Metro Muzeum Praha", name: "Muzeum (Metro A)", dest: "Jiřího z Poděbrad", type: "bus", lat: 50.07940, lon: 14.43100 },
    pr_jzp: { gmaps: "Metro Jiřího z Poděbrad Praha", name: "Jiřího z Poděbrad (Metro A)", dest: "Jiřího z Poděbrad", type: "bus", lat: 50.07790, lon: 14.44970 }
  };

  // ---------------------------------------------------------------- Sehenswürdigkeiten
  var sights = [
    // ---------- Altstadt & Neustadt (Vormittag)
    {
      id: "pr-antik", city: "altstadt", gmaps: "Antikvariát Dlážděná Praha", name: "Antikvariát Dlážděná (ADPlus)", lat: 50.08730, lon: 14.43180, photo: null,
      text: "Großes Antiquariat mit über 24.000 Büchern, alten Drucken, Landkarten und Grafiken – zwischen Náměstí Republiky und Masaryk-Bahnhof.",
      why: "Nur werktags geöffnet – der Freitag ist die einzige Gelegenheit. Liegt direkt auf dem Weg vom Hauptbahnhof in die Altstadt.",
      duration: "30 Min.", walkFrom: { label: "vom Hauptbahnhof", text: "ca. 900 m · 12 Min. vom Hauptbahnhof" },
      hours: hours({ "Mo-Fr": [["10:00", "18:00"]] }),
      hoursNote: "Mo–Fr 10–18 Uhr, Sa–So geschlossen.",
      verify: true, web: "https://www.adplus.cz/"
    },
    {
      id: "pr-pulverturm", city: "altstadt", gmaps: "Prašná brána Praha", name: "Pulverturm & Gemeindehaus", lat: 50.08710, lon: 14.42780, photo: null,
      text: "Der spätgotische Pulverturm von 1475 ist der Beginn des Königswegs zur Burg; direkt daneben steht das Jugendstil-Gemeindehaus (Obecní dům) mit dem Smetana-Saal.",
      why: "Gotik und Jugendstil direkt nebeneinander.",
      duration: "15 Min.", walkFrom: { label: "vom Antiquariat", text: "ca. 400 m · 5 Min. vom Antiquariat" },
      hours: hours({ "Mo-So": [[POWDER_OPEN, POWDER]] }), hoursLabel: "Pulverturm",
      hoursNote: "Turm je nach Monat geöffnet (Jan–März 10–18, Apr–Mai 10–19, Juni–Sep 9–20:30, Okt–Nov 10–18, Dez 10–19:30 Uhr). Gemeindehaus: Führungen ca. 1 Std., 320 CZK, Kasse täglich 10–19 Uhr.",
      verify: true
    },
    {
      id: "pr-ring", city: "altstadt", gmaps: "Staroměstské náměstí Praha", name: "Altstädter Ring (Staroměstské náměstí)", lat: 50.08750, lon: 14.42130, photo: null,
      text: "Der historische Hauptplatz der Altstadt mit dem Jan-Hus-Denkmal, dem Altstädter Rathaus und der Teynkirche.",
      why: "Das Herz Prags – mit den Türmen der Teynkirche als Postkartenmotiv.",
      duration: "15–20 Min.", walkFrom: { label: "von Naše maso", text: "ca. 500 m · 7 Min. über die Dlouhá" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "pr-teyn", city: "altstadt", gmaps: "Týnský chrám Praha", name: "Teynkirche (Kostel Matky Boží před Týnem)", lat: 50.08780, lon: 14.42280, photo: null,
      text: "Gotische Kirche mit zwei 80 m hohen Türmen; der Eingang liegt in einem Durchgang an der Platzseite.",
      why: "Die markante Doppelturm-Silhouette über dem Altstädter Ring.",
      duration: "15–20 Min.", walkFrom: { label: "am Altstädter Ring", text: "am Altstädter Ring" },
      hours: SUMMER || M === 2 || M === 10
        ? hours({ "Di-Sa": [["10:00", "13:00"], ["15:00", "17:00"]] })
        : hours({ "Di-Sa": [["10:00", "13:00"], ["15:00", "17:00"]], "So": [["10:30", "12:00"]] }),
      hoursNote: "März–Nov: Di–Sa 10–13 und 15–17 Uhr, Mo und So geschlossen. Dez–Feb: zusätzlich So 10:30–12 Uhr. Spende empfohlen (ca. 50 CZK); während Messen keine Besichtigung – freitags Messe um 15 Uhr.",
      verify: true
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

    // ---------- Strahov & Burg (Mittag/Nachmittag)
    {
      id: "pr-strahov", city: "burg", gmaps: "Strahovská knihovna Praha", name: "Kloster Strahov & Bibliothek", lat: 50.08610, lon: 14.38930, photo: null,
      text: "Prämonstratenserkloster oberhalb der Burg mit der berühmten Bibliothek: Theologischer und Philosophischer Saal mit barocken Deckenfresken.",
      why: "Einer der schönsten Bibliothekssäle der Welt – und vom Klostergarten ein weiter Blick über Prag.",
      duration: "45–60 Min.", walkFrom: { label: "von der Tram", text: "ca. 3 Min. von der Haltestelle Pohořelec" },
      hours: hours({ "Mo-So": [["09:00", "17:00"]] }), hoursLabel: "Bibliothek",
      hoursNote: "Täglich 9–17 Uhr, Kasse bis 16:15, letzter Einlass 16:30 Uhr. Eintritt 220 CZK, mit Strahover Galerie 390 CZK. Die Säle sieht man von der Tür aus.",
      verify: true, web: "https://www.strahovskyklaster.cz/"
    },
    {
      id: "pr-burg", city: "burg", gmaps: "Pražský hrad", name: "Prager Burg (Pražský hrad)", lat: 50.09060, lon: 14.39850, photo: null,
      text: "Einer der größten geschlossenen Burgkomplexe der Welt und Sitz des tschechischen Präsidenten – mit Höfen, Palästen, Kirchen und Gärten.",
      why: "Das Burgareal ist kostenlos; mit dem Rundgang-Ticket kommt man in die wichtigsten Gebäude.",
      duration: "60–90 Min.", walkFrom: { label: "vom Kloster Strahov", text: "ca. 800 m · 12 Min. über den Hradschiner Platz" },
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

    // ---------- Wenzelsplatz & Vinohrady (Abend)
    {
      id: "pr-wenzel", city: "vinohrady", gmaps: "Václavské náměstí Praha", name: "Wenzelsplatz (Václavské náměstí)", lat: 50.08000, lon: 14.42940, photo: null,
      text: "Ein rund 750 m langer Boulevard mit dem Nationalmuseum am oberen Ende und dem Reiterstandbild des heiligen Wenzel.",
      why: "Schauplatz von 1968 und 1989 – hier wird die jüngere Geschichte Tschechiens greifbar.",
      duration: "15 Min.", walkFrom: { label: "von Malatang No.1", text: "ca. 3 Min. von Malatang No.1" },
      hoursNote: "Öffentlicher Platz – jederzeit zugänglich.", hours: null, alwaysOpen: true
    },
    {
      id: "pr-riegrovy", city: "vinohrady", gmaps: "Riegrovy sady vyhlídka Praha", name: "Riegrovy sady (Aussichtspunkt)", lat: 50.08000, lon: 14.44100, photo: null,
      text: "Park auf dem Hügel von Vinohrady: Der Westhang blickt über die ganze Stadt bis zur Prager Burg; daneben liegt ein großer Biergarten.",
      why: "Der Sonnenuntergangs-Treffpunkt der Prager – am 9. Oktober geht die Sonne um 18:24 Uhr unter, hinter dem Burghügel ein paar Minuten früher.",
      duration: "60 Min.", walkFrom: { label: "von der Metro", text: "ca. 8 Min. von Jiřího z Poděbrad (Metro A)" },
      hoursNote: "Park jederzeit frei zugänglich. Energy Pub (Biergarten): Bier & Grill Mo–Fr 14–22, Sa–So 12–22 Uhr, Café täglich 10–20 Uhr, laut prague.eu ganzjährig – ob draußen ausgeschenkt wird, hängt vom Wetter ab.",
      extra: "Gegen 18 Uhr da sein, um einen Platz auf der Wiese zu bekommen; nach Sonnenuntergang wird es schnell kühl – Jacke mitnehmen.",
      hours: null, alwaysOpen: true
    }
  ];

  var optionalSights = [
    {
      id: "pr-karlsbruecke", city: "altstadt", gmaps: "Karlův most Praha", name: "Karlsbrücke (Karlův most)", lat: 50.08650, lon: 14.41140, optional: true, photo: null,
      text: "Die 516 m lange Brücke wurde 1357–1402 erbaut und ist mit 30 barocken Heiligenfiguren geschmückt.",
      why: "Der klassische Blick auf die Prager Burg – früh morgens oder abends deutlich ruhiger.",
      duration: "20–30 Min.", walkFrom: { label: "vom Altstädter Ring", text: "ca. 750 m · 10 Min. über die Karlova" },
      hoursNote: "Brücke rund um die Uhr frei zugänglich. Altstädter Brückenturm in der Hochsaison etwa 10–22 Uhr (Winter bitte prüfen).", hours: null, alwaysOpen: true,
      reason: "Nicht im Freitagsplan: Zugunsten von Strahov und Essen gestrichen. Passt nach dem Orloj (10 Min. zu Fuß), wenn man auf die Burg verzichtet."
    },
    {
      id: "pr-juedisch", city: "altstadt", gmaps: "Židovské muzeum v Praze", name: "Jüdisches Museum (Josefov)", lat: 50.08890, lon: 14.41900, optional: true, photo: null,
      text: "Zum Museum gehören Maisel-, Pinkas-, Klausen- und Spanische Synagoge sowie der Alte Jüdische Friedhof im ehemaligen jüdischen Viertel.",
      why: "Eines der bedeutendsten jüdischen Museen Europas – bewegend und historisch einzigartig.",
      duration: "60–90 Min.", walkFrom: { label: "vom Altstädter Ring", text: "ca. 5 Min. vom Altstädter Ring über die Pařížská" },
      hours: hours({ "Mo-Fr,So": [["09:00", JEWISH]] }),
      hoursNote: "Samstags und an jüdischen Feiertagen geschlossen (2026 u. a. 2.–3.4., 8.–9.4., 22.5., 13.9., 21.9., 27.9., 4.10.). 2026: Jan–März 9–16:30, Apr 9–18, Mai–Aug 9–19, 1.9.–17.10. 9–18, ab 18.10. 9–16:30 Uhr.",
      reason: "Nicht im Hauptplan: Mit Altstadt, Karlsbrücke und Burg wird ein Tag sonst zu voll. Wer es besuchen will, ersetzt am besten Strahov und Burg.",
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
    },
    {
      id: "pr-gaesschen", city: "burg", gmaps: "Zlatá ulička Praha", name: "Goldenes Gässchen (Zlatá ulička)", lat: 50.09210, lon: 14.40390, optional: true, photo: null,
      text: "Winzige bunte Häuschen an der Burgmauer – Franz Kafka wohnte eine Zeit lang in Nr. 22.",
      why: "Der malerischste Winkel der Burg.",
      duration: "15–20 Min.", walkFrom: { label: "vom Veitsdom", text: "ca. 300 m · 4 Min. vom Veitsdom" },
      hours: hours({ "Mo-So": [["09:00", "22:00"]] }),
      hoursNote: "Tagsüber (bis " + CASTLE_CLOSE + " Uhr) nur mit Burg-Ticket; abends frei zugänglich bis ca. 22 Uhr (Sommer ab ca. 17, Winter ab ca. 16 Uhr).",
      verify: true,
      reason: "Nicht im Freitagsplan: Tagsüber nur mit Burg-Ticket – im Plan ist das Burgareal (kostenlos) mit Veitsdom vorgesehen."
    },
    {
      id: "pr-nikolaus", city: "burg", gmaps: "Kostel sv. Mikuláše Malá Strana", name: "Kleinseitner Ring & St.-Nikolaus-Kirche", lat: 50.08790, lon: 14.40370, optional: true, photo: null,
      text: "Die hochbarocke Jesuitenkirche der Baumeisterfamilie Dientzenhofer mit ihrer großen Kuppel beherrscht den Kleinseitner Ring.",
      why: "Einer der prächtigsten Barockinnenräume Prags.",
      duration: "25–30 Min.", walkFrom: { label: "von der Metro", text: "ca. 7 Min. von Malostranská" },
      hours: NICHOLAS,
      hoursNote: "Je nach Monat ca. 9–16/17/18 Uhr (z. B. Juli–Okt Mo–Do & So 9–18, Fr–Sa 9–17 Uhr); letzter Einlass 15 Min. vor Schluss. Eintritt 150 CZK, ermäßigt 90 CZK.",
      verify: true,
      reason: "Nicht im Freitagsplan: Liegt am Fuß der Burg, wenn man nach der Alten Schlossstiege noch 30 Min. Zeit hat."
    }
  ];

  // ---------------------------------------------------------------- Essen
  var restaurants = [
    // ---------- Mittag & Snacks
    {
      id: "nase-maso", role: "lunch", priority: "Erste Empfehlung", city: "altstadt",
      name: "Naše maso", gmaps: "Naše maso Dlouhá Praha", lat: 50.09040, lon: 14.42620,
      address: "Dlouhá 727/39, 110 00 Praha 1",
      cuisine: "Metzgerei mit Burgern, Sekaná (Hackbraten) und Würsten",
      when: "Mittagessen (Früh: 11:10, Später: 12:35 Uhr)",
      text: "Kleine Metzgerei mit Theke und Stehtischen – Burger und Hackbraten werden frisch aus dem eigenen Fleisch gemacht.",
      why: "Einer der bekanntesten Burger Prags; vor 12 Uhr ist die Schlange noch kurz. Bei mehr als 20 Min. Wartezeit: Burger zum Mitnehmen.",
      hours: hours({ "Mo-Do": [["11:00", "22:00"]], "Fr-Sa": [["10:00", "22:00"]] }),
      hoursNote: "Mo–Do 11–22, Fr–Sa 10–22 Uhr, So geschlossen (prague.eu).",
      price: "Burger ca. 200–250 CZK (Schätzung)",
      rating: null,
      phone: "+420222311378", web: "https://nasemaso.ambi.cz/en",
      note: "Wenige Sitzplätze – zur Not Burger auf die Hand und weiter zum Altstädter Ring."
    },
    {
      id: "zubang", role: "lunch", priority: "Alternative", city: "altstadt",
      name: "Zubang (프라하 주방)", gmaps: "Zubang Praha Žatecká", lat: 50.08890, lon: 14.41850,
      address: "Žatecká 53/10, 110 00 Praha 1",
      cuisine: "Koreanisch & koreanisch-chinesisch",
      when: "Alternative mittags, 2 Min. vom Altstädter Ring",
      text: "Koreanisches Restaurant direkt hinter dem Altstädter Ring – mit Gerichten wie Jjajangmyeon und Jjamppong.",
      why: "Statt Burger: koreanisch essen, gleich neben dem Orloj.",
      hours: hours({ "Mo-So": [["11:45", "16:00"], ["17:00", "22:00"]] }),
      hoursNote: "11:45–16 und 17–22 Uhr (laut Google Maps; Ruhetage dort prüfen).",
      price: "eher hochpreisig (laut Bewertungsportal)",
      rating: null
    },
    {
      id: "malatang", role: "lunch", priority: "Nachmittags-Snack", city: "vinohrady",
      name: "Malatang No.1", gmaps: "Malatang No.1 Vodičkova Praha", lat: 50.08120, lon: 14.42470,
      address: "Vodičkova 33, 110 00 Praha 1",
      cuisine: "Chinesischer Malatang (scharfer Suppentopf zum Selbstzusammenstellen)",
      when: "Snack am Nachmittag (Früh: 16:45, Später: 17:00 Uhr)",
      text: "Zutaten selbst in die Schüssel legen, wiegen lassen und als scharfe Suppe kochen lassen; Soße selbst mischen.",
      why: "Kleine Portion zum Teilen reicht – das Abendessen kommt um 19 Uhr.",
      hours: hours({ "Mo-So": [["11:00", "22:00"]] }),
      hoursNote: "11–22 Uhr (laut Google Maps).",
      price: "bis ca. 240 CZK pro Person, Kartenzahlung möglich",
      rating: "Google ca. 4,3–4,4 (laut Bewertungsportal)"
    },
    {
      id: "wokin", role: "lunch", priority: "Alternative", city: "vinohrady",
      name: "Wokin", gmaps: "Wokin Jindřišská Praha", lat: 50.08460, lon: 14.42870,
      address: "Jindřišská 832/3, 110 00 Praha 1 (vermutlich – Wokin hat mehrere Filialen)",
      cuisine: "Asiatische Wok-Gerichte",
      when: "Alternative zum Malatang-Snack",
      text: "Schnelle Wok-Bowls zum Mitnehmen oder vor Ort, ein paar Schritte vom Wenzelsplatz.",
      hours: hours({ "Mo-Fr": [["10:30", "20:30"]] }),
      hoursNote: "Mo–Fr 10:30–20:30 Uhr (Filiale Jindřišská).",
      price: "Bowl ca. 139 CZK",
      rating: null,
      phone: "+420725523570", web: "https://www.wokin.cz/"
    },
    {
      id: "budvarka", role: "lunch", priority: "Alternative", city: "burg",
      name: "Original pivnice Budvarka Dejvice", gmaps: "Original pivnice Budvarka Dejvice", lat: 50.10150, lon: 14.39350,
      address: "Wuchterlova 336/22, 160 00 Praha 6",
      cuisine: "Tschechische Bierstube, ungefiltertes Budweiser Budvar",
      when: "Alternative nach der Burg (statt Malatang)",
      text: "Traditionsreiche Bierstube von 1914 in Dejvice mit kroužkovaný ležák (ungefiltertes Lagerbier) und tschechischer Küche.",
      why: "Liegt abseits: von der Burg ca. 15 Min. mit Tram/Bus, zurück mit Metro A ab Dejvická direkt bis Jiřího z Poděbrad.",
      hours: hours({ "Mo-So": [["11:00", "23:00"]] }),
      hoursNote: "Täglich 11–23 Uhr (prague.eu).",
      price: "€€ (Einschätzung)",
      rating: null
    },
    // ---------- Abendessen
    {
      id: "houdku", role: "dinner", priority: "Erste Empfehlung", city: "vinohrady",
      name: "U Houdků", gmaps: "U Houdků Praha", lat: 50.08030, lon: 14.45080,
      address: "Bořivojova 693/110, 130 00 Praha 3 (Žižkov)",
      cuisine: "Günstige tschechische Kneipenküche",
      when: "Abendessen, 19:00–20:00 Uhr",
      text: "Urige Žižkover Kneipe mit deftiger tschechischer Küche zu Nachbarschaftspreisen – nur 10–15 Min. vom Riegrovy sady.",
      why: "Perfekt nach dem Sonnenuntergang, und vom Hauptbahnhof nur ca. 20 Min. entfernt.",
      hours: hours({ "Mo-So": [["11:00", "23:59"]] }),
      hoursNote: "11–24 Uhr (laut Google Maps).",
      price: "€ (Einschätzung)",
      rating: null,
      note: "Für Freitag 19 Uhr reservieren. Kartenzahlung laut Website möglich (unbestätigt) – etwas Bargeld mitnehmen. Um 20:00 Uhr zum Bahnhof aufbrechen."
    },
    {
      id: "k-remember", role: "dinner", priority: "Alternative", city: "altstadt",
      name: "K-Remember", gmaps: "K-Remember Praha", lat: 50.09170, lon: 14.43380,
      address: "Biskupská 1753/5, 110 00 Praha 1",
      cuisine: "Vietnamesisch, auch vegetarisch",
      when: "Alternative abends, ca. 12 Min. vom Hauptbahnhof",
      text: "Vietnamesisches Restaurant mit Ente, Rindfleischnudeln, Sommerrollen und vegetarischen Gerichten – nah am Hauptbahnhof, gut als Abendessen vor dem Zug.",
      hours: hours({ "Mo-So": [["11:00", "21:30"]] }),
      hoursNote: "11–21:30 Uhr (laut Google Maps).",
      price: "ca. 200–300 CZK",
      rating: "4,5 (laut Bewertungsportal)"
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
      id: "c-kimchi", city: "altstadt", name: "Dobrý Praha / The Kimchi", gmaps: "The Kimchi Havlíčkova Praha", lat: 50.08820, lon: 14.43350,
      address: "Havlíčkova 1682/15, Praha 1 (The Kimchi; Adresse des Minbaks unbestätigt)",
      hours: hours({ "Mo-So": [["11:00", "15:00"], ["16:30", "21:00"]] }),
      hoursNote: "Freitag 11–15 und 16:30–21 Uhr (laut Google Maps); andere Tage können abweichen.",
      text: "Koreanisches Gästehaus (Minbak) „Dobrý Praha“; laut Blogs gibt es das Frühstück im koreanischen Bistro The Kimchi im selben Haus. Für den Tagesausflug nicht nötig – als Adresse für eine Übernachtung gespeichert.",
      special: "Koreanisches Bistro", price: "€€ (Einschätzung)", distance: "ca. 3 Min. vom Antiquariat"
    },
    {
      id: "c-kfood", city: "vinohrady", name: "K-Food", gmaps: "K-Food, Koněvova 1185/102, Praha 3", lat: 50.08770, lon: 14.46250,
      address: "Koněvova 1185/102, 130 00 Praha 3 (Žižkov)",
      hours: null,
      hoursNote: "Öffnungszeiten nicht gefunden – in Google Maps prüfen.",
      text: "Kleiner koreanischer Lebensmittelladen mit Ramyeon, Reis, Soßen und Snacks – zum Einkaufen, kein Café. Kartenpunkt nur ungefähr.",
      special: "Koreanische Lebensmittel", price: "€", distance: "ca. 15 Min. zu Fuß von U Houdků (abseits der Route)"
    },
    {
      id: "c-louvre", city: "vinohrady", name: "Café Louvre", lat: 50.08220, lon: 14.41870,
      address: "Národní 22 (1. Stock), Praha 1",
      hours: hours({ "Mo-Fr": [["08:00", "23:30"]], "Sa-So": [["09:00", "23:30"]] }),
      hoursNote: "Mo–Fr 8–23:30, Sa–So 9–23:30 Uhr.",
      text: "Traditionscafé seit 1902 – Kafka und Einstein waren hier Gäste.",
      special: "Kaffeehaus-Klassiker", price: "€ (Einschätzung)", distance: "ca. 8 Min. von Malatang No.1"
    }
  ];

  // ---------------------------------------------------------------- Verbindungen (Züge bei ČD geprüft 08.10.2026, Metro/Tram BEISPIELZEITEN)
  var connections = {
    hin: {
      id: "hin", title: "Dresden → Prag", legs: [
        { mode: "train", line: "EC 459", dir: "Praha hl. n.", dep: "07:08", from: "Dresden Hbf", fromPl: "Gleis prüfen", arr: "09:25", to: "Praha hl. n.", toPl: "Gleis prüfen", toCity: "Praha" }
      ],
      note: "Für Fr, 9.10.2026 bei ČD geprüft: EC 459 Canopus ab Dresden Hbf 07:08, an Praha hl. n. 09:25. Bauarbeiten Roudnice nad Labem–Hrobce können bis zu 5 Min. zusätzliche Verspätung verursachen. Das Deutschlandticket gilt nicht. DB Super Sparpreis Europa ab 14,99 € pro Person und Richtung, je nach Verfügbarkeit; kein bestätigter Preis für diese Fahrt. Sitzplatzreservierung möglich, nicht verpflichtend. Aktuellen Betrieb vor Abfahrt prüfen.",
      alts: ["RJ 251 ab 08:09 → Praha-Holešovice 10:22 (nicht Hauptbahnhof!) – von dort mit Metro C in die Stadt.", "RJ 171 ab 09:10 → Praha hl. n. 11:25 – siehe Plan „Später“."]
    },
    strahov: {
      id: "strahov", title: "Altstadt → Kloster Strahov", legs: [
        { mode: "metro", approximate: true, line: "Metro A", dir: "Nemocnice Motol", dep: "13:15", from: "Staroměstská", fromPl: "Bahnsteig A", arr: "13:18", to: "Malostranská", toCity: "Malostranská" },
        { mode: "tram", approximate: true, line: "Tram 22", dir: "Bílá Hora", dep: "13:25", from: "Malostranská", fromPl: "Haltestelle prüfen", arr: "13:40", to: "Pohořelec", toCity: "Pohořelec" }
      ],
      note: "Metro- und Tramzeiten sind ungeprüfte Beispielzeiten. Mit Wegen, Rolltreppen, Umstieg und Warten 40–45 Min. einplanen. PID: 30 Min. 36 CZK (App) / 39 CZK (Papier); mit Wartezeit kann das zu knapp sein. Mehr Spielraum: 90 Min. 46 / 50 CZK. App-Ticket aktivieren und 1 Min. warten, bevor ihr einsteigt oder den kostenpflichtigen Metrobereich betretet. Papierfahrschein einmal vor der ersten Fahrt entwerten.",
      alts: ["Zu Fuß über Karlsbrücke und Nerudova: ca. 40 Min., die letzten 20 Min. bergauf."]
    },
    abend: {
      id: "abend", title: "Burg → Malatang → Riegrovy sady", legs: [
        { mode: "metro", approximate: true, line: "Metro A", dir: "Depo Hostivař", dep: "16:20", from: "Malostranská", fromPl: "Bahnsteig A", arr: "16:24", to: "Můstek", toCity: "Můstek" },
        { mode: "walk", text: "Malatang No.1, danach zu Fuß zum Riegrovy sady (ca. 1,5 km · 30–35 Min. bis zur Wiese)" }
      ],
      note: "Metrozeiten sind ungeprüfte Beispielzeiten. PID: 30 Min. 36 CZK (App) / 39 CZK (Papier), 90 Min. 46 / 50 CZK, 24 Std. 140 / 150 CZK. Bei zwei oder drei getrennten kurzen Fahrten sind Einzeltickets günstiger. App-Ticket aktivieren und 1 Min. vor Einstieg bzw. Metrozugang warten; Papierfahrschein einmal vor der ersten Fahrt entwerten.",
      alts: ["Statt zu laufen: Metro A ab Muzeum bis Jiřího z Poděbrad (2 Stationen), dann ca. 8 Min. zu Fuß."]
    },
    rueck: {
      id: "rueck", title: "Prag → Dresden", options: [
        { label: "Empfohlen", legs: [
          { mode: "walk", text: "Von U Houdků zum Hauptbahnhof – bis zum Gleis ca. 25 Min. einplanen", buffer: "ca. 20 Min. Puffer" },
          { mode: "train", line: "RJ 170", dir: "Dresden Hbf", dep: "20:47", from: "Praha hl. n.", fromPl: "Gleis prüfen", arr: "23:19", to: "Dresden Hbf", toPl: "Gleis prüfen", toCity: "Dresden" }
        ], info: "ČD-Fahrplan für 9.10.2026 geprüft · Rückfahrt am selben Abend" },
        { label: "Früher", legs: [
          { mode: "train", line: "EC 458", dir: "Dresden Hbf", dep: "18:31", from: "Praha hl. n.", fromPl: "Gleis prüfen", arr: "20:58", to: "Dresden Hbf", toPl: "Gleis prüfen", toCity: "Dresden" }
        ], info: "ČD-Fahrplan für 9.10.2026 geprüft · dann ohne Sonnenuntergang und Abendessen" }
      ],
      note: "RJ 170 am Fr, 9.10.2026 bei ČD geprüft: Praha hl. n. 20:47 → Dresden Hbf 23:19. Um 20:00 bei U Houdků aufbrechen und bis 20:25 am Bahnhof sein. Eine spätere Rückfallverbindung ist nicht bestätigt. Bauarbeiten Roudnice nad Labem–Hrobce können bis zu 5 Min. zusätzliche Verspätung verursachen. Aktuellen Betrieb vor Abfahrt prüfen."
    },
    hin2: {
      id: "hin2", title: "Dresden → Prag (später)", legs: [
        { mode: "train", line: "RJ 171", dir: "Praha hl. n.", dep: "09:10", from: "Dresden Hbf", fromPl: "Gleis prüfen", arr: "11:25", to: "Praha hl. n.", toPl: "Gleis prüfen", toCity: "Praha" }
      ],
      note: "Für Fr, 9.10.2026 bei ČD geprüft: RJ 171 Berliner kommt um 09:07 in Dresden Hbf an und fährt um 09:10 ab; Ankunft Praha hl. n. 11:25. Eine Direktverbindung um 10:10 gibt es nicht. Bauarbeiten Roudnice nad Labem–Hrobce können bis zu 5 Min. zusätzliche Verspätung verursachen. Das Deutschlandticket gilt nicht; Sitzplatzreservierung möglich, nicht verpflichtend. Aktuellen Betrieb vor Abfahrt prüfen.",
      alts: ["Notlösung RJ 173 ab 11:10 → 13:25: Antiquariat, Naše maso, Orloj um 16 Uhr, Malatang, Sonnenuntergang – ohne Strahov und Burg."]
    },
    strahov2: {
      id: "strahov2", title: "Altstadt → Kloster Strahov", legs: [
        { mode: "metro", approximate: true, line: "Metro A", dir: "Nemocnice Motol", dep: "14:15", from: "Staroměstská", fromPl: "Bahnsteig A", arr: "14:18", to: "Malostranská", toCity: "Malostranská" },
        { mode: "tram", approximate: true, line: "Tram 22", dir: "Bílá Hora", dep: "14:25", from: "Malostranská", fromPl: "Haltestelle prüfen", arr: "14:40", to: "Pohořelec", toCity: "Pohořelec" }
      ]
    },
    abend2: {
      id: "abend2", title: "Burg → Malatang → Riegrovy sady", legs: [
        { mode: "metro", approximate: true, line: "Metro A", dir: "Depo Hostivař", dep: "16:45", from: "Malostranská", fromPl: "Bahnsteig A", arr: "16:49", to: "Můstek", toCity: "Můstek" },
        { mode: "walk", text: "Malatang No.1 und über den Wenzelsplatz zur Metro Muzeum" },
        { mode: "metro", approximate: true, line: "Metro A", dir: "Depo Hostivař", dep: "17:48", from: "Muzeum", fromPl: "Bahnsteig A", arr: "17:51", to: "Jiřího z Poděbrad", toCity: "Jiřího z Poděbrad" }
      ],
      note: "Beispielzeiten – Metro A fährt alle paar Minuten. Wer Strahov nach 15:40 Uhr verlässt, lässt die Burg aus und fährt mit Tram 22 zurück nach Malostranská."
    }
  };
  connections.strahov2.note = connections.strahov.note;
  connections.strahov2.alts = connections.strahov.alts;
  var connOrder = [["hin", "tagOut"], ["strahov", "tagTram"], ["abend", "tagEvening"], ["rueck", "tagReturn"]];

  // ---------------------------------------------------------------- Plan „Früh“: EC 459 ab 07:08, alle Wunschorte
  var main = [
    { s: "06:45", e: "07:08", kind: "meet", title: "Treffen mit Yeji am Dresden Hauptbahnhof", sub: "EuroCity Richtung Praha – Ticket vorher kaufen (Deutschlandticket gilt nicht)", ref: "#oepnv", place: "dd_hbf" },
    { s: "07:08", e: "09:25", kind: "train", dep: true, title: "EC 459 Dresden Hbf → Praha hl. n.", sub: "Fahrplan für 9.10. bei ČD geprüft · Betrieb vor Abfahrt prüfen", ref: "#c-hin", place: "dd_hbf", to: "pr_hln", major: true },
    { s: "09:25", e: "10:00", kind: "walk", title: "Fußweg zum Antikvariát Dlážděná", sub: "ca. 550 m · mit Bahnhofsausgang 15–20 Min., Rest Puffer", ref: "#pr-antik", place: "pr_hln", city: "Praha" },
    { s: "10:00", e: "10:40", kind: "sight", title: "Antikvariát Dlážděná", sub: "nur werktags – heute die Chance", ref: "#pr-antik", sight: "pr-antik", major: true },
    { s: "10:40", e: "11:00", kind: "sight", title: "Pulverturm & Gemeindehaus", sub: "von außen", ref: "#pr-pulverturm", sight: "pr-pulverturm" },
    { s: "11:00", e: "11:10", kind: "walk", title: "Fußweg zu Naše maso", sub: "ca. 600 m · 8 Min.", ref: "#nase-maso" },
    { s: "11:10", e: "12:10", kind: "food", title: "Burger bei Naše maso", sub: "vor dem Mittagsandrang", ref: "#nase-maso", major: true },
    { s: "12:10", e: "12:25", kind: "walk", title: "Über die Dlouhá zum Altstädter Ring", sub: "ca. 500 m · 7 Min.", ref: "#pr-ring" },
    { s: "12:25", e: "12:45", kind: "sight", title: "Teynkirche", sub: "Fr bis 13 Uhr offen", ref: "#pr-teyn", sight: "pr-teyn" },
    { s: "12:45", e: "13:05", kind: "sight", title: "Astronomische Uhr (Orloj)", sub: "Apostelumgang um 13:00 Uhr", ref: "#pr-orloj", sight: "pr-orloj", major: true },
    { s: "13:05", e: "13:15", kind: "walk", title: "Fußweg zur Metro Staroměstská", sub: "ca. 400 m · 5 Min.", ref: "#c-strahov", place: "pr_starom" },
    { s: "13:15", e: "13:18", kind: "metro", approximate: true, title: "Metro A → Malostranská", sub: "1 Station · Beispielzeit · 90-Min.-Ticket mit Puffer", ref: "#c-strahov", place: "pr_starom", to: "pr_malostr", toCity: "Malostranská" },
    { s: "13:25", e: "13:40", kind: "tram", approximate: true, title: "Tram 22 → Pohořelec", sub: "bergauf, vorbei an der Burg", ref: "#c-strahov", place: "pr_malostr", to: "pr_pohor", major: true },
    { s: "13:40", e: "13:50", kind: "walk", title: "Fußweg zum Kloster Strahov", sub: "ca. 3 Min.", ref: "#pr-strahov", place: "pr_pohor", city: "Strahov" },
    { s: "13:50", e: "14:35", kind: "sight", title: "Kloster Strahov & Bibliothek", sub: "Bibliothekssäle und Blick über Prag", ref: "#pr-strahov", sight: "pr-strahov", major: true },
    { s: "14:35", e: "15:00", kind: "walk", title: "Über den Hradschiner Platz zur Burg", sub: "ca. 1,2 km · 25 Min. inkl. Sicherheitskontrolle", ref: "#pr-burg", city: "Prager Burg" },
    { s: "15:00", e: "15:50", kind: "sight", title: "Prager Burg & Veitsdom", sub: "Areal kostenlos · Dom letzter Einlass ca. 16:40", ref: "#pr-veitsdom", sight: "pr-veitsdom", major: true },
    { s: "15:50", e: "16:15", kind: "walk", title: "Abstieg über die Alte Schlossstiege", sub: "ca. 950 m · 20–25 Min. zur Metro Malostranská", ref: "#c-abend", place: "pr_malostr" },
    { s: "16:20", e: "16:24", kind: "metro", approximate: true, title: "Metro A → Můstek", sub: "2 Stationen · über Staroměstská · Beispielzeit", ref: "#c-abend", place: "pr_malostr", to: "pr_mustek", toCity: "Můstek" },
    { s: "16:24", e: "16:45", kind: "walk", title: "Fußweg zu Malatang No.1", sub: "ca. 400 m · mit Metroausgang 10–15 Min.", ref: "#malatang", place: "pr_mustek" },
    { s: "16:45", e: "17:25", kind: "food", title: "Snack bei Malatang No.1", sub: "kleine Schüssel teilen", ref: "#malatang", major: true },
    { s: "17:25", e: "18:00", kind: "walk", title: "Fußweg zum Riegrovy sady", sub: "ca. 1,5 km · 30–35 Min. bis zur Wiese (oder Metro A ab Muzeum)", ref: "#pr-riegrovy", city: "Vinohrady" },
    { s: "18:00", e: "18:40", kind: "sight", title: "Sonnenuntergang im Riegrovy sady", sub: "Sonnenuntergang 18:24 Uhr, hinter dem Burghügel etwas früher", ref: "#pr-riegrovy", sight: "pr-riegrovy", major: true },
    { s: "18:40", e: "19:00", kind: "walk", title: "Fußweg nach Žižkov zu U Houdků", sub: "ca. 1 km · 12–20 Min.", ref: "#houdku" },
    { s: "19:00", e: "20:00", kind: "food", title: "Abendessen bei U Houdků", sub: "reservieren · Rechnung bis 19:50 Uhr", ref: "#houdku", major: true },
    { s: "20:00", e: "20:25", kind: "walk", title: "Zum Hauptbahnhof", sub: "bis zum Gleis ca. 25 Min. einplanen · um 20:00 los", ref: "#c-rueck", place: "pr_hln" },
    { s: "20:25", e: "20:45", kind: "buffer", title: "Puffer am Bahnhof", sub: "Gleis suchen, Proviant kaufen", ref: "#c-rueck" },
    { s: "20:47", e: "23:19", kind: "train", dep: true, title: "RJ 170 Praha hl. n. → Dresden Hbf", sub: "letzter sinnvoller Direktzug · im DB Navigator prüfen", ref: "#c-rueck", place: "pr_hln", to: "dd_hbf", major: true }
  ];

  // ---------------------------------------------------------------- Plan „Später“: RJ 171 ab 09:10, kurzer Burgrundgang
  var spaet = [
    { s: "08:45", e: "09:10", kind: "meet", title: "Treffen mit Yeji am Dresden Hauptbahnhof", sub: "Railjet Richtung Praha – Ticket vorher kaufen (Deutschlandticket gilt nicht)", ref: "#oepnv", place: "dd_hbf" },
    { s: "09:10", e: "11:25", kind: "train", dep: true, title: "RJ 171 Dresden Hbf → Praha hl. n.", sub: "im DB Navigator bestätigen", ref: "#c-hin2", place: "dd_hbf", to: "pr_hln", major: true },
    { s: "11:25", e: "11:45", kind: "walk", title: "Fußweg zum Antikvariát Dlážděná", sub: "ca. 550 m · mit Bahnhofsausgang 15–20 Min.", ref: "#pr-antik", place: "pr_hln", city: "Praha" },
    { s: "11:45", e: "12:20", kind: "sight", title: "Antikvariát Dlážděná", sub: "nur werktags – heute die Chance", ref: "#pr-antik", sight: "pr-antik", major: true },
    { s: "12:20", e: "12:35", kind: "sight", title: "Pulverturm & Gemeindehaus", sub: "von außen, auf dem Weg", ref: "#pr-pulverturm", sight: "pr-pulverturm" },
    { s: "12:35", e: "13:35", kind: "food", title: "Burger bei Naše maso", sub: "Mittagszeit – Schlange einplanen", ref: "#nase-maso", major: true },
    { s: "13:35", e: "13:50", kind: "sight", title: "Altstädter Ring, Teynkirche von außen", sub: "Teynkirche 13–15 Uhr geschlossen", ref: "#pr-ring", sight: "pr-ring" },
    { s: "13:50", e: "14:05", kind: "sight", title: "Astronomische Uhr (Orloj)", sub: "Apostelumgang um 14:00 Uhr", ref: "#pr-orloj", sight: "pr-orloj", major: true },
    { s: "14:05", e: "14:15", kind: "walk", title: "Fußweg zur Metro Staroměstská", sub: "ca. 400 m · 5 Min.", ref: "#c-strahov2", place: "pr_starom" },
    { s: "14:15", e: "14:18", kind: "metro", approximate: true, title: "Metro A → Malostranská", sub: "1 Station · Beispielzeit · 90-Min.-Ticket mit Puffer", ref: "#c-strahov2", place: "pr_starom", to: "pr_malostr", toCity: "Malostranská" },
    { s: "14:25", e: "14:40", kind: "tram", approximate: true, title: "Tram 22 → Pohořelec", sub: "bergauf, vorbei an der Burg", ref: "#c-strahov2", place: "pr_malostr", to: "pr_pohor", major: true },
    { s: "14:40", e: "14:50", kind: "walk", title: "Fußweg zum Kloster Strahov", sub: "ca. 3 Min.", ref: "#pr-strahov", place: "pr_pohor", city: "Strahov" },
    { s: "14:50", e: "15:30", kind: "sight", title: "Kloster Strahov & Bibliothek", sub: "Kasse bis 16:15 Uhr", ref: "#pr-strahov", sight: "pr-strahov", major: true },
    { s: "15:30", e: "15:55", kind: "walk", title: "Über den Hradschiner Platz zur Burg", sub: "ca. 1,2 km · 25 Min. · nach 15:40 Uhr Burg auslassen", ref: "#pr-burg", city: "Prager Burg" },
    { s: "15:55", e: "16:15", kind: "sight", title: "Burghöfe & Veitsdom von außen", sub: "nur das kostenlose Areal", ref: "#pr-burg", sight: "pr-burg" },
    { s: "16:15", e: "16:40", kind: "walk", title: "Abstieg über die Alte Schlossstiege", sub: "ca. 950 m · 20–25 Min. zur Metro Malostranská", ref: "#c-abend2", place: "pr_malostr" },
    { s: "16:45", e: "16:49", kind: "metro", approximate: true, title: "Metro A → Můstek", sub: "2 Stationen · über Staroměstská · Beispielzeit", ref: "#c-abend2", place: "pr_malostr", to: "pr_mustek", toCity: "Můstek" },
    { s: "16:49", e: "17:00", kind: "walk", title: "Fußweg zu Malatang No.1", sub: "ca. 400 m · 6 Min.", ref: "#malatang", place: "pr_mustek" },
    { s: "17:00", e: "17:35", kind: "food", title: "Snack bei Malatang No.1", sub: "kleine Schüssel teilen", ref: "#malatang", major: true },
    { s: "17:35", e: "17:45", kind: "sight", title: "Über den Wenzelsplatz zur Metro Muzeum", sub: "ca. 600 m · am Nationalmuseum vorbei", ref: "#pr-wenzel", sight: "pr-wenzel" },
    { s: "17:48", e: "17:51", kind: "metro", approximate: true, title: "Metro A → Jiřího z Poděbrad", sub: "2 Stationen", ref: "#c-abend2", place: "pr_muzeum", to: "pr_jzp", toCity: "Jiřího z Poděbrad" },
    { s: "17:51", e: "18:05", kind: "walk", title: "Fußweg zum Riegrovy sady", sub: "ca. 700 m · 8 Min. bis zur Wiese", ref: "#pr-riegrovy", place: "pr_jzp", city: "Vinohrady" },
    { s: "18:05", e: "18:40", kind: "sight", title: "Sonnenuntergang im Riegrovy sady", sub: "Sonnenuntergang 18:24 Uhr, hinter dem Burghügel etwas früher", ref: "#pr-riegrovy", sight: "pr-riegrovy", major: true },
    { s: "18:40", e: "19:00", kind: "walk", title: "Fußweg nach Žižkov zu U Houdků", sub: "ca. 1 km · 12–20 Min.", ref: "#houdku" },
    { s: "19:00", e: "20:00", kind: "food", title: "Abendessen bei U Houdků", sub: "reservieren · Rechnung bis 19:50 Uhr", ref: "#houdku", major: true },
    { s: "20:00", e: "20:25", kind: "walk", title: "Zum Hauptbahnhof", sub: "bis zum Gleis ca. 25 Min. einplanen · um 20:00 los", ref: "#c-rueck", place: "pr_hln" },
    { s: "20:25", e: "20:45", kind: "buffer", title: "Puffer am Bahnhof", sub: "Gleis suchen, Proviant kaufen", ref: "#c-rueck" },
    { s: "20:47", e: "23:19", kind: "train", dep: true, title: "RJ 170 Praha hl. n. → Dresden Hbf", sub: "letzter sinnvoller Direktzug · im DB Navigator prüfen", ref: "#c-rueck", place: "pr_hln", to: "dd_hbf", major: true }
  ];

  var planList = [
    { key: "main", label: "planMain", note: "planMainNote" },
    { key: "spaet", label: "planLate", note: "planLateNote", meetSub: "meetSubLate",
      conn: [["hin2", "tagOut"], ["strahov2", "tagTram"], ["abend2", "tagEvening"], ["rueck", "tagReturn"]] }
  ];

  var mapLines = [
    { pts: ["dd_hbf", "pr_hln"], kind: "train", tt: "ttTrain" },
    { pts: ["pr_starom", "pr_malostr"], kind: "ret", tt: "ttMetro" },
    { pts: ["pr_malostr", "pr_pohor"], kind: "tram", tt: "ttTram" },
    { pts: ["pr_malostr", "pr_mustek"], kind: "ret", tt: "ttMetro" },
    { pts: ["pr_muzeum", "pr_jzp"], kind: "ret", tt: "ttMetro" }
  ];

  var weatherSpots = [
    { name: "Altstadt", lat: 50.087, lon: 14.421, from: 10, to: 13 },
    { name: "Prager Burg", lat: 50.090, lon: 14.395, from: 13, to: 16 },
    { name: "Vinohrady", lat: 50.080, lon: 14.441, from: 17, to: 20 }
  ];

  var sources = [
    { label: "ČD – EC 459, Fahrplan 9.10.2026", url: "https://www.cd.cz/en/vlak/459/09.10.2026/8010085/7.08/5457076/9.25/1/0/" },
    { label: "ČD – RJ 171, Fahrplan 9.10.2026", url: "https://www.cd.cz/en/vlak/171/09.10.2026/8010085/9.10/5457076/11.25/1/0/" },
    { label: "ČD – RJ 170, Fahrplan 9.10.2026", url: "https://www.cd.cz/en/vlak/170/09.10.2026/5457076/20.47/8010085/23.19/1/0/" },
    { label: "ČD – Bauarbeiten Roudnice nad Labem–Hrobce", url: "https://www.cd.cz/jizdni-rad/omezeni-provozu/vyluka/23777/" },
    { label: "PID – aktuelle Ticketpreise", url: "https://pid.cz/en/tickets-and-fare/" },
    { label: "PID – Ticketkauf und Aktivierung", url: "https://pid.cz/en/tickets-and-fare/how-to-buy-ticket/" },
    { label: "DPP – Metroplan und Verkehrsmeldungen", url: "https://www.dpp.cz/cestovani/mapy-a-schemata" },

    { label: "DB Navigator / bahn.de (Fahrplan bitte am Reisetag prüfen)", url: "https://www.bahn.de/" },
    { label: "DB Super Sparpreis Europa Tschechien (ab 14,99 €, nach Verfügbarkeit)", url: "https://www.bahn.de/angebot/sparpreis-flexpreis/super-sparpreis-europa-tschechien" },
    { label: "České dráhy (ČD)", url: "https://www.cd.cz/" },
    { label: "PID – Prager Nahverkehr (Tickets, Fahrplan)", url: "https://pid.cz/" },
    { label: "Prager Burg – Öffnungszeiten & Tickets (hrad.cz)", url: "https://www.hrad.cz/" },
    { label: "Kloster Strahov (strahovskyklaster.cz)", url: "https://www.strahovskyklaster.cz/" },
    { label: "Antikvariát Dlážděná (adplus.cz)", url: "https://www.adplus.cz/" },
    { label: "Prague City Tourism (prague.eu)", url: "https://prague.eu/" },
    { label: "Jüdisches Museum in Prag", url: "https://www.jewishmuseum.cz/" },
    { label: "OpenStreetMap (Karten)", url: "https://www.openstreetmap.org/" },
    { label: "Wetter: Open-Meteo (kostenlos, ohne API-Schlüssel)", url: "https://open-meteo.com/" }
  ];

  window.TRIP = {
    date: TRIP_DATE, checkedAt: CHECKED_AT, storeKey: "pr26", meet: "dd_hbf", simTime: "13:00", walkKm: 8,
    areas: areas, places: places, sights: sights, optionalSights: optionalSights,
    restaurants: restaurants, cafes: cafes, connections: connections, connOrder: connOrder,
    mapLines: mapLines, plans: { main: main, spaet: spaet }, planList: planList, routes: {}, weatherSpots: weatherSpots, sources: sources
  };
})();
