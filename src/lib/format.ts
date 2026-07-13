/** Formats an ISO date (YYYY-MM-DD) as e.g. "April 15, 2026". */
export function formatDate(iso: string): string {
  if (!iso) return '';
  // Parse as local date to avoid timezone off-by-one from `new Date('YYYY-MM-DD')`.
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Short form: "Apr 2026". */
export function formatMonthYear(iso: string): string {
  if (!iso) return '';
  const [y, m] = iso.split('-').map(Number);
  if (!y || !m) return iso;
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}
