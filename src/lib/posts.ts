import { seedPosts } from '../data/seedPosts';

export interface Post {
  id: string;
  /** ISO date (YYYY-MM-DD) of the event. */
  date: string;
  title: string;
  description: string;
  /** Ordered list of image URLs. First one is the cover. */
  images: string[];
  created_at?: string;
}

export interface PostInput {
  date: string;
  title: string;
  description: string;
  images: string[];
}

function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return (data && data.error) || fallback;
  } catch {
    return fallback;
  }
}

/**
 * All journal posts, newest first. Reads the live API (Neon via the Vercel
 * function). If the API is unavailable — e.g. running `vite dev` with no
 * backend — it falls back to the bundled seed entries so the site still looks
 * complete.
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('/api/posts', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('unexpected response');
    return data as Post[];
  } catch {
    return sortByDateDesc(seedPosts);
  }
}

export async function getPost(id: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.id === id) ?? null;
}

export async function createPost(input: PostInput): Promise<Post> {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to create post.'));
  return res.json();
}

export async function updatePost(id: string, input: PostInput): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to update post.'));
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to delete post.'));
}
