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
  /** Phone / WhatsApp numbers. `href` is the E.164 form used for tel: links and JSON-LD. */
  phones: [
    { display: "+91 91303 04095", href: "+919130304095" },
    { display: "+91 99230 11792", href: "+919923011792" },
  ],
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

export interface TeamArea {
  title: string;
  text: string;
  /** Inner SVG markup for a 24×24 viewBox (stroke-based). */
  icon: string;
}

/** About page: what the team does (deliberately no individual names or photos). */
export const teamAreas: TeamArea[] = [
  {
    title: "Design",
    text: "Wireframes, prototypes and interfaces your customers find easy to use.",
    icon: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="15.5" cy="10" r="1"/>',
  },
  {
    title: "Engineering",
    text: "Web, mobile and backend developers who build and document your software.",
    icon: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"/>',
  },
  {
    title: "Quality and security",
    text: "Testing, speed checks and security hardening before anything goes live.",
    icon: '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
  },
  {
    title: "Client support",
    text: "Clear updates during the project and dependable help after launch.",
    icon: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  },
];
