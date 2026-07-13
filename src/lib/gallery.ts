export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  created_at?: string;
}

export interface GalleryInput {
  title: string;
  image: string;
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return (data && data.error) || fallback;
  } catch {
    return fallback;
  }
}

/** All gallery items, newest first. Empty array if the API is unavailable. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch('/api/gallery', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('unexpected response');
    return data as GalleryItem[];
  } catch {
    return [];
  }
}

export async function createGalleryItem(input: GalleryInput): Promise<GalleryItem> {
  const res = await fetch('/api/gallery', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to add photo.'));
  return res.json();
}

export async function updateGalleryItem(id: string, input: GalleryInput): Promise<GalleryItem> {
  const res = await fetch(`/api/gallery/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to update photo.'));
  return res.json();
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to delete photo.'));
}
