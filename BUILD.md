# BUILD.md — REAL TEAM Digital Website Build System
Created: 2026-04-17
Last updated: 2026-04-17

## Overview

This site uses **Eleventy 3.x** as a static site generator.
Input: `src/` | Output: `_site/` | GitHub Pages serves `_site/`.

## Commands

```bash
npm run build    # One-shot build to _site/
npm run serve    # Dev server at http://localhost:8080 (live reload)
npm run clean    # Delete _site/
```

## Directory Structure

```
src/
  _includes/
    layouts/
      base.njk          — HTML shell (head, nav, footer, scripts)
    partials/
      nav.njk           — Navigation (desktop + mobile drawer)
      footer.njk        — Footer / contact block
      made-in-germany.njk — Trust badge (reusable)
  _archive/
    index-original.html — V1 reference (do not delete until M3+)
  css/
    style.css           — All styles (canonical copy lives here, not root css/)
  js/
    main.js             — All client-side JS
  CNAME                 — GitHub Pages custom domain
  index.njk             — Homepage

_site/                  — Build output (committed for now — see Deploy section)
eleventy.config.js      — Eleventy configuration
package.json            — npm scripts and devDependencies
```

## Deploy Decision: GitHub Actions (NOT committing _site/)

**Choice:** GitHub Actions workflow at `.github/workflows/build-pages.yml`.

**Why not commit _site/:**
- `_site/` is a build artifact. Committing it means every content change
  produces two commits (source + compiled output). That's noise.
- GitHub Actions runs `npm ci && npm run build` on every push to `main`
  and deploys the output automatically. Zero manual steps.
- The repo stays clean. New contributors see source, not compiled HTML.

**One-time GitHub setup required:**
1. Repo Settings → Pages → Source: **GitHub Actions** (not "Deploy from a branch")
2. Push to `main` — the workflow triggers automatically.

**For local preview before pushing:**
```bash
npm run serve
# Open http://localhost:8080
```

## GitHub Pages + CNAME

`src/CNAME` contains `realteamdigital.sk`. Eleventy copies it to `_site/CNAME`
via passthrough copy. GitHub Pages reads `_site/CNAME` to configure the custom domain.

## M1 → M2 Transition Notes

- The nav already reflects the full IA (Home, GroupFlow, Gyms, Creators, Communities, Blog, About).
  All links except `/` will 404 until those pages are built in M2–M5.
- To add a new page: create `src/pagename/index.njk`, set `layout: base.njk` in front matter,
  set `activeNav: pagename` for the correct nav highlight.
- CSS changes: edit `src/css/style.css` (NOT `css/style.css` in root — that's the V1 file).
- JS changes: edit `src/js/main.js`.

## V1 Compatibility

The original `index.html` remains at the repo root (V1 reference) and also archived at
`src/_archive/index-original.html`. Do not delete either until M3 is confirmed stable.
