import { ArrowButton } from "@/components/ui/ArrowButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { CheckIcon } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { ProductMockup } from "./ProductMockup";
import { StatBar } from "./StatBar";

export function Hero() {
  return (
    <header className="hero">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="pill-badge">
              <em>{site.bookingBadge.em}</em>
              {site.bookingBadge.text}
            </span>
            <h1>
              Software that grows with your <em>business</em>
            </h1>
            <p className="lead">
              Websites, apps, POS, AI and government portals, designed, built and maintained by one
              team so you can stay focused on running the business.
            </p>
            <div className="cta-row">
              <ArrowButton href="/contact">Get a free consultation</ArrowButton>
              <GhostButton href="/services">Explore services</GhostButton>
            </div>
            <ul className="assure">
              {["Fixed, written quotes", "Weekly demos", "You own the code"].map((t) => (
                <li key={t}>
                  <CheckIcon size={16} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ProductMockup />
        </div>
        <StatBar />
      </div>
    </header>
  );
}
