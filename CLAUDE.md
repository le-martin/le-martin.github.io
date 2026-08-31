# CLAUDE.md

## Project Overview

Personal academic website for Martin Le (Ph.D. Candidate @ TU Braunschweig), hosted on GitHub Pages at https://le-martin.github.io. Built on the [academicpages](https://github.com/academicpages/academicpages.github.io) Jekyll theme (a fork of Minimal Mistakes).

## Tech Stack

- **Static site generator**: Jekyll (Ruby-based), deployed via GitHub Pages
- **Theme**: academicpages (based on Minimal Mistakes)
- **CSS**: Sass/SCSS (`_sass/` directory), compiled with Jekyll
- **JS**: jQuery + plugins, bundled via uglify-js (`npm run build:js`)
- **CI/CD**: GitHub Actions (`.github/workflows/jekyll.yml`) — builds and deploys on push to `master`

## Repository Structure

```
_config.yml          # Main Jekyll configuration (site settings, author info, plugins)
_config_docker.yml   # Docker override (port binding)
_data/               # YAML/JSON data files (navigation, authors, CV)
_includes/           # Reusable HTML partials (header, footer, sidebar, etc.)
_layouts/            # Page layout templates (default, single, archive, talk, cv)
_pages/              # Static pages (about, cv, publications, talks, etc.)
_plugins/            # Custom Jekyll plugins (Ruby 3 compatibility)
_posts/              # Blog posts (date-prefixed markdown)
_publications/       # Publication entries (markdown with YAML front matter)
_sass/               # Sass stylesheets
_talks/              # Talk/presentation entries
assets/              # Static assets (JS, CSS, images, fonts)
files/               # Downloadable files (PDFs, etc.)
images/              # Site images (profile photo, etc.)
scripts/             # Utility scripts (CV markdown-to-JSON converter)
markdown_generator/  # Helper scripts for generating markdown files
stock-correlation/   # Stock & ETF correlation checker (standalone HTML/CSS/JS)
restaurant/          # Sura Korean restaurant site (standalone HTML/CSS/JS, own permalinks)
talkmap/             # Leaflet.js map of talk locations
learn-german.disabled/   # Disabled Expo React Native web app (pre-built SPA)
talkmap.ipynb/.py    # Talk location scraping (Jupyter/Python)
markdown_generator/  # Jupyter notebooks for TSV → markdown conversion (talks, publications)
bin/                 # Bundler binstubs
```

## Key Configuration

- **`_config.yml`**: Central config — site metadata, author info, collection defaults, plugin list, permalink structure (`/phd/:categories/:title/`)
- **`_data/navigation.yml`**: Header navigation links (most are currently commented out)
- **Collections**: Posts, publications, talks, teaching (some collections are commented out in `_config.yml`)
- **Plugins**: jekyll-feed, jekyll-sitemap, jekyll-redirect-from, jemoji

## Development

### Local Setup (Docker — recommended)

```bash
docker-compose up
# Site available at http://localhost:4000
```

### Local Setup (Native Ruby)

```bash
bundle install
bundle exec jekyll serve -l -H localhost
# Site available at http://localhost:4000
```

### JavaScript Build

```bash
npm install
npm run build:js   # Minifies JS into assets/js/main.min.js
```

### Important Notes

- Changes to `_config.yml` require restarting the Jekyll server
- The `404.md` at root serves as the SPA routing fallback for GitHub Pages

## Content Conventions

### Adding Blog Posts

Create files in `_posts/` with format: `YYYY-MM-DD-title.md`  
Required front matter: `layout`, `title`, `date`, `permalink`, `tags`

### Adding Publications

Create files in `_publications/` with YAML front matter including: `title`, `collection`, `category` (books/manuscripts/conferences), `permalink`, `date`, `venue`, `citation`

### Adding Talks

Create files in `_talks/` with front matter: `title`, `type`, `permalink`, `venue`, `date`, `location`

### Pages

Static pages live in `_pages/` — disable a page by appending `.disabled` to the filename.

## CI/CD Pipeline

### Deploy (`jekyll.yml`)
Triggers on push to `master`:
1. Sets up Ruby 3.1 with bundler cache
2. Builds Jekyll site (`bundle exec jekyll build`)
3. Deploys to GitHub Pages

### Scrape Talks (`scrape_talks.yml`)
Triggers on changes to `talks/**` or `talkmap.ipynb`:
1. Runs Python 3.9 with geopy, getorg, beautifulsoup4
2. Executes `talkmap.ipynb` to geocode talk locations
3. Auto-commits updated location data

## Conventions for AI Assistants

- **Default branch**: `master` (not `main`)
- **Commit style**: Use conventional commit prefixes — `feat:`, `fix:`, `chore:`, `docs:` — followed by a concise description. Include scope in parentheses when relevant, e.g., `fix(learn-german): ...`
- **Disabled features**: Append `.disabled` to filenames in `_pages/` or rename directories with a `.disabled` suffix (e.g., `some-page.md.disabled`). Currently `learn-german.disabled/` is disabled
- **No tests**: There is no test suite for the Jekyll site
- **No linter/formatter**: No configured linting or formatting tools
- **Sensitive data**: Do not commit personal email, API keys, or tracking IDs. These fields are intentionally left blank in `_config.yml`
- **learn-german app**: Treat as a pre-built artifact (currently disabled as `learn-german.disabled/`). Do not modify generated files in its `_expo/` directory; source changes are made externally. To re-enable, rename back to `learn-german/` and restore its build wiring (the `_expo` copy step in `jekyll.yml`, the `_config.yml` include, and the `/learn-german` SPA redirect in `404.md`)
- **Git ignores**: `.claude/`, `node_modules/`, `_site/`, `Gemfile.lock`, `.sass-cache/` are all gitignored
- **Auxiliary projects**: `restaurant/`, `stock-correlation/`, and `talkmap/` are standalone sub-apps with their own HTML/CSS/JS — they are not processed by Jekyll's templating engine. `restaurant/` declares explicit permalinks (`/restaurant/`, `/restaurant/datenschutz/`, `/restaurant/impressum/`) in its `.md` front matter
- **Ruby 3 compatibility**: `_plugins/ruby_3_compatibility.rb` provides shims for Jekyll on Ruby 3.x
