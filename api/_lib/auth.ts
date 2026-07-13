import crypto from 'node:crypto';
import type { VercelRequest } from '@vercel/node';

/**
 * Minimal, dependency-free admin session: an HMAC-signed token stored in an
 * HttpOnly cookie. One admin, gated by the ADMIN_PASSWORD env var. Tokens are
 * signed with AUTH_SECRET so they can't be forged client-side.
 */
const COOKIE = 'session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

function secret(): string {
  return process.env.AUTH_SECRET || '';
}

function hmac(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** Constant-time string compare (only compares equal-length inputs). */
const encoder = new TextEncoder();
function timingEqual(a: string, b: string): boolean {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function createToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })
  ).toString('base64url');
  return `${payload}.${hmac(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  if (!timingEqual(sig, hmac(payload))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

export function checkPassword(password: string): boolean {
  const admin = process.env.ADMIN_PASSWORD || '';
  if (!admin) return false;
  return timingEqual(password, admin);
}

export function readToken(req: VercelRequest): string | undefined {
  const raw = req.headers.cookie || '';
  const match = raw
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${COOKIE}=`));
  return match ? decodeURIComponent(match.slice(COOKIE.length + 1)) : undefined;
}

export function isAuthed(req: VercelRequest): boolean {
  return verifyToken(readToken(req));
}

function isSecure(req: VercelRequest): boolean {
  const host = String(req.headers.host || '');
  const proto = String(req.headers['x-forwarded-proto'] || '');
  // Localhost over http can't store a Secure cookie; everything else is https.
  return proto === 'https' || (!host.includes('localhost') && !host.includes('127.0.0.1'));
}

export function sessionCookie(req: VercelRequest, token: string): string {
  const secure = isSecure(req) ? '; Secure' : '';
  return `${COOKIE}=${token}; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`;
}

export function clearCookie(req: VercelRequest): string {
  const secure = isSecure(req) ? '; Secure' : '';
  return `${COOKIE}=; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=0`;
}
