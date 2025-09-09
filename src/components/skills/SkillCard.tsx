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

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: delay * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200`}
      style={{
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out",
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }}
    >
      {/* Logo/Initial Background */}
      <div
        className="absolute top-2 right-2 text-4xl font-bold opacity-20 select-none "
        style={{
          fontSize: "3rem",
          lineHeight: 1,
          zIndex: 1,
        }}
      >
        {logo}
      </div>

      {/* Skill Name */}
      <h3
        className={`text-sm font-medium relative z-10 `}
        style={{
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {name}
      </h3>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-lg" />
    </div>
  );
};

export default SkillCard;
