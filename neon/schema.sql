-- ────────────────────────────────────────────────────────────────────────
--  Seeron portfolio — journal schema (Neon Postgres)
--  Run once in the Neon SQL Editor (or `psql "$DATABASE_URL" -f neon/schema.sql`).
--  Access is controlled by the Vercel API + admin auth, so no RLS is needed
--  here — nothing connects to this database except the serverless functions.
-- ────────────────────────────────────────────────────────────────────────

create table if not exists posts (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  event_date  date        not null,
  title       text        not null,
  description text        not null    default '',
  images      text[]      not null    default '{}'
);

-- Fast "newest first" ordering for the journal feed.
create index if not exists posts_event_date_idx on posts (event_date desc, created_at desc);

-- Gallery: standalone photos with an optional title.
create table if not exists gallery (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null    default now(),
  title      text        not null    default '',
  image_url  text        not null
);

create index if not exists gallery_created_idx on gallery (created_at desc);

-- Projects: editable in the admin.
create table if not exists projects (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  sort_order   integer     not null    default 0,
  title        text        not null,
  award        text        not null    default '',
  display_date text        not null    default '',
  tags         text[]      not null    default '{}',
  image_url    text        not null    default '',
  summary      text        not null    default '',
  highlights   text[]      not null    default '{}',
  link         text
);

create index if not exists projects_order_idx on projects (sort_order asc, created_at desc);

-- Experience roles: editable in the admin.
create table if not exists experience (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null    default now(),
  sort_order integer     not null    default 0,
  company    text        not null,
  team       text        not null    default '',
  title      text        not null,
  period     text        not null    default '',
  location   text        not null    default '',
  points     text[]      not null    default '{}'
);

create index if not exists experience_order_idx on experience (sort_order asc, created_at desc);
