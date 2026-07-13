import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth.js';
import { updateGalleryRow, deleteGalleryRow } from '../_lib/db.js';

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
      const body = (req.body ?? {}) as { title?: string; image?: string };
      if (!body.image) {
        res.status(400).json({ error: 'image is required.' });
        return;
      }
      const item = await updateGalleryRow(id, {
        title: (body.title ?? '').trim(),
        image: body.image,
      });
      if (!item) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.status(200).json(item);
      return;
    }

    if (req.method === 'DELETE') {
      await deleteGalleryRow(id);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/gallery/:id] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
