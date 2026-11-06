import Link from "next/link";
import type { ReactNode } from "react";
import { KeyFacts } from "./KeyFacts";
import { PathIcon } from "./Icons";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

/**
 * Inner-page hero: surface→bg gradient, radial glow at the top right,
 * breadcrumb, H1, lead, optional CTAs and a KeyFacts card. Also emits
 * BreadcrumbList JSON-LD.
 */
export function PageHero({
  crumbs,
  path,
  title,
  lead,
  icon,
  actions,
  facts,
}: {
  crumbs: Crumb[];
  path: string;
  title: ReactNode;
  lead: ReactNode;
  icon?: string;
  actions?: ReactNode;
  facts?: [string, string][];
}) {
  return (
    <header className="phero">
      <JsonLd data={breadcrumbJsonLd(crumbs, path)} />
      <div className="wrap">
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c, i) => (
                <li key={c.name}>
                  {c.href && i < crumbs.length - 1 ? (
                    <Link href={c.href}>{c.name}</Link>
                  ) : (
                    <span aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {icon && (
            <div className="ic-big">
              <PathIcon paths={icon} size={26} />
            </div>
          )}
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {actions && <div className="cta-row">{actions}</div>}
        </div>
        {facts && <KeyFacts facts={facts} />}
      </div>
    </header>
  );
}
