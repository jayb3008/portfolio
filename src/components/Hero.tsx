import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import Scene3D from "./Scene3D";

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgrounds = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920",
    "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1920",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1920",
  ];

  useEffect(() => {
    // Existing animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.7"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        arrowRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          onComplete: () => {
            gsap.to(arrowRef.current, {
              y: 10,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        },
        "-=0.3"
      );

    // Background slider animation
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      tl.kill();
      clearInterval(sliderInterval);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Animated background layers */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000`}
          style={{
            opacity: index === currentSlide ? 1 : 0,
          }}
        >
          <img
            src={bg}
            alt={`Background ${index + 1}`}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      ))}

      {/* Canvas for 3D Scene */}
      {currentSlide === 0 && (
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
      )}
      {/* <div className="absolute inset-0 z-0">
        <Scene3D />
      </div> */}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-gradient"
        >
          <span>Jay Sarvaiya</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-xl text-foreground/80"
        >
          Software Developer
        </p>

        <div
          ref={ctaRef}
          className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row"
        >
          <a
            href="mailto:jay32402@gmail.com"
            className="px-6 py-3 bg-accent hover:bg-accent/80 text-white font-medium rounded-full transition-colors duration-300"
          >
            Contact Me
          </a>
          <a
            href="#projects"
            className="px-6 py-3 bg-transparent border border-foreground/20 hover:bg-foreground/10 text-foreground font-medium rounded-full transition-colors duration-300"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToAbout}
      >
        <ArrowDown
          className="text-foreground/70 animate-bounce-slow"
          size={32}
        />
      </div>
    </section>
  );
};

export default Hero;
