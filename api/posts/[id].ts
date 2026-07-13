import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth';
import { updatePostRow, deletePostRow } from '../_lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id || '');
  if (!id) {
    res.status(400).json({ error: 'Missing id' });
    return;
  }

  if (!isAuthed(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    if (req.method === 'PUT') {
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
      const post = await updatePostRow(id, {
        date: body.date,
        title: body.title,
        description: body.description ?? '',
        images: Array.isArray(body.images) ? body.images : [],
      });
      if (!post) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.status(200).json(post);
      return;
    }

    if (req.method === 'DELETE') {
      await deletePostRow(id);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/posts/:id] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
