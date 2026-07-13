/**
 * Uploads an already-processed JPEG (a data URL produced by the cropper canvas)
 * to Vercel Blob via the serverless function, and returns the public URL.
 * Cropping + compression happen client-side in ImageCropper, so payloads stay
 * small and the stored image is exactly what the user framed.
 */
async function postImage(dataBase64: string, filename: string): Promise<string> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ filename, contentType: 'image/jpeg', dataBase64 }),
  });
  if (!res.ok) {
    let message = 'Upload failed.';
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  const { url } = await res.json();
  return url as string;
}

export async function uploadImageDataUrl(dataUrl: string, name = 'image'): Promise<string> {
  const dataBase64 = dataUrl.split(',')[1] ?? '';
  const base =
    name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'image';
  return postImage(dataBase64, `${base}.jpg`);
}
