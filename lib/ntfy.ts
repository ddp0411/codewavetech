import { getNtfyConfig } from "./env";
import { buildBriefNotification } from "./ntfy-message";
import type { ProjectBrief } from "./validation";

const TIMEOUT_MS = 5000;

/** Thrown when ntfy can't be reached, times out or answers with a non-2xx status. */
export class NtfyError extends Error {
  constructor(
    public readonly kind: "http" | "timeout" | "network",
    message: string,
    public readonly status?: number,
    public readonly responseBody?: string,
  ) {
    super(message);
    this.name = "NtfyError";
  }
}

/**
 * Publishes a push notification for a new project brief using ntfy's JSON
 * format (UTF-8 safe for ₹ and Hindi text, unlike header-based publishing).
 * Throws NtfyConfigError (bad env) or NtfyError (delivery failure).
 */
export async function sendBriefNotification(brief: ProjectBrief, reference: string): Promise<void> {
  const config = getNtfyConfig();
  const payload = buildBriefNotification(brief, reference, config);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) headers.Authorization = `Bearer ${config.token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${config.serverUrl}/`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (e) {
    if (controller.signal.aborted) {
      throw new NtfyError("timeout", `ntfy did not respond within ${TIMEOUT_MS / 1000}s`);
    }
    throw new NtfyError("network", `Could not reach ntfy: ${e instanceof Error ? e.message : e}`);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new NtfyError(
      "http",
      `ntfy responded with HTTP ${res.status}`,
      res.status,
      body.slice(0, 500),
    );
  }
}
