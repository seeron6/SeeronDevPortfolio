# Seeron Sivashankar — Portfolio

Live at **[seeronsivashankar.com](https://www.seeronsivashankar.com)**.

A parchment-scroll portfolio: hero + every chapter on a single scroll, click any
chapter title to zoom in. Built with Vite + React + TypeScript + Tailwind v4.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Deploy

The site is published to GitHub Pages from the `gh-pages` branch using the
`gh-pages` npm package. To redeploy:

```bash
npm run deploy
```

This builds the project (`vite build`) and pushes the `dist/` directory to the
`gh-pages` branch. The custom domain (`seeronsivashankar.com`) is configured via
the `CNAME` file in `public/`.
