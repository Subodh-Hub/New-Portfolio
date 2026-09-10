"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/assets/data/data";

function RevealLine({
  text,
  as: Tag = "span",
  className = "",
}: {
  text: string;
  as?: "span" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Tag className={`text-reveal-line ${className}`.trim()}>
      <span className="text-reveal-word">{text}</span>
    </Tag>
  );
}

function RevealWords({
  text,
  as: Tag = "h2",
  className = "",
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <Tag className={`text-reveal-block ${className}`.trim()}>
      {words.map((word, index) => (
        <span className="text-reveal-line" key={`${word}-${index}`}>
          <span className="text-reveal-word">
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        ".experience-label",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-heading",
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        },
      );

      gsap.utils
        .toArray<HTMLElement>(".experience-heading .text-reveal-word")
        .forEach((word) => {
          gsap.fromTo(
            word,
            { yPercent: 120 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: word.closest(".text-reveal-line") ?? word,
                start: "top 92%",
                end: "top 60%",
                scrub: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".experience-item")
        .forEach((item) => {
          const words = item.querySelectorAll(".text-reveal-word");
          const links = item.querySelectorAll(".experience-links a");

          gsap.fromTo(
            words,
            { yPercent: 120 },
            {
              yPercent: 0,
              ease: "none",
              stagger: 0.04,
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 55%",
                scrub: true,
              },
            },
          );

          gsap.fromTo(
            links,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              stagger: 0.06,
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
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
    <section ref={sectionRef} id="experience" className="experience-section">
      <div className="experience-heading">
        <span className="experience-label">03 / EXPERIENCE</span>
        <div className="experience-heading-copy">
          <RevealWords text="Where I've worked." />
          <RevealLine
            as="p"
            text="Roles across product teams and classrooms — shipping interfaces, full-stack systems, and teaching the next builders."
          />
        </div>
      </div>

      <ol className="experience-list">
        {experiences.map((job, index) => (
          <li className="experience-item" key={job.company}>
            <span className="experience-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="experience-body">
              <RevealLine as="h3" text={job.role} />
              <RevealLine as="p" text={job.company} />
              <div className="experience-links">
                {job.urls.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
