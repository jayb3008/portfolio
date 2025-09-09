import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "@/TextAnimations/ScrollFloat/ScrollFloat";
import ScrollReveal from "@/TextAnimations/ScrollReveal/ScrollReveal";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import Squares from "@/Backgrounds/Squares/Squares";
import TiltedCard from "./TiltedCard/TiltedCard";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Memoize animation configuration
  const animationConfig = useMemo(
    () => ({
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    }),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const background = backgroundRef.current;

    if (!section || !heading || !content || !background) return;

    // Create timeline for better performance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Background parallax effect
    gsap.to(background, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Chain animations for better performance
    tl.fromTo(
      heading,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
      }
    ).fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
      },
      `-=${animationConfig.duration * 0.8}`
    );

    return () => {
      tl.kill();
    };
  }, [animationConfig]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>
      {/* Content container - increased z-index */}
      <div className="container mx-auto relative z-10">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-16 text-center"
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            About Me
          </ScrollFloat>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div ref={contentRef} className="text-left order-2 md:order-1">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
            >
              Hello! I'm Jay, a passionate software developer with over 3 years
              of experience in frontend and full-stack development. I specialize
              in building modern, responsive applications using React.js,
              Next.js, and Angular, with a strong focus on creating seamless
              user experiences.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
            >
              My expertise lies in developing scalable frontend solutions,
              implementing state management with Redux and NgRx, and creating
              cross-platform mobile applications using React Native. I'm
              committed to writing clean, maintainable code and staying updated
              with the latest technologies.
            </ScrollReveal>
            <div className="flex flex-wrap gap-4">
              <SpotlightCard
                className="glass-morphism p-3 sm:p-4 rounded-lg flex-1 min-w-[100px]"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
                  3+
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm">
                  Years Experience
                </p>
              </SpotlightCard>
              <SpotlightCard
                className="glass-morphism p-3 sm:p-4 rounded-lg flex-1 min-w-[100px]"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
                  15+
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm">
                  Projects Completed
                </p>
              </SpotlightCard>
              <SpotlightCard
                className="glass-morphism p-3 sm:p-4 rounded-lg flex-1 min-w-[100px]"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
                  8+
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm">
                  Technologies Mastered
                </p>
              </SpotlightCard>
            </div>
          </div>

          <div className="relative mx-auto order-1 md:order-2 md:ml-auto mb-8 md:mb-0">
            {/* <div className="relative overflow-hidden  border-4 border-white/10 glass-morphism">
              <img
                ref={imageRef}
                src="profile.jpg"
                alt="Jay Sarvaiya - Software Developer"
                className="w-full h-full object-cover"
              />
            </div> */}
            <TiltedCard
              imageSrc="profile.jpg"
              altText="Jay Sarvaiya - Software Developer"
              captionText=""
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={<p className="tilted-card-demo-text"></p>}
              imageClassName="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
