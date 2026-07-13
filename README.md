# Seeron Sivashankar — Portfolio

A dark, minimal, image-forward portfolio. The homepage is a **Journal** (blog)
you update from a password-locked admin panel; plus Projects, Experience, About,
and Contact.

**Stack:** Vite + React + TypeScript + Tailwind v4 (frontend) · Vercel
serverless functions (`/api`) · **Neon** Postgres (posts) · **Vercel Blob**
(images) · cookie-based admin auth.

```
src/
  pages/        Home (journal), JournalPost, Projects, Experience, About, Contact, Admin
  components/   Layout (nav + footer), JournalCard, Reveal, ScrollToTop
  data/         seedPosts, projects, experience   ← static content + seed fallback
  lib/          posts (API client), auth (login), uploadImage (compress+upload), format
api/            Vercel serverless functions:
  posts/        GET list (public) · POST create · PUT/DELETE by id (auth)
  login, logout, me, upload
  _lib/         db (Neon), auth (session cookie)
neon/schema.sql ← run once in Neon
```

## Local development

```bash
npm install
npm run dev            # http://localhost:5173
```

`npm run dev` runs the **frontend only** — there's no backend, so the journal
shows the built-in **seed entries** (`src/data/seedPosts.ts`) and `/admin` login
is disabled. To run the API + database locally too, use `vercel dev` (below).

## Going live on Vercel + Neon

### 1. Neon (database)
- In your Neon project, open **SQL Editor** → paste all of
  [`neon/schema.sql`](neon/schema.sql) → **Run**.
- **Connect** → copy the **pooled** connection string (it contains `-pooler`).
  That's your `DATABASE_URL`.

### 2. Vercel (hosting + API + image storage)
1. **vercel.com → Add New → Project** → import this GitHub repo. Framework is
   auto-detected as **Vite**; no build settings to change.
2. **Storage → Create Database → Blob** → connect it to this project. This
   auto-adds `BLOB_READ_WRITE_TOKEN` to the project's env vars.
3. **Settings → Environment Variables** — add:
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | the Neon pooled string from step 1 |
   | `ADMIN_PASSWORD` | the password you'll use to log in at `/admin` |
   | `AUTH_SECRET` | a long random string — `openssl rand -base64 32` |
4. **Deploy.** Your site is live at `https://<project>.vercel.app`.

### 3. Use it
Go to `/admin`, sign in with `ADMIN_PASSWORD`, and add entries — date, title,
description, and images (uploaded straight from your device; the first image is
the homepage cover). Posts appear on the journal instantly.

### 4. Custom domain
In Vercel: **Settings → Domains → Add** `seeronsivashankar.com`, then update your
DNS as Vercel instructs. (The old GitHub Pages `CNAME` file has been removed —
the domain is now managed in Vercel. Until you re-point DNS, the Vercel `.app`
URL works for everything.)

## Optional: full-stack local dev

```bash
npm i -g vercel
vercel link            # link to the Vercel project
vercel env pull .env.local   # pulls DATABASE_URL / ADMIN_PASSWORD / AUTH_SECRET / BLOB token
vercel dev             # runs the frontend + /api functions together
```

## Security notes
- All backend secrets (`DATABASE_URL`, `ADMIN_PASSWORD`, `AUTH_SECRET`, Blob
  token) are **server-side only** — none are prefixed `VITE_`, so they are never
  bundled into the browser.
- The admin session is an HMAC-signed, HttpOnly cookie; write endpoints reject
  requests without a valid session. Nothing connects to Neon except the
  serverless functions.
