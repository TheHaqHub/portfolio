# Abdul Haq — Portfolio

Personal developer portfolio. Built with React, Vite, Tailwind CSS,
Framer Motion, and Three.js.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Three.js (hero background, desktop only)

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

Static output goes to `dist/` — deploy that to Vercel, Netlify, or any
static host.

## Project structure

```
src/
  components/       shared components (nav, cursor, terminal, etc.)
  components/sections/   one file per page section
  components/three/      hero visual (3D on desktop, code widget on mobile)
  hooks/            small reusable hooks
  lib/data.js       all site content — projects, experience, skills, etc.
```

Most content edits just need `src/lib/data.js`.

## Deployment

Connected to Vercel via GitHub — pushing to `main` triggers an automatic
deploy.
