# Roadmap / Backlog

Improvement ideas and new features for [le-martin.github.io](https://le-martin.github.io),
grouped by priority. (GitHub Issues are disabled on this repo, so this file is the backlog.)

## 🔴 High impact — the site has no front door

- [ ] **Build a real landing page / hub at `/`.** `index.md` is just three lines
  (`layout: none` + "Martin Le"); nothing links to the sub-apps. Turn `/` into a hub
  with a short intro and a card grid linking to `/phd/`, `/restaurant/`,
  `/learn-german/`, `/stock-correlation/`, `/dresden/`, and `/talkmap/map.html`.
- [ ] **Restore header navigation.** Every link in `_data/navigation.yml` is commented
  out, so the `/phd/…` academic pages (About, CV, Publications, Talks) are reachable
  only by direct URL. Uncomment the ones worth keeping and delete the rest.
- [ ] **Relocate the About page off `/phd/`.** The main profile page currently lives at
  `/phd/` — an odd public URL for a personal site. Consider making About the site root
  (or `/about/`) and demoting the template demo pages.

## 🟠 SEO & discoverability

- [ ] **Add `jekyll-seo-tag`.** The plugin list has `jekyll-feed`/`sitemap`/`redirect-from`
  but not `jekyll-seo-tag`, so there are no per-page `<title>`/OpenGraph/Twitter card
  tags. Easy win for search and link sharing.
- [ ] **Configure Search Console verification & analytics.** `google_site_verification`
  is blank and `analytics.provider` is `"false"` in `_config.yml`. Fill these in if you
  want Search Console + traffic data (a privacy-friendly GA4 slot already exists).
- [ ] **Prune academicpages template/demo pages** (`markdown.md`, `non-menu-page.md`,
  `archive-layout-with-content.html`, `page-archive.html`) — they clutter the sitemap
  with boilerplate.

## 🟡 Performance

- [ ] **Optimize the Dresden images.** They're the heaviest assets in the repo — several
  ~1 MB PNGs (`fuerstenzug.png`, `semperoper.png`, `german.png`, `albertinum.png`,
  `gewoelbe.png`). Convert to WebP (the restaurant page already uses `.webp`) to cut
  hundreds of KB. `assets/` is ~20 MB total.
- [ ] **Add `width`/`height` + `loading="lazy"`** to the Dresden images to prevent layout
  shift (the restaurant page already does this).

## 🟢 Dev tooling / CI

- [ ] **Add an HTML/link-check CI job** (e.g. `html-proofer`) to `jekyll.yml` to catch
  broken internal links and missing images on every push. There is currently no
  test/lint step.
- [ ] **Add a SessionStart hook** so Claude Code web sessions can `bundle install` + build
  automatically (there is a dedicated skill for this).
- [ ] **Enable "Automatically delete head branches"** in repo settings so merged branches
  are cleaned up automatically.

## 💡 Per-app feature ideas

### restaurant/ (Sura)
- [ ] Real reservation form (currently phone-only).
- [ ] Menu highlights / photo gallery section.
- [ ] JSON-LD `Restaurant` structured data for Google rich results.
- [ ] OpenGraph share image.

### learn-german/
- [ ] Progress persistence and a streak counter.
- [ ] Shareable results card.

### stock-correlation/
- [ ] Shareable permalinks that encode the selected tickers.
- [ ] A small list of preset ticker groups.

### dresden/
- [ ] Lightbox gallery for the (many) photos.
- [ ] Tie Leaflet markers to the itinerary/points of interest.
