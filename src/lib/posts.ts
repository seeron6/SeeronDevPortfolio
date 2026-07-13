import { supabase, supabaseEnabled, POST_IMAGE_BUCKET } from './supabase';
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

/** Row shape as stored in the `posts` table. */
type PostRow = {
  id: string;
  event_date: string;
  title: string;
  description: string;
  images: string[] | null;
  created_at: string;
};

function rowToPost(row: PostRow): Post {
  return {
    id: row.id,
    date: row.event_date,
    title: row.title,
    description: row.description,
    images: row.images ?? [],
    created_at: row.created_at,
  };
}

function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** All journal posts, newest first. Live from Supabase, else seed data. */
export async function getPosts(): Promise<Post[]> {
  if (!supabaseEnabled || !supabase) return sortByDateDesc(seedPosts);

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('event_date', { ascending: false });

  if (error) {
    console.error('[posts] getPosts failed, falling back to seed:', error.message);
    return sortByDateDesc(seedPosts);
  }
  return (data as PostRow[]).map(rowToPost);
}

/** A single post by id. */
export async function getPost(id: string): Promise<Post | null> {
  if (!supabaseEnabled || !supabase) {
    return seedPosts.find((p) => p.id === id) ?? null;
  }
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
  if (error || !data) return null;
  return rowToPost(data as PostRow);
}

/** Upload a file to Supabase Storage and return its public URL. */
export async function uploadPostImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const dot = file.name.lastIndexOf('.');
  const ext = (dot > 0 ? file.name.slice(dot + 1) : 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const base = (dot > 0 ? file.name.slice(0, dot) : file.name)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'image';
  const path = `${Date.now()}-${Math.round(Math.random() * 1e6)}-${base}.${ext}`;
  const { error } = await supabase.storage.from(POST_IMAGE_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  const { data } = supabase.storage.from(POST_IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createPost(input: PostInput): Promise<Post> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('posts')
    .insert({
      event_date: input.date,
      title: input.title,
      description: input.description,
      images: input.images,
    })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return rowToPost(data as PostRow);
}

export async function updatePost(id: string, input: PostInput): Promise<Post> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('posts')
    .update({
      event_date: input.date,
      title: input.title,
      description: input.description,
      images: input.images,
    })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return rowToPost(data as PostRow);
}

export async function deletePost(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
