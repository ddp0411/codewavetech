import { ArrowButton } from "@/components/ui/ArrowButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { WavesCanvas } from "@/components/shared/WavesCanvas";

/** Dark rounded band with animated waves. Shown on every page except Contact. */
export function CTABand() {
  return (
    <section className="tight" style={{ paddingBottom: 0 }} aria-labelledby="cta-band-title">
      <div className="wrap">
        <div className="final">
          <WavesCanvas />
          <div>
            <h2 id="cta-band-title">Let&apos;s build the software your business deserves.</h2>
            <p>No obligation. We&apos;ll map your top 3 priorities in 30 minutes.</p>
          </div>
          <div className="cta-row">
            <ArrowButton href="/contact" variant="accent">
              Book free consultation
            </ArrowButton>
            <GhostButton href="/services">Explore services</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}
