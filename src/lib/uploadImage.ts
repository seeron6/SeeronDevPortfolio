/**
 * Resizes/compresses an image in the browser, then uploads it through the
 * Vercel function to Blob storage. Compressing client-side keeps payloads
 * small (well under serverless body limits) and makes the site load faster.
 */

const MAX_DIMENSION = 1800;
const JPEG_QUALITY = 0.82;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image.'));
    };
    img.src = url;
  });
}

async function compress(file: File): Promise<{ dataBase64: string; contentType: string }> {
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported.');
  ctx.drawImage(img, 0, 0, w, h);

  const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  const dataBase64 = dataUrl.split(',')[1] ?? '';
  return { dataBase64, contentType: 'image/jpeg' };
}

export async function uploadPostImage(file: File): Promise<string> {
  const { dataBase64, contentType } = await compress(file);
  const base = file.name.replace(/\.[^.]+$/, '') || 'image';
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ filename: `${base}.jpg`, contentType, dataBase64 }),
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
