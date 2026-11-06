import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { CheckIcon } from "@/components/ui/Icons";
import { Tag } from "@/components/ui/Tag";
import { JsonLd } from "@/components/ui/JsonLd";
import { IndustryTiles } from "@/components/shared/IndustryTile";
import { CTABand } from "@/components/layout/CTABand";
import { detailServices, getServiceBySlug } from "@/content/services";
import { industries } from "@/content/industries";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return detailServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.title} services in India`,
    description: `${s.intro} ${s.items.length} offerings, free 30-minute consultation and AMC after launch.`,
    path: `/services/${s.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = detailServices.findIndex((s) => s.slug === slug);
  const s = detailServices[i];
  if (!s) notFound();

  const n = detailServices.length;
  const prev = detailServices[(i - 1 + n) % n]!;
  const next = detailServices[(i + 1) % n]!;
  const popular = industries.filter((x) => x.svc.includes(s.key));
  const path = `/services/${s.slug}`;
  const quote = `/contact?service=${s.key}`;

  return (
    <>
      <JsonLd data={serviceJsonLd(s)} />
      <PageHero
        path={path}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: s.title },
        ]}
        icon={s.icon}
        title={s.title}
        lead={s.intro}
        actions={
          <>
            <ArrowButton href={quote}>Get a quote</ArrowButton>
            <GhostButton href="/how-we-work">How we work</GhostButton>
          </>
        }
        facts={[
          ["Offerings", String(s.items.length)],
          ["Category", s.category === "core" ? "Core service" : "Specialist service"],
          ["Consultation", "Free, 30 min"],
          ["After launch", "AMC available"],
        ]}
      />
      <div className="wrap">
        <div className="detail">
          <div>
            <h2 className="sub-h">What&apos;s included</h2>
            <ul className="offer">
              {s.items.map((x) => (
                <li key={x}>
                  <CheckIcon size={16} />
                  {x}
                </li>
              ))}
            </ul>
            {popular.length > 0 && (
              <>
                <h2 className="sub-h">Popular with</h2>
                <IndustryTiles list={popular} auto />
              </>
            )}
          </div>
          <aside className="side" aria-label={`${s.title} at a glance`}>
            <div className="box">
              <h2>Ideal for</h2>
              <p>{s.idealFor}</p>
            </div>
            <div className="box">
              <h2>Technologies</h2>
              <ul className="tags">
                {s.technologies.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </ul>
            </div>
            <div className="box accent">
              <h2>Free 30-minute consultation</h2>
              <p>Get a recommended approach, timeline and budget range.</p>
              <ArrowButton href={quote} variant="on-dark">
                Start a brief
              </ArrowButton>
            </div>
          </aside>
        </div>
        <nav className="pager" aria-label="More services">
          <Link href={`/services/${prev.slug}`} rel="prev">
            <small>← Previous</small>
            <b>{prev.title}</b>
          </Link>
          <Link href={`/services/${next.slug}`} rel="next">
            <small>Next →</small>
            <b>{next.title}</b>
          </Link>
        </nav>
      </div>
      <CTABand />
    </>
  );
}
