import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects the information you share with us, in line with India's DPDP Act.`,
  path: "/privacy",
});

/** PLACEHOLDER legal copy. Replace with a policy reviewed by your legal advisor before launch. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        path="/privacy"
        crumbs={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]}
        title="Privacy policy"
        lead="How we collect, use and protect the information you share with us."
        facts={[
          ["Applies to", site.domain],
          ["Aligned with", "DPDP Act, 2023"],
          ["Contact", site.email],
        ]}
      />
      <div className="wrap">
        <div className="prose">
          <p>
            <strong>Placeholder.</strong> This page will hold the full privacy policy. Until then,
            here is a summary of how we handle your details.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>
              Details you enter in the project brief: name, company, email, mobile and project
              information.
            </li>
            <li>
              Basic technical data, such as your IP address, used to keep the site secure and limit
              spam.
            </li>
          </ul>
          <h2>How we use it</h2>
          <p>
            Only to reply to your request, prepare a proposal and deliver the work you ask for. We
            don&apos;t sell your details. We share them only with the service providers that help us
            receive and answer your request, such as our notification and hosting services.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to correct or delete your information at any time by writing to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
      <CTABand />
    </>
  );
}
