import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkPassword, createToken, sessionCookie } from './_lib/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) {
    res.status(500).json({ error: 'Server auth is not configured (ADMIN_PASSWORD / AUTH_SECRET).' });
    return;
  }
  const password = String((req.body as { password?: string })?.password ?? '');
  if (!checkPassword(password)) {
    res.status(401).json({ error: 'Incorrect password.' });
    return;
  }
  res.setHeader('Set-Cookie', sessionCookie(req, createToken()));
  res.status(200).json({ ok: true });
}
