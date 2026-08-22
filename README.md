# नेपाली पात्रो — Nepali Bikram Sambat Calendar

A full Nepali (Bikram Sambat) calendar: accurate BS↔AD date conversion,
festivals and public holidays, auspicious wedding (Shubha Sait) dates,
daily tithi, Purnima/Amavasya markers, and a live Kathmandu clock — with
the matching Gregorian date shown as a subscript under every day.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with `npm run preview`.

## Deploying to GitHub Pages

**Option A — automatic (recommended).** A workflow at
`.github/workflows/deploy.yml` is already included. After pushing this
repo to GitHub:

1. Go to your repo's **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

The site will build and deploy automatically on every push.

**Option B — manual, via the `gh-pages` package.**

```bash
npm install
npm run deploy
```

This builds the app and pushes `dist/` to a `gh-pages` branch. Then in
**Settings → Pages**, set **Source** to **Deploy from a branch** and
select the `gh-pages` branch.

## Project structure

```
src/
  data/            BS month-length table, festival & sait date data
  utils/           BS<->AD conversion, tithi/moon-phase math, Kathmandu time
  components/      UI pieces (clock, calendar grid, festival lists, converter)
  App.jsx          Top-level layout and state
```

## Data notes

- BS↔AD conversion is computed from Nepal's official month-length table
  (BS 2000–2099 / AD 1943–2043), so it stays accurate across that whole
  range without needing any external service.
- Festival and public-holiday dates for BS 2082–2083 are sourced from the
  Government of Nepal's Ministry of Home Affairs holiday gazette,
  cross-checked day-by-day against the published Nepal Panchang Nirnayak
  Samiti tithi calendar. Years outside that range only show fixed-BS-date
  civic holidays, since movable lunar festivals aren't published that far
  ahead.
- Shubha Sait (auspicious wedding) dates are from the Nepal Panchang
  Nirnayak Samiti listing for BS 2083 only.
- Daily tithi and Purnima/Amavasya markers are computed live from the mean
  synodic lunar month — accurate to within about a day of the traditional
  panchang, not authoritative for exact ritual timing.
- All of this data lives in plain JS modules under `src/data/`, so
  updating it for future years is a matter of editing those files — no
  build-system changes needed.

## License

Use and modify freely for your own deployment.
