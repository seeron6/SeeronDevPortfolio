import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth.js';
import { updateExperienceRow, deleteExperienceRow, type ExperienceInput } from '../_lib/db.js';

function normalize(body: Record<string, unknown>): ExperienceInput {
  return {
    sort_order: Number(body.sort_order) || 0,
    company: String(body.company ?? '').trim(),
    team: String(body.team ?? '').trim(),
    title: String(body.title ?? '').trim(),
    period: String(body.period ?? '').trim(),
    location: String(body.location ?? '').trim(),
    points: Array.isArray(body.points) ? (body.points as string[]) : [],
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
      if (!input.company || !input.title) {
        res.status(400).json({ error: 'company and title are required.' });
        return;
      }
      const item = await updateExperienceRow(id, input);
      if (!item) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.status(200).json(item);
      return;
    }
    if (req.method === 'DELETE') {
      await deleteExperienceRow(id);
      res.status(200).json({ ok: true });
      return;
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/experience/:id] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
