import { ArrowButton } from "@/components/ui/ArrowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ComplianceChips } from "@/components/shared/ComplianceChips";

export function GovBand() {
  return (
    <section className="tight" aria-labelledby="gov-band-title">
      <div className="wrap">
        <div className="gov-band">
          <div>
            <Eyebrow>Government &amp; e-Governance</Eyebrow>
            <h2 id="gov-band-title">
              Citizen portals and department systems, built to government standards.
            </h2>
            <p>
              From Gram Panchayat websites to state-level e-Office, land records and grievance
              portals. Bilingual by default, accessible, audited and hosted where your department
              requires.
            </p>
            <ArrowButton href="/government-solutions" variant="on-dark">
              Explore government solutions
            </ArrowButton>
          </div>
          <ComplianceChips />
        </div>
      </div>
    </section>
  );
}
