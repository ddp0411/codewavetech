/**
 * Simple in-memory sliding-window rate limiter.
 * NOTE: memory is per server instance. On serverless platforms with many
 * instances, swap this for a shared store (e.g. Upstash Redis) – see README.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0]!)) / 1000);
    return { ok: false as const, retryAfter };
  }
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map doesn't grow forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return { ok: true as const, remaining: limit - recent.length };
}
