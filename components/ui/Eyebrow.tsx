import type { ReactNode } from "react";

/** Mono, uppercase accent label with an 18×2px line before it. */
export function Eyebrow({ children, plain = false }: { children: ReactNode; plain?: boolean }) {
  return <span className={plain ? "eyebrow plain" : "eyebrow"}>{children}</span>;
}
