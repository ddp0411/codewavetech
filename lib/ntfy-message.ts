import { detailServices } from "@/content/services";
import { serviceLabel, stageLabel } from "@/content/contact";
import type { ProjectBrief } from "./validation";

/** ntfy turns messages of 4,096+ bytes into attachments; stay well under. */
export const MAX_MESSAGE_BYTES = 3500;
const TRUNCATED = "… (truncated)";
const MAX_LINK_CHARS = 300;

export interface NtfyAction {
  action: "view";
  label: string;
  url: string;
  clear?: boolean;
}

export interface NtfyPayload {
  topic: string;
  title: string;
  message: string;
  markdown: true;
  priority: 4 | 5;
  tags: string[];
  click: string;
  actions: NtfyAction[];
  email?: string;
}

const encoder = new TextEncoder();
export const byteLength = (s: string) => encoder.encode(s).length;

/** Escapes characters that would change how user input renders as markdown. */
export function escapeMarkdown(text: string): string {
  return text
    .replace(/[\\`*_{}[\]<>#|~]/g, "\\$&")
    .replace(/^(\s*)([-+=])/gm, "$1\\$2") // list markers, setext underlines
    .replace(/^(\s*\d+)\.(?=\s|$)/gm, "$1\\."); // ordered-list markers
}

/** Single-line fields: collapse any whitespace (including newlines) to one space. */
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

const clip = (s: string, max: number) => {
  const cps = Array.from(s);
  return cps.length > max ? `${cps.slice(0, max).join("")}…` : s;
};

/** "Web Development", "AI & Automation", "Government portal" … */
function notificationServiceLabel(key: string) {
  const s = detailServices.find((x) => x.key === key);
  return s ? s.title.replace(/ and /g, " & ") : serviceLabel(key);
}

const mailto = (email: string) => `mailto:${encodeURIComponent(email).replace(/%40/g, "@")}`;

function quote(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("  \n");
}

/** Builds the markdown body, truncating the project description to fit the byte budget. */
export function buildMessage(brief: ProjectBrief, reference: string): string {
  const name = escapeMarkdown(oneLine(brief.name));
  const company = oneLine(brief.company);
  const link = oneLine(brief.link);
  const digits = brief.phone.replace(/\D/g, "");

  const lines = [
    `**Reference:** ${reference}`,
    `**Name:** ${name}${company ? ` · ${escapeMarkdown(company)}` : ""}`,
    `**Email:** ${escapeMarkdown(oneLine(brief.email))}`,
    `**Mobile:** +91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
    `**Contact via:** ${brief.channel} · ${brief.callTime}`,
    `**Services:** ${brief.services.map(notificationServiceLabel).join(", ")}`,
    `**Stage:** ${stageLabel(brief.stage)}`,
    `**Budget:** ${brief.budget}`,
    `**Launch:** ${brief.timeline}`,
  ];
  if (link) lines.push(`**Existing link:** ${escapeMarkdown(clip(link, MAX_LINK_CHARS))}`);
  const head = lines.join("  \n");

  const description = brief.message.trim();
  if (!description) return head;

  const compose = (body: string) => `${head}  \n**Project:**  \n${quote(body)}`;
  const fits = (s: string) => byteLength(s) < MAX_MESSAGE_BYTES;

  const full = compose(escapeMarkdown(description));
  if (fits(full)) return full;

  // Largest prefix of the description (in code points) that still fits.
  const cps = Array.from(description);
  const withPrefix = (n: number) =>
    compose(`${escapeMarkdown(cps.slice(0, n).join("").trimEnd())}${TRUNCATED}`);
  let lo = 0;
  let hi = cps.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (fits(withPrefix(mid))) lo = mid;
    else hi = mid - 1;
  }
  return withPrefix(lo);
}

/** Full ntfy JSON publish payload for a brief. */
export function buildBriefNotification(
  brief: ProjectBrief,
  reference: string,
  config: { topic: string; email?: string },
): NtfyPayload {
  const isGov = brief.services.includes("gov");
  const digits = brief.phone.replace(/\D/g, "");
  const email = oneLine(brief.email);
  const subject = encodeURIComponent(`Re: your project brief ${reference}`);

  const payload: NtfyPayload = {
    topic: config.topic,
    title: `New brief ${reference} · ${oneLine(brief.name)}`,
    message: buildMessage(brief, reference),
    markdown: true,
    priority: isGov ? 5 : 4,
    tags: isGov ? ["briefcase", "classical_building"] : ["briefcase"],
    click: mailto(email),
    actions: [
      { action: "view", label: "WhatsApp", url: `https://wa.me/91${digits}`, clear: false },
      { action: "view", label: "Call", url: `tel:+91${digits}` },
      { action: "view", label: "Email", url: `${mailto(email)}?subject=${subject}` },
    ],
  };
  if (config.email) payload.email = config.email;
  return payload;
}
