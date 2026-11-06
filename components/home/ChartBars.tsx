"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const heights = [38, 52, 44, 66, 58, 74, 92];

/** 7-bar chart that grows in on load; the last bar uses the accent colour (CSS). */
export function ChartBars() {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bars">
        {heights.map((h, i) => (
          <m.i
            key={i}
            style={{ height: `${h}%` }}
            initial={reduce ? false : { scaleY: 0.15 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          />
        ))}
      </div>
    </LazyMotion>
  );
}
