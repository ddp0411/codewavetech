import { site } from "@/content/site";
import { detailServices, linkServices } from "@/content/services";
import { industries } from "@/content/industries";
import { faq } from "@/content/faq";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt (https://llmstxt.org): a plain-Markdown summary of the site for
 * AI assistants and answer engines. Built from the same content files as the
 * pages, so it stays in sync. Rendered once at build time.
 */
export const dynamic = "force-static";

export function GET() {
  const link = (title: string, path: string, note: string) =>
    `- [${title}](${absoluteUrl(path)}): ${note}`;

  const allFaq = [...faq.general, ...faq.process, ...faq.contact];

  const body = `# ${site.name}

> ${site.name} is an ${site.tagline}. ${site.description} One team designs, builds and maintains websites, mobile apps, POS and business software, AI automation and GIGW 3.0 compliant government portals. Clients get a free 30-minute consultation, a written itemised quote, weekly demos and full ownership of the source code.

## Key facts

- Location: India (serves clients across India)
- Services: ${detailServices.length + linkServices.length} service areas, 130+ individual offerings
- Engagement models: fixed-scope projects (milestone payments, 3 months free support), dedicated developers (hourly or monthly), annual maintenance contracts (AMC)
- Government work: GIGW 3.0 compliant portals, Aadhaar eKYC, DigiLocker, e-Sign, government payment gateways, STQC and CERT-In audit support
- Hours: ${site.hours}
- Contact: ${site.email}, ${site.phones.map((p) => p.display).join(", ")} (phone and WhatsApp)
- Start a project: ${absoluteUrl("/contact")}

## Main pages

${link("Home", "/", "overview of services, process, industries and FAQs")}
${link("All services", "/services", "the full list of service areas and what each includes")}
${link("Government & e-Governance", "/government-solutions", "citizen portals, e-Office, MIS dashboards and compliance")}
${link("Industries", "/industries", "solutions by industry")}
${link("How we work", "/how-we-work", "four-step process and engagement models")}
${link("About", "/about", "who we are and how we work with clients")}
${link("Contact", "/contact", "free consultation and project brief form")}

## Services

${detailServices.map((s) => link(s.title, `/services/${s.slug}`, `${s.intro} Ideal for: ${s.idealFor}`)).join("\n")}
${linkServices.map((s) => link(s.title, s.href, s.description)).join("\n")}

## Industries

${industries.map((i) => `- ${i.name}: ${i.description} Examples: ${i.examples.join("; ")}.`).join("\n")}

## FAQ

${allFaq.map((f) => `- **${f.q}** ${f.a}`).join("\n")}

## Optional

${link("Privacy policy", "/privacy", "how personal data is handled under India's DPDP Act, 2023")}
${link("Terms of service", "/terms", "terms for using the site and enquiring about work")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
