import React, { useRef, useEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projects/projectsData";
import ProjectCard from "./projects/ProjectCard";
import ScrollFloat from "@/TextAnimations/ScrollFloat/ScrollFloat";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  // Memoize animation configuration
  const animationConfig = useMemo(
    () => ({
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    }),
    []
  );

  // Memoize project cards to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => projects, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const intro = introRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || !intro) return;

    // Create timeline for better performance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    // Chain animations
    tl.fromTo(
      heading,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
      }
    ).fromTo(
      intro,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
      },
      `-=${animationConfig.duration * 0.8}`
    );

    // Animate project cards with stagger
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: animationConfig.duration,
          stagger: animationConfig.stagger,
          ease: animationConfig.ease,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, [isMobile, animationConfig]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=40%"
            scrollEnd="bottom bottom-=30%"
            stagger={0.03}
          >
            Featured Projects
          </ScrollFloat>
        </h2>

        <p
          ref={introRef}
          className="text-center text-lg text-foreground/80 mb-16 max-w-3xl mx-auto"
        >
          Here are some of my recent projects that showcase my skills and
          expertise in web development and design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memoizedProjects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="w-full"
            >
              <SpotlightCard
                className="glass-morphism p-0 sm:p-0 rounded-lg flex-1 min-w-[100px]"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <ProjectCard project={project} index={index} />
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
