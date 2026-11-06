"use client";

import { useEffect, useRef } from "react";

/**
 * 7 animated sine-wave lines in --glow behind the CTA band.
 * Draws a single static frame under prefers-reduced-motion and pauses when
 * the canvas is offscreen or the tab is hidden.
 */
export function WavesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let t = 0;
    let raf = 0;
    let visible = false;
    let colour = "";
    let frame = 0;

    const readColour = () => {
      colour = getComputedStyle(document.documentElement).getPropertyValue("--glow").trim();
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.max(1, Math.round(c.offsetWidth * dpr));
      c.height = Math.max(1, Math.round(c.offsetHeight * dpr));
    };

    const draw = () => {
      const w = c.width;
      const h = c.height;
      const dpr = window.devicePixelRatio || 1;
      if (frame++ % 60 === 0) readColour();
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.5 * dpr;
      ctx.strokeStyle = colour;
      for (let k = 0; k < 7; k++) {
        ctx.beginPath();
        ctx.globalAlpha = 0.15 + k * 0.07;
        for (let i = 0; i <= w; i += 8) {
          const y = h * 0.35 + k * h * 0.09 + Math.sin((i / w) * 6 + t + k * 0.6) * h * 0.08;
          if (i) ctx.lineTo(i, y);
          else ctx.moveTo(i, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      t += 0.01;
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (motion.matches || !visible || document.hidden) {
        draw();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    readColour();
    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(c);

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(c);

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    // Re-read --glow when the theme toggle flips data-theme on <html>.
    const mo = new MutationObserver(() => {
      readColour();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onScheme = () => {
      readColour();
      draw();
    };
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    motion.addEventListener("change", start);
    scheme.addEventListener("change", onScheme);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      motion.removeEventListener("change", start);
      scheme.removeEventListener("change", onScheme);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
