import type { DetailServiceKey } from "./services";

/** Industries, verbatim from the reference `I` array (icons from `IIC`). */

export interface Industry {
  id: string;
  name: string;
  sub: string;
  description: string;
  examples: string[];
  /** Service keys this industry commonly uses ("gov" links to the government page). */
  svc: (DetailServiceKey | "gov")[];
  icon: string;
}

export const industries: Industry[] = [
  {
    id: "government",
    name: "Government & public sector",
    sub: "Portals, e-Office",
    description: "Citizen services and internal systems for departments at every level.",
    examples: [
      "Citizen service and grievance portals",
      "e-Office and file tracking",
      "MIS dashboards for officials",
    ],
    svc: ["gov", "web", "data"],
    icon: '<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10l10-6 10 6z"/>',
  },
  {
    id: "restaurants",
    name: "Restaurants & cloud kitchens",
    sub: "POS, KOT, ordering",
    description: "Billing, kitchen orders and online ordering that work together.",
    examples: [
      "Restaurant POS with KOT and tables",
      "Own online ordering site and app",
      "WhatsApp ordering bot",
    ],
    svc: ["pos", "ecom", "ai"],
    icon: '<path d="M4 3v8a3 3 0 006 0V3M7 3v18M17 3c-2 0-3 3-3 6s1 4 3 4v8"/>',
  },
  {
    id: "retail",
    name: "Retail & supermarkets",
    sub: "POS, inventory",
    description: "Faster checkout, accurate stock and an online store that syncs.",
    examples: [
      "Retail POS with barcode billing",
      "Multi-store inventory",
      "Quick-commerce delivery app",
    ],
    svc: ["pos", "ecom", "data"],
    icon: '<path d="M3 4h2l2 11h11l2-8H6"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  },
  {
    id: "healthcare",
    name: "Healthcare & clinics",
    sub: "Clinic management",
    description: "Appointments, patient records and billing in one place.",
    examples: [
      "Clinic and hospital management system",
      "Patient booking app",
      "Secure cloud hosting and backups",
    ],
    svc: ["pos", "mobile", "cloud"],
    icon: '<path d="M12 6v12M6 12h12"/><rect x="3" y="3" width="18" height="18" rx="4"/>',
  },
  {
    id: "education",
    name: "Education & coaching",
    sub: "School ERP, portals",
    description: "Admissions, fees, attendance and online learning.",
    examples: [
      "School / college management system",
      "Student and parent portal",
      "Online exam platform",
    ],
    svc: ["pos", "web", "mobile"],
    icon: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  },
  {
    id: "real-estate",
    name: "Real estate",
    sub: "Listings, CRM",
    description: "Generate leads and follow them up without losing any.",
    examples: [
      "Property listing website",
      "Lead CRM with site-visit tracking",
      "AI chatbot for enquiries",
    ],
    svc: ["web", "pos", "ai"],
    icon: '<path d="M3 21V10l9-6 9 6v11"/><path d="M9 21v-6h6v6"/>',
  },
  {
    id: "travel",
    name: "Travel & tourism",
    sub: "Booking engines",
    description: "Sell tours and stays online with instant confirmation.",
    examples: [
      "Tour and hotel booking engine",
      "Hotel property management",
      "Itinerary app for travellers",
    ],
    svc: ["web", "ecom", "mobile"],
    icon: '<path d="M2 16l20-8-6 12-3-5z"/><path d="M13 15l-4 4"/>',
  },
  {
    id: "logistics",
    name: "Logistics & transport",
    sub: "Fleet, tracking",
    description: "Track vehicles, drivers and deliveries in real time.",
    examples: [
      "Driver and delivery tracking app",
      "Fleet management dashboard",
      "Shiprocket / Delhivery integrations",
    ],
    svc: ["mobile", "data", "emerg"],
    icon: '<rect x="2" y="7" width="13" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7"/><circle cx="6" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    sub: "ERP, IoT",
    description: "Connect the shop floor to the office.",
    examples: [
      "Custom ERP or Odoo setup",
      "IoT machine monitoring",
      "Production analytics dashboards",
    ],
    svc: ["pos", "emerg", "data"],
    icon: '<path d="M3 21V9l6 4V9l6 4V5h6v16z"/>',
  },
];

/** Footer label: the part before " & " (reference behaviour). */
export const industryShortName = (name: string) => name.split(" & ")[0] ?? name;
