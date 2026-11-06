import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceFilter, ServiceFilterView } from "@/components/shared/ServiceFilter";
import { CTABand } from "@/components/layout/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IT services for business and government",
  description:
    "14 service areas under one roof: web, mobile, e-commerce, AI, POS and business software, cloud, design, data, security, maintenance and e-governance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        path="/services"
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Every service your business needs, under one roof"
        lead="14 service areas, from a five-page website to a state-wide citizen portal. Pick one to see exactly what's included."
        facts={[
          ["Core services", "6"],
          ["Specialist services", "8"],
          ["Individual offerings", "130+"],
          ["Consultation", "Free, 30 min"],
        ]}
      />
      <div className="wrap">
        <h2 className="sr-only">All service areas</h2>
        <Suspense fallback={<ServiceFilterView active="all" />}>
          <ServiceFilter />
        </Suspense>
      </div>
      <CTABand />
    </>
  );
}
