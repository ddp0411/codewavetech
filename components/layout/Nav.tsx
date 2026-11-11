"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BurgerIcon, ChevronDownIcon } from "@/components/ui/Icons";

const links = [
  { href: "/industries", label: "Industries" },
  { href: "/government-solutions", label: "Government" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/about", label: "About" },
];

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function Nav() {
  const pathname = usePathname() || "/";
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaBtn = useRef<HTMLButtonElement>(null);
  const megaItem = useRef<HTMLLIElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Outside click + Escape.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (megaOpen && megaItem.current && !megaItem.current.contains(t)) setMegaOpen(false);
      if (
        mobileOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(t) &&
        burger.current &&
        !burger.current.contains(t)
      )
        setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) {
        setMegaOpen(false);
        megaBtn.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        burger.current?.focus();
      }
    };
    // Close the mega menu when keyboard focus leaves it.
    const onFocus = (e: FocusEvent) => {
      if (megaOpen && megaItem.current && !megaItem.current.contains(e.target as Node))
        setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [megaOpen, mobileOpen]);

  const servicesActive = isActive(pathname, "/services");

  return (
    <header className="nav-shell">
      <div className="wrap">
        <nav className="nav" aria-label="Main">
          <Link className="logo" href="/">
            <BrandLogo />
          </Link>
          <ul className="links">
            <li ref={megaItem}>
              <button
                ref={megaBtn}
                type="button"
                className={servicesActive ? "on" : undefined}
                aria-expanded={megaOpen}
                aria-controls="mega"
                onClick={() => setMegaOpen((o) => !o)}
              >
                Services <ChevronDownIcon />
              </button>
              <MegaMenu id="mega" open={megaOpen} onNavigate={() => setMegaOpen(false)} />
            </li>
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={active ? "on" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-cta">
            <Link
              className="btn-ghost"
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              Contact
            </Link>
            <ArrowButton href="/contact">Get a quote</ArrowButton>
            <button
              ref={burger}
              type="button"
              className="burger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <BurgerIcon open={mobileOpen} />
            </button>
            <ThemeToggle />
          </div>
        </nav>
        <MobileMenu
          ref={mobileRef}
          id="mobile-menu"
          open={mobileOpen}
          pathname={pathname}
          onNavigate={closeAll}
        />
      </div>
    </header>
  );
}
