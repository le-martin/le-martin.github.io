const PROXY = "https://corsproxy.io/?";
const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart/";

const plotLayout = {
  paper_bgcolor: "#161b22",
  plot_bgcolor: "#161b22",
  font: { color: "#e1e4e8", size: 12 },
  margin: { t: 40, r: 30, b: 50, l: 60 },
  xaxis: { gridcolor: "#30363d", zerolinecolor: "#30363d", type: "date" },
  yaxis: { gridcolor: "#30363d", zerolinecolor: "#30363d" },
};

const plotConfig = { responsive: true, displayModeBar: false };

let returnsData = null;
let tickers = [];

// --- Data fetching ---

async function fetchTicker(ticker, period) {
  const url = `${PROXY}${encodeURIComponent(
    `${YAHOO_BASE}${encodeURIComponent(ticker)}?range=${period}&interval=1d`
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${ticker}`);
  const json = await res.json();
  const result = json.chart.result?.[0];
  if (!result) throw new Error(`No data for ${ticker}`);

  const timestamps = result.timestamp.map((t) => new Date(t * 1000));
  const closes = result.indicators.quote[0].close;
  return { ticker, timestamps, closes };
}

function computeReturns(seriesMap) {
  const allTickers = Object.keys(seriesMap);

  const byDate = {};
  for (const t of allTickers) {
    const { timestamps, closes } = seriesMap[t];
    for (let i = 1; i < timestamps.length; i++) {
      const prev = closes[i - 1];
      const cur = closes[i];
      if (prev == null || cur == null || prev === 0) continue;
      const dateKey = timestamps[i].toISOString().slice(0, 10);
      if (!byDate[dateKey]) byDate[dateKey] = {};
      byDate[dateKey][t] = (cur - prev) / prev;
    }
  }

  const sortedDates = Object.keys(byDate).sort();
  const validDates = sortedDates.filter((d) =>
    allTickers.every((t) => byDate[d][t] != null && isFinite(byDate[d][t]))
  );

  const clean = { dates: validDates };
  for (const t of allTickers) {
    clean[t] = validDates.map((d) => byDate[d][t]);
  }
  return clean;
}

// --- Math helpers ---

function corr(a, b) {
  const n = a.length;
  if (n === 0) return NaN;
  let sumA = 0, sumB = 0, sumAB = 0, sumA2 = 0, sumB2 = 0;
  for (let i = 0; i < n; i++) {
    sumA += a[i]; sumB += b[i];
    sumAB += a[i] * b[i];
    sumA2 += a[i] * a[i]; sumB2 += b[i] * b[i];
  }
  const num = n * sumAB - sumA * sumB;
  const den = Math.sqrt((n * sumA2 - sumA * sumA) * (n * sumB2 - sumB * sumB));
  return den === 0 ? 0 : num / den;
}

function rollingCorr(a, b, window) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    if (i < window - 1) { result.push(null); continue; }
    result.push(corr(a.slice(i - window + 1, i + 1), b.slice(i - window + 1, i + 1)));
  }
  return result;
}

function laggedCorr(a, b, lag) {
  if (lag > 0) return corr(a.slice(lag), b.slice(0, -lag));
  if (lag < 0) return corr(a.slice(0, lag), b.slice(-lag));
  return corr(a, b);
}

// --- Chart renderers ---

function renderHeatmap() {
  const n = tickers.length;
  const matrix = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(corr(returnsData[tickers[i]], returnsData[tickers[j]]));
    }
    matrix.push(row);
  }

  const annotations = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      annotations.push({
        x: tickers[j], y: tickers[i],
        text: matrix[i][j].toFixed(2),
        showarrow: false,
        font: { color: Math.abs(matrix[i][j]) > 0.5 ? "#fff" : "#e1e4e8", size: 14 },
      });
    }
  }

  Plotly.newPlot("heatmap-chart", [{
    z: matrix, x: tickers, y: tickers,
    type: "heatmap", colorscale: "RdYlGn", zmin: -1, zmax: 1,
    showscale: true,
  }], {
    ...plotLayout,
    title: "Daily Return Correlations",
    annotations,
    yaxis: { ...plotLayout.yaxis, autorange: "reversed" },
  }, plotConfig);
}

function renderRolling() {
  const traces = [];
  for (let i = 0; i < tickers.length; i++) {
    for (let j = i + 1; j < tickers.length; j++) {
      const a = tickers[i], b = tickers[j];
      for (const w of [30, 60]) {
        const rc = rollingCorr(returnsData[a], returnsData[b], w);
        traces.push({
          x: returnsData.dates, y: rc,
          name: `${a} vs ${b} (${w}d)`,
          type: "scatter", mode: "lines",
          line: { width: w === 30 ? 1.5 : 2 },
        });
      }
    }
  }

  Plotly.newPlot("rolling-chart", traces, {
    ...plotLayout,
    title: "Rolling Correlation (30d & 60d)",
    yaxis: { ...plotLayout.yaxis, range: [-1, 1], title: "Correlation" },
    shapes: [{ type: "line", x0: 0, x1: 1, xref: "paper", y0: 0, y1: 0, line: { color: "#555", dash: "dash" } }],
  }, plotConfig);
}

function renderLag() {
  if (tickers.length !== 2) {
    document.getElementById("lag-result").textContent = "Lag analysis requires exactly 2 tickers.";
    return;
  }

  const maxLag = parseInt(document.getElementById("lag-max").value) || 20;
  const [a, b] = tickers;
  const lags = [], corrs = [], colors = [];

  let bestLag = 0, bestCorr = 0;
  for (let lag = -maxLag; lag <= maxLag; lag++) {
    const c = laggedCorr(returnsData[a], returnsData[b], lag);
    lags.push(lag);
    corrs.push(c);
    colors.push(c < 0 ? "#d32f2f" : "#388e3c");
    if (Math.abs(c) > Math.abs(bestCorr)) { bestLag = lag; bestCorr = c; }
  }

  let desc = `Best lag: ${bestLag} days (correlation: ${bestCorr.toFixed(4)}) — `;
  if (bestLag > 0) desc += `${a} leads ${b} by ${bestLag} day(s)`;
  else if (bestLag < 0) desc += `${b} leads ${a} by ${-bestLag} day(s)`;
  else desc += "no delay, strongest at lag 0";
  document.getElementById("lag-result").textContent = desc;

  Plotly.newPlot("lag-chart", [{
    x: lags, y: corrs, type: "bar",
    marker: { color: colors },
  }], {
    ...plotLayout,
    title: `Cross-Correlation: ${a} vs ${b}`,
    xaxis: { gridcolor: "#30363d", zerolinecolor: "#30363d", title: `Lag (days) — negative = ${b} leads, positive = ${a} leads`, type: "linear", dtick: maxLag <= 30 ? 1 : 5 },
    yaxis: { ...plotLayout.yaxis, title: "Correlation", type: "linear" },
    shapes: [
      { type: "line", x0: 0, x1: 1, xref: "paper", y0: 0, y1: 0, line: { color: "#555", dash: "dash" } },
      { type: "line", x0: bestLag, x1: bestLag, y0: 0, y1: 1, yref: "paper", line: { color: "#f0c040", width: 2, dash: "dash" } },
    ],
  }, plotConfig);
}

function renderOverlay(lag = 0) {
  if (tickers.length !== 2) return;
  const [a, b] = tickers;
  document.getElementById("shift-ticker").textContent = b;
  document.getElementById("shift-value").textContent = lag;

  const ra = returnsData[a];
  const rb = returnsData[b];

  const rc30 = rollingCorr(ra, lag > 0 ? rb.slice(0, -lag || undefined).concat(Array(Math.max(0, lag)).fill(null)) : Array(Math.max(0, -lag)).fill(null).concat(rb.slice(0, rb.length + lag || undefined)), 30);
  const rc60 = rollingCorr(ra, lag > 0 ? rb.slice(0, -lag || undefined).concat(Array(Math.max(0, lag)).fill(null)) : Array(Math.max(0, -lag)).fill(null).concat(rb.slice(0, rb.length + lag || undefined)), 60);

  // Simpler approach: shift and compute
  const shifted = new Array(ra.length).fill(null);
  for (let i = 0; i < ra.length; i++) {
    const srcIdx = i - lag;
    if (srcIdx >= 0 && srcIdx < rb.length) shifted[i] = rb[srcIdx];
  }

  const r30 = rollingCorr(ra, shifted, 30);
  const r60 = rollingCorr(ra, shifted, 60);

  const valid30 = r30.filter((v) => v != null);
  const valid60 = r60.filter((v) => v != null);
  const avg30 = valid30.length ? (valid30.reduce((s, v) => s + v, 0) / valid30.length) : NaN;
  const avg60 = valid60.length ? (valid60.reduce((s, v) => s + v, 0) / valid60.length) : NaN;

  document.getElementById("overlay-corr").textContent =
    `30d avg: ${avg30.toFixed(3)} | 60d avg: ${avg60.toFixed(3)}`;

  Plotly.newPlot("overlay-chart", [
    { x: returnsData.dates, y: r30, name: "30d rolling", type: "scatter", mode: "lines", line: { color: "#58a6ff", width: 1.5 } },
    { x: returnsData.dates, y: r60, name: "60d rolling", type: "scatter", mode: "lines", line: { color: "#d62728", width: 2 } },
  ], {
    ...plotLayout,
    title: `${a} vs ${b} — shift ${b} by ${lag} days`,
    yaxis: { ...plotLayout.yaxis, range: [-1, 1], title: "Rolling Correlation" },
    shapes: [{ type: "line", x0: 0, x1: 1, xref: "paper", y0: 0, y1: 0, line: { color: "#555", dash: "dash" } }],
  }, plotConfig);
}

// --- Event wiring ---

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

document.getElementById("shift-slider").addEventListener("input", (e) => {
  if (returnsData) renderOverlay(parseInt(e.target.value));
});

document.getElementById("lag-max").addEventListener("change", () => {
  if (returnsData) renderLag();
});

document.getElementById("fetch-btn").addEventListener("click", analyze);
document.getElementById("tickers").addEventListener("keydown", (e) => {
  if (e.key === "Enter") analyze();
});

async function analyze() {
  const btn = document.getElementById("fetch-btn");
  const status = document.getElementById("status");

  tickers = document.getElementById("tickers").value
    .split(",")
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);

  if (tickers.length < 2) { status.textContent = "Enter at least 2 tickers."; return; }

  const period = document.getElementById("period").value;
  btn.disabled = true;
  status.textContent = "Fetching data...";

  try {
    const results = await Promise.all(tickers.map((t) => fetchTicker(t, period)));
    const seriesMap = {};
    results.forEach((r) => (seriesMap[r.ticker] = r));
    returnsData = computeReturns(seriesMap);
    status.textContent = `Loaded ${returnsData.dates.length} trading days.`;

    renderHeatmap();
    renderRolling();
    renderLag();
    document.getElementById("shift-slider").value = 0;
    renderOverlay(0);
  } catch (err) {
    status.textContent = `Error: ${err.message}`;
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}
