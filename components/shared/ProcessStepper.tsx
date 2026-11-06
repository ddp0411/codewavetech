"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { processSteps } from "@/content/process";
import { CheckIcon } from "@/components/ui/Icons";

/** Tabbed four-step process: step list (tabs) + dark stage panel (tabpanel). */
export function ProcessStepper({ label = "Our process" }: { label?: string }) {
  const [cur, setCur] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = processSteps.length;
  const step = processSteps[cur]!;

  const select = (i: number) => {
    const n = (i + total) % total;
    setCur(n);
    tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = {
      ArrowDown: cur + 1,
      ArrowRight: cur + 1,
      ArrowUp: cur - 1,
      ArrowLeft: cur - 1,
      Home: 0,
      End: total - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };

  return (
    <div className="process">
      <div
        className="steps"
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={onKey}
      >
        {processSteps.map((p, i) => (
          <button
            key={p.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            className="step"
            role="tab"
            type="button"
            id={`${uid}-tab-${i}`}
            aria-selected={i === cur}
            aria-controls={`${uid}-panel`}
            tabIndex={i === cur ? 0 : -1}
            onClick={() => setCur(i)}
          >
            <b aria-hidden="true">0{i + 1}</b>
            <span>
              <span className="t">{p.title}</span>
              <span className="s">{p.sub}</span>
            </span>
          </button>
        ))}
      </div>
      <div
        className="stage"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${cur}`}
        tabIndex={0}
      >
        <span className="num">
          STEP 0{cur + 1} / 0{total}
        </span>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        <ul>
          {step.deliverables.map((x) => (
            <li key={x}>
              <CheckIcon size={16} />
              {x}
            </li>
          ))}
        </ul>
        <span className="dur">Typical duration · {step.duration}</span>
      </div>
    </div>
  );
}
