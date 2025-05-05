import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const background = backgroundRef.current;

    if (section && heading && content && image && background) {
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
      // Heading animation
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Content animation
      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image animation
      gsap.fromTo(
        image,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-background relative overflow-hidden"
    >
      {/* Sticky Background Image */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.2,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/90 z-1"></div>

      {/* Background gradient - adjusted z-index */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10 pointer-events-none z-2"></div>

      {/* Content container - increased z-index */}
      <div className="container mx-auto relative z-10">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-16 text-center"
        >
          <span className="text-gradient">About Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div ref={contentRef} className="text-left order-2 md:order-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gradient-blue">
              Software Developer & Frontend Specialist
            </h3>
            <p className="mb-4 sm:mb-6 text-base sm:text-lg text-foreground/80">
              Hello! I'm Jay, a passionate software developer with over 3 years
              of experience in frontend and full-stack development. I specialize
              in building modern, responsive applications using React.js,
              Next.js, and Angular, with a strong focus on creating seamless
              user experiences.
            </p>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-foreground/80">
              My expertise lies in developing scalable frontend solutions,
              implementing state management with Redux and NgRx, and creating
              cross-platform mobile applications using React Native. I'm
              committed to writing clean, maintainable code and staying updated
              with the latest technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass-morphism p-3 sm:p-4 rounded-lg flex-1 min-w-[100px]">
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
                  3+
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm">
                  Years Experience
                </p>
              </div>
              <div className="glass-morphism p-3 sm:p-4 rounded-lg flex-1 min-w-[100px]">
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
                  15+
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm">
                  Projects Completed
                </p>
              </div>
              <div className="glass-morphism p-3 sm:p-4 rounded-lg flex-1 min-w-[100px]">
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">
                  8+
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm">
                  Technologies Mastered
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto order-1 md:order-2 md:ml-auto mb-8 md:mb-0">
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-accent/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 filter blur-2xl"></div>
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 relative overflow-hidden rounded-full border-4 border-white/10 glass-morphism">
              <img
                ref={imageRef}
                src="profile.jpg"
                alt="Jay Sarvaiya - Software Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
