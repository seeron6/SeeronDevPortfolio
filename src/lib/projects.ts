import { projects as seedProjects, type Project } from '../data/projects';

export type { Project };

export interface ProjectInput {
  sort_order: number;
  title: string;
  award: string;
  date: string;
  tags: string[];
  image: string;
  summary: string;
  highlights: string[];
  link: string;
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return (data && data.error) || fallback;
  } catch {
    return fallback;
  }
}

/** Projects, ordered. Live from Neon; falls back to seed data if unavailable/empty. */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch('/api/projects', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return seedProjects;
    return data as Project[];
  } catch {
    return seedProjects;
  }
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to create project.'));
  return res.json();
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to update project.'));
  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await errorMessage(res, 'Failed to delete project.'));
}
