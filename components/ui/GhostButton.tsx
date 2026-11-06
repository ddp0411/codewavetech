import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props =
  | { href: string; children: ReactNode; className?: string }
  | ({
      href?: undefined;
      children: ReactNode;
      className?: string;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

/** Outlined pill: 1.5px --line border that turns --ink on hover. */
export function GhostButton(props: Props) {
  const cls = ["btn-ghost", props.className ?? ""].filter(Boolean).join(" ");
  if (props.href !== undefined) {
    return (
      <Link className={cls} href={props.href}>
        {props.children}
      </Link>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, href, type = "button", ...rest } = props;
  return (
    <button className={cls} type={type} {...rest}>
      {children}
    </button>
  );
}
