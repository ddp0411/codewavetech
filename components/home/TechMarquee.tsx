import { techStack } from "@/content/site";

/** Infinite scrolling list of technologies (pure CSS; pauses on hover). */
export function TechMarquee() {
  return (
    <div className="stack">
      <div className="wrap">
        <h2>Technologies we build with</h2>
        <ul className="sr-only">
          {techStack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...techStack, ...techStack].map((t, i) => (
              <span key={`${t}-${i}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
