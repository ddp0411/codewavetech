import Link from "next/link";
import type { Ref } from "react";
import { coreServices, serviceHref } from "@/content/services";

const pages = [
  { href: "/industries", label: "Industries" },
  { href: "/government-solutions", label: "Government" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Panel shown under 1100px: all pages, with core services indented under Services. */
export function MobileMenu({
  ref,
  id,
  open,
  pathname,
  onNavigate,
}: {
  ref?: Ref<HTMLDivElement>;
  id: string;
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const cur = (href: string) => (pathname === href ? "page" : undefined);
  return (
    <div
      ref={ref}
      className="mobile-menu"
      id={id}
      hidden={!open}
      onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate()}
    >
      <nav aria-label="Mobile">
        <ul>
          <li>
            <Link href="/" aria-current={cur("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" aria-current={cur("/services")}>
              Services
            </Link>
            <ul>
              {coreServices.map((s) => (
                <li key={s.key}>
                  <Link className="sub" href={serviceHref(s)} aria-current={cur(serviceHref(s))}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {pages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} aria-current={cur(p.href)}>
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
