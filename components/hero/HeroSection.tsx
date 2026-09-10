"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroBioCard } from "@/components/hero/HeroBioCard";
import { HeroNameBg } from "@/components/hero/HeroNameBg";
import { PortraitReveal } from "@/components/hero/PortraitReveal";
import { SocialLinks } from "@/components/hero/SocialLinks";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(
        section.querySelectorAll(
          ".portrait-wrapper, .hero-name-bg, .floating-card-left, .social-links-right",
        ),
        { autoAlpha: 1 },
      );
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { duration: 1.2, ease: "power4.out" },
      });

      timeline
        .addLabel("hero-intro")
        .fromTo(
          ".portrait-wrapper",
          { yPercent: 70, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.65 },
          "hero-intro",
        )
        .fromTo(
          ".hero-name-bg",
          { scale: 0.7, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.3 },
          "hero-intro",
        )
        .addLabel("hero-details", "-=1")
        .fromTo(
          ".floating-card-left",
          { x: -120, autoAlpha: 0 },
          { x: 0, autoAlpha: 1 },
          "hero-details",
        )
        .fromTo(
          ".social-links-right",
          { x: 120, autoAlpha: 0 },
          { x: 0, autoAlpha: 1 },
          "hero-details+=0.12",
        );

      if (window.matchMedia("(min-width: 769px)").matches) {
        const scrollTrigger = {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        };

        gsap.to(".floating-card-left", {
          xPercent: -180,
          ease: "none",
          yoyo: true,
          scrollTrigger,
        });

        gsap.to(".social-links-right", {
          xPercent: 180,
          ease: "none",
          yoyo: true,
          scrollTrigger,
        });

        gsap.to(".portrait-wrapper", {
          y: () => window.innerHeight * 1,
          ease: "none",
          yoyo: true,
          scrollTrigger: { ...scrollTrigger, invalidateOnRefresh: true },
        });
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-0 pt-[104px] md:min-h-screen">
      <HeroNameBg />
      <PortraitReveal />
      <HeroBioCard />
      <SocialLinks />
    </section>
  );
}
