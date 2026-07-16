"use client";

import { useEffect, useRef } from "react";
import { theme } from "@/lib/theme";

const MAX_DOTS = theme.cursor.maxTrailDots;

export function MouseTrail() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;
    const cursorEl: HTMLDivElement = cursorRef.current;

    const dots: HTMLDivElement[] = [];

    function updateCursor(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      cursorEl.style.left = `${x}px`;
      cursorEl.style.top = `${y}px`;

      if (Math.random() > 0.4) {
        const dot = document.createElement("div");
        dot.className = "trail-dot";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        document.body.appendChild(dot);
        dots.push(dot);

        requestAnimationFrame(() => {
          dot.style.opacity = "0";
          dot.style.transform = "translate(-50%, -50%) scale(0.1)";
        });

        if (dots.length > MAX_DOTS) {
          const oldest = dots.shift();
          setTimeout(() => oldest?.remove(), 400);
        }
      }
    }

    function onInteractiveEnter() {
      cursorEl.style.width = `${theme.cursor.sizeHover}px`;
      cursorEl.style.height = `${theme.cursor.sizeHover}px`;
      cursorEl.style.backgroundColor = theme.colors.cursorRing;
      cursorEl.style.border = `1px solid ${theme.colors.cursorRingBorder}`;
    }

    function onInteractiveLeave() {
      cursorEl.style.width = `${theme.cursor.size}px`;
      cursorEl.style.height = `${theme.cursor.size}px`;
      cursorEl.style.backgroundColor = theme.colors.primary;
      cursorEl.style.border = "none";
    }

    document.addEventListener("mousemove", updateCursor);

    const interactives = document.querySelectorAll("button, a");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onInteractiveEnter);
      el.addEventListener("mouseleave", onInteractiveLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onInteractiveEnter);
        el.removeEventListener("mouseleave", onInteractiveLeave);
      });
      dots.forEach((dot) => dot.remove());
    };
  }, []);

  return <div ref={cursorRef} className="cursor-main" />;
}
