#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), vm = require("node:vm"), path = require("node:path");
const J = require("../js/journey.js"), window = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../js/data.js"), "utf8"), { window });
for (const [key, plan] of Object.entries(window.TRIP.plans)) {
  const snapshot = JSON.stringify(plan), p = J.fresh(window.TRIP.date);
  assert.equal(J.automatic(plan, p, 0, true, false), 0);
  assert.equal(J.automatic(plan, p, 1440, false, true), plan.length);
  const book = plan.findIndex(e => e.ref === "#pr-antik" && e.kind === "sight");
  p.index = book; p.arrived = true; p.delay = 60;
  const advice = J.advice(plan, p, book);
  assert.equal(advice.filter(a => a.type === "skip").length, 2, key);
  assert(!advice.some(a => a.index === book), "Confirmed stop must be preserved");
  J.apply(plan, p, advice, book);
  assert.equal(p.index, book);
  assert.equal(J.advice(plan, p, book).length, 0, "Do not keep cutting meals after accepting the same delay advice");
  for (const i of p.skipped) assert(!["train", "food"].includes(plan[i].kind), "Food and trains must remain");
  const beforeWest = plan.findIndex(e => e.ref === "#pr-orloj");
  const next = J.next(plan, p, beforeWest);
  assert.equal(plan[next].ref, "#malatang", "Skip the complete western detour, not just the library card");
  const dinner = plan.findIndex(e => e.ref === "#houdku" && e.kind === "food");
  assert.equal(plan[J.next(plan, p, dinner)].place, "pr_hln", "Dinner must lead to the station before the return train");
  assert.equal(JSON.stringify(plan), snapshot, "Original published times must not change");
  const late = J.fresh(window.TRIP.date); late.delay = 15;
  assert(J.advice(plan, late, book, 16 * 60 + 20).some(a => a.type === "skip" && plan[a.index].ref === "#pr-strahov"), "Respect the library ticket-desk cutoff even when manual progress is behind");
  const medium = J.fresh(window.TRIP.date); medium.delay = 30;
  J.apply(plan, medium, J.advice(plan, medium, book), book);
  assert(medium.skipped.some(i => plan[i].kind === "walk" && plan[i].ref === "#pr-burg"), "Remove the castle approach when skipping only the castle");
  const small = J.fresh(window.TRIP.date); small.delay = 15;
  assert(J.advice(plan, small, book).some(a => a.type === "shorten" && a.duration >= 15));
  const castle = plan.findIndex(e => ["#pr-burg", "#pr-veitsdom"].includes(e.ref) && e.kind === "sight");
  small.index = castle; small.arrived = true; small.delay = 60;
  assert(!J.advice(plan, small, castle).some(a => a.index <= castle), "No advice to skip completed/current confirmed visits");
  small.index = plan.length;
  assert.equal(J.advice(plan, small, plan.length).length, 0);
}
console.log("Progress, delay cuts, protected priorities and fixed timetables verified for both plans.");
