/** Government & e-Governance content, verbatim from the reference. */

export interface GovGroup {
  title: string;
  items: string[];
}

export const governmentGroups: GovGroup[] = [
  {
    title: "Portals and websites",
    items: [
      "Government department and ministry websites",
      "Municipal corporation and Gram Panchayat portals",
      "State and district administration portals",
      "Citizen service portals (applications, certificates, licenses, permits)",
      "Grievance redressal and complaint management portals",
      "Scheme and beneficiary management portals",
      "Tender and e-procurement portals",
      "Recruitment and online examination portals",
      "Public information dashboards and open data portals",
      "Police, transport and utility department portals",
    ],
  },
  {
    title: "Government software systems",
    items: [
      "e-Office and file tracking systems",
      "Land records and property tax systems",
      "Birth, death and marriage registration systems",
      "Water, electricity and utility billing systems",
      "Asset and inventory management for departments",
      "Attendance and workforce management for government staff",
      "Field survey and inspection mobile apps",
      "GIS mapping and geo-tagging solutions",
      "MIS reporting and monitoring dashboards for officials",
    ],
  },
  {
    title: "Integrations",
    items: [
      "Aadhaar-based eKYC and authentication",
      "DigiLocker integration",
      "e-Sign (digital signatures)",
      "Government payment gateways (PayGov, SBI ePay, BharatKosh)",
      "SMS gateway and OTP services",
      "API Setu and inter-department data exchange",
      "UPI and online fee collection",
    ],
  },
  {
    title: "Compliance and standards",
    items: [
      "GIGW 3.0 compliant website development",
      "WCAG accessibility compliance (screen readers, font resize, contrast)",
      "Bilingual and multilingual websites (Hindi, English, regional languages)",
      "STQC certification support",
      "CERT-In empanelled security audit support",
      "Hosting on NIC, MeghRaj (GI Cloud) or state data centers",
      "Data privacy aligned with the DPDP Act",
    ],
  },
  {
    title: "Support services",
    items: [
      "Annual maintenance for government portals",
      "Content updates and helpdesk support",
      "Training for department staff",
      "Migration and modernization of old government portals",
    ],
  },
];

/** Compliance chips. `key: true` = highlighted in accent. */
export const complianceChips: { label: string; key?: boolean }[] = [
  { label: "GIGW 3.0", key: true },
  { label: "WCAG accessibility", key: true },
  { label: "STQC support", key: true },
  { label: "CERT-In audit support", key: true },
  { label: "DPDP Act aligned", key: true },
  { label: "Aadhaar eKYC" },
  { label: "DigiLocker" },
  { label: "e-Sign" },
  { label: "PayGov" },
  { label: "SBI ePay" },
  { label: "BharatKosh" },
  { label: "API Setu" },
  { label: "UPI fee collection" },
  { label: "NIC hosting" },
  { label: "MeghRaj (GI Cloud)" },
  { label: "State data centres" },
  { label: "Hindi · English · regional" },
];

export const governmentStats = [
  { value: "10", label: "Portal types" },
  { value: "9", label: "Software systems" },
  { value: "7", label: "Integrations" },
];
