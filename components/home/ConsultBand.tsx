import { ArrowButton } from "@/components/ui/ArrowButton";

export function ConsultBand() {
  return (
    <section className="tight" aria-labelledby="consult-title">
      <div className="wrap">
        <div className="audit">
          <div>
            <h2 id="consult-title">Book a free 30-minute consultation</h2>
            <p>
              No obligation. In 30 minutes we&apos;ll understand what you need and map the fastest,
              most affordable way to build it.
            </p>
            <ArrowButton href="/contact" variant="white">
              Start your project brief
            </ArrowButton>
          </div>
          <ul aria-label="What you get">
            <li>A recommended tech stack and approach</li>
            <li>A rough timeline with milestones</li>
            <li>A ballpark budget range</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
