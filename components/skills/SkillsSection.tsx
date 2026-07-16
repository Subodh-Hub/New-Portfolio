"use client";

import { useEffect, useRef } from "react";
import { skillsCommand } from "@/assets/data/data";

export function SkillsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let previousScroll = window.scrollY;
    let position = 0;
    let direction = -1;
    let frame = 0;
    let previousTime = 0;

    const updateDirection = () => {
      const currentScroll = window.scrollY;
      if (currentScroll !== previousScroll) {
        direction = currentScroll > previousScroll ? -1 : 1;
        previousScroll = currentScroll;
      }
    };

    const moveTrack = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;
      position += direction * elapsed * 0.045;

      const loopWidth = track.scrollWidth / 2;
      if (position <= -loopWidth) position += loopWidth;
      if (position > 0) position -= loopWidth;
      track.style.transform = `translate3d(${position}px, 0, 0)`;
      frame = requestAnimationFrame(moveTrack);
    };

    window.addEventListener("scroll", updateDirection, { passive: true });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = requestAnimationFrame(moveTrack);
    }

    return () => {
      window.removeEventListener("scroll", updateDirection);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-heading">
        <span>01 / EXPERTISE</span>
        <h2>Tools I use to build.</h2>
      </div>

      <div className="skills-marquee">
        <div ref={trackRef} className="skills-track">
          {[...skillsCommand, ...skillsCommand].map((skill, index) => (
            <div className="skill-card" key={`${skill.title}-${index}`}>
              <skill.Icon className="skill-icon" style={{ color: skill.color }} />
              <span className="skill-info">
                <strong>{skill.title}</strong>
                <span className="skill-level">
                  <span style={{ width: `${skill.level}%` }} />
                </span>
              </span>
              <small>{skill.level}%</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
