/** FAQ content, verbatim from the reference `FAQ` object. */

export interface FaqItem {
  q: string;
  a: string;
}

export const faq: Record<"general" | "process" | "contact", FaqItem[]> = {
  general: [
    {
      q: "What happens in the free consultation?",
      a: "We talk through your business, the problem you want to solve and your budget. You leave with a recommended approach, a rough timeline and a cost range.",
    },
    {
      q: "How much does a website or app cost?",
      a: "It depends on scope. You get a written, itemised estimate after the discovery call, before any work begins.",
    },
    {
      q: "Do you work with government departments?",
      a: "Yes. We build GIGW 3.0 compliant portals with Aadhaar eKYC, DigiLocker, e-Sign and government payment gateways, and support STQC and CERT-In audits.",
    },
    {
      q: "Who owns the code after launch?",
      a: "You do. Source code, design files and admin access are handed over at launch.",
    },
    {
      q: "Do you offer support after launch?",
      a: "Yes, through annual maintenance contracts covering updates, bug fixes, backups, monitoring and 24/7 technical support.",
    },
  ],
  process: [
    {
      q: "How often will I see progress?",
      a: "Every week. Each sprint ends with a demo link you can open on your phone.",
    },
    {
      q: "What if I want changes midway?",
      a: "Small changes fit into the next sprint. Larger ones get a short written change estimate before we start.",
    },
    {
      q: "How are payments structured?",
      a: "Fixed projects are paid in milestones, usually 30% at start and the rest across delivery. Dedicated developers are billed monthly.",
    },
  ],
  contact: [
    {
      q: "Is the consultation really free?",
      a: "Yes. There's no charge and no obligation to continue.",
    },
    {
      q: "Can you sign an NDA?",
      a: "Yes. Mention it in your brief and we'll send one before the call.",
    },
    {
      q: "I don't know exactly what I need. Should I still write?",
      a: 'Yes. Choose "Just an idea" in step 1 and describe the problem. Working out the right solution is part of the call.',
    },
  ],
};

/**
 * Answer-first FAQs for a service detail page, built from the service data so
 * they never drift from what the page shows. Each answer leads with the direct
 * answer (for AI search citations) and is emitted as FAQPage JSON-LD.
 */
export function serviceFaq(s: {
  title: string;
  idealFor: string;
  technologies: string[];
  items: string[];
}): FaqItem[] {
  return [
    {
      q: `What does CodeWaveTech's ${s.title} service include?`,
      a: `CodeWaveTech's ${s.title} service covers ${s.items.length} offerings for businesses across India: ${s.items.join("; ")}.`,
    },
    {
      q: `Who is ${s.title} for?`,
      a: s.idealFor,
    },
    {
      q: `Which technologies do you use for ${s.title}?`,
      a: `We work with ${s.technologies.join(", ")}. We recommend the right stack for your project during the free 30-minute consultation.`,
    },
    {
      q: `How much does ${s.title} cost?`,
      a: "It depends on scope. You get a written, itemised estimate after a free 30-minute consultation, before any work begins. Fixed projects are paid in milestones, usually 30% at the start and the rest across delivery.",
    },
    {
      q: "What support do I get after launch?",
      a: "Fixed-scope projects include 3 months of free support after launch. After that, an annual maintenance contract covers updates, bug fixes, backups, monitoring and 24/7 technical support. Source code, design files and admin access are handed over to you at launch.",
    },
  ];
}
