import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessStepper } from "@/components/shared/ProcessStepper";
import { FAQ } from "@/components/shared/FAQ";
import { CTABand } from "@/components/layout/CTABand";
import { engagementModels } from "@/content/process";
import { faq } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How we work: process & engagement models",
  description:
    "A clear four-step path from first call to launch day: discovery, plan and design, build and test, launch and support. Fixed-scope projects, dedicated developers or annual maintenance.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        path="/how-we-work"
        crumbs={[{ name: "Home", href: "/" }, { name: "How we work" }]}
        title="A clear path from first call to launch day"
        lead="Fixed scope, weekly demos and written estimates. You always know what's being built, what it costs and when it ships."
        facts={[
          ["First call", "Free, 30 min"],
          ["Proposal", "3–5 days"],
          ["Progress updates", "Weekly demos"],
          ["Code ownership", "Yours"],
        ]}
      />
      <div className="wrap">
        <h2 className="sr-only">Our four-step process</h2>
        <ProcessStepper />
      </div>
      <section aria-labelledby="models-title">
        <div className="wrap">
          <SectionHeader
            id="models-title"
            eyebrow="Engagement models"
            title="Three ways to work together"
            lead="Priced by scope, with a written estimate before any work starts."
          />
          <div className="models">
            {engagementModels.map((m) => (
              <div key={m.title} className={m.highlight ? "model hl" : "model"}>
                <Eyebrow>{m.eyebrow}</Eyebrow>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <ul>
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="tight" aria-labelledby="process-faq-title">
        <div className="wrap">
          <div className="faqsplit">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="h2" id="process-faq-title" style={{ marginTop: 12 }}>
                Questions about the process
              </h2>
            </div>
            <FAQ items={faq.process} />
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
