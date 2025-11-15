export const DEFAULT_LIMIT = 20;

export const normalizePositiveInt = (
  value: number | undefined,
  fallback: number,
) => Math.max(1, Math.floor(value ?? fallback));
