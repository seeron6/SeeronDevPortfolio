import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearCookie } from './_lib/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', clearCookie(req));
  res.status(200).json({ ok: true });
}
