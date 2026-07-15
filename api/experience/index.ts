import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from '../_lib/auth.js';
import { listExperience, insertExperience, type ExperienceInput } from '../_lib/db.js';

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
  try {
    if (req.method === 'GET') {
      res.status(200).json(await listExperience());
      return;
    }
    if (req.method === 'POST') {
      if (!isAuthed(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const input = normalize((req.body ?? {}) as Record<string, unknown>);
      if (!input.company || !input.title) {
        res.status(400).json({ error: 'company and title are required.' });
        return;
      }
      res.status(201).json(await insertExperience(input));
      return;
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/experience] error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
