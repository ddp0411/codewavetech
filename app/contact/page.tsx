import Script from "next/script";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ } from "@/components/shared/FAQ";
import { ProjectBriefForm } from "@/components/contact/ProjectBriefForm";
import { CopyButton } from "@/components/contact/CopyButton";
import { nextSteps } from "@/content/contact";
import { faq } from "@/content/faq";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact us: start a project brief",
  description:
    "Tell us about your project in three short steps. We reply within one business day with next steps and a time for your free 30-minute consultation.",
  path: "/contact",
});

export default function ContactPage() {
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || undefined;
  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`}
          strategy="lazyOnload"
        />
      )}
      <PageHero
        path="/contact"
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title="Tell us about your project"
        lead="Three short steps, about 2 minutes. We reply within one business day with next steps and a time for your free consultation."
        facts={[
          ["Response time", "1 business day"],
          ["Consultation", "Free, 30 min"],
          ["NDA", "On request"],
        ]}
      />
      <div className="wrap">
        <div className="contact-grid">
          <ProjectBriefForm recaptchaSiteKey={recaptchaSiteKey} />
          <aside className="aside" aria-label="Other ways to reach us">
            <div className="box next">
              <h2>What happens next</h2>
              <ol>
                {nextSteps.map((s) => (
                  <li key={s.title}>
                    <span>
                      <b>{s.title}</b>
                      <span>{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="box">
              <h2>Prefer to talk directly?</h2>
              <div className="reach">
                <div>
                  <div>
                    <small>Email</small>
                    <b>
                      <a href={`mailto:${site.email}`} style={{ textDecoration: "none" }}>
                        {site.email}
                      </a>
                    </b>
                  </div>
                  <CopyButton text={site.email} label="email address" />
                </div>
                {site.phones.map((p) => (
                  <div key={p.href}>
                    <div>
                      <small>Phone / WhatsApp</small>
                      <b>
                        <a href={`tel:${p.href}`} style={{ textDecoration: "none" }}>
                          {p.display}
                        </a>
                      </b>
                    </div>
                    <CopyButton text={p.display} label={`phone number ${p.display}`} />
                  </div>
                ))}
                <div>
                  <div>
                    <small>Office hours</small>
                    <b>{site.hours}</b>
                  </div>
                  <CopyButton text={site.hours} label="office hours" />
                </div>
              </div>
            </div>
            <div className="box accent">
              <h2>Government tender?</h2>
              <p>
                Choose &quot;Government portal&quot; in step 1 and mention the tender number.
                We&apos;ll send company documents and empanelment details with our reply.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <section aria-labelledby="contact-faq-title">
        <div className="wrap">
          <div className="faqsplit">
            <div>
              <Eyebrow>Before you send</Eyebrow>
              <h2 className="h2" id="contact-faq-title" style={{ marginTop: 12 }}>
                Common questions
              </h2>
            </div>
            <FAQ items={faq.contact} />
          </div>
        </div>
      </section>
    </>
  );
}
