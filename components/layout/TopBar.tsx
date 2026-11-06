import Link from "next/link";
import { site } from "@/content/site";

export function TopBar() {
  return (
    <div className="topbar" role="region" aria-label="Company information">
      <div className="wrap">
        <span className="grp">
          <span className="hide-s">{site.tagline}</span>
          <span>
            <b>{site.hoursShort.days}</b> {site.hoursShort.time}
          </span>
        </span>
        <span className="grp">
          <a className="plain hide-s" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link href="/government-solutions">Government tenders →</Link>
        </span>
      </div>
    </div>
  );
}
