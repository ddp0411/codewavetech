import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowIcon } from "./Icons";

export type ArrowButtonVariant = "default" | "accent" | "on-dark" | "white";

interface Common {
  children: ReactNode;
  variant?: ArrowButtonVariant;
  className?: string;
}

type AsLink = Common & { href: string };
type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Signature pill button: bold label + 38px circular knob with a chevron that
 * slides 3px right on hover. Variants: default (dark), accent, on-dark (light
 * pill on --deep surfaces) and white (on the teal consultation band).
 */
export function ArrowButton(props: AsLink | AsButton) {
  const cls = [
    "btn",
    props.variant && props.variant !== "default" ? props.variant : "",
    props.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      {props.children}
      <span className="knob" aria-hidden="true">
        <ArrowIcon size={16} />
      </span>
    </>
  );
  if (props.href !== undefined) {
    return (
      <Link className={cls} href={props.href}>
        {inner}
      </Link>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, variant, className, href, type = "button", ...rest } = props;
  return (
    <button className={cls} type={type} {...rest}>
      {inner}
    </button>
  );
}
