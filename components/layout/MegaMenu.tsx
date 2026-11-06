import Link from "next/link";
import { coreServices, specialistServices, serviceHref } from "@/content/services";
import { PathIcon } from "@/components/ui/Icons";

/** Services dropdown: core (2-col), specialist + "All 14", and a Government card. */
export function MegaMenu({
  id,
  open,
  onNavigate,
}: {
  id: string;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className="mega"
      id={id}
      hidden={!open}
      onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate()}
    >
      <div className="core">
        <h2>Core services</h2>
        <ul>
          {coreServices.map((s) => (
            <li key={s.key}>
              <Link href={serviceHref(s)}>
                <span className="mi">
                  <PathIcon paths={s.icon} size={18} />
                </span>
                <span>
                  {s.title}
                  <small>{s.description}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="more">
        <h2>More services</h2>
        <ul>
          {specialistServices.map((s) => (
            <li key={s.key}>
              <Link href={serviceHref(s)}>{s.title}</Link>
            </li>
          ))}
        </ul>
        <Link href="/services" className="link">
          All 14 services →
        </Link>
      </div>
      <div className="gov">
        <span className="eyebrow plain">Government &amp; e-Governance</span>
        <strong>Portals and systems for departments</strong>
        <p>GIGW 3.0 portals, Aadhaar eKYC, DigiLocker, NIC and MeghRaj hosting.</p>
        <Link href="/government-solutions" className="link">
          See government solutions →
        </Link>
      </div>
    </div>
  );
}
