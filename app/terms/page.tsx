import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: `The terms that apply when you use ${site.domain} or enquire about working with ${legal.companyName}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        path="/terms"
        crumbs={[{ name: "Home", href: "/" }, { name: "Terms of service" }]}
        title="Terms of service"
        lead="The terms that apply when you use this website or enquire about working with us."
        facts={[
          ["Applies to", site.domain],
          ["Company", legal.companyName],
          ["Last updated", legal.lastUpdated],
        ]}
      />
      <div className="wrap">
        <div className="prose">
          <h2>About these terms</h2>
          <p>
            {site.domain} is operated by {legal.companyName} (&quot;{site.name}&quot;,
            &quot;we&quot;, &quot;us&quot;), of {legal.address}. By using this website you agree to
            these terms. If you do not agree, please do not use it.
          </p>

          <h2>Using this website</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use this website unlawfully or in a way that harms us or anyone else;</li>
            <li>submit false information or impersonate another person or organisation;</li>
            <li>send spam, malicious code or automated requests through our forms;</li>
            <li>attempt to gain unauthorised access to, disrupt or overload this website.</li>
          </ul>

          <h2>Information on this website</h2>
          <p>
            The content on this website is general information about our services. We work to keep
            it accurate and up to date, but it may change without notice. Nothing on this website is
            an offer capable of acceptance, a binding quotation or professional advice. Service
            descriptions, timelines and budget ranges are indicative only.
          </p>

          <h2>Enquiries and consultations</h2>
          <p>
            Submitting a project brief or attending a free consultation does not create a contract
            or oblige either of us to continue. We may decline any enquiry. Any estimate given
            before a written proposal is accepted is indicative only.
          </p>

          <h2>Projects</h2>
          <p>
            Each engagement is governed by its own written proposal or agreement, which sets out
            scope, timeline, fees, payment, ownership of deliverables, confidentiality and support.
            If that document conflicts with these terms, that document applies to the engagement.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless stated otherwise, the content, design, text, graphics, logos and code of this
            website belong to {legal.companyName} or its licensors. You may view and share pages for
            personal or internal business use, but you may not copy, modify or reuse them
            commercially without our written permission. Third-party names and trademarks belong to
            their respective owners.
          </p>

          <h2>Your submissions</h2>
          <p>
            You are responsible for the information you send us and confirm that you are entitled to
            share it. We use it to respond to your enquiry as described in our{" "}
            <Link href="/privacy">privacy policy</Link>. If you need confidentiality before sharing
            sensitive details, ask us for a non-disclosure agreement first.
          </p>

          <h2>Third-party links and services</h2>
          <p>
            This website may link to or rely on services run by others. We do not control them and
            are not responsible for their content, availability or practices.
          </p>

          <h2>Disclaimer</h2>
          <p>
            This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To
            the fullest extent permitted by law, we make no warranties about it, including that it
            will be uninterrupted, error-free or free of harmful components.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, we are not liable for any indirect, incidental,
            special or consequential loss, or for loss of profit, revenue, data or goodwill, arising
            from your use of or inability to use this website. Nothing in these terms excludes
            liability that cannot be excluded by law. Liability for a project is governed by the
            agreement for that project.
          </p>

          <h2>Indemnity</h2>
          <p>
            You agree to compensate us for loss and reasonable costs caused by your breach of these
            terms or your unlawful use of this website.
          </p>

          <h2>Governing law and jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Subject to any applicable law, the courts
            at {legal.jurisdictionCity}, Maharashtra have exclusive jurisdiction over any dispute
            arising from them.
          </p>

          <h2>Changes and severability</h2>
          <p>
            We may update these terms from time to time. The latest version will always be on this
            page, and continuing to use the website means you accept it. If any part of these terms
            is found unenforceable, the rest continues to apply.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or by post to {legal.companyName},{" "}
            {legal.address}.
          </p>
        </div>
      </div>
      <CTABand />
    </>
  );
}
