import type { ProjectBrief } from "@/lib/validation";

export const REF = "CWT-261106-4092";

export function makeBrief(overrides: Partial<ProjectBrief> = {}): ProjectBrief {
  return {
    services: ["web", "ai"],
    stage: "plan",
    budget: "₹2L – 5L",
    timeline: "1–3 months",
    message: "",
    link: "",
    name: "Asha Rao",
    company: "",
    email: "asha@example.in",
    phone: "98765 43210",
    channel: "WhatsApp",
    callTime: "Evening (4 – 7 pm)",
    consent: true,
    website: "",
    ...overrides,
  };
}
