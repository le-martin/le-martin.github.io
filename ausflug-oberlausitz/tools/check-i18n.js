#!/usr/bin/env node
/* Prüft, ob alle Texte aus data.js / i18n.js für EN und KO übersetzt sind.
 * Aufruf: node tools/check-i18n.js   (Exit-Code 1 bei Lücken) */
"use strict";
var fs = require("fs"), path = require("path"), vm = require("vm");
var dir = path.join(__dirname, "..", "js");
var win = {};
["data.js", "i18n.js"].forEach(function (f) { vm.runInNewContext(fs.readFileSync(path.join(dir, f), "utf8"), { window: win }); });
var T = win.TRIP, I = win.I18N, problems = [];

// Kurztexte, die über P() laufen
var phrases = new Set();
Object.values(T.plans).forEach(function (p) { p.forEach(function (e) { [e.title, e.sub, e.city].forEach(function (s) { if (s) phrases.add(s); }); }); });
Object.values(T.connections).forEach(function (c) {
  [c.title, c.note].concat(c.alts || []).forEach(function (s) { if (s) phrases.add(s); });
  var legs = (c.legs || []).slice();
  (c.options || []).forEach(function (o) { phrases.add(o.label); phrases.add(o.info); legs = legs.concat(o.legs); });
  legs.forEach(function (l) { [l.text, l.buffer, l.fromPl, l.toPl].forEach(function (s) { if (s) phrases.add(s); }); });
});
T.sources.forEach(function (s) { phrases.add(s.label); });
T.restaurants.forEach(function (r) { phrases.add(r.priority); });

// Felder, die über C() laufen
var FIELDS = {
  sight: ["name", "text", "why", "duration", "hoursNote", "extra", "planB", "reason", "swapHint", "hoursLabel"],
  food: ["cuisine", "when", "text", "why", "pros", "hoursNote", "price", "rating", "note"],
  cafe: ["text", "hoursNote", "special", "price", "distance"]
};

["en", "ko"].forEach(function (lang) {
  var dict = I.phrases[lang] || {}, rules = I.rules[lang] || [], keep = I.keep[lang] || [];
  phrases.forEach(function (s) {
    if (dict[s] != null || keep.indexOf(s) >= 0) return;
    if (rules.some(function (r) { return r[0].test(s); })) return;
    problems.push(lang + " phrase: " + JSON.stringify(s));
  });
  var content = I.content[lang] || {};
  function check(list, fields) {
    list.forEach(function (o) {
      var c = content[o.id] || {};
      fields.forEach(function (f) { if (o[f] != null && c[f] == null) problems.push(lang + " " + o.id + "." + f); });
      if (o.walkFrom && o.walkFrom.key && c.walkLabel == null) problems.push(lang + " " + o.id + ".walkLabel");
      if (o.walkFrom && !o.walkFrom.key && c.walkText == null) problems.push(lang + " " + o.id + ".walkText");
    });
  }
  check(T.sights.concat(T.optionalSights), FIELDS.sight);
  check(T.restaurants, FIELDS.food);
  check(T.cafes, FIELDS.cafe);
  Object.keys(I.ui.de).forEach(function (k) { if (I.ui[lang][k] === undefined) problems.push(lang + " ui." + k); });
});

if (problems.length) { console.log(problems.length + " fehlende Übersetzung(en):\n  " + problems.join("\n  ")); process.exit(1); }
console.log("Alle Übersetzungen vollständig (EN, KO).");
