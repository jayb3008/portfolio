import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  name: string;
  color: string;
  delay: number;
  logo: string;
  slug: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  name,
  color,
  delay,
  logo,
  slug,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const logoEl = logoRef.current;
    const nameEl = nameRef.current;

    if (card && overlay && logoEl && nameEl) {
      // Initial animation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: delay * 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover animation timeline
      const tl = gsap.timeline({ paused: true });

      tl.to(overlay, {
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.inOut",
      })
        .to(
          card,
          {
            scale: 1.05,
            boxShadow: `0 10px 15px -3px ${color}33, 0 4px 6px -2px ${color}1A`,
            borderColor: color,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          [nameEl, logoEl],
          {
            color: "white",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0
        );

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());

      return () => {
        card.removeEventListener("mouseenter", () => tl.play());
        card.removeEventListener("mouseleave", () => tl.reverse());
        tl.kill();
      };
    }
  }, [delay, color]);

  return (
    <div
      ref={cardRef}
      className={`relative flex h-24 cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl border border-foreground/10 p-3 transition-shadow duration-300 sm:h-28 sm:p-4`}
      style={{
        opacity: 0, // Start with opacity 0 for GSAP
      }}
    >
      {/* Colored Hover Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{ backgroundColor: color, zIndex: 0 }}
      />

      {/* Logo */}
      <div
        ref={logoRef}
        className="absolute right-2 top-2 z-10 select-none text-4xl font-bold leading-none opacity-20 transition-colors duration-300 sm:text-5xl"
      >
        {logo}
      </div>

      {/* Skill Name */}
      <h3
        ref={nameRef}
        className={`relative z-10 text-xs font-medium transition-colors duration-300 sm:text-sm`}
      >
        {name}
      </h3>
    </div>
  );
};

export default SkillCard;
