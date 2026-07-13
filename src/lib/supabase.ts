import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase is optional. When the env vars are present the journal reads/writes
 * live data (and the admin can sign in). When they're absent the site falls
 * back to the bundled seed posts so it still looks complete.
 *
 * The anon key is a *public* key by design — it's safe to ship in a static
 * build. Write access is protected by Row Level Security + Supabase Auth
 * (see supabase/schema.sql).
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

/** Storage bucket that holds uploaded journal images. */
export const POST_IMAGE_BUCKET = 'post-images';
