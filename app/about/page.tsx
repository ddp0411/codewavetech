import { PageHero } from "@/components/ui/PageHero";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PathIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTABand } from "@/components/layout/CTABand";
import { teamAreas } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "CodeWaveTech builds and looks after the software behind restaurants, shops, clinics, schools, startups and government departments. Design, development, hosting and support under one roof.",
  path: "/about",
});

const promises = [
  {
    title: "Plain language",
    text: "No jargon. You'll always understand what we're building and why.",
    icon: '<path d="M4 6h16M4 12h10M4 18h7"/>',
  },
  {
    title: "Fixed quotes",
    text: "A written estimate before work starts, with no surprise invoices.",
    icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  },
  {
    title: "You own it",
    text: "Code, designs and admin access are handed over at launch.",
    icon: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0"/>',
  },
  {
    title: "We stay",
    text: "Maintenance and support continue long after go-live.",
    icon: '<path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/>',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        path="/about"
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        title="One team for everything your business runs on"
        lead="CodeWaveTech builds and looks after the software behind restaurants, shops, clinics, schools, startups and government departments."
        facts={[
          ["Headquarters", "India"],
          ["Service areas", "14"],
          ["Industries", "9"],
          ["Support", "24/7 on AMC"],
        ]}
      />
      <div className="wrap">
        <div className="split">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2>Business owners deserve a tech partner who stays.</h2>
            <p>
              Too many businesses get a website from a freelancer, a POS from one vendor and an app
              from another, and then nobody is around when something breaks.
            </p>
            <p>
              We do design, development, hosting and support under one roof. The team that builds
              your software is the team that answers when you call.
            </p>
            <div className="cta-row">
              <ArrowButton href="/contact">Work with us</ArrowButton>
            </div>
          </div>
          <div className="collage" aria-hidden="true">
            <div className="w" style={{ left: "8%", top: "10%" }}>
              <small>Deploy</small>
              <code>✓ build passed · 42s</code>
            </div>
            <div className="w" style={{ right: "8%", top: "28%" }}>
              <small>Invoice #1042</small>GST 18% · ₹ 23,600
            </div>
            <div className="w" style={{ left: "12%", top: "50%" }}>
              <small>WhatsApp bot</small>&quot;Your order is on the way&quot;
            </div>
            <div className="w" style={{ right: "10%", bottom: "12%" }}>
              <small>Portal</small>
              <span lang="hi">हिन्दी</span> · English
            </div>
          </div>
        </div>
      </div>
      <section aria-labelledby="promises-title">
        <div className="wrap">
          <SectionHeader
            id="promises-title"
            eyebrow="Our promises"
            title="What you can expect from us"
            lead="These are the promises we hold every project to."
          />
          <ul className="values">
            {promises.map((p) => (
              <li key={p.title}>
                <i>
                  <PathIcon paths={p.icon} size={18} />
                </i>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="tight" aria-labelledby="team-title">
        <div className="wrap">
          <SectionHeader
            id="team-title"
            eyebrow="Our team"
            title="One team, from first call to long after launch"
            lead="Every project is handled by people who work together across design, development, testing and support."
          />
          <ul className="values">
            {teamAreas.map((a) => (
              <li key={a.title}>
                <i>
                  <PathIcon paths={a.icon} size={18} />
                </i>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABand />
    </>
  );
}
