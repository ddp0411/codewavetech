import { governmentGroups } from "./government";

/**
 * Service data, copied verbatim from the reference `S` array.
 * `icon` holds inner SVG markup for a 24×24 viewBox (stroke-based).
 */

export type DetailServiceKey =
  | "web"
  | "mobile"
  | "ecom"
  | "ai"
  | "pos"
  | "cloud"
  | "ux"
  | "saas"
  | "data"
  | "sec"
  | "amc"
  | "emerg";

export interface DetailService {
  kind: "detail";
  key: DetailServiceKey;
  slug: string;
  category: "core" | "more";
  title: string;
  description: string;
  intro: string;
  idealFor: string;
  technologies: string[];
  icon: string;
  items: string[];
}

export interface LinkService {
  kind: "link";
  key: "gov" | "ind";
  category: "gov";
  title: string;
  description: string;
  href: string;
  icon: string;
  count: number;
  countLabel: string;
}

export type Service = DetailService | LinkService;

export const detailServices: DetailService[] = [
  {
    kind: "detail",
    key: "web",
    slug: "web-development",
    category: "core",
    title: "Web Development",
    description: "Business websites, web apps, portals, PWAs and APIs.",
    intro:
      "Fast, secure websites and web applications, from a simple company site to customer, vendor and student portals.",
    idealFor:
      "Businesses that need a stronger online presence or want to move a manual process online.",
    technologies: [
      "React",
      "Next.js",
      "Vue",
      "Angular",
      "Node.js",
      "Laravel",
      "Django",
      ".NET",
      "WordPress",
      "Strapi",
    ],
    icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/>',
    items: [
      "Business / corporate websites",
      "Custom web application development",
      "Landing pages and single-page sites",
      "WordPress development (themes, plugins, customization)",
      "CMS development (WordPress, Strapi, headless CMS)",
      "Frontend development (React, Next.js, Vue, Angular)",
      "Backend development (Node.js, PHP/Laravel, Python/Django, .NET)",
      "Progressive Web Apps (PWA)",
      "Portal development (customer, vendor, employee, student portals)",
      "API development and third-party integration",
      "Website redesign and revamp",
      "Website speed optimization",
    ],
  },
  {
    kind: "detail",
    key: "mobile",
    slug: "mobile-app-development",
    category: "core",
    title: "Mobile App Development",
    description: "Android, iOS and cross-platform apps, published and maintained.",
    intro:
      "Native and cross-platform apps your customers and staff will actually use, published to the Play Store and App Store.",
    idealFor:
      "Delivery, booking and service businesses, and companies that want an app for field staff.",
    technologies: ["Kotlin", "Swift", "Flutter", "React Native", "Firebase"],
    icon: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    items: [
      "Android app development (Kotlin/Java)",
      "iOS app development (Swift)",
      "Cross-platform apps (Flutter, React Native)",
      "On-demand apps (food delivery, taxi, services booking)",
      "Mobile app UI/UX design",
      "App Store and Play Store publishing",
      "App maintenance and version upgrades",
    ],
  },
  {
    kind: "detail",
    key: "ecom",
    slug: "e-commerce",
    category: "core",
    title: "E-Commerce Solutions",
    description: "Stores, marketplaces, payments and shipping integrations.",
    intro:
      "Online stores and marketplaces with Indian payments and shipping built in, from a Shopify store to a multi-vendor platform.",
    idealFor: "D2C brands, retailers, wholesalers and grocery or quick-commerce businesses.",
    technologies: [
      "Shopify",
      "WooCommerce",
      "Next.js",
      "Razorpay",
      "PayU",
      "Stripe",
      "UPI",
      "Shiprocket",
      "Delhivery",
    ],
    icon: '<path d="M3 4h2l2 11h11l2-8H6"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
    items: [
      "Custom e-commerce website development",
      "Shopify store setup and customization",
      "WooCommerce development",
      "Multi-vendor marketplace (Amazon / Flipkart model)",
      "B2B e-commerce portals",
      "E-commerce mobile apps",
      "Payment gateway integration (Razorpay, PayU, Stripe, UPI)",
      "Shipping and logistics integration (Shiprocket, Delhivery)",
      "Product catalog and inventory management",
      "Quick commerce / grocery delivery platforms",
    ],
  },
  {
    kind: "detail",
    key: "ai",
    slug: "ai-automation",
    category: "core",
    title: "AI and Automation",
    description: "Chatbots, AI agents, computer vision and workflow automation.",
    intro:
      "Practical AI that saves your team hours: chatbots on WhatsApp, document reading, voice bots and automated workflows.",
    idealFor: "Teams that answer the same questions daily or move data between apps by hand.",
    technologies: [
      "OpenAI",
      "Claude",
      "LangChain",
      "Python",
      "TensorFlow",
      "n8n",
      "Zapier",
      "Make",
    ],
    icon: '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>',
    items: [
      "AI chatbot development (website, WhatsApp, Telegram)",
      "Generative AI and LLM integration (custom AI assistants)",
      "AI agents and workflow automation",
      "Machine learning model development",
      "Computer vision (face recognition, object detection, OCR)",
      "Natural language processing (text analysis, sentiment, document processing)",
      "AI voice assistants and call bots",
      "Recommendation engines (e-commerce and content)",
      "Predictive analytics",
      "Business process automation (RPA, Zapier / n8n / Make workflows)",
    ],
  },
  {
    kind: "detail",
    key: "pos",
    slug: "pos-business-software",
    category: "core",
    title: "POS and Business Software",
    description: "POS, GST billing, ERP, CRM, HRMS and management systems.",
    intro:
      "Billing, inventory and management software that fits how your business runs, with GST built in.",
    idealFor: "Restaurants, shops, clinics, schools, hotels, gyms and salons.",
    technologies: ["Odoo", "Zoho", "Salesforce", "Laravel", "React", "PostgreSQL"],
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h5"/>',
    items: [
      "Retail POS software",
      "Restaurant POS and billing (KOT, table management)",
      "Inventory and stock management",
      "GST billing and invoicing software",
      "ERP development (custom and Odoo)",
      "CRM development (custom, Zoho, Salesforce setup)",
      "HRMS and payroll software",
      "School / college management system",
      "Hospital / clinic management system",
      "Hotel booking and property management system",
      "Gym, salon and spa management software",
    ],
  },
  {
    kind: "detail",
    key: "cloud",
    slug: "cloud-hosting-devops",
    category: "core",
    title: "Cloud, Hosting and DevOps",
    description: "Hosting, domains, business email, cloud migration and DevOps.",
    intro:
      "Reliable hosting, business email and cloud infrastructure, set up properly and monitored around the clock.",
    idealFor:
      "Businesses moving off old servers or tired of downtime and expired SSL certificates.",
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Google Workspace",
      "Microsoft 365",
    ],
    icon: '<path d="M7 18a4 4 0 010-8 6 6 0 0111.5 2A3.5 3.5 0 0118 18z"/>',
    items: [
      "Shared, VPS and dedicated hosting",
      "Domain registration and management",
      "Business email setup (Google Workspace, Microsoft 365, Zoho Mail)",
      "Cloud setup and migration (AWS, Azure, Google Cloud)",
      "Managed cloud services",
      "DevOps and CI/CD pipeline setup",
      "Server management and monitoring",
      "SSL certificate setup",
      "Backup and disaster recovery",
      "Docker and Kubernetes deployment",
    ],
  },
  {
    kind: "detail",
    key: "ux",
    slug: "ui-ux-branding",
    category: "more",
    title: "UI/UX and Branding",
    description: "Figma prototypes, design systems, logos and creatives.",
    intro: "Design that makes your product easy to use and your brand easy to remember.",
    idealFor: "Startups preparing to launch and businesses refreshing an outdated look.",
    technologies: ["Figma", "Adobe Illustrator", "Photoshop", "Maze"],
    icon: '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="15.5" cy="10" r="1"/>',
    items: [
      "UI/UX design for web and mobile",
      "Wireframing and prototyping (Figma)",
      "Logo and brand identity design",
      "Design systems",
      "Graphic design (social media creatives, brochures, banners)",
      "Usability testing and UX audits",
    ],
  },
  {
    kind: "detail",
    key: "saas",
    slug: "custom-software-saas",
    category: "more",
    title: "Custom Software and SaaS",
    description: "MVPs, SaaS products, desktop apps and legacy modernisation.",
    intro:
      "Custom software and SaaS products built from idea to launch, plus modern rebuilds of old systems.",
    idealFor: "Founders validating an idea and companies stuck on legacy software.",
    technologies: ["Next.js", "Node.js", "Python", "Electron", ".NET", "PostgreSQL"],
    icon: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"/>',
    items: [
      "Custom software development",
      "SaaS product development (idea to launch)",
      "MVP development for startups",
      "Desktop application development",
      "Legacy software modernization",
      "Dashboard and admin panel development",
    ],
  },
  {
    kind: "detail",
    key: "data",
    slug: "data-analytics",
    category: "more",
    title: "Data and Analytics",
    description: "Power BI and Tableau dashboards, databases and migration.",
    intro: "Turn scattered spreadsheets into dashboards that show what's working and what isn't.",
    idealFor: "Owners and managers who make decisions from monthly Excel exports.",
    technologies: ["Power BI", "Tableau", "SQL Server", "PostgreSQL", "Python"],
    icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    items: [
      "Data analytics and reporting",
      "Power BI / Tableau dashboards",
      "Database design and management",
      "Data migration",
      "Web scraping and data extraction",
    ],
  },
  {
    kind: "detail",
    key: "sec",
    slug: "cybersecurity-testing",
    category: "more",
    title: "Cybersecurity and Testing",
    description: "Security audits, malware cleanup, QA and load testing.",
    intro:
      "Find and fix security gaps before attackers do, and test software properly before it reaches customers.",
    idealFor: "Sites that have been hacked, and products preparing for launch or audit.",
    technologies: ["OWASP ZAP", "Burp Suite", "Selenium", "Playwright", "JMeter"],
    icon: '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
    items: [
      "Website security audit",
      "Malware removal and website recovery",
      "Software testing and QA (manual and automated)",
      "Performance and load testing",
      "Security hardening for servers and apps",
    ],
  },
  {
    kind: "detail",
    key: "amc",
    slug: "maintenance-support",
    category: "more",
    title: "Maintenance and Support",
    description: "AMC, bug fixes, 24/7 support and dedicated developers.",
    intro:
      "Keep your website, app and software secure and up to date, or add our developers to your team.",
    idealFor: "Anyone whose original developer is no longer available.",
    technologies: ["Uptime monitoring", "Automated backups", "Jira", "Slack"],
    icon: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
    items: [
      "Annual maintenance contracts (AMC)",
      "Website and app maintenance",
      "Bug fixing and updates",
      "24/7 technical support",
      "Hire dedicated developers (hourly / monthly)",
    ],
  },
  {
    kind: "detail",
    key: "emerg",
    slug: "emerging-technologies",
    category: "more",
    title: "Emerging Technologies",
    description: "IoT, blockchain, AR/VR and wearable apps.",
    intro: "IoT, blockchain and AR/VR projects, scoped so they solve a real business problem.",
    idealFor: "Manufacturers, logistics companies and brands exploring new experiences.",
    technologies: ["ESP32", "MQTT", "Solidity", "Unity", "WebXR", "Wear OS"],
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/>',
    items: [
      "IoT solutions",
      "Blockchain and smart contract development",
      "AR/VR applications",
      "Wearable app development",
    ],
  },
];

export const linkServices: LinkService[] = [
  {
    kind: "link",
    key: "gov",
    category: "gov",
    title: "Government and e-Governance",
    description: "Citizen portals, e-Office, land records, GIGW 3.0 compliance.",
    href: "/government-solutions",
    icon: '<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10l10-6 10 6z"/>',
    count: governmentGroups.reduce((n, g) => n + g.items.length, 0),
    countLabel: "offerings",
  },
  {
    kind: "link",
    key: "ind",
    category: "gov",
    title: "Industry Solutions",
    description: "Ready-made know-how for 9 industries, from retail to manufacturing.",
    href: "/industries",
    icon: '<path d="M3 21V9l6 4V9l6 4V5h6v16z"/>',
    count: 9,
    countLabel: "industries",
  },
];

/** All 14 service areas in reference order. */
export const allServices: Service[] = [...detailServices, ...linkServices];

export const coreServices = detailServices.filter((s) => s.category === "core");
export const specialistServices = detailServices.filter((s) => s.category === "more");

export function serviceHref(s: Service): string {
  return s.kind === "link" ? s.href : `/services/${s.slug}`;
}

export function serviceCount(s: Service): { count: number; label: string } {
  return s.kind === "link"
    ? { count: s.count, label: s.countLabel }
    : { count: s.items.length, label: "offerings" };
}

export function getServiceBySlug(slug: string): DetailService | undefined {
  return detailServices.find((s) => s.slug === slug);
}

export function getServiceByKey(key: string): Service | undefined {
  return allServices.find((s) => s.key === key);
}

/** Short name used in the footer and industry tags (reference `short()`). */
export function shortTitle(title: string): string {
  return title
    .replace(/ (Development|Solutions|and DevOps)$/, "")
    .replace(", Hosting", " & Hosting")
    .replace(" and ", " & ");
}

/** Name used on the contact form chips (reference form labels). */
export function formLabel(title: string): string {
  return title
    .replace(/ (Development|Solutions|and DevOps)$/, "")
    .replace(", Hosting", " & Hosting");
}

export const totalOfferingsLabel = "130+";
