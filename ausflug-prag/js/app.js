/* Reisebegleiter – App-Logik (datengetrieben: Bereiche, Karten, Verbindungen kommen aus data.js) (ohne Build-Schritt, ohne Abhängigkeiten außer Leaflet) */
(function () {
  "use strict";

  var T = window.TRIP;
  var I = window.I18N;
  var J = window.JOURNEY;
  var journeys = {}, simulatedJourneys = {};
  var WALKS = window.WALKS || {};
  var NS = (T.storeKey || "trip") + ":";
  var AREAS = T.areas, AREA_KEYS = AREAS.map(function (a) { return a.key; });
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // ------------------------------------------------------------ Speicher (robust gegen blockiertes localStorage)
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(NS + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (e) { /* ignorieren */ } },
    clear: function () { try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(NS) === 0) localStorage.removeItem(k); }); } catch (e) { /* ignorieren */ } }
  };

  // Mehrere Tagespläne (optional): T.planList = [{ key, label, note?, conn?, meetSub? }]
  var PLANS = (T.planList || []).filter(function (p) { return T.plans[p.key]; });
  function planMeta() { return PLANS.filter(function (p) { return p.key === state.plan; })[0] || {}; }

  var state = {
    plan: (function () { var k = store.get("plan", "main"); return T.plans[k] ? k : "main"; })(),
    visited: store.get("visited", {}),
    favs: store.get("favs", {}),
    sim: null, // Date für simulierte Uhrzeit
    lang: pickLang(),
    weather: null
  };

  // ------------------------------------------------------------ Sprache
  function pickLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) { /* alte Browser */ }
    if (I.langs.indexOf(q) >= 0) return q;
    var s = store.get("lang", null);
    if (I.langs.indexOf(s) >= 0) return s;
    var n = (navigator.language || "de").slice(0, 2).toLowerCase();
    return I.langs.indexOf(n) >= 0 ? n : "en";
  }
  // Oberflächentext (Funktionen bekommen die Argumente)
  function U(key) {
    var v = (I.ui[state.lang] || {})[key];
    if (v === undefined) v = I.ui.de[key];
    return typeof v === "function" ? v.apply(null, Array.prototype.slice.call(arguments, 1)) : v;
  }
  // Kurztext aus data.js (deutsches Original als Schlüssel)
  function P(s) {
    if (!s || state.lang === "de") return s;
    var d = I.phrases[state.lang] || {};
    if (d[s] != null) return d[s];
    var rules = I.rules[state.lang] || [];
    for (var i = 0; i < rules.length; i++) if (rules[i][0].test(s)) return s.replace(rules[i][0], rules[i][1]);
    return s;
  }
  // Feld eines Orts/Restaurants/Cafés (nach id)
  function C(obj, field) {
    if (state.lang !== "de") {
      var c = (I.content[state.lang] || {})[obj.id];
      if (c && c[field] != null) return c[field];
    }
    return obj[field];
  }
  function city(name) { return U("cityName", name); }

  // ------------------------------------------------------------ Hilfen
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function now() { return state.sim ? new Date(state.sim.getTime()) : new Date(); }
  function ymd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function nowMin(d) { return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60; }
  // Ohne festes Reisedatum (T.date = null) gilt der Plan für den heutigen Tag.
  function tripDate() { return T.date || ymd(now()); }
  function isTripDay(d) { return !T.date || ymd(d) === T.date; }
  function tripStart(hhmm) { var p = tripDate().split("-"); var t = hhmm.split(":"); return new Date(+p[0], +p[1] - 1, +p[2], +t[0], +t[1]); }
  function hhmm(d) { return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function fmtKm(m) { return m >= 1000 ? (m / 1000).toFixed(1).replace(".", U("decimal")) + " km" : Math.round(m / 10) * 10 + " m"; }
  function walkText(key) { var w = WALKS[key]; return w ? U("approx", fmtKm(w.m) + " · " + U("min", w.min)) : ""; }

  function durText(ms, dative) { return U("dur", Math.max(1, Math.round(ms / 60000)), dative); }
  function inHowLong(ms) { return Math.round(ms / 60000) <= 0 ? U("nowWord") : U("inTime", durText(ms, true)); }

  var DEST = {};
  Object.keys(T.places).forEach(function (k) { DEST[k] = T.places[k].dest || T.places[k].name; });
  function depPhrase(ev) { return U("depPhrase", ev.kind, city(ev.toCity || DEST[ev.to] || "")); }

  // Google Maps per Name suchen (öffnet die Ortsseite statt nur einer Koordinate);
  // Reihenfolge: eigener Suchbegriff (gmaps) > Name + Adresse > Name + Stadt. OSM bleibt koordinatengenau.
  var CITY_Q = {};
  AREAS.forEach(function (a) { CITY_Q[a.key] = a.q; });
  function gQuery(o) {
    if (o.gmaps) return o.gmaps;
    if (o.address) return o.name + ", " + o.address;
    return o.name + (CITY_Q[o.city] ? ", " + CITY_Q[o.city] : "");
  }
  function mapsLinks(o, label) {
    var q = encodeURIComponent(gQuery(o));
    return '<a class="chip-link" href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">📍 Google Maps</a>' +
      '<a class="chip-link" href="https://www.openstreetmap.org/?mlat=' + o.lat + "&mlon=" + o.lon + "#map=18/" + o.lat + "/" + o.lon + '" target="_blank" rel="noopener" aria-label="' + esc(U("osmAria", label)) + '">🗺 OSM</a>';
  }

  function routeURL(o, mode) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(gQuery(o)) + "&travelmode=" + (mode || "walking");
  }

  function eventPlace(ev) {
    if (ev.place && T.places[ev.place]) return T.places[ev.place];
    var id = ev.sight || (ev.ref || "").replace(/^#/, "");
    return T.sights.concat(T.optionalSights, T.restaurants, T.cafes).filter(function (o) { return o.id === id; })[0];
  }

  function journeyState() {
    var cache = state.sim ? simulatedJourneys : journeys;
    if (!cache[state.plan]) {
      var saved = state.sim ? null : store.get("journey:" + state.plan, null);
      cache[state.plan] = saved && saved.date === tripDate() && Array.isArray(saved.skipped) && saved.shortened &&
        (saved.index === null || (Number.isInteger(saved.index) && saved.index >= 0 && saved.index <= T.plans[state.plan].length)) ? saved : J.fresh(tripDate());
    }
    return cache[state.plan];
  }
  function saveJourney() { if (!state.sim) store.set("journey:" + state.plan, journeyState()); }
  function journeyIndex() {
    var plan = T.plans[state.plan], p = journeyState(), d = now();
    return p.index !== null ? p.index : J.automatic(plan, p, nowMin(d), d < tripStart(plan[0].s), d >= tripStart(plan[plan.length - 1].e));
  }

  // Manual confirmations take precedence over the clock until reset.
  function renderNextStop() {
    var plan = T.plans[state.plan], d = now(), m = nowMin(d);
    var p = journeyState(), index = journeyIndex(), manual = p.index !== null;
    var before = d < tripStart(plan[0].s), after = d >= tripStart(plan[plan.length - 1].e);
    var ev = plan[index];
    var box = $("#next-stop");
    if (!ev) {
      box.innerHTML = '<div><p class="eyebrow">' + esc(U("doneLabel")) + '</p><h2 id="next-stop-title">' + esc(U(manual ? "progressDone" : "doneBig")) +
        '</h2><p class="fine">' + esc(U("progressReturnHint")) + '</p><button class="chip-link" data-action="progress-reset">' + esc(U("progressReset")) + '</button></div>';
      return;
    }
    var destination = eventPlace(ev);
    var ride = ev.kind === "train" || ev.kind === "metro" || ev.kind === "tram";
    if (ride) destination = T.places[ev.to];
    var name = destination.id ? C(destination, "name") : destination.name;
    var walks = [];
    for (var i = index - 1; i >= 0 && (plan[i].kind === "walk" || plan[i].kind === "buffer"); i--) {
      if (plan[i].kind === "walk") walks.unshift(P(plan[i].sub));
    }
    if (ev.kind === "walk") walks = [P(ev.sub)];
    if (p.skipped.some(function (i) { return plan[i].ref === "#pr-burg" || plan[i].ref === "#pr-veitsdom"; }) && ev.kind === "metro" && ev.to === "pr_mustek") walks = [U("delayStrahovRoute")];
    if (p.skipped.some(function (i) { return plan[i].ref === "#pr-strahov"; }) && ev.ref === "#malatang") walks = [U("delayDirectSnack")];
    var time = ride ? ev.e : ev.s;
    var heading = manual && p.arrived ? U("progressHere") : before && !manual ? U("nextBefore") : U("nextHeading");
    box.innerHTML = '<div class="next-stop__main"><p class="eyebrow">' + esc(heading) +
      (state.sim ? ' <span class="sim-badge">' + esc(U("simBadge")) + '</span>' : "") + '</p>' +
      '<h2 id="next-stop-title">' + esc(name) + '</h2><p class="next-stop__time">' +
      esc(U("progressOriginal") + " " + (ev.approximate ? U("approx", time) : U("clock", time))) +
      ' · ' + esc(P(ev.title)) + '</p>' +
      (walks.length && !(manual && p.arrived) ? '<p class="next-stop__way">🚶 ' + esc(U("nextWay")) + ': ' + esc(walks.join(" · ")) + '</p>' : "") +
      (p.shortened[index] ? '<p class="progress-note">' + esc(U("progressShort", p.shortened[index])) + '</p>' : "") +
      '<p class="fine">' + esc(U(manual ? "progressManual" : "nextPlanned")) + '</p></div>' +
      '<div class="next-stop__actions">' + (manual && p.arrived ? "" : '<a class="btn btn--primary" href="' + esc(routeURL(destination, ride ? "transit" : "walking")) +
      '" target="_blank" rel="noopener">↗ ' + esc(U("routeOpen")) + '</a>') +
      '<button class="btn btn--primary" data-action="' + (manual && p.arrived ? "progress-next" : "progress-arrive") + '">' +
      esc(U(manual && p.arrived ? "progressNext" : "progressArrive")) + '</button>' +
      '<a class="chip-link" href="' + esc(ev.ref) + '">' + esc(U("nextDetails")) + '</a>' +
      (manual ? '<button class="chip-link" data-action="progress-back">' + esc(U("progressBack")) + '</button><button class="linkish" data-action="progress-reset">' + esc(U("progressReset")) + '</button>' : "") + '</div>';
  }

  function renderDelayPanel() {
    var p = journeyState(), plan = T.plans[state.plan], d = now();
    var proposals = J.advice(plan, p, journeyIndex(), isTripDay(d) ? nowMin(d) : undefined);
    var clockPending = plan.some(function (e, i) { return e.ref === "#pr-orloj" && i >= journeyIndex() + (p.arrived ? 1 : 0); }) && (!isTripDay(d) || nowMin(d) < 18 * 60);
    $("#delay-panel").innerHTML = '<h3>' + esc(U("delayHeading")) + '</h3><p class="fine">' + esc(U("delayIntro")) + '</p><div class="delay-options" role="group" aria-label="' + esc(U("delayHeading")) + '">' +
      [0, 15, 30, 60].map(function (n) { return '<button class="chip-link" data-action="delay-select" data-minutes="' + n + '" aria-pressed="' + (p.delay === n) + '">' + esc(n ? U("min", n) : U("delayOnTime")) + '</button>'; }).join("") + '</div>' +
      (p.delay ? '<ul class="delay-advice">' + proposals.map(function (a) { return '<li>' + esc(U(a.type === "skip" ? "delaySkip" : "delayShorten", P(plan[a.index].title), a.duration)) + '</li>'; }).join("") +
        (clockPending ? '<li>' + esc(U("delayClock")) + '</li>' : "") + '<li>' + esc(U(isTripDay(d) && nowMin(d) >= 18 * 60 + 24 ? "delayEveningAnchors" : "delayAnchors")) + '</li></ul>' +
        (proposals.length ? '<button class="chip-link" data-action="delay-apply">' + esc(U("delayApply")) + '</button>' : '<p class="fine">' + esc(U("delayNoCuts")) + '</p>') : "") +
      (p.skipped.length || Object.keys(p.shortened).length ? '<p class="progress-note">' + esc(U("delayApplied")) + '</p><button class="linkish" data-action="delay-reset">' + esc(U("delayReset")) + '</button>' : "");
  }

  function renderReturnBar() {
    var r = T.returnJourney, d = now(), m = nowMin(d), message = "";
    if (isTripDay(d)) {
      if (m >= toMin(r.departure) && m < toMin(r.arrival)) message = U("returnPast");
      else if (m >= toMin(r.stationBy) && m < toMin(r.departure)) message = U("returnBoard");
      else if (m >= toMin(r.leave) - 15 && m < toMin(r.stationBy)) message = U("returnSoon");
    }
    $("#return-bar").innerHTML = '<div class="return-bar__inner"><div class="return-bar__schedule">' +
      '<p class="return-bar__heading">' + esc(U("returnHeading")) + (state.sim ? ' · ' + esc(U("simBadge")) : "") + '</p><ol>' +
      [[r.leave, U("returnLeave")], [r.departure, r.line + " · " + U("returnTrain")], [r.arrival, U("returnArrive")]].map(function (x) {
        return '<li><strong>' + esc(x[0]) + '</strong><span>' + esc(x[1]) + '</span></li>';
      }).join("") + '</ol>' + (message ? '<p class="return-bar__alert" role="status">' + esc(message) + '</p>' : "") + '</div>' +
      '<div class="return-bar__actions"><a class="chip-link" href="' + esc(routeURL(T.places[r.station])) +
      '" target="_blank" rel="noopener">📍 ' + esc(U("returnRoute")) + '</a><a class="chip-link" href="' +
      esc(r.timetable) + '" target="_blank" rel="noopener">🚆 ' + esc(U("returnTimetable")) + '</a></div></div>';
    document.documentElement.style.setProperty("--return-bar-h", $("#return-bar").offsetHeight + "px");
  }

  function evidenceHTML(item) {
    var evidence = item.hoursEvidence;
    if (!evidence) return "";
    var official = evidence.status === "official", access = evidence.status === "access";
    return '<div class="hours-evidence hours-evidence--' + evidence.status + '"><div><strong>' +
      esc(U(access ? "evidenceAccess" : "evidenceHeading")) + '</strong><span>' +
      (access ? "" : esc(U(official ? "evidenceOfficial" : "evidenceUnconfirmed")) + ' · ') + esc(evidence.checkedAt) +
      '</span></div><a href="' + esc(evidence.url) + '" target="_blank" rel="noopener">' + esc(U("evidenceSource")) +
      ' ↗</a><p>' + esc(U(access ? (item.id === "pr-riegrovy" ? "evidenceAccessNote" : "evidencePublicNote") : official ? "evidenceRegular" : "evidenceCaution")) + '</p></div>';
  }

  // ------------------------------------------------------------ Öffnungszeiten-Ampel
  function status(item, d) {
    if (item.alwaysOpen) return { cls: "open", text: U("stFree") };
    if (item.uncertain || !item.hours) return { cls: "unknown", text: U("stCheck") };
    var intervals = item.hours[d.getDay()] || [];
    var m = nowMin(d);
    for (var i = 0; i < intervals.length; i++) {
      var a = toMin(intervals[i][0]), b = toMin(intervals[i][1]);
      if (m >= a && m < b) {
        return b - m <= 45 ? { cls: "soon", text: U("stSoon", intervals[i][1]) } : { cls: "open", text: U("stOpenUntil", intervals[i][1]) };
      }
    }
    for (var j = 0; j < intervals.length; j++) {
      if (toMin(intervals[j][0]) > m) return { cls: "closed", text: U("stClosedOpens", intervals[j][0]) };
    }
    return { cls: "closed", text: intervals.length ? U("stClosedNow") : U("stClosedToday") };
  }
  function statusHTML(item) {
    var s = status(item, now());
    var hl = C(item, "hoursLabel");
    var label = hl ? esc(hl) + ": " : "";
    return '<span class="status status--' + s.cls + '" data-status="' + esc(item.id) + '" title="' + esc(U("stTitle")) + '">' + label + esc(s.text) + "</span>";
  }
  var statusItems = {};
  function refreshStatuses() {
    $$("[data-status]").forEach(function (node) {
      var item = statusItems[node.getAttribute("data-status")];
      if (item) node.outerHTML = statusHTML(item);
    });
  }

  // ------------------------------------------------------------ Statische Texte + Sprachumschalter
  function applyStatic() {
    document.documentElement.lang = state.lang;
    document.title = U("docTitle");
    $$("[data-i18n]").forEach(function (n) { n.textContent = U(n.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (n) { n.innerHTML = U(n.getAttribute("data-i18n-html")); });
    $$("[data-i18n-aria]").forEach(function (n) {
      var parts = n.getAttribute("data-i18n-aria").split("|");
      n.setAttribute("aria-label", parts[1] ? U(parts[0], U(parts[1])) : U(parts[0]));
    });
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === state.lang)); });
    $$("[data-checked]").forEach(function (n) { n.textContent = U("checked", T.checkedAt); });
    $("#footer-text").textContent = U("footerText", T.checkedAt);
    if (T.heroPhoto) {
      $("#hero-credit").innerHTML = photoCredit(T.heroPhoto);
    }
  }

  function setLang(l) {
    if (I.langs.indexOf(l) < 0 || l === state.lang) return;
    state.lang = l; store.set("lang", l);
    try {
      var url = new URL(location.href);
      url.searchParams.set("lang", l);
      history.replaceState(null, "", url);
    } catch (e) { /* ignorieren */ }
    renderAll();
    rebuildMaps();
    if (travelOpen()) renderTravel();
  }

  // ------------------------------------------------------------ Hero-Stats
  function renderStats() {
    var plan = T.plans[state.plan];
    var first = plan.filter(function (e) { return e.dep; })[0];
    var last = plan[plan.length - 1];
    var dur = toMin(last.e) - toMin(first.s);
    var meters = 0;
    AREA_KEYS.forEach(function (c) { (T.routes[c] || []).forEach(function (k) { meters += (WALKS[k] || { m: 0 }).m; }); });
    if (!meters && T.walkKm) meters = T.walkKm * 1000;
    var km = String(Math.round(meters / 500) / 2).replace(".", U("decimal"));
    var items = [
      [U("statDuration"), U("durHM", Math.floor(dur / 60), dur % 60)],
      [U("statCities"), U("citiesVal")],
      [U("statWalk"), U("approx", km + " km")],
      [U("statStart"), U("clock", first.s)],
      [U("statReturn"), U("approx", U("clock", last.e))]
    ];
    $("#stats").innerHTML = items.map(function (i) { return "<div><dt>" + esc(i[0]) + "</dt><dd>" + esc(i[1]) + "</dd></div>"; }).join("");
  }

  // ------------------------------------------------------------ Timeline
  var ICON = { meet: "👋", train: "🚆", bus: "🚌", walk: "🚶", sight: "📍", food: "🍽", buffer: "☕", cafe: "☕", tram: "🚋", metro: "🚇" };

  // Umschalter zwischen den Tagesplänen (nur bei mehr als einem Plan)
  function renderPlanSwitch() {
    if (PLANS.length < 2) return;
    var box = $("#plan-box");
    if (!box) {
      box = document.createElement("div");
      box.id = "plan-box";
      var grid = $("#timeline").parentNode;
      grid.parentNode.insertBefore(box, grid);
      box.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-plan]");
        if (!btn || btn.getAttribute("data-plan") === state.plan) return;
        state.plan = btn.getAttribute("data-plan");
        store.set("plan", state.plan);
        renderAll();
        if (travelOpen()) renderTravel();
      });
    }
    var meta = planMeta();
    // Gestaltung wie beim Oberlausitz-Umschalter (.plan-switch / .plan-hint in style.css)
    box.innerHTML = '<div class="plan-switch" role="radiogroup" aria-label="' + esc(U("planSwitchAria")) + '"' +
      (PLANS.length !== 2 ? ' style="grid-template-columns:repeat(' + PLANS.length + ',1fr)"' : "") + ">" +
      PLANS.map(function (p) {
        return '<button type="button" role="radio" data-plan="' + esc(p.key) + '" aria-checked="' + (p.key === state.plan) + '">' + esc(U(p.label)) + "</button>";
      }).join("") + "</div>" +
      '<p class="plan-hint">' + (meta.note ? esc(U(meta.note)) : "") + "</p>";
  }

  function renderTimeline() {
    var plan = T.plans[state.plan];
    var progress = journeyState();
    var d = now(), trip = isTripDay(d), m = nowMin(d);
    $("#timeline").innerHTML = plan.map(function (ev) {
      var cls = ["tl", "tl--" + ev.kind, ev.major ? "tl--major" : "tl--minor"];
      if (trip && toMin(ev.e) <= m) cls.push("tl--past");
      if (trip && toMin(ev.s) <= m && m < toMin(ev.e)) cls.push("tl--now");
      if (progress.index !== null) {
        cls = cls.filter(function (c) { return c !== "tl--past" && c !== "tl--now"; });
        if (plan.indexOf(ev) < progress.index) cls.push("tl--past");
        if (plan.indexOf(ev) === progress.index) cls.push("tl--now");
      }
      var skipped = progress.skipped.indexOf(plan.indexOf(ev)) >= 0;
      if (skipped) cls.push("tl--skipped");
      var count = "";
      if (ev.dep) count = '<span class="tl__count" data-cd="' + ev.s + '" data-cd-label="' + esc(depPhrase(ev)) + '"></span>';
      return '<li class="' + cls.join(" ") + '"><a href="' + ev.ref + '">' +
        '<span class="tl__time">' + esc(ev.approximate ? U("approx", ev.s) : ev.s) + "</span>" +
        '<span class="tl__icon" aria-hidden="true">' + ICON[ev.kind] + "</span>" +
        '<span class="tl__body">' + (ev.city ? '<span class="tl__city">' + esc(P(ev.city)) + "</span><br>" : "") +
        '<span class="tl__title">' + esc(P(ev.title)) + "</span>" +
        (skipped ? '<br><span class="progress-note">' + esc(U("progressSkipped")) + '</span>' : progress.shortened[plan.indexOf(ev)] ? '<br><span class="progress-note">' + esc(U("progressShort", progress.shortened[plan.indexOf(ev)])) + '</span>' : "") +
        (ev.sub ? '<br><span class="tl__sub">' + esc(P(ev.sub)) + "</span>" : "") + (count ? "<br>" + count : "") +
        "</span></a></li>";
    }).join("");
    updateCountdowns();
  }

  // Countdown-Badges ("Zug nach … in 34 Minuten") – nur am Reisetag
  function updateCountdowns() {
    var d = now();
    $$("[data-cd]").forEach(function (node) {
      if (!isTripDay(d)) { node.textContent = ""; return; }
      var diff = tripStart(node.getAttribute("data-cd")) - d;
      var label = node.getAttribute("data-cd-label");
      if (diff < -60000) node.textContent = "";
      else if (diff <= 60000) node.textContent = U("departsNow", label);
      else node.textContent = label + " " + inHowLong(diff);
    });
  }

  // ------------------------------------------------------------ Sehenswürdigkeiten
  function favBtn(id, name, inline) {
    var on = !!state.favs[id];
    return '<button type="button" class="fav' + (inline ? " fav--inline" : "") + '" data-fav="' + esc(id) + '" aria-pressed="' + on + '" aria-label="' + esc(U("favAria", name)) + '">' + (on ? "♥" : "♡") + "</button>";
  }

  function photoCredit(photo) {
    return '<a href="' + esc(photo.credit) + '" target="_blank" rel="noopener">' +
      esc(U("photo")) + ': ' + esc(photo.author) + '</a> · <a href="' + esc(photo.licenseUrl) +
      '" target="_blank" rel="noopener">' + esc(photo.license) + '</a>';
  }

  function sightCard(s, num) {
    statusItems[s.id] = s;
    var visited = !!state.visited[s.id];
    var name = C(s, "name");
    var media = s.photo
      ? '<img src="' + esc(s.photo.src) + '" alt="' + esc(s.photo.caption ? s.photo.caption[state.lang] : name) +
        '" loading="lazy" decoding="async" width="' + s.photo.width + '" height="' + s.photo.height + '">'
      : "";
    var walk = "";
    if (s.walkFrom) walk = s.walkFrom.key ? U("walkWithLabel", walkText(s.walkFrom.key), C(s, "walkLabel") || s.walkFrom.label) : (C(s, "walkText") || s.walkFrom.text);
    var extra = C(s, "extra"), planB = C(s, "planB"), reason = C(s, "reason"), swap = C(s, "swapHint");
    return '<article class="card sight' + (visited ? " is-visited" : "") + '" id="' + esc(s.id) + '">' +
      '<div class="sight__media' + (s.photo ? (s.photo.height > s.photo.width ? " sight__media--portrait" : "") : " sight__media--empty") + '">' + (media || "🏛") +
      (num ? '<span class="sight__num">' + num + "</span>" : "") + favBtn(s.id, name) + "</div>" +
      '<div class="sight__body">' +
      (s.photo ? '<div class="sight__credit">' + photoCredit(s.photo) + '</div>' +
        (s.photo.caption ? '<p class="photo-caption">' + esc(s.photo.caption[state.lang]) + '</p>' : "") : "") +
      (s.optional ? '<span class="optional-tag">' + esc(U("optional")) + "</span>" : "") +
      "<h3>" + esc(name) + "</h3>" +
      '<div class="status-row">' + statusHTML(s) + "</div>" + evidenceHTML(s) +
      "<p>" + esc(C(s, "text")) + "</p>" +
      '<p class="sight__why">' + esc(C(s, "why")) + "</p>" +
      '<dl class="facts">' +
      '<div><dt aria-label="' + esc(U("aDuration")) + '">⏱</dt><dd>' + U("recommended", esc(C(s, "duration"))) + "</dd></div>" +
      (walk ? '<div><dt aria-label="' + esc(U("aWalk")) + '">🚶</dt><dd>' + esc(walk) + "</dd></div>" : "") +
      '<div><dt aria-label="' + esc(U("aHours")) + '">🕘</dt><dd>' + esc(C(s, "hoursNote")) + "</dd></div>" +
      (extra ? '<div><dt aria-label="' + esc(U("aTip")) + '">💡</dt><dd>' + esc(extra) + "</dd></div>" : "") +
      "</dl>" +
      (planB ? '<p class="alert alert--info">' + esc(planB) + "</p>" : "") +
      (reason ? '<p class="alert">' + esc(reason) + "</p>" : "") +
      (swap ? '<p class="alert alert--info">' + esc(swap) + "</p>" : "") +
      '<div class="sight__links">' + mapsLinks(s, name) +
      (s.web ? '<a class="chip-link" href="' + s.web + '" target="_blank" rel="noopener">↗ ' + esc(U("website")) + "</a>" : "") + "</div>" +
      "</div>" +
      '<label class="visited"><input type="checkbox" data-visit="' + esc(s.id) + '"' + (visited ? " checked" : "") + "> " + esc(U("visited")) + "</label>" +
      "</article>";
  }

  function renderSights() {
    AREA_KEYS.forEach(function (c) {
      var box = $("#sights-" + c);
      if (box) box.innerHTML = T.sights.filter(function (s) { return s.city === c; }).map(function (s, i) { return sightCard(s, i + 1); }).join("");
      var opt = $("#optional-" + c);
      if (opt) opt.innerHTML = T.optionalSights.filter(function (s) { return s.city === c; }).map(function (s) { return sightCard(s); }).join("");
    });
  }

  // ------------------------------------------------------------ Essen
  function foodCard(r) {
    statusItems[r.id] = r;
    var name = C(r, "name"), why = C(r, "why"), pros = C(r, "pros"), note = C(r, "note");
    return '<article class="card sight food" id="' + esc(r.id) + '"><div class="sight__body">' +
      '<div class="sight__top"><div><span class="prio' + (r.priority === "Alternative" ? " prio--alt" : "") + '">' + esc(P(r.priority)) + "</span>" +
      "<h3 style=\"margin-top:8px\">" + esc(name) + "</h3></div>" + favBtn(r.id, name, true) + "</div>" +
      '<div class="status-row">' + statusHTML(r) + "</div>" + evidenceHTML(r) +
      "<p>" + esc(C(r, "text")) + "</p>" +
      (why ? '<p class="sight__why sight__why--food">' + esc(why) + "</p>" : "") +
      (pros ? '<ul class="pros">' + pros.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "") +
      '<dl class="facts">' +
      '<div><dt>🕐</dt><dd><strong>' + esc(U("planned")) + ":</strong> " + esc(C(r, "when")) + "</dd></div>" +
      (r.address ? '<div><dt>📫</dt><dd>' + esc(r.address) + "</dd></div>" : "") +
      '<div><dt>🍲</dt><dd>' + esc(C(r, "cuisine")) + "</dd></div>" +
      '<div><dt>🕘</dt><dd>' + esc(C(r, "hoursNote")) + "</dd></div>" +
      '<div><dt>💶</dt><dd>' + esc(C(r, "price")) + "</dd></div>" +
      '<div><dt>⭐</dt><dd>' + esc(C(r, "rating") || U("noRating")) + "</dd></div>" +
      "</dl>" +
      (note ? '<p class="alert alert--info">' + esc(note) + "</p>" : "") +
      '<div class="sight__links">' +
      (r.reserve ? '<a class="chip-link" href="' + r.reserve + '" target="_blank" rel="noopener">📅 ' + esc(U("reserve")) + "</a>" : "") +
      (r.phone ? '<a class="chip-link" href="tel:' + r.phone + '">📞 ' + esc(U("call")) + "</a>" : "") +
      (r.web ? '<a class="chip-link" href="' + r.web + '" target="_blank" rel="noopener">↗ ' + esc(U("website")) + "</a>" : "") +
      mapsLinks(r, name) + "</div>" +
      "</div></article>";
  }

  function renderFood() {
    $("#food-lunch").innerHTML = T.restaurants.filter(function (r) { return r.role === "lunch"; }).map(foodCard).join("");
    $("#food-dinner").innerHTML = T.restaurants.filter(function (r) { return r.role === "dinner"; }).map(foodCard).join("");
    $("#cafe-groups").innerHTML = AREA_KEYS.filter(function (c) { return T.cafes.some(function (x) { return x.city === c; }); }).map(function (c) {
      return '<div class="cafe-group"><h4>' + esc(U("area_" + c)) + "</h4>" + T.cafes.filter(function (x) { return x.city === c; }).map(function (x) {
        statusItems[x.id] = x;
        var name = C(x, "name");
        return '<article class="card cafe" id="' + esc(x.id) + '"><div class="cafe__top"><h5>' + esc(name) + "</h5>" + favBtn(x.id, name, true) + "</div>" +
          '<div class="status-row" style="margin-top:6px">' + statusHTML(x) + "</div>" + evidenceHTML(x) +
          "<p>" + esc(C(x, "text")) + "</p>" +
          '<dl class="facts">' +
          '<div><dt>📫</dt><dd>' + esc(x.address) + "</dd></div>" +
          '<div><dt>🕘</dt><dd>' + esc(C(x, "hoursNote")) + "</dd></div>" +
          '<div><dt>🍰</dt><dd>' + esc(C(x, "special")) + " · " + esc(C(x, "price")) + "</dd></div>" +
          '<div><dt>🚶</dt><dd>' + esc(C(x, "distance")) + "</dd></div>" +
          "</dl>" +
          '<div class="sight__links">' + mapsLinks(x, name) + (x.web ? '<a class="chip-link" href="' + x.web + '" target="_blank" rel="noopener">↗ ' + esc(U("website")) + "</a>" : "") + "</div>" +
          "</article>";
      }).join("") + "</div>";
    }).join("");
  }

  // ------------------------------------------------------------ Verbindungen
  function legHTML(l) {
    if (l.mode === "walk") {
      return '<div class="leg leg--walk"><div class="leg__times">🚶</div><div>' + esc(P(l.text)) + (l.buffer ? ' <span class="buffer">' + esc(P(l.buffer)) + "</span>" : "") + "</div></div>";
    }
    var phrase = U("depPhrase", l.mode, city(l.toCity || l.to));
    var mins = toMin(l.arr) - toMin(l.dep) + (toMin(l.arr) < toMin(l.dep) ? 1440 : 0);
    return '<div class="leg"><div class="leg__times"><span>' + esc(l.approximate ? U("approx", l.dep) : l.dep) + "</span><span>" + esc(l.approximate ? U("approx", l.arr) : l.arr) + "</span></div>" +
      "<div>" +
      '<span class="leg__line' + (l.mode !== "train" ? " leg__line--bus" : "") + '">' + ({ train: "🚆", tram: "🚋", metro: "🚇" }[l.mode] || "🚌") + " " + esc(l.line) + '</span> <span class="fine">' + esc(U("dirShort", l.dir)) + " · " + esc(U("min", mins)) + "</span>" +
      '<div class="leg__stops" style="margin-top:6px">' +
      "<div><span>" + esc(l.from) + '</span><span class="leg__pl">' + esc(P(l.fromPl)) + "</span></div>" +
      "<div><span>" + esc(l.to) + '</span><span class="leg__pl">' + esc(P(l.toPl)) + "</span></div>" +
      "</div>" +
      (l.approximate ? "" : '<span class="countdown" data-cd="' + l.dep + '" data-cd-label="' + esc(phrase) + '"></span>') +
      "</div></div>";
  }

  function connCard(c, tag) {
    var body;
    if (c.options) {
      body = c.options.map(function (o, i) {
        return '<div class="conn__opt' + (i === 0 ? " conn__opt--main" : "") + '"><div class="conn__opt-head"><span>' + esc(P(o.label)) + "</span><span>" + esc(P(o.info)) + "</span></div>" + o.legs.map(legHTML).join("") + "</div>";
      }).join("");
    } else {
      body = c.legs.map(legHTML).join("");
    }
    return '<article class="card conn" id="c-' + c.id + '"><div class="conn__head"><h3>' + esc(P(c.title)) + '</h3><span class="conn__tag">' + esc(tag) + "</span></div>" +
      body +
      (c.note ? '<p class="alert alert--info" style="margin-top:10px">' + esc(P(c.note)) + "</p>" : "") +
      (c.alts ? '<div class="conn__alts"><strong>' + esc(U("alternatives")) + "</strong><ul>" + c.alts.map(function (a) { return "<li>" + esc(P(a)) + "</li>"; }).join("") + "</ul></div>" : "") +
      '<p class="fine">' + esc(U("connChecked", T.checkedAt)) + "</p>" +
      "</article>";
  }

  function renderConnections() {
    $("#connections").innerHTML = (planMeta().conn || T.connOrder).map(function (o) { return connCard(T.connections[o[0]], U(o[1])); }).join("");
  }

  function renderSources() {
    $("#sources").innerHTML = T.sources.map(function (s) { return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + esc(P(s.label)) + "</a></li>"; }).join("");
  }

  // ------------------------------------------------------------ Karten (Leaflet + OpenStreetMap)
  var maps = {};
  var PIN = { station: "🚆", bus: "🚌", sight: "★", food: "🍽", cafe: "☕", optional: "☆" };
  var CITY_VIEW = {};
  AREAS.forEach(function (a) { CITY_VIEW[a.key] = a.view; });

  function pinIcon(type, num) {
    if (num) return L.divIcon({ className: "", html: '<div class="pin pin--num">' + num + "</div>", iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -12] });
    return L.divIcon({ className: "", html: '<div class="pin pin--' + type + '"><span>' + PIN[type] + "</span></div>", iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
  }
  function popup(name, sub, ref) {
    return "<b>" + esc(name) + "</b>" + (sub ? esc(sub) + "<br>" : "") + (ref ? '<a href="' + ref + '">' + esc(U("popDetails")) + "</a>" : "");
  }
  function baseMap(id) {
    var m = L.map(id, { scrollWheelZoom: false, tap: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(m);
    return m;
  }
  function addRoute(m, keys, color, dash) {
    var pts = [];
    keys.forEach(function (k) { if (WALKS[k]) pts = pts.concat(WALKS[k].path); });
    if (pts.length) L.polyline(pts, { color: color, weight: 4, opacity: .85, dashArray: dash || null }).addTo(m);
  }
  function addCommonMarkers(m, c) {
    Object.keys(T.places).forEach(function (k) {
      var p = T.places[k];
      L.marker([p.lat, p.lon], { icon: pinIcon(p.type), title: p.name }).bindPopup(popup(p.name, p.type === "bus" ? U("popStop") : U("popStation"), "#oepnv")).addTo(m);
    });
    T.restaurants.forEach(function (r) {
      if (c && r.city !== c) return;
      L.marker([r.lat, r.lon], { icon: pinIcon("food"), title: C(r, "name") }).bindPopup(popup(C(r, "name"), P(r.priority), "#" + r.id)).addTo(m);
    });
    T.cafes.forEach(function (x) {
      if (c && x.city !== c) return;
      L.marker([x.lat, x.lon], { icon: pinIcon("cafe"), title: C(x, "name") }).bindPopup(popup(C(x, "name"), U("popCafe"), "#" + x.id)).addTo(m);
    });
    T.optionalSights.forEach(function (s) {
      if (c && s.city !== c) return;
      L.marker([s.lat, s.lon], { icon: pinIcon("optional"), title: C(s, "name") }).bindPopup(popup(C(s, "name"), U("popOptional"), "#" + s.id)).addTo(m);
    });
  }

  function initMaps() {
    if (!window.L) {
      $$(".map").forEach(function (n) { n.innerHTML = '<p class="fine" style="padding:16px">' + esc(U("mapFail")) + "</p>"; });
      return;
    }
    // Übersicht
    var o = baseMap("map-overview");
    addCommonMarkers(o, null);
    T.sights.forEach(function (s) {
      L.marker([s.lat, s.lon], { icon: pinIcon("sight"), title: C(s, "name") }).bindPopup(popup(C(s, "name"), C(s, "duration"), "#" + s.id)).addTo(o);
    });
    var Pl = T.places;
    var LINE = {
      train: { color: "#2f5f8a", weight: 3, dashArray: "6 8" },
      tram: { color: "#b4532a", weight: 3, dashArray: "6 8" },
      bus: { color: "#b4532a", weight: 3, dashArray: "6 8" },
      ret: { color: "#2f5f8a", weight: 2, opacity: .5, dashArray: "2 8" }
    };
    (T.mapLines || []).forEach(function (ln) {
      L.polyline(ln.pts.map(function (k) { return [Pl[k].lat, Pl[k].lon]; }), LINE[ln.kind] || LINE.train).addTo(o).bindTooltip(U(ln.tt));
    });
    AREA_KEYS.forEach(function (c) { addRoute(o, T.routes[c] || [], "#3e6b4f"); });
    var all = L.latLngBounds(Object.keys(Pl).map(function (k) { return [Pl[k].lat, Pl[k].lon]; }));
    o.fitBounds(all, { padding: [20, 20] });
    maps.overview = o; maps.all = all;

    // Städte
    AREA_KEYS.forEach(function (c) {
      if (!$("#map-" + c)) return;
      var m = baseMap("map-" + c);
      addCommonMarkers(m, c);
      T.sights.filter(function (s) { return s.city === c; }).forEach(function (s, i) {
        L.marker([s.lat, s.lon], { icon: pinIcon("sight", i + 1), title: C(s, "name"), zIndexOffset: 500 }).bindPopup(popup(C(s, "name"), C(s, "duration"), "#" + s.id)).addTo(m);
      });
      addRoute(m, T.routes[c] || [], "#3e6b4f");
      m.fitBounds(CITY_VIEW[c]);
      maps[c] = m;
    });

    // Legende
    var legend = [["station", "lgStation"], ["bus", "lgBus"], ["sight", "lgSight"], ["food", "lgFood"], ["cafe", "lgCafe"], ["optional", "lgOptional"]];
    $("#legend").innerHTML = legend.map(function (l) { return '<span><i class="pin pin--' + l[0] + '"></i>' + esc(U(l[1])) + "</span>"; }).join("");
  }

  // Beim Sprachwechsel Karten neu aufbauen (Popups, Tooltips, Legende)
  function rebuildMaps() {
    ["overview"].concat(AREA_KEYS).forEach(function (k) { if (maps[k]) { maps[k].remove(); delete maps[k]; } });
    try { initMaps(); } catch (e) { console.warn("Karte nicht verfügbar", e); }
  }

  // ------------------------------------------------------------ Wetter (Open-Meteo, kein Schlüssel nötig)
  var WX = [[0, "☀️", "clear"], [1, "🌤", "mainly"], [2, "⛅", "partly"], [3, "☁️", "overcast"], [45, "🌫", "fog"], [48, "🌫", "fog"],
    [51, "🌦", "drizzle"], [53, "🌦", "drizzle"], [55, "🌦", "drizzle"], [61, "🌧", "rain"], [63, "🌧", "rain"], [65, "🌧", "heavyRain"],
    [80, "🌦", "showers"], [81, "🌧", "showers"], [82, "⛈", "heavyShowers"], [95, "⛈", "storm"], [96, "⛈", "storm"], [99, "⛈", "storm"]];
  function wxInfo(code) { for (var i = WX.length - 1; i >= 0; i--) if (code >= WX[i][0]) return WX[i]; return WX[0]; }

  function loadWeather() {
    var spots = T.weatherSpots;
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + spots.map(function (s) { return s.lat; }).join(",") +
      "&longitude=" + spots.map(function (s) { return s.lon; }).join(",") +
      "&hourly=temperature_2m,precipitation_probability,weather_code&timezone=Europe%2FBerlin&start_date=" + tripDate() + "&end_date=" + tripDate();
    fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
      var arr = Array.isArray(data) ? data : [data];
      state.weather = spots.map(function (s, i) {
        var h = arr[i] && arr[i].hourly; if (!h) throw new Error("no data");
        var temps = [], rain = 0, codes = [];
        for (var k = s.from; k <= s.to; k++) { temps.push(h.temperature_2m[k]); rain = Math.max(rain, h.precipitation_probability[k] || 0); codes.push(h.weather_code[k]); }
        // häufigster Wettercode im Zeitfenster
        var freq = {}, code = codes[0];
        codes.forEach(function (c) { freq[c] = (freq[c] || 0) + 1; if (freq[c] > freq[code]) code = c; });
        return { spot: s, min: Math.round(Math.min.apply(null, temps)), max: Math.round(Math.max.apply(null, temps)), rain: rain, code: code };
      });
      renderWeather();
    }).catch(function () { /* keine Vorhersage verfügbar -> Modul bleibt ausgeblendet, nichts simulieren */ });
  }
  function renderWeather() {
    if (!state.weather) return;
    $("#weather-grid").innerHTML = state.weather.map(function (w) {
      var info = wxInfo(w.code);
      return '<div class="wx"><div class="wx__name">' + esc(city(w.spot.name)) + '</div><div class="wx__icon" title="' + esc(U("wx")[info[2]]) + '">' + info[1] + '</div><div class="wx__temp">' +
        w.min + "–" + w.max + '°</div><div class="wx__rain">' + esc(U("rain", w.rain)) + "<br>" + esc(U("hourRange", w.spot.from, w.spot.to)) + "</div></div>";
    }).join("");
    $("#weather").hidden = false;
  }

  // ------------------------------------------------------------ Reisemodus
  function travelOpen() { return !$("#travel").hidden; }

  function renderTravel() {
    var d = now();
    var plan = T.plans[state.plan];
    $("#travel-clock").innerHTML = (state.sim ? '<span class="sim-badge">' + esc(U("simBadge")) + "</span> " : "") + hhmm(d);
    var body = $("#travel-body");
    var nextCard = '<div class="card next-stop">' + $("#next-stop").innerHTML.replace(' id="next-stop-title"', "") + '</div><div class="card delay-panel">' + $("#delay-panel").innerHTML + '</div>';
    if (journeyState().index !== null) { body.innerHTML = nextCard; return; }
    var start = tripStart(plan[0].s), end = tripStart(plan[plan.length - 1].e);
    if (plan[plan.length - 1].e < plan[0].s) end = new Date(end.getTime() + 86400000);

    if (d < start && !isTripDay(d)) {
      var firstDep = plan.filter(function (e) { return e.dep; })[0];
      body.innerHTML = nextCard +
        '<div class="card tv tv--hero"><p class="tv__label">' + esc(U("notYet")) + '</p><p class="tv__big">' + esc(U("tripDate")) + "</p>" +
        '<p class="tv__count">' + esc(durText(tripStart(firstDep.s) - d)) + '</p><p class="tv__sub">' + esc(U("untilFirst", P(firstDep.title), firstDep.s)) + "</p></div>" +
        '<div class="card tv"><p class="tv__label">' + esc(U("meetLabel")) + '</p><p class="tv__big">' + esc(U("meetVal", plan[0].s)) + '</p><p class="tv__sub">' + esc(U(planMeta().meetSub || "meetSub")) + "</p>" +
        '<div class="tv__actions">' + mapsLinks(T.places[T.meet], T.places[T.meet].name) + "</div></div>" +
        '<p class="fine">' + esc(U("travelIntro")) + "</p>";
      return;
    }
    if (d >= end || (!isTripDay(d) && d > start)) {
      body.innerHTML = '<div class="card tv tv--hero"><p class="tv__label">' + esc(U("doneLabel")) + '</p><p class="tv__big">' + esc(U("doneBig")) + '</p><p class="tv__sub">' + esc(U("doneSub")) + "</p></div>";
      return;
    }

    var m = nowMin(d);
    var current = plan.filter(function (e) { return toMin(e.s) <= m && m < toMin(e.e); })[0];
    var upcoming = plan.filter(function (e) { return toMin(e.s) > m; });
    var nextDep = plan.filter(function (e) { return e.dep && toMin(e.s) > m - 1; })[0];
    var nextMajor = upcoming.filter(function (e) { return e.major; })[0];
    var nextSight = current && current.kind === "sight" ? current : upcoming.filter(function (e) { return e.kind === "sight"; })[0];
    var riding = current && (current.kind === "train" || current.kind === "bus");
    var html = nextCard;

    if (riding) {
      html += '<div class="card tv tv--hero"><p class="tv__label">' + esc(U("onTheWay")) + '</p><p class="tv__big">' + esc(P(current.title)) + '</p><p class="tv__sub">' + esc(U("arrivalAt", current.e)) + " · " + esc(P(current.sub)) + "</p>" +
        '<p class="tv__count">' + esc(durText(tripStart(current.e) - d)) + '</p><p class="tv__sub">' + esc(U("untilArrival")) + "</p></div>";
    }
    if (nextDep && current !== nextDep) {
      var place = T.places[nextDep.place];
      var walkEv = plan.filter(function (e) { return e.kind === "walk" && toMin(e.e) <= toMin(nextDep.s) && toMin(e.e) > m; }).pop();
      html += '<div class="card tv' + (riding ? "" : " tv--hero") + '"><p class="tv__label">' + esc(U("nextDep")) + "</p>" +
        '<p class="tv__big">' + esc(depPhrase(nextDep)) + " · " + nextDep.s + '</p><p class="tv__sub">' + esc(P(nextDep.title)) + " · " + esc(P(nextDep.sub)) + "</p>" +
        '<p class="tv__count">' + esc(inHowLong(tripStart(nextDep.s) - d)) + "</p>" +
        (walkEv ? '<p class="tv__sub">🚶 ' + esc(U("walkTime")) + ": " + esc(P(walkEv.title)) + " – " + esc(P(walkEv.sub)) + esc(toMin(walkEv.s) <= m ? U("walkRunning", walkEv.e) : U("walkStart", walkEv.s)) + "</p>" : "") +
        '<div class="tv__actions">' + (place ? mapsLinks(place, place.name) : "") + '<a class="chip-link" href="' + nextDep.ref + '" data-action="travel-jump">' + esc(U("seeConn")) + "</a></div></div>";
    }

    html += '<div class="tv__row">';
    html += '<div class="card tv"><p class="tv__label">' + esc(U("nowLabel")) + '</p><p class="tv__big" style="font-size:1.2rem">' + (current ? ICON[current.kind] + " " + esc(P(current.title)) : esc(U("freeTime"))) + '</p><p class="tv__sub">' + (current ? esc(U("until", current.approximate ? U("approx", current.e) : current.e)) : "") + "</p></div>";
    html += '<div class="card tv"><p class="tv__label">' + esc(U("nextImportant")) + '</p><p class="tv__big" style="font-size:1.2rem">' + (nextMajor ? esc(nextMajor.approximate ? U("approx", U("clock", nextMajor.s)) : U("clock", nextMajor.s)) : "–") + '</p><p class="tv__sub">' + (nextMajor ? esc(P(nextMajor.title)) : "") + "</p></div>";
    html += "</div>";

    if (nextSight) {
      var s = T.sights.concat(T.optionalSights).filter(function (x) { return x.id === nextSight.sight; })[0];
      if (s) {
        statusItems[s.id] = s;
        html += '<div class="card tv"><p class="tv__label">' + esc(current === nextSight ? U("currentSight") : U("nextSight", nextSight.s)) + "</p>" +
          '<p class="tv__big" style="font-size:1.3rem">' + esc(C(s, "name")) + '</p><div class="status-row" style="margin-top:6px">' + statusHTML(s) + "</div>" +
          '<p class="tv__sub">⏱ ' + esc(C(s, "duration")) + (s.walkFrom && s.walkFrom.key ? " · 🚶 " + esc(walkText(s.walkFrom.key)) : "") + "</p>" +
          '<div class="tv__actions">' + mapsLinks(s, C(s, "name")) + '<a class="chip-link" href="#' + s.id + '" data-action="travel-jump">' + esc(U("details")) + "</a></div></div>";
      }
    }

    html += '<div class="card tv"><p class="tv__label">' + esc(U("after")) + '</p><ul class="tv-list">' + upcoming.slice(0, 5).map(function (e) {
      return "<li><b>" + esc(e.approximate ? U("approx", e.s) : e.s) + "</b><span>" + ICON[e.kind] + " " + esc(P(e.title)) + "</span></li>";
    }).join("") + "</ul></div>";
    html += '<p class="fine">' + esc(U("travelFoot", T.checkedAt)) + "</p>";
    body.innerHTML = html;
  }

  var travelTimer = null;
  function openTravel() {
    $("#travel").hidden = false; document.body.classList.add("travel-open");
    renderTravel();
    travelTimer = setInterval(renderTravel, 15000);
    $(".travel__close").focus();
  }
  function closeTravel() {
    $("#travel").hidden = true; document.body.classList.remove("travel-open");
    clearInterval(travelTimer);
  }

  // ------------------------------------------------------------ Navigation
  // Schwebender Reisemodus-Button erst nach dem Hero-Bereich zeigen
  function initFab() {
    var fab = $(".fab");
    if (!("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (entries) {
      fab.classList.toggle("fab--hidden", entries[0].isIntersecting);
    }, { threshold: 0.25 }).observe($(".hero"));
  }

  // Aktiven Abschnitt in der Navigation markieren
  function initNav() {
    var links = $$(".nav a");
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + en.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.parentNode.scrollTo({ left: a.offsetLeft - 12, behavior: "smooth" });
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var t = $(a.getAttribute("href")); if (t) obs.observe(t); });
  }

  // ------------------------------------------------------------ Theme
  function applyTheme(t) { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    applyTheme(next); store.set("theme", next);
  }

  // ------------------------------------------------------------ Events
  function bind() {
    document.addEventListener("click", function (ev) {
      var t = ev.target.closest("[data-action],[data-fav],[data-lang],[data-fly]");
      if (!t) return;
      if (t.hasAttribute("data-lang")) return setLang(t.getAttribute("data-lang"));
      if (t.hasAttribute("data-fly")) {
        if (!maps.overview) return;
        var k = t.getAttribute("data-fly");
        if (k === "all") maps.overview.fitBounds(maps.all, { padding: [20, 20] }); else maps.overview.fitBounds(CITY_VIEW[k]);
        return;
      }
      if (t.hasAttribute("data-fav")) {
        var id = t.getAttribute("data-fav");
        if (state.favs[id]) delete state.favs[id]; else state.favs[id] = true;
        store.set("favs", state.favs);
        $$('[data-fav="' + id + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(!!state.favs[id])); b.textContent = state.favs[id] ? "♥" : "♡"; });
        return;
      }
      switch (t.getAttribute("data-action")) {
        case "progress-arrive":
          var p = journeyState(), index = journeyIndex(), entry = T.plans[state.plan][index];
          if (!entry) break;
          p.index = index; p.arrived = true;
          if (entry.sight) { state.visited[entry.sight] = true; if (!state.sim) store.set("visited", state.visited); }
          saveJourney(); renderAll(); if (travelOpen()) renderTravel(); break;
        case "progress-next":
          var p = journeyState(); p.index = J.next(T.plans[state.plan], p, journeyIndex()); p.arrived = false;
          saveJourney(); renderAll(); if (travelOpen()) renderTravel(); break;
        case "progress-back":
          var p = journeyState(), index = journeyIndex();
          if (!p.arrived) {
            do { index--; } while (index > 0 && (!J.step(T.plans[state.plan][index]) || p.skipped.indexOf(index) >= 0));
            p.index = Math.max(0, index);
          }
          p.arrived = false; saveJourney(); renderAll(); if (travelOpen()) renderTravel(); break;
        case "progress-reset":
          var p = journeyState(); p.index = null; p.arrived = false;
          saveJourney(); renderAll(); if (travelOpen()) renderTravel(); break;
        case "delay-select":
          journeyState().delay = +t.getAttribute("data-minutes"); saveJourney(); renderDelayPanel(); if (travelOpen()) renderTravel(); break;
        case "delay-apply":
          var p = journeyState(), plan = T.plans[state.plan], index = journeyIndex();
          var d = now(), proposals = J.advice(plan, p, index, isTripDay(d) ? nowMin(d) : undefined); J.apply(plan, p, proposals, index);
          if (p.index !== index) p.arrived = false;
          saveJourney(); renderAll(); if (travelOpen()) renderTravel(); break;
        case "delay-reset":
          var p = journeyState(); p.delay = 0; p.appliedDelay = null; p.skipped = []; p.shortened = {};
          saveJourney(); renderAll(); if (travelOpen()) renderTravel(); break;
        case "travel-open": openTravel(); break;
        case "travel-close": closeTravel(); break;
        case "travel-jump": closeTravel(); break; // Link-Navigation läuft normal weiter
        case "theme": toggleTheme(); break;
        case "reset":
          if (confirm(U("resetConfirm"))) { store.clear(); location.reload(); }
          break;
        case "sim-apply":
          var v = $("#sim-time").value;
          if (v) { state.sim = new Date(v); simulatedJourneys = {}; simTick(); }
          break;
        case "sim-clear": state.sim = null; simulatedJourneys = {}; state.visited = store.get("visited", {}); renderAll(); simTick(); break;
      }
    });

    document.addEventListener("change", function (ev) {
      var cb = ev.target.closest("[data-visit]");
      if (!cb) return;
      var id = cb.getAttribute("data-visit");
      if (cb.checked) state.visited[id] = true; else delete state.visited[id];
      store.set("visited", state.visited);
      var card = document.getElementById(id);
      if (card) card.classList.toggle("is-visited", cb.checked);
    });

    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && travelOpen()) closeTravel(); });
    window.addEventListener("resize", function () { ["overview"].concat(AREA_KEYS).forEach(function (k) { if (maps[k]) maps[k].invalidateSize(); }); });
  }

  // Simulierte Zeit läuft mit – Offset zur echten Uhr merken
  var simOffset = 0;
  function simTick() {
    simOffset = state.sim ? state.sim.getTime() - Date.now() : 0;
    tick();
  }
  function tick() {
    if (simOffset) state.sim = new Date(Date.now() + simOffset);
    renderTimeline(); refreshStatuses(); renderNextStop(); renderDelayPanel(); renderReturnBar();
    if (travelOpen()) renderTravel();
  }

  // ------------------------------------------------------------ Start
  function renderAll() {
    statusItems = {};
    applyStatic();
    renderStats(); renderSources(); renderPlanSwitch(); renderTimeline(); renderNextStop(); renderDelayPanel(); renderReturnBar();
    renderSights(); renderFood(); renderConnections();
    renderWeather();
  }

  function init() {
    applyTheme(store.get("theme", null));
    $("#sim-time").value = tripDate() + "T" + (T.simTime || "12:00");
    renderAll();
    bind(); initNav(); initFab();
    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        document.documentElement.style.setProperty("--return-bar-h", $("#return-bar").offsetHeight + "px");
      }).observe($("#return-bar"));
    }
    try { initMaps(); } catch (e) { console.warn("Karte nicht verfügbar", e); }
    loadWeather();
    setInterval(tick, 30000);
    if (location.hash === "#reise") openTravel();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
