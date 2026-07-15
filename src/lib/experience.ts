import { experience as seedExperience, type Role } from '../data/experience';

export type { Role };

export interface ExperienceInput {
  sort_order: number;
  company: string;
  team: string;
  title: string;
  period: string;
  location: string;
  points: string[];
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return (data && data.error) || fallback;
  } catch {
    return fallback;
  }
}

/** Experience roles, ordered. Live from Neon; falls back to seed data. */
export async function getExperience(): Promise<Role[]> {
  try {
    const res = await fetch('/api/experience', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return seedExperience;
    return data as Role[];
  } catch {
    return seedExperience;
  }
}

export async function createExperience(input: ExperienceInput): Promise<Role> {
  const res = await fetch('/api/experience', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to create role.'));
  return res.json();
}

export async function updateExperience(id: string, input: ExperienceInput): Promise<Role> {
  const res = await fetch(`/api/experience/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to update role.'));
  return res.json();
}

export async function deleteExperience(id: string): Promise<void> {
  const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to delete role.'));
}
