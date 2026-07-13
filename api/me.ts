import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthed } from './_lib/auth.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    authed: isAuthed(req),
    // Non-sensitive: whether image uploads are available (Blob configured).
    storage: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  });
}
