import { neon } from '@neondatabase/serverless';

/**
 * Neon serverless (HTTP) client. Runs inside Vercel functions only — the
 * connection string is a server-side secret and never reaches the browser.
 *
 * Initialized lazily so a missing DATABASE_URL surfaces as a clean, logged
 * error at query time (caught by each handler) rather than crashing the
 * function at module load with an opaque FUNCTION_INVOCATION_FAILED.
 */
let cachedSql: ReturnType<typeof neon> | null = null;

function getSql(): ReturnType<typeof neon> {
  if (cachedSql) return cachedSql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set — add it in Vercel → Settings → Environment Variables.');
  }
  cachedSql = neon(url);
  return cachedSql;
}

export interface PostRow {
  id: string;
  event_date: string; // 'YYYY-MM-DD' (to_char'd in queries to avoid tz drift)
  title: string;
  description: string;
  images: string[] | null;
  created_at: string;
}

export interface Post {
  id: string;
  date: string;
  title: string;
  description: string;
  images: string[];
  created_at: string;
}

export function toPost(r: PostRow): Post {
  return {
    id: r.id,
    date: r.event_date,
    title: r.title,
    description: r.description,
    images: r.images ?? [],
    created_at: r.created_at,
  };
}

export async function listPosts(): Promise<Post[]> {
  const sql = getSql();
  const rows = (await sql`
    select id, to_char(event_date, 'YYYY-MM-DD') as event_date,
           title, description, images, created_at
    from posts
    order by event_date desc, created_at desc
  `) as PostRow[];
  return rows.map(toPost);
}

export async function insertPost(input: {
  date: string;
  title: string;
  description: string;
  images: string[];
}): Promise<Post> {
  const sql = getSql();
  const rows = (await sql`
    insert into posts (event_date, title, description, images)
    values (${input.date}, ${input.title}, ${input.description}, ${input.images}::text[])
    returning id, to_char(event_date, 'YYYY-MM-DD') as event_date,
              title, description, images, created_at
  `) as PostRow[];
  return toPost(rows[0]);
}

export async function updatePostRow(
  id: string,
  input: { date: string; title: string; description: string; images: string[] }
): Promise<Post | null> {
  const sql = getSql();
  const rows = (await sql`
    update posts
    set event_date = ${input.date},
        title = ${input.title},
        description = ${input.description},
        images = ${input.images}::text[]
    where id = ${id}
    returning id, to_char(event_date, 'YYYY-MM-DD') as event_date,
              title, description, images, created_at
  `) as PostRow[];
  return rows[0] ? toPost(rows[0]) : null;
}

export async function deletePostRow(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from posts where id = ${id}`;
}

/* ─────────────────────────── Gallery ─────────────────────────── */

export interface GalleryRow {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  created_at: string;
}

function toGallery(r: GalleryRow): GalleryItem {
  return { id: r.id, title: r.title, image: r.image_url, created_at: r.created_at };
}

export async function listGallery(): Promise<GalleryItem[]> {
  const sql = getSql();
  const rows = (await sql`
    select id, title, image_url, created_at
    from gallery
    order by created_at desc
  `) as GalleryRow[];
  return rows.map(toGallery);
}

export async function insertGalleryItem(input: {
  title: string;
  image: string;
}): Promise<GalleryItem> {
  const sql = getSql();
  const rows = (await sql`
    insert into gallery (title, image_url)
    values (${input.title}, ${input.image})
    returning id, title, image_url, created_at
  `) as GalleryRow[];
  return toGallery(rows[0]);
}

export async function updateGalleryRow(
  id: string,
  input: { title: string; image: string }
): Promise<GalleryItem | null> {
  const sql = getSql();
  const rows = (await sql`
    update gallery
    set title = ${input.title}, image_url = ${input.image}
    where id = ${id}
    returning id, title, image_url, created_at
  `) as GalleryRow[];
  return rows[0] ? toGallery(rows[0]) : null;
}

export async function deleteGalleryRow(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from gallery where id = ${id}`;
}

/* ─────────────────────────── Projects ─────────────────────────── */

export interface ProjectRow {
  id: string;
  sort_order: number;
  title: string;
  award: string;
  display_date: string;
  tags: string[] | null;
  image_url: string;
  summary: string;
  highlights: string[] | null;
  link: string | null;
  created_at: string;
}

export interface ProjectItem {
  id: string;
  sort_order: number;
  title: string;
  award: string;
  date: string;
  tags: string[];
  image: string;
  summary: string;
  highlights: string[];
  link: string;
}

export interface ProjectInput {
  sort_order: number;
  title: string;
  award: string;
  date: string;
  tags: string[];
  image: string;
  summary: string;
  highlights: string[];
  link: string;
}

function toProject(r: ProjectRow): ProjectItem {
  return {
    id: r.id,
    sort_order: r.sort_order,
    title: r.title,
    award: r.award,
    date: r.display_date,
    tags: r.tags ?? [],
    image: r.image_url,
    summary: r.summary,
    highlights: r.highlights ?? [],
    link: r.link ?? '',
  };
}

export async function listProjects(): Promise<ProjectItem[]> {
  const sql = getSql();
  const rows = (await sql`
    select id, sort_order, title, award, display_date, tags, image_url, summary, highlights, link, created_at
    from projects order by sort_order asc, created_at desc
  `) as ProjectRow[];
  return rows.map(toProject);
}

export async function insertProject(i: ProjectInput): Promise<ProjectItem> {
  const sql = getSql();
  const rows = (await sql`
    insert into projects (sort_order, title, award, display_date, tags, image_url, summary, highlights, link)
    values (${i.sort_order}, ${i.title}, ${i.award}, ${i.date}, ${i.tags}::text[], ${i.image}, ${i.summary}, ${i.highlights}::text[], ${i.link})
    returning id, sort_order, title, award, display_date, tags, image_url, summary, highlights, link, created_at
  `) as ProjectRow[];
  return toProject(rows[0]);
}

export async function updateProjectRow(id: string, i: ProjectInput): Promise<ProjectItem | null> {
  const sql = getSql();
  const rows = (await sql`
    update projects set sort_order = ${i.sort_order}, title = ${i.title}, award = ${i.award},
      display_date = ${i.date}, tags = ${i.tags}::text[], image_url = ${i.image},
      summary = ${i.summary}, highlights = ${i.highlights}::text[], link = ${i.link}
    where id = ${id}
    returning id, sort_order, title, award, display_date, tags, image_url, summary, highlights, link, created_at
  `) as ProjectRow[];
  return rows[0] ? toProject(rows[0]) : null;
}

export async function deleteProjectRow(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from projects where id = ${id}`;
}

/* ─────────────────────────── Experience ─────────────────────────── */

export interface ExperienceRow {
  id: string;
  sort_order: number;
  company: string;
  team: string;
  title: string;
  period: string;
  location: string;
  points: string[] | null;
  created_at: string;
}

export interface ExperienceItem {
  id: string;
  sort_order: number;
  company: string;
  team: string;
  title: string;
  period: string;
  location: string;
  points: string[];
}

export interface ExperienceInput {
  sort_order: number;
  company: string;
  team: string;
  title: string;
  period: string;
  location: string;
  points: string[];
}

function toExperience(r: ExperienceRow): ExperienceItem {
  return {
    id: r.id,
    sort_order: r.sort_order,
    company: r.company,
    team: r.team,
    title: r.title,
    period: r.period,
    location: r.location,
    points: r.points ?? [],
  };
}

export async function listExperience(): Promise<ExperienceItem[]> {
  const sql = getSql();
  const rows = (await sql`
    select id, sort_order, company, team, title, period, location, points, created_at
    from experience order by sort_order asc, created_at desc
  `) as ExperienceRow[];
  return rows.map(toExperience);
}

export async function insertExperience(i: ExperienceInput): Promise<ExperienceItem> {
  const sql = getSql();
  const rows = (await sql`
    insert into experience (sort_order, company, team, title, period, location, points)
    values (${i.sort_order}, ${i.company}, ${i.team}, ${i.title}, ${i.period}, ${i.location}, ${i.points}::text[])
    returning id, sort_order, company, team, title, period, location, points, created_at
  `) as ExperienceRow[];
  return toExperience(rows[0]);
}

export async function updateExperienceRow(id: string, i: ExperienceInput): Promise<ExperienceItem | null> {
  const sql = getSql();
  const rows = (await sql`
    update experience set sort_order = ${i.sort_order}, company = ${i.company}, team = ${i.team},
      title = ${i.title}, period = ${i.period}, location = ${i.location}, points = ${i.points}::text[]
    where id = ${id}
    returning id, sort_order, company, team, title, period, location, points, created_at
  `) as ExperienceRow[];
  return rows[0] ? toExperience(rows[0]) : null;
}

export async function deleteExperienceRow(id: string): Promise<void> {
  const sql = getSql();
  await sql`delete from experience where id = ${id}`;
}
