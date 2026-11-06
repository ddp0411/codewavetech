import { PageHero } from "@/components/ui/PageHero";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon } from "@/components/ui/Icons";
import { ComplianceChips } from "@/components/shared/ComplianceChips";
import { CTABand } from "@/components/layout/CTABand";
import { governmentGroups, governmentStats } from "@/content/government";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Government & e-Governance solutions",
  description:
    "GIGW 3.0 and WCAG compliant citizen portals and department systems with Aadhaar eKYC, DigiLocker and e-Sign, STQC and CERT-In audit support, hosted on NIC, MeghRaj or state data centres.",
  path: "/government-solutions",
});

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        path="/government-solutions"
        crumbs={[{ name: "Home", href: "/" }, { name: "Government solutions" }]}
        title="e-Governance portals and systems for every level of government"
        lead="Ministries, state departments, district administrations, municipal corporations and Gram Panchayats. Compliant, bilingual and hosted on government infrastructure."
        actions={<ArrowButton href="/contact?service=gov">Discuss a tender or project</ArrowButton>}
        facts={[
          ["Standard", "GIGW 3.0 · WCAG"],
          ["Audits", "STQC · CERT-In"],
          ["Hosting", "NIC · MeghRaj · SDC"],
          ["Languages", "Hindi · English · regional"],
        ]}
      />
      <div className="wrap">
        <div className="gov-band">
          <div>
            <Eyebrow>Compliance first</Eyebrow>
            <h2>Built to pass audits the first time.</h2>
            <p>
              Every government project ships with GIGW 3.0 and WCAG checks, a security audit through
              a CERT-In empanelled partner, and documentation for STQC certification.
            </p>
            <div className="gov-stats">
              {governmentStats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ComplianceChips />
        </div>
      </div>
      <section aria-label="What we deliver">
        <div className="wrap">
          <div className="gov-groups">
            {governmentGroups.map((g, i) => (
              <div key={g.title} className={i < 2 ? "box span" : "box"}>
                <div className="gh">
                  <h3>{g.title}</h3>
                  <span>{g.items.length} items</span>
                </div>
                <ul>
                  {g.items.map((x) => (
                    <li key={x}>
                      <CheckIcon size={14} />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
