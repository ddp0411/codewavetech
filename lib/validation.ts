import { z } from "zod";
import {
  budgetOptions,
  callTimeOptions,
  channelOptions,
  serviceOptions,
  stageOptions,
  timelineOptions,
} from "@/content/contact";

/**
 * Project brief schema, shared by the client form (per-step validation) and
 * the /api/contact route (full re-validation). Error copy is from the reference.
 */

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];
const stageValues = stageOptions.map((o) => o.value) as [string, ...string[]];

export const MESSAGE_MAX = 1000;

const required = (message: string) => ({ required_error: message, invalid_type_error: message });

export const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const briefSchema = z.object({
  // Step 1
  services: z
    .array(
      z.enum(serviceValues),
      required("Choose at least one service so we know who to put on the call."),
    )
    .min(1, "Choose at least one service so we know who to put on the call."),
  stage: z.enum(stageValues, {
    errorMap: () => ({ message: "Choose the option closest to where you are." }),
  }),
  // Step 2
  budget: z.enum(budgetOptions as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'Pick a budget range, or choose "Not sure yet".' }),
  }),
  timeline: z.enum(timelineOptions as unknown as [string, ...string[]]),
  message: z
    .string()
    .trim()
    .max(MESSAGE_MAX, `Keep the description under ${MESSAGE_MAX} characters.`),
  link: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || isHttpUrl(v),
      "Enter a full link starting with https://, or leave this blank.",
    ),
  // Step 3
  name: z.string(required("Enter your name.")).trim().min(1, "Enter your name.").max(120),
  company: z.string().trim().max(160),
  email: z
    .string(required("Enter a valid email, like name@company.com."))
    .trim()
    .max(200)
    .regex(EMAIL_RE, "Enter a valid email, like name@company.com."),
  phone: z
    .string(required("Enter a 10-digit mobile number."))
    .refine((v) => PHONE_RE.test(v.replace(/\D/g, "")), "Enter a 10-digit mobile number."),
  channel: z.enum(channelOptions as unknown as [string, ...string[]]),
  callTime: z.enum(callTimeOptions as unknown as [string, ...string[]]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm so we can contact you." }),
  }),
  // Honeypot: must stay empty. Bots fill every field.
  website: z.string().max(0).optional(),
});

/** A validated project brief (shared by the form, the API route and notifications). */
export type ProjectBrief = z.infer<typeof briefSchema>;
/** Form values; identical to ProjectBrief. */
export type BriefValues = ProjectBrief;

/** Fields validated on each step before moving forward. */
export const stepFields = {
  1: ["services", "stage"],
  2: ["budget", "timeline", "message", "link"],
  3: ["name", "company", "email", "phone", "channel", "callTime", "consent"],
} as const satisfies Record<1 | 2 | 3, readonly (keyof BriefValues)[]>;

/** Form defaults (reference: Flexible timeline, WhatsApp channel). */
export const briefDefaults = {
  services: [] as string[],
  stage: undefined as unknown as string,
  budget: undefined as unknown as string,
  timeline: "Flexible",
  message: "",
  link: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  channel: "WhatsApp",
  callTime: "Any time",
  consent: false as unknown as true,
  website: "",
} satisfies BriefValues;

function isHttpUrl(v: string) {
  try {
    const u = new URL(v);
    return (u.protocol === "https:" || u.protocol === "http:") && u.hostname.includes(".");
  } catch {
    return false;
  }
}

/** "9876543210" → "98765 43210" */
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
}

/** Request body for /api/contact. */
export const contactRequestSchema = z.object({
  brief: briefSchema,
  recaptchaToken: z.string().max(4000).optional(),
});
