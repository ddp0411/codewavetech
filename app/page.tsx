import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { EntryCards } from "@/components/home/EntryCards";
import { WhyUs } from "@/components/home/WhyUs";
import { GovBand } from "@/components/home/GovBand";
import { Testimonials } from "@/components/home/Testimonials";
import { ConsultBand } from "@/components/home/ConsultBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "@/components/shared/ServiceGrid";
import { ProcessStepper } from "@/components/shared/ProcessStepper";
import { IndustryTiles } from "@/components/shared/IndustryTile";
import { FAQ } from "@/components/shared/FAQ";
import { CTABand } from "@/components/layout/CTABand";
import { coreServices } from "@/content/services";
import { industries } from "@/content/industries";
import { faq } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "CodeWaveTech · Software & IT services company in India",
  absoluteTitle: true,
  description:
    "Websites, apps, POS, AI and government portals, designed, built and maintained by one team. Fixed, written quotes, weekly demos and you own the code.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <EntryCards />
      <WhyUs />

      <section className="tight" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHeader
            id="services-title"
            eyebrow="Services"
            title="What we build for you, from first idea to daily support"
            lead="Six core services cover most projects. Eight more handle everything from branding to IoT."
            actions={
              <Link className="link" href="/services">
                View all 14 services →
              </Link>
            }
          />
          <ServiceGrid services={coreServices} />
        </div>
      </section>

      <section className="tight" aria-labelledby="process-title">
        <div className="wrap">
          <SectionHeader
            id="process-title"
            eyebrow="How we work"
            title="A clear four-step path from idea to launch"
            lead="Fixed scope, weekly demos and written estimates at every stage."
            actions={
              <Link className="link" href="/how-we-work">
                Engagement models →
              </Link>
            }
          />
          <ProcessStepper />
        </div>
      </section>

      <GovBand />

      <section className="tight" aria-labelledby="industries-title">
        <div className="wrap">
          <SectionHeader
            id="industries-title"
            eyebrow="Industries"
            title="Built for the way your industry works"
            actions={
              <Link className="link" href="/industries">
                See industry solutions →
              </Link>
            }
          />
          <IndustryTiles list={industries} />
        </div>
      </section>

      <Testimonials />
      <ConsultBand />

      <section className="tight" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="faqsplit">
            <SectionHeader
              stacked
              id="faq-title"
              eyebrow="FAQ"
              title="Frequently asked questions"
              lead="Can't find your answer? Our team replies within one business day."
              actions={
                <Link className="link" href="/contact">
                  Ask us directly →
                </Link>
              }
            />
            <FAQ items={faq.general} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
