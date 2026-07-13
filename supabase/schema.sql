-- ────────────────────────────────────────────────────────────────────────
--  Seeron portfolio — journal schema
--  Run this once in your Supabase project: SQL Editor → New query → paste →
--  Run. Then create your admin user (Authentication → Users → Add user) and
--  create the public storage bucket named `post-images`.
-- ────────────────────────────────────────────────────────────────────────

-- 1) Posts table --------------------------------------------------------------
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  event_date  date not null,
  title       text not null,
  description text not null default '',
  images      text[] not null default '{}'
);

-- 2) Row Level Security -------------------------------------------------------
alter table public.posts enable row level security;

-- Anyone (anon) can read posts — this is a public blog.
drop policy if exists "posts are public" on public.posts;
create policy "posts are public"
  on public.posts for select
  using (true);

-- Only signed-in users (your admin account) can write.
drop policy if exists "authenticated can insert" on public.posts;
create policy "authenticated can insert"
  on public.posts for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated can update" on public.posts;
create policy "authenticated can update"
  on public.posts for update
  to authenticated
  using (true) with check (true);

drop policy if exists "authenticated can delete" on public.posts;
create policy "authenticated can delete"
  on public.posts for delete
  to authenticated
  using (true);

-- 3) Storage bucket for images ------------------------------------------------
-- Create a PUBLIC bucket named `post-images`. This inserts it if the Storage
-- UI hasn't already; safe to re-run.
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

-- Public read of images; only authenticated users can upload / modify / delete.
drop policy if exists "post images are public" on storage.objects;
create policy "post images are public"
  on storage.objects for select
  using (bucket_id = 'post-images');

drop policy if exists "authenticated can upload images" on storage.objects;
create policy "authenticated can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images');

drop policy if exists "authenticated can update images" on storage.objects;
create policy "authenticated can update images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images');

drop policy if exists "authenticated can delete images" on storage.objects;
create policy "authenticated can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images');
