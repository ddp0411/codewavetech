"use client";

import { useEffect, useRef } from "react";
import { GhostButton } from "@/components/ui/GhostButton";
import { serviceLabel, stageLabel } from "@/content/contact";
import type { BriefValues } from "@/lib/validation";

export interface BriefResult {
  reference: string;
  values: BriefValues;
}

export function summaryRows(v: BriefValues): [string, string][] {
  const rows: [string, string][] = [
    ["Services", v.services.map(serviceLabel).join(", ")],
    ["Stage", stageLabel(v.stage)],
    ["Budget", v.budget],
    ["Launch", v.timeline || "Flexible"],
    ["Name", v.name.trim() + (v.company.trim() ? ` · ${v.company.trim()}` : "")],
    ["Email", v.email.trim()],
    ["Mobile", `+91 ${v.phone}`],
    ["Contact via", `${v.channel} · ${v.callTime}`],
  ];
  if (v.link.trim()) rows.push(["Link", v.link.trim()]);
  if (v.message.trim()) rows.push(["Project", v.message.trim()]);
  return rows;
}

export function SuccessSummary({ result, onReset }: { result: BriefResult; onReset: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const { values } = result;
  const first = values.name.trim().split(/\s+/)[0];

  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <div className="done-card">
      <span className="big" aria-hidden="true">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 12.5l4 4 8-9" />
        </svg>
      </span>
      <h2 ref={heading} tabIndex={-1}>
        Thanks, {first}. Your brief is ready.
      </h2>
      <p style={{ color: "var(--ink-2)" }}>
        We&apos;ll reach you on {values.channel} within one business day.
      </p>
      <span className="ref">
        <span className="sr-only">Reference number </span>
        {result.reference}
      </span>
      <dl className="summary">
        {summaryRows(values).map(([k, v]) => (
          <div key={k} style={{ display: "contents" }}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <GhostButton onClick={onReset}>Start another brief</GhostButton>
    </div>
  );
}
