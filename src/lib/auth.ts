/** Admin auth helpers, talk to the Vercel serverless functions. */

export async function getAuthStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/me', { headers: { accept: 'application/json' } });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.authed);
  } catch {
    return false;
  }
}

export async function login(password: string): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    });
  } catch {
    throw new Error('Could not reach the server.');
  }
  // Require a genuine JSON { ok: true }. Under `vite dev` there is no backend,
  // so /api/login returns the SPA index.html (200), which must NOT count as a
  // successful login.
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || data.ok !== true) {
    const message =
      (data && data.error) ||
      'Login failed, the admin only works on the deployed site (Vercel), not `vite dev`.';
    throw new Error(message);
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/logout', { method: 'POST' });
  } catch {
    /* ignore */
  }
}
