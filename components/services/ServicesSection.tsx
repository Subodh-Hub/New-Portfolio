"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/assets/data/data";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0;

        gsap.fromTo(
          card,
          { x: fromLeft ? -200 : 200, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            ease: "none",
            yoyo: true,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("portfolio-intro-done", refresh);

    return () => {
      window.removeEventListener("portfolio-intro-done", refresh);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="services-section">
      <div className="services-heading">
        <span>02 / SERVICES</span>
        <div className="services-heading-copy">
          <h2>How I can help.</h2>
          <p>
            From the first component to the final API, I build digital products
            that feel considered and perform reliably.
          </p>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="service-number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
