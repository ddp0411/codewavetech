import { z } from "zod";

/** Treats unset and empty-string env vars the same (".env" files often leave `KEY=`). */
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema.optional(),
  );

const ntfyEnvSchema = z.object({
  NTFY_SERVER_URL: optional(
    z.string().url("NTFY_SERVER_URL must be a full URL, e.g. https://ntfy.sh"),
  ),
  NTFY_TOPIC: z
    .string({ required_error: "NTFY_TOPIC is required (a long random topic name)." })
    .trim()
    .min(1, "NTFY_TOPIC is required (a long random topic name).")
    .regex(
      /^[-_A-Za-z0-9]{1,64}$/,
      "NTFY_TOPIC may only contain letters, numbers, - and _ (max 64 characters).",
    ),
  NTFY_TOKEN: optional(z.string().trim()),
  NTFY_EMAIL: optional(z.string().trim().email("NTFY_EMAIL must be a valid email address.")),
});

export interface NtfyConfig {
  serverUrl: string;
  topic: string;
  token?: string;
  email?: string;
}

export class NtfyConfigError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Invalid ntfy configuration:\n  - ${issues.join("\n  - ")}`);
    this.name = "NtfyConfigError";
  }
}

/** Reads and validates the ntfy env vars. Throws NtfyConfigError when invalid. */
export function getNtfyConfig(env: NodeJS.ProcessEnv = process.env): NtfyConfig {
  const parsed = ntfyEnvSchema.safeParse({
    NTFY_SERVER_URL: env.NTFY_SERVER_URL,
    NTFY_TOPIC: env.NTFY_TOPIC === "" ? undefined : env.NTFY_TOPIC,
    NTFY_TOKEN: env.NTFY_TOKEN,
    NTFY_EMAIL: env.NTFY_EMAIL,
  });
  if (!parsed.success) {
    throw new NtfyConfigError(parsed.error.issues.map((i) => i.message));
  }
  const d = parsed.data;
  return {
    serverUrl: (d.NTFY_SERVER_URL ?? "https://ntfy.sh").replace(/\/+$/, ""),
    topic: d.NTFY_TOPIC,
    token: d.NTFY_TOKEN,
    email: d.NTFY_EMAIL,
  };
}

/**
 * Called once at server startup (instrumentation.ts). Development fails loudly
 * so a missing NTFY_TOPIC is noticed immediately; production logs the problem
 * (the contact route then returns 502 and logs each brief so no lead is lost).
 */
export function validateEnvAtStartup() {
  try {
    getNtfyConfig();
  } catch (e) {
    if (!(e instanceof NtfyConfigError)) throw e;
    const msg = `${e.message}\nSet these in .env.local (see .env.example) so contact-form briefs reach the team.`;
    if (process.env.NODE_ENV === "development") throw new Error(msg);
    console.error(`[env] ${msg}`);
  }
}
