import { detailServices, formLabel } from "./services";

/** Contact-form options, verbatim from the reference. */

export const serviceOptions: { value: string; label: string }[] = [
  ...detailServices.map((s) => ({ value: s.key, label: formLabel(s.title) })),
  { value: "gov", label: "Government portal" },
  { value: "other", label: "Something else" },
];

export const stageOptions = [
  { value: "idea", label: "Just an idea", sub: "Exploring options" },
  { value: "plan", label: "Planned", sub: "Know what we need" },
  { value: "exists", label: "Have something", sub: "Improve or rebuild" },
] as const;

export const budgetOptions = [
  "Under ₹50k",
  "₹50k – 2L",
  "₹2L – 5L",
  "₹5L – 15L",
  "₹15L+",
  "Not sure yet",
] as const;

export const timelineOptions = ["ASAP", "1–3 months", "3–6 months", "Flexible"] as const;

export const channelOptions = ["WhatsApp", "Phone call", "Email"] as const;

export const callTimeOptions = [
  "Any time",
  "Morning (9 am – 12 pm)",
  "Afternoon (12 – 4 pm)",
  "Evening (4 – 7 pm)",
] as const;

export const nextSteps = [
  { title: "We review your brief", text: "Within one business day." },
  { title: "Free 30-minute call", text: "On Google Meet, phone or WhatsApp." },
  { title: "Written proposal", text: "Scope, timeline and fixed quote in 3–5 days." },
];

export const progressLabels = ["1 · Project", "2 · Details", "3 · About you"];

export const serviceLabel = (v: string) => serviceOptions.find((o) => o.value === v)?.label ?? v;
export const stageLabel = (v: string) => stageOptions.find((o) => o.value === v)?.label ?? v;
