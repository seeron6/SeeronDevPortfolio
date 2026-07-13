import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth.js';
import { listGallery, insertGalleryItem } from '../_lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      res.status(200).json(await listGallery());
      return;
    }

    if (req.method === 'POST') {
      if (!isAuthed(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const body = (req.body ?? {}) as { title?: string; image?: string };
      if (!body.image) {
        res.status(400).json({ error: 'image is required.' });
        return;
      }
      const item = await insertGalleryItem({
        title: (body.title ?? '').trim(),
        image: body.image,
      });
      res.status(201).json(item);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/gallery] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
