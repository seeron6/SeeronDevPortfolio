# Seeron Sivashankar — Portfolio

Live at **[seeronsivashankar.com](https://www.seeronsivashankar.com)**.

A dark, minimal, image-forward portfolio. The homepage is a **Journal** (blog)
you update from a password-locked admin panel; plus Projects, Experience, About,
and Contact. Built with Vite + React + TypeScript + Tailwind v4, with an optional
Supabase backend for the journal.

## Structure

```
src/
  pages/        Home (journal), JournalPost, Projects, Experience, About, Contact, Admin
  components/   Layout (nav + footer), JournalCard, Reveal, ScrollToTop
  data/         seedPosts, projects, experience   ← static content
  lib/          supabase (client), posts (data access), format
supabase/schema.sql   ← run once in your Supabase project
```

## Local development

```bash
npm install
npm run dev            # http://localhost:5173
```

Without Supabase configured, the journal shows the built-in **seed entries**
(`src/data/seedPosts.ts`) so everything works out of the box.

## Connecting Supabase (enables the live journal + admin)

The password-locked admin at **`/admin`** uses Supabase Auth, with posts stored
in a Postgres table and images in Supabase Storage.

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   (Creates the `posts` table, Row Level Security policies, and the public
   `post-images` storage bucket.)
3. **Authentication → Users → Add user** → create your admin email + password.
   (This is the login for `/admin`.)
4. **Project Settings → API** → copy the **Project URL** and the **anon public**
   key into a local `.env.local` (see [`.env.example`](.env.example)):

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

   Both are public values, safe to ship in a static build — writes are protected
   by RLS + Auth.
5. `npm run dev`, visit `/admin`, sign in, and start posting. Each entry takes a
   date, title, description, and images (drag/drop upload; the first image is the
   cover shown on the homepage grid).

## Deploy

Published to GitHub Pages from the `gh-pages` branch via the `gh-pages` package:

```bash
npm run deploy         # runs vite build, pushes dist/ to gh-pages
```

The custom domain is set by `public/CNAME`. Client-side routing (deep links like
`/journal/:id`, `/admin`) works on GitHub Pages via the SPA redirect in
`public/404.html` + the restore snippet in `index.html`. Because the build is
run locally, your `.env.local` Supabase values are baked into the deployed build.
