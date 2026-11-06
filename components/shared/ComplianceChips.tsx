import { complianceChips } from "@/content/government";

/** Compliance (accent) and integration/hosting (outlined) chips on dark bands. */
export function ComplianceChips() {
  return (
    <ul className="comp" aria-label="Standards, integrations and hosting">
      {complianceChips.map((c) => (
        <li key={c.label} className={c.key ? "k" : undefined}>
          {c.label}
        </li>
      ))}
    </ul>
  );
}
