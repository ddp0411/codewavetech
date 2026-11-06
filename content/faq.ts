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
