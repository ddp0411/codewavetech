import Link from "next/link";
import { BrandLogo } from "./Logo";
import { site } from "@/content/site";
import { coreServices, serviceHref, shortTitle } from "@/content/services";
import { industries, industryShortName } from "@/content/industries";

const company = [
  { href: "/about", label: "About" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/industries", label: "Industries" },
  { href: "/government-solutions", label: "Government" },
  { href: "/services", label: "All services" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <Link className="logo" href="/">
              <BrandLogo height={36} surface="dark" />
            </Link>
            <p className="blurb">{site.description}</p>
            <ul className="badges" aria-label="Standards">
              {site.badges.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {coreServices.map((s) => (
                <li key={s.key}>
                  <Link href={serviceHref(s)}>{shortTitle(s.title)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Industries</h2>
            <ul>
              {industries.slice(0, 6).map((i) => (
                <li key={i.id}>
                  <Link href={`/industries#${i.id}`}>{industryShortName(i.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <div className="ct">
              <span>
                Email
                <br />
                <b>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </b>
              </span>
              <span>
                Phone / WhatsApp
                <br />
                <b>
                  {site.phoneHref ? <a href={`tel:${site.phoneHref}`}>{site.phone}</a> : site.phone}
                </b>
              </span>
              <span>
                Hours
                <br />
                <b>{site.hours}</b>
              </span>
              <Link className="link" href="/contact">
                Start a project brief →
              </Link>
            </div>
          </div>
        </div>
        <div className="legal">
          <span>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </span>
          <span className="grp">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
            <a href={site.url}>{site.domain}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
