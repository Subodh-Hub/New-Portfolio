"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CTAButton } from "@/components/ui/CTAButton";
import { navLinks } from "@/lib/data";

export function Header() {
  const [activeHref, setActiveHref] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);

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

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-white/85 px-10 py-8 backdrop-blur-xl"
    >
      <div className="header-side-item flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border-light text-xs font-medium text-gray-700">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        Available for New Project
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
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

      <CTAButton className="header-side-item">Let&apos;s Talk</CTAButton>
    </header>
  );
}
