"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PROFILE_IMAGE, PROFILE_REVEAL_IMAGE } from "@/lib/data";
import { theme } from "@/lib/theme";

const { imageWidth, imageHeight } = theme.layout.portrait;
const BRUSH_SIZE = 82;
const BRUSH_SQUASH = 0.52;
const FADE = 0.93;
const SPACING = 10;

type TrailPoint = { x: number; y: number; opacity: number; angle: number };

export function PortraitReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const reveal = revealRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !reveal || !canvas || !context) return;

    let points: TrailPoint[] = [];
    let previous: { x: number; y: number } | null = null;
    let frame = 0;
    let scale = 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
    };

    const addPoint = (x: number, y: number) => {
      if (!previous) {
        points.push({ x, y, opacity: 1, angle: 0 });
      } else {
        const distance = Math.hypot(x - previous.x, y - previous.y);
        const steps = Math.max(1, Math.ceil(distance / SPACING));
        const angle = Math.atan2(y - previous.y, x - previous.x);
        for (let step = 1; step <= steps; step++) {
          const amount = step / steps;
          points.push({
            x: previous.x + (x - previous.x) * amount,
            y: previous.y + (y - previous.y) * amount,
            opacity: 1,
            angle,
          });
        }
      }
      previous = { x, y };
      points = points.slice(-90);
    };

    const move = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      addPoint(event.clientX - rect.left, event.clientY - rect.top);
    };

    const leave = () => {
      previous = null;
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      points = points.filter((point) => {
        point.opacity *= FADE;
        if (point.opacity < 0.02) return false;

        const x = point.x * scale;
        const y = point.y * scale;
        const radius = BRUSH_SIZE * scale;
        const glow = context.createRadialGradient(0, 0, 0, 0, 0, radius);
        glow.addColorStop(0, `rgba(255,255,255,${point.opacity})`);
        glow.addColorStop(0.48, `rgba(255,255,255,${point.opacity * 0.82})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");

        context.save();
        context.translate(x, y);
        context.rotate(point.angle);
        context.scale(1, BRUSH_SQUASH);
        context.fillStyle = glow;
        context.fillRect(-radius, -radius, radius * 2, radius * 2);
        context.restore();
        return true;
      });

      if (points.length) {
        const mask = `url(${canvas.toDataURL("image/png")})`;
        reveal.style.webkitMaskImage = mask;
        reveal.style.maskImage = mask;
        reveal.style.opacity = "1";
      } else {
        reveal.style.opacity = "0";
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    container.addEventListener("pointerenter", move);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointerenter", move);
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="portrait-wrapper" style={{ opacity: 0, visibility: "hidden" }}>
      <div ref={containerRef} className="flashlight-container">
        <Image
          src={PROFILE_IMAGE}
          alt="Subodh Rijal portrait"
          width={imageWidth}
          height={imageHeight}
          className="image-grayscale portrait-image"
          priority
        />
        <Image
          ref={revealRef}
          src={PROFILE_REVEAL_IMAGE}
          alt=""
          width={imageWidth}
          height={imageHeight}
          className="portrait-image pointer-events-none absolute inset-0 opacity-0"
          style={{
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
          aria-hidden
          priority
        />
        <canvas ref={canvasRef} className="hidden" aria-hidden />
      </div>
    </div>
  );
}
