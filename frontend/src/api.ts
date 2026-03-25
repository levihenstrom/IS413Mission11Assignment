const defaultUrl = 'http://localhost:5043';

function normalizedEnvBase(): string | undefined {
  const raw = import.meta.env.VITE_API_URL?.replace(/\/$/, '').trim();
  return raw && raw.length > 0 ? raw : undefined;
}

// Prefer explicit URL when set. Otherwise in dev use '' + Vite proxy (see vite.config.ts).
export const API_BASE_URL =
  normalizedEnvBase() ?? (import.meta.env.DEV ? '' : defaultUrl);
