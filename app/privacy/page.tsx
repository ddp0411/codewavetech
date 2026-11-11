import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${legal.companyName} collects, uses, shares and protects your personal data, and how to exercise your rights under India's Digital Personal Data Protection Act, 2023.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { grievance } = legal;

  return (
    <>
      <PageHero
        path="/privacy"
        crumbs={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]}
        title="Privacy policy"
        lead="How we collect, use, share and protect your personal data, and the choices you have."
        facts={[
          ["Applies to", site.domain],
          ["Company", legal.companyName],
          ["Last updated", legal.lastUpdated],
        ]}
      />
      <div className="wrap">
        <div className="prose">
          <h2>Who we are</h2>
          <p>
            {legal.companyName} (&quot;{site.name}&quot;, &quot;we&quot;, &quot;us&quot;), of{" "}
            {legal.address}, operates {site.domain}. We decide why and how personal data collected
            through this website is used, and we act as the Data Fiduciary for that data under the
            Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;).
          </p>
          <p>
            This policy covers this website and enquiries made through it. Personal data inside
            software we build or run for a client is handled under our agreement with that client.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Your project brief:</strong> the services you are interested in, project
              stage, budget range, timeline, project description and any website or app link.
            </li>
            <li>
              <strong>Your contact details:</strong> name, company or department, email address,
              mobile number, preferred way to be contacted and best time to call.
            </li>
            <li>
              <strong>Your consent:</strong> confirmation that you agreed to be contacted about your
              request.
            </li>
            <li>
              <strong>Technical data:</strong> your IP address and basic request information, used
              to keep the site secure and limit spam.
            </li>
          </ul>
          <p>Please do not include sensitive personal information in your project description.</p>

          <h2>Browser storage</h2>
          <p>
            We store two things in your own browser: a draft of your project brief, so you do not
            lose your answers, and your light or dark theme choice. The draft is removed when you
            submit the form, and you can clear both through your browser settings. We do not use
            advertising cookies or analytics tools on this website at present.
          </p>
          <p>
            If Google reCAPTCHA is enabled on the contact form to block automated spam, Google may
            collect device and usage information under its own privacy policy.
          </p>

          <h2>Why we use your personal data</h2>
          <ul>
            <li>To review your request and contact you about it through the channel you chose.</li>
            <li>To arrange a consultation and prepare a proposal or quotation.</li>
            <li>To keep a record of your enquiry and our communication with you.</li>
            <li>To protect this website against spam, misuse and security threats.</li>
            <li>To comply with applicable law.</li>
          </ul>
          <p>
            We process this data based on the consent you give on the contact form, and where the
            DPDP Act otherwise permits, such as when you voluntarily give us information for a
            specific purpose or when the law requires it. We do not sell your personal data and we
            do not use it for unrelated marketing.
          </p>

          <h2>Who we share it with</h2>
          <p>
            We share personal data only with service providers that help us run this website and
            answer your request, and only as far as they need it:
          </p>
          <ul>
            <li>our website hosting provider;</li>
            <li>ntfy, the notification service that alerts our team to a new brief;</li>
            <li>Google, if reCAPTCHA is enabled;</li>
            <li>
              customer-management and messaging tools such as Zoho and WhatsApp, if we use them to
              manage or respond to your enquiry.
            </li>
          </ul>
          <p>
            We may also disclose personal data when required by law or by a court or government
            authority. Some providers may process data outside India, subject to any restrictions
            the Government of India places on such transfers.
          </p>

          <h2>How long we keep it</h2>
          <p>
            If your brief does not lead to a project, we keep it for {legal.briefRetention} after
            our last contact with you, and then delete it unless you ask us to delete it sooner. If
            it leads to a project, we keep the related records for the length of our engagement and
            for as long as tax, accounting or other laws require. If you withdraw your consent, we
            stop using your data and delete it unless the law requires us to keep it.
          </p>

          <h2>How we protect it</h2>
          <p>
            We use reasonable technical and organisational safeguards, including encrypted
            connections, restricted access and spam protection. No method of transmission or storage
            is completely secure. If a personal data breach occurs, we will notify the Data
            Protection Board of India and affected individuals as the law requires.
          </p>

          <h2>Your rights</h2>
          <p>Subject to the DPDP Act, you can:</p>
          <ul>
            <li>ask for a summary of the personal data we hold about you and how we use it;</li>
            <li>ask us to correct, complete, update or erase your personal data;</li>
            <li>withdraw your consent at any time, as easily as you gave it;</li>
            <li>raise a grievance with us about how we handled your data; and</li>
            <li>
              nominate another person to exercise your rights in the event of death or incapacity.
            </li>
          </ul>
          <p>
            To use any of these rights, contact our {grievance.role} using the details below.
            Withdrawing consent does not affect processing that took place before you withdrew it.
          </p>

          <h2>Children</h2>
          <p>
            This website is intended for businesses and government bodies and is not directed at
            anyone under 18. We do not knowingly collect personal data from children. If you believe
            a child has sent us personal data, please contact us and we will delete it.
          </p>

          <h2>Grievances and contact</h2>
          <ul>
            <li>
              <strong>{grievance.role}</strong>, {legal.companyName}
            </li>
            <li>
              Email: <a href={`mailto:${grievance.email}`}>{grievance.email}</a>
            </li>
            <li>
              Phone: <a href={`tel:${grievance.phoneHref}`}>{grievance.phoneDisplay}</a>
            </li>
            <li>Address: {legal.address}</li>
          </ul>
          <p>
            We aim to respond to grievances within 30 days. If you are not satisfied after using
            this process, you may approach the Data Protection Board of India.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The latest version will always be on this
            page, with the date it was last updated.
          </p>
        </div>
      </div>
      <CTABand />
    </>
  );
}
