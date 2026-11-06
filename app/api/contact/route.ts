import { NextResponse, type NextRequest } from "next/server";
import { contactRequestSchema, type ProjectBrief } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { briefRows } from "@/lib/brief";
import { sendBriefNotification } from "@/lib/ntfy";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Fail = { ok: false; error: string };
const fail = (status: number, error: string, headers?: HeadersInit) =>
  NextResponse.json<Fail>({ ok: false, error }, { status, headers });

function clientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

/** CWT-YYMMDD-1234, dated in IST. */
function makeReference() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CWT-${get("year")}${get("month")}${get("day")}-${rand}`;
}

async function verifyRecaptcha(token: string | undefined, ip: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // verification only when configured
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success: boolean; score?: number; action?: string };
    return data.success && (data.score ?? 0) >= 0.5 && (!data.action || data.action === "contact");
  } catch (e) {
    console.error("[contact] reCAPTCHA verification failed", e);
    return false;
  }
}

async function postWebhook(url: string | undefined, name: string, payload: unknown) {
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error(`[contact] ${name} webhook responded ${res.status}`);
  } catch (e) {
    console.error(`[contact] ${name} webhook failed`, e);
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);

  const limited = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return fail(429, "Too many requests. Please try again later.", {
      "Retry-After": String(limited.retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid JSON.");
  }

  // Honeypot: reject before doing any other work.
  const hp = (body as { brief?: { website?: unknown } } | null)?.brief?.website;
  if (typeof hp === "string" && hp.trim() !== "") return fail(400, "Rejected.");

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const { recaptchaToken } = parsed.data;
  const brief: ProjectBrief = {
    ...parsed.data.brief,
    phone: parsed.data.brief.phone.replace(/\D/g, "").replace(/^(\d{5})(\d{5})$/, "$1 $2"),
  };

  if (!(await verifyRecaptcha(recaptchaToken, ip))) return fail(400, "reCAPTCHA check failed.");

  const reference = makeReference();

  try {
    await sendBriefNotification(brief, reference);
  } catch (error) {
    // Keep the lead: the full brief is in the server log even though the push failed.
    console.error(
      `[contact] ntfy notification failed for ${reference}; brief preserved below`,
      JSON.stringify({ reference, brief: { ...brief, website: undefined } }),
      error,
    );
    return fail(502, "Could not deliver the brief.");
  }

  const payload = {
    reference,
    submittedAt: new Date().toISOString(),
    source: `${site.url}/contact`,
    brief: { ...brief, consent: undefined, website: undefined },
    summary: Object.fromEntries(briefRows(brief)),
  };
  await Promise.all([
    postWebhook(process.env.ZOHO_WEBHOOK_URL, "Zoho", payload),
    postWebhook(process.env.WHATSAPP_WEBHOOK_URL, "WhatsApp", payload),
  ]);

  return NextResponse.json({ ok: true, reference });
}

export function GET() {
  return fail(405, "Method not allowed.", { Allow: "POST" });
}
