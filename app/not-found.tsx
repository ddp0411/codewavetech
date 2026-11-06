import type { Metadata } from "next";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { CTABand } from "@/components/layout/CTABand";
import { coreServices, serviceHref } from "@/content/services";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <header className="phero">
        <div className="wrap">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span aria-current="page">404</span>
                </li>
              </ol>
            </nav>
            <h1>We couldn&apos;t find that page</h1>
            <p className="lead">
              The link may be old or mistyped. Try one of these instead, or tell us what you were
              looking for.
            </p>
            <div className="cta-row">
              <ArrowButton href="/">Back to home</ArrowButton>
              <GhostButton href="/contact">Contact us</GhostButton>
            </div>
          </div>
          <dl className="facts">
            {coreServices.slice(0, 4).map((s) => (
              <div key={s.key}>
                <dt>Service</dt>
                <dd>
                  <Link href={serviceHref(s)}>{s.title}</Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <CTABand />
    </>
  );
}
