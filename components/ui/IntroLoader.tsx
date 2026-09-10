"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { greetings, LOGO_IMAGE } from "@/lib/data";

const fontVar: Record<(typeof greetings)[number]["font"], string> = {
  latin: "var(--font-borel)",
  chinese: "var(--font-noto-sc)",
  japanese: "var(--font-noto-jp)",
  arabic: "var(--font-noto-ar)",
};

function lockScroll() {
  const scrollY = window.scrollY;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  return scrollY;
}

function unlockScroll(scrollY: number) {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollY);
}

export function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (done) return;

    const root = rootRef.current;
    const logo = logoRef.current;
    const word = wordRef.current;
    if (!root || !logo || !word) return;

    const scrollY = lockScroll();
    let finished = false;

    const blockScroll = (event: Event) => {
      event.preventDefault();
    };

    const release = () => {
      if (finished) return;
      finished = true;
      root.removeEventListener("wheel", blockScroll);
      root.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      unlockScroll(scrollY);
    };

    root.addEventListener("wheel", blockScroll, { passive: false });
    root.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      release();
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        release();
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
      })
      .add(document.fonts.ready);

    greetings.forEach((greeting) => {
      tl.call(() => {
        word.textContent = greeting.text;
        word.style.fontFamily = fontVar[greeting.font];
        // Noto faces only ship 700; keep latin (Borel) at 400
        word.style.fontWeight = greeting.font === "latin" ? "400" : "700";
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
      release();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden overscroll-none bg-white"
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
        className="text-5xl tracking-none text-black md:text-7xl"
      />
    </div>
  );
}
