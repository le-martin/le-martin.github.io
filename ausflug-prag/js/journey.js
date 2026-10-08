/* Progress and delay advice. Published timetable entries remain immutable. */
(function (root) {
  "use strict";
  function fresh(date) { return { date: date, index: null, arrived: false, delay: 0, appliedDelay: null, skipped: [], shortened: {} }; }
  function step(e) { return ["meet", "train", "metro", "tram", "sight", "food"].indexOf(e.kind) >= 0 || (e.kind === "walk" && e.ref === "#c-rueck" && e.place); }
  function minutes(t) { var a = t.split(":"); return +a[0] * 60 + +a[1]; }
  function automatic(plan, p, m, before, after) {
    if (after) return plan.length;
    var indexes = plan.map(function (e, i) { return i; }).filter(function (i) { return step(plan[i]) && p.skipped.indexOf(i) < 0; });
    if (before) return indexes[0];
    return indexes.filter(function (i) { return minutes(plan[i].e) > m; })[0] ?? plan.length;
  }
  function next(plan, p, index) {
    for (var i = index + 1; i < plan.length; i++) if (step(plan[i]) && p.skipped.indexOf(i) < 0) return i;
    return plan.length;
  }
  function advice(plan, p, index, actualMinute) {
    var result = [], delay = p.delay;
    if (!delay || p.appliedDelay === delay) return result;
    var start = index + (p.arrived ? 1 : 0);
    function remaining(ref) { return plan.findIndex(function (e, i) { return i >= start && (e.ref === ref || (ref === "#pr-burg" && e.ref === "#pr-veitsdom")) && step(e) && p.skipped.indexOf(i) < 0; }); }
    function skip(i) { if (i >= 0) result.push({ type: "skip", index: i }); }
    function shorten(i) {
      if (i < 0) return;
      var duration = minutes(plan[i].e) - minutes(plan[i].s);
      var target = Math.max(15, duration - delay);
      if (duration > target && (!p.shortened[i] || p.shortened[i] > target)) result.push({ type: "shorten", index: i, duration: target });
    }
    var castle = remaining("#pr-burg"), library = remaining("#pr-strahov");
    if (delay >= 60 || actualMinute >= 16 * 60 + 15) skip(library);
    else if (library >= 0 && minutes(plan[library].s) + delay >= 16 * 60 + 15) skip(library);
    if (delay >= 30 || actualMinute >= 17 * 60) skip(castle); else shorten(castle);
    if (!result.length) {
      var snack = remaining("#malatang");
      if (snack >= 0) {
        var duration = minutes(plan[snack].e) - minutes(plan[snack].s);
        if (duration > 20 && (!p.shortened[snack] || p.shortened[snack] > 20)) result.push({ type: "shorten", index: snack, duration: 20 });
      }
    }
    return result;
  }
  function apply(plan, p, proposals, index) {
    proposals.forEach(function (a) {
      if (a.type === "skip" && p.skipped.indexOf(a.index) < 0) p.skipped.push(a.index);
      if (a.type === "shorten") p.shortened[a.index] = a.duration;
    });
    var librarySkipped = p.skipped.some(function (i) { return plan[i].ref === "#pr-strahov"; });
    var castleSkipped = p.skipped.some(function (i) { return (plan[i].ref === "#pr-burg" || plan[i].ref === "#pr-veitsdom"); });
    if (castleSkipped && !librarySkipped) {
      var castle = plan.findIndex(function (e) { return e.kind === "sight" && (e.ref === "#pr-burg" || e.ref === "#pr-veitsdom"); });
      // Replace the castle approach/descent with the direct journey from Strahov.
      [castle - 1, castle + 1].forEach(function (i) {
        if (i >= index && plan[i] && plan[i].kind === "walk" && p.skipped.indexOf(i) < 0) p.skipped.push(i);
      });
    }
    if (librarySkipped && castleSkipped) {
      // Remove the western detour, including its access/return transport.
      var from = plan.findIndex(function (e) { return e.ref === "#pr-orloj"; });
      var to = plan.findIndex(function (e) { return e.ref === "#malatang" && e.kind === "food"; });
      for (var i = Math.max(index, from + 1); i < to; i++) if (p.skipped.indexOf(i) < 0) p.skipped.push(i);
    }
    p.index = p.skipped.indexOf(index) >= 0 ? next(plan, p, index) : index;
    p.appliedDelay = p.delay;
  }
  var api = { fresh: fresh, step: step, automatic: automatic, next: next, advice: advice, apply: apply };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.JOURNEY = api;
})(typeof window === "undefined" ? {} : window);
