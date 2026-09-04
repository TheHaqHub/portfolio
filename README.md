# Abdul Haq — Portfolio

Premium dark-theme developer portfolio built with React + Vite, Tailwind CSS,
Framer Motion, and a hand-rolled Three.js hero scene. All project and
experience content was written from your real GitHub repositories
(inspected before writing any copy) and the details you provided — nothing
invented.

## Run locally

```bash
npm install
npm run dev
```

Open the printed localhost URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # to sanity-check the production build locally
```

The static output lands in `dist/` — deploy that folder to Vercel, Netlify,
Pantheon, Hostinger, GoDaddy, or any static host.

## What's inside

- `src/lib/data.js` — every piece of real content (profile, timeline,
  skills, projects, experience, freelance work). Edit this one file to
  update copy anywhere on the site.
- `src/components/three/HeroScene.js` — the vanilla Three.js hero scene
  (wireframe architecture object + a heartbeat-to-signal waveform line that
  morphs as you scroll). Lazy-loaded and skipped entirely on mobile or when
  `prefers-reduced-motion` is set, in favor of a static SVG of the same
  motif (`HeroVisual.jsx`).
- `src/components/sections/` — one file per section (Hero, About/Timeline,
  Skills, Experience, Projects, GitHub, Freelance, Contact).

## Things to double check / placeholders

- **GitHub contribution graph** uses the public `ghchart.rshah.org` image
  service (no fabricated numbers — it renders your real graph, or a text
  fallback link to your profile if the service is ever down).
- **sabeel-academy** is listed in the GitHub repos row only (not as a
  featured project), since the repo is currently the default
  `create-next-app` scaffold with no distinguishing content yet — feature it
  properly in `data.js` once it has real functionality.
- **About section** is now a "How I build" list of core engineering
  principles plus a random real quote on every load (`src/lib/data.js` →
  `principles` / `quotes`) — no education, university, or personal-story
  content anywhere on the site, per your latest request.
- Swap `public/favicon.svg` for a personal mark if you'd like something more
  custom than the generated orange "A" monogram.
- **Preloader**: a terminal boot-sequence animation plays once per browser
  session (tracked via `sessionStorage`, key `preloaded`) then curtain-wipes
  into the site. Clear that session-storage key (or open an incognito tab)
  to see it replay. Skipped entirely under `prefers-reduced-motion`.
- The Pantheon staging link has been removed from Contact — replaced with an
  "open to work" availability line (`profile.availability` in `data.js`).
  Update or remove that line whenever your availability changes.
- **Contact section** now has an interactive terminal on the right (try
  typing `help`, `whoami`, `skills`, `projects`, `sudo hire-me`) — edit its
  commands in `src/components/Terminal.jsx`.
- **Preloader** was redesigned: a large bold name with thick bars sliding in
  from top and bottom, then a curtain-wipe reveal. Still session-gated via
  `sessionStorage` (`preloaded` key) and skipped under reduced-motion.
- **Favicon**: browsers cache favicons very aggressively by URL, independent
  of file content. If the tab icon still looks old after `npm run build` +
  deploy, hard-refresh (Ctrl/Cmd+Shift+R) or open in a private/incognito
  window — the `?v=2` query on the favicon link in `index.html` forces a
  refetch; bump that number again next time you change the icon.

## Senior-level additions (this pass)

A few things added purely for production-readiness / professionalism, not
because you asked for a specific one:

- **Error boundary** (`src/components/ErrorBoundary.jsx`): if any component
  throws at runtime, the visitor sees a small on-brand "something broke,
  here's my email" screen instead of a blank white page.
- **3D scene fails gracefully**: if WebGL is unavailable or blocked (some
  locked-down browsers/devices do this), the hero silently falls back to the
  static SVG instead of crashing.
- **Open Graph / Twitter image** (`public/og-image.png`, 1200×630, on-brand):
  link previews on WhatsApp/LinkedIn/X/Slack now show a real branded card
  instead of nothing. Source is `scripts/og-image.svg` — edit that and
  rasterize with any SVG→PNG tool (e.g. `npx sharp-cli og-image.svg -o
  ../public/og-image.png`) any time the info changes. The PNG ships
  pre-rendered, so no extra dependency is needed just to build/deploy.
- **JSON-LD structured data** (`Person` schema in `index.html`): helps
  Google/LinkedIn understand this page is about you specifically — a real,
  low-cost SEO improvement for a personal site.
- **`theme-color` meta tags**: mobile browser chrome (the bar around the
  page) now tints to match the active theme instead of staying default gray.
- **Skip-to-content link**: invisible until focused, lets keyboard users
  jump past the nav — a real accessibility requirement, not just a nice-to-have.
- **Theme default now respects system `prefers-color-scheme`** on first
  visit (falls back to light only if the OS has no preference); any
  explicit toggle you make is still remembered after that.
- **Terminal command history**: ↑ / ↓ now recall previous commands, like a
  real shell.
- **Crash-resilient build pipeline**: `package.json` now has real metadata
  (`description`, `author`, `repository`, `engines`), a `.nvmrc` pins the
  Node version, and `.github/workflows/build.yml` runs `npm ci && npm run
  build` on every push/PR — so a broken commit gets flagged before it ever
  reaches production, not after.

## Performance notes

- 3D scene is capped to a low particle count, capped pixel ratio, paused via
  `visibilitychange` when the tab isn't active, and fully disposed on
  unmount.
- Everything respects `prefers-reduced-motion`.
- No layout-shifting webfont swap issues: fonts are preconnected and loaded
  with `display=swap`.
