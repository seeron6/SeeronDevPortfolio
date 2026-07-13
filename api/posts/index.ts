import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth';
import { listPosts, insertPost } from '../_lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const posts = await listPosts();
      res.status(200).json(posts);
      return;
    }

    if (req.method === 'POST') {
      if (!isAuthed(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const body = (req.body ?? {}) as {
        date?: string;
        title?: string;
        description?: string;
        images?: string[];
      };
      if (!body.date || !body.title) {
        res.status(400).json({ error: 'date and title are required.' });
        return;
      }
      const post = await insertPost({
        date: body.date,
        title: body.title,
        description: body.description ?? '',
        images: Array.isArray(body.images) ? body.images : [],
      });
      res.status(201).json(post);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/posts] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
