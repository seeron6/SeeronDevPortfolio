import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { isAuthed } from './_lib/auth';

/**
 * Receives an image (base64) that the browser has already resized/compressed,
 * stores it in Vercel Blob, and returns the public URL. Gated by admin auth.
 * The client keeps payloads small (~<1 MB) so we stay well under limits.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!isAuthed(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({ error: 'Blob storage is not configured (BLOB_READ_WRITE_TOKEN).' });
    return;
  }
  try {
    const { filename, contentType, dataBase64 } = (req.body ?? {}) as {
      filename?: string;
      contentType?: string;
      dataBase64?: string;
    };
    if (!dataBase64) {
      res.status(400).json({ error: 'No file data.' });
      return;
    }
    const buffer = Buffer.from(dataBase64, 'base64');
    const safe = (filename || 'image').replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 60) || 'image';
    const blob = await put(`journal/${safe}`, buffer, {
      access: 'public',
      contentType: contentType || 'image/jpeg',
      addRandomSuffix: true,
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('[api/upload] error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
}
