"use client";

import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sampleTag, testimonials } from "@/content/testimonials";

/** Scroll-snap carousel: 3 cards desktop, 2 tablet, 88% width on mobile. */
export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="tight" aria-labelledby="stories-title">
      <div className="wrap">
        <SectionHeader
          id="stories-title"
          eyebrow="Client stories"
          title="What clients say"
          actions={
            <div className="q-nav">
              <button
                type="button"
                aria-label="Previous testimonial"
                aria-controls="qtrack"
                onClick={() => step(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                aria-controls="qtrack"
                onClick={() => step(1)}
              >
                ›
              </button>
            </div>
          }
        />
        <ul
          className="q-track"
          id="qtrack"
          ref={track}
          tabIndex={0}
          aria-label="Client testimonials (scroll horizontally)"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            }
          }}
        >
          {testimonials.map((t) => (
            <li key={t.quote}>
              <figure className="q">
                {t.sample && <span className="tag">{sampleTag}</span>}
                <blockquote>&quot;{t.quote}&quot;</blockquote>
                <figcaption className="who">
                  <span className="av" aria-hidden="true">
                    {t.name[0]}
                  </span>
                  <span>
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
