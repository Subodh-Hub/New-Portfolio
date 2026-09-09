"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { greetings, LOGO_IMAGE } from "@/lib/data";

const fontVar: Record<(typeof greetings)[number]["font"], string> = {
  latin: "var(--font-script)",
  chinese: "var(--font-noto-sc)",
  japanese: "var(--font-noto-jp)",
  arabic: "var(--font-noto-ar)",
};

export function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const word = wordRef.current;
    if (!root || !logo || !word) return;

    document.body.style.overflow = "hidden";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.style.overflow = "";
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    gsap.set(word, { autoAlpha: 0 });

    tl.fromTo(
      logo,
      { scale: 0.6, autoAlpha: 0, filter: "blur(12px)" },
      {
        scale: 1,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
      },
    )
      .to(logo, {
        scale: 1.06,
        duration: 0.35,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
      .to(logo, {
        autoAlpha: 0,
        scale: 0.94,
        filter: "blur(8px)",
        duration: 0.35,
        ease: "power2.in",
      });

    greetings.forEach((greeting) => {
      tl.call(() => {
        word.textContent = greeting.text;
        word.style.fontFamily = fontVar[greeting.font];
        word.dir = greeting.font === "arabic" ? "rtl" : "ltr";
      })
        .fromTo(
          word,
          { autoAlpha: 0, y: 18, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.28,
            ease: "power3.out",
          },
        )
        .to(word, { duration: 0.32 })
        .to(word, {
          autoAlpha: 0,
          y: -12,
          filter: "blur(4px)",
          duration: 0.22,
          ease: "power2.in",
        });
    });

    tl.to(root, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      aria-hidden
    >
      <div ref={logoRef} className="absolute">
        <Image
          src={LOGO_IMAGE}
          alt=""
          width={160}
          height={160}
          className="h-28 w-28 object-contain md:h-36 md:w-36"
          priority
        />
      </div>
      <p
        ref={wordRef}
        className="text-5xl font-normal tracking-normal text-black md:text-7xl"
      />
    </div>
  );
}
