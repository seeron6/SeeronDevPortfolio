import { neon } from '@neondatabase/serverless';

/**
 * Neon serverless (HTTP) client. Runs inside Vercel functions only — the
 * connection string is a server-side secret and never reaches the browser.
 */
export const sql = neon(process.env.DATABASE_URL || '');

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
  await sql`delete from posts where id = ${id}`;
}
