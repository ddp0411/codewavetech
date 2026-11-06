import Link from "next/link";
import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const problems: { label: string; style: CSSProperties }[] = [
  { label: "Slow website", style: { left: "36%", top: "12%", transform: "rotate(8deg)" } },
  { label: "Manual GST billing", style: { left: "6%", top: "34%", transform: "rotate(-9deg)" } },
  { label: "No mobile app", style: { left: "30%", top: "56%", transform: "rotate(6deg)" } },
  {
    label: "Data in 5 spreadsheets",
    style: { left: "8%", top: "77%", transform: "rotate(-3deg)" },
  },
];

const miniSteps = [
  ["Discovery call", "Goals, users and budget"],
  ["Plan & design", "Scope, wireframes, estimate"],
  ["Build & test", "Sprints with weekly demos"],
  ["Launch & support", "Go-live, AMC, monitoring"],
] as const;

export function EntryCards() {
  return (
    <section aria-labelledby="start-title">
      <div className="wrap">
        <SectionHeader
          id="start-title"
          eyebrow="Get started"
          title="Start where you are. We'll guide you to the right next step."
          lead="Whether you're fixing a problem, comparing partners or ready to build, there's a clear way in."
        />
        <div className="trio">
          <article className="card">
            <span className="tag">Fix what&apos;s broken</span>
            <h3>My tech is holding the business back</h3>
            <p>
              Slow website, manual billing, no online orders, and tools that don&apos;t talk to each
              other.
            </p>
            <Link className="link cta" href="/services">
              See what we fix →
            </Link>
            <div className="illus" aria-hidden="true">
              {problems.map((p) => (
                <span key={p.label} className="prob" style={p.style}>
                  {p.label}
                </span>
              ))}
            </div>
          </article>
          <article className="card">
            <span className="tag">Compare partners</span>
            <h3>I want to see how you work</h3>
            <p>
              A four-step process with a fixed plan, weekly demos and a launch you can count on.
            </p>
            <Link className="link cta" href="/how-we-work">
              Explore the process →
            </Link>
            <div className="illus" aria-hidden="true">
              <div className="mini-steps">
                {miniSteps.map(([t, s], i) => (
                  <div key={t} style={i === 3 ? { opacity: 0.55 } : undefined}>
                    <b>{i + 1}</b>
                    <span>
                      {t}
                      <small>{s}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
          <article className="card">
            <span className="tag">Ready to build</span>
            <h3>I&apos;m ready to start now</h3>
            <p>Get a clear plan, timeline and estimate in a free 30-minute consultation.</p>
            <Link className="link cta" href="/contact">
              Book free consultation →
            </Link>
            <div className="illus" aria-hidden="true">
              <div className="chatbox">
                <div className="bub me">We need a POS for 3 restaurant outlets with KOT.</div>
                <div className="bub us">
                  Got it. Do you also need online ordering and GST invoices?
                </div>
                <div className="bub me">Yes, and a WhatsApp bot for orders.</div>
                <div className="bub us typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
