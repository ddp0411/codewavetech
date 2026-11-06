import { serviceLabel, stageLabel } from "@/content/contact";
import type { ProjectBrief } from "./validation";

/** Label/value rows for a brief. Used in the webhook payload `summary`. */
export function briefRows(b: ProjectBrief): [string, string][] {
  return [
    ["Services", b.services.map(serviceLabel).join(", ")],
    ["Stage", stageLabel(b.stage)],
    ["Budget", b.budget],
    ["Launch", b.timeline],
    ["Name", b.name],
    ["Company / department", b.company || "—"],
    ["Email", b.email],
    ["Mobile", `+91 ${b.phone}`],
    ["Contact via", `${b.channel} · ${b.callTime}`],
    ["Existing link", b.link || "—"],
    ["Project", b.message || "—"],
  ];
}
