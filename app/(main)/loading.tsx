"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import { IconLogoLoading } from "@/components/icons/IconLogoLoading";

export default function Loading() {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    gsap.fromTo(
      logoRef.current,
      { scale: 0.9, opacity: 0.5 },
      {
        scale: 1.05,
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      }
    );
  }, []);

  return (
    <div className="spinnerWrapper">
      <IconLogoLoading ref={logoRef} />
    </div>
  );
}
