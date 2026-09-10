"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/assets/data/data";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".projects-heading > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
        },
      });

      gsap.from(".project-item", {
        autoAlpha: 0,
        y: 28,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-list",
          start: "top 88%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    if (active) {
      gsap.to(preview, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      gsap.to(preview, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [active]);

  const movePreview = (event: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const preview = previewRef.current;
    if (!preview || !active) return;
    gsap.to(preview, {
      x: event.clientX + 24,
      y: event.clientY + 24,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section"
      onMouseMove={movePreview}
    >
      <div className="projects-heading">
        <span>04 / PROJECTS</span>
        <div className="projects-heading-copy">
          <h2>Selected work.</h2>
          <p>Live builds and experiments — hover a title for a peek.</p>
        </div>
      </div>

      <ul className="projects-list">
        {projects.map((project, index) => (
          <li key={project.title}>
            <a
              className="project-item"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(project)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="project-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-title">{project.title}</span>
              <span className="project-url">
                {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        className="project-preview"
        aria-hidden
        style={{ opacity: 0, visibility: "hidden" }}
      >
        {active ? (
          <Image
            src={active.image}
            alt=""
            width={280}
            height={180}
            className="project-preview-image"
          />
        ) : null}
      </div>
    </section>
  );
}
