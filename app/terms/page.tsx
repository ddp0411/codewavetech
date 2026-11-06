import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: `The terms that apply when you use ${site.domain} or work with ${site.name}.`,
  path: "/terms",
});

/** PLACEHOLDER legal copy. Replace with terms reviewed by your legal advisor before launch. */
export default function TermsPage() {
  return (
    <>
      <PageHero
        path="/terms"
        crumbs={[{ name: "Home", href: "/" }, { name: "Terms of service" }]}
        title="Terms of service"
        lead="The terms that apply when you use this website or work with us."
        facts={[
          ["Applies to", site.domain],
          ["Project terms", "Set in each written proposal"],
          ["Contact", site.email],
        ]}
      />
      <div className="wrap">
        <div className="prose">
          <p>
            <strong>Placeholder.</strong> This page will hold the full terms of service.
          </p>
          <h2>Using this website</h2>
          <p>
            The content on this site is for general information. We work to keep it accurate, but it
            does not form an offer or a contract.
          </p>
          <h2>Projects</h2>
          <p>
            Every engagement is governed by its own written proposal covering scope, timeline,
            payments, ownership and support.
          </p>
          <h2>Questions</h2>
          <p>
            Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
      <CTABand />
    </>
  );
}
