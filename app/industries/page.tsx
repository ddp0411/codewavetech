import { PageHero } from "@/components/ui/PageHero";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { CTABand } from "@/components/layout/CTABand";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industry software solutions",
  description:
    "Software for government, restaurants, retail, healthcare, education, real estate, travel, logistics and manufacturing, built from proven modules with GST, UPI and Hindi support.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        path="/industries"
        crumbs={[{ name: "Home", href: "/" }, { name: "Industries" }]}
        title="Software shaped around how your industry works"
        lead="We've packaged the usual needs of nine industries, so your project starts from proven building blocks instead of a blank page."
        facts={[
          ["Industries", "9"],
          ["Starting point", "Proven modules"],
          ["Built for India", "GST · UPI · Hindi"],
        ]}
      />
      <div className="wrap">
        <div className="ind-full">
          {industries.map((i) => (
            <IndustryCard key={i.id} industry={i} />
          ))}
        </div>
      </div>
      <CTABand />
    </>
  );
}
