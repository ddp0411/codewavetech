import type { ReactNode } from "react";

/** Mono tag chip, rendered inside a `<ul className="tags">`. */
export function Tag({ children }: { children: ReactNode }) {
  return <li className="t">{children}</li>;
}
