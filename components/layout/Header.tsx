"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CTAButton } from "@/components/ui/CTAButton";
import { LOGO_IMAGE, navLinks } from "@/lib/data";

export function Header() {
  const [activeHref, setActiveHref] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const links = header.querySelectorAll(".nav-link-item");
    const sideItems = header.querySelectorAll(".header-side-item");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(links, { autoAlpha: 1, y: 0 });
      gsap.set(sideItems, { autoAlpha: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        links,
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        sideItems,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.09,
          ease: "power3.out",
        },
      );
    }, header);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const updateActiveLink = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = sections.reduce(
          (active, section) =>
            section.getBoundingClientRect().top <= 120 ? section : active,
          sections[0],
        );
        if (current) setActiveHref(`#${current.id}`);
      });
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveLink);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu || !menuOpen) return;

    const items = menu.querySelectorAll(".mobile-nav-link");
    gsap.fromTo(
      items,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08, ease: "power3.out" },
    );
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-10 md:py-8 ${
          menuOpen
            ? "z-[80] bg-white"
            : "z-50 bg-white/85 backdrop-blur-xl"
        }`}
      >
        <div className="header-side-item flex items-center gap-3">
          <Image
            src={LOGO_IMAGE}
            alt="Subodh Rijal"
            width={40}
            height={40}
            className="h-9 w-9 object-contain md:h-10 md:w-10"
          />
          <div className="hidden items-center gap-2 rounded-full border border-border-light bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            Available for New Project
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-800 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;

            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link-item group relative flex h-5 items-center rounded-full text-black ${
                  isActive ? "bg-[#d2ff00] px-3" : ""
                }`}
              >
                <span className="h-5 overflow-hidden leading-5">
                  <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2 motion-reduce:transition-none">
                    <span>{link.label}</span>
                    <span aria-hidden>{link.label}</span>
                  </span>
                </span>
                {"count" in link && link.count && (
                  <span className="absolute -right-5 -top-3 scale-0 rotate-6 rounded-full bg-[#d2ff00] px-1.5 py-0.5 text-[9px] font-bold leading-none text-black opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 motion-reduce:transition-none">
                    {link.count}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="header-side-item flex items-center gap-3">
          <CTAButton className="hidden sm:flex">Let&apos;s Talk</CTAButton>
          <button
            type="button"
            className="relative z-[80] flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[7px] rotate-0"
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-black transition-all duration-200 ${
                menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[7px] rotate-0"
              }`}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[60] flex flex-col bg-white px-8 pb-10 pt-28 md:hidden"
        >
          <nav className="flex flex-1 flex-col justify-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.href === activeHref;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`mobile-nav-link w-fit rounded-full px-4 py-1 text-4xl font-bold tracking-tight transition-colors ${
                    isActive ? "bg-[#d2ff00] text-black" : "text-black"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  {"count" in link && link.count ? (
                    <span
                      className={`ml-3 text-sm font-medium ${
                        isActive ? "text-black/50" : "text-gray-400"
                      }`}
                    >
                      [{link.count}]
                    </span>
                  ) : null}
                </a>
              );
            })}
          </nav>
          <CTAButton className="w-full justify-center">Let&apos;s Talk</CTAButton>
        </div>
      )}
    </>
  );
}
