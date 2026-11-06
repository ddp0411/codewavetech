/**
 * Company details used across the site. Change them here once.
 * Items marked PLACEHOLDER must be replaced before launch (see README).
 */

export const site = {
  name: "CodeWaveTech",
  domain: "codewavetech.in",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://codewavetech.in").replace(/\/$/, ""),
  tagline: "India-based software & IT services company",
  description:
    "Web, mobile, AI, business software and e-governance solutions for businesses and government across India.",
  email: "hello@codewavetech.in",
  /** PLACEHOLDER: replace with the real phone / WhatsApp number. */
  phone: "+91 XXXXX XXXXX",
  /** E.164 version of the phone number for tel: links. PLACEHOLDER (leave empty until known). */
  phoneHref: "",
  hours: "Mon – Sat, 10 am – 7 pm IST",
  hoursShort: { days: "Mon – Sat", time: "10 am – 7 pm IST" },
  /** PLACEHOLDER: add the registered office address when available. */
  address: null as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  },
  /** PLACEHOLDER: add social profile URLs (used in Organization JSON-LD). */
  sameAs: [] as string[],
  badges: ["GIGW 3.0", "DPDP aligned", "Made in India"],
  bookingBadge: { em: "Now booking", text: "New projects for Q1 2027" },
  copyrightYear: 2026,
};

export const techStack = [
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "Laravel",
  "Django",
  ".NET",
  "Shopify",
  "WooCommerce",
  "Odoo",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Power BI",
  "Figma",
  "n8n",
];

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/founder.jpg". Leave undefined to show the placeholder tile. */
  photo?: string;
  placeholder?: boolean;
}

/** PLACEHOLDER team list. Add real names, roles and photos when available. */
export const team: TeamMember[] = [
  { name: "Founder name", role: "Founder & CEO", placeholder: true },
  { name: "Name", role: "Head of Engineering", placeholder: true },
  { name: "Name", role: "Design Lead", placeholder: true },
  { name: "Name", role: "Client Success", placeholder: true },
];
