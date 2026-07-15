import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth.js';
import { updateProjectRow, deleteProjectRow, type ProjectInput } from '../_lib/db.js';

function normalize(body: Record<string, unknown>): ProjectInput {
  return {
    sort_order: Number(body.sort_order) || 0,
    title: String(body.title ?? '').trim(),
    award: String(body.award ?? '').trim(),
    date: String(body.date ?? '').trim(),
    tags: Array.isArray(body.tags) ? (body.tags as string[]) : [],
    image: String(body.image ?? ''),
    summary: String(body.summary ?? '').trim(),
    highlights: Array.isArray(body.highlights) ? (body.highlights as string[]) : [],
    link: String(body.link ?? '').trim(),
  };
}

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
      const input = normalize((req.body ?? {}) as Record<string, unknown>);
      if (!input.title) {
        res.status(400).json({ error: 'title is required.' });
        return;
      }
      const item = await updateProjectRow(id, input);
      if (!item) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.status(200).json(item);
      return;
    }
    if (req.method === 'DELETE') {
      await deleteProjectRow(id);
      res.status(200).json({ ok: true });
      return;
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/projects/:id] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
