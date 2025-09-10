import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import BlurText from "../TextAnimations/BlurText/BlurText";
import TextPressure from "../TextAnimations/TextPressure/TextPressure";

import { useIsMobile } from "@/hooks/use-mobile";
import Ballpit from "./Ballpit";
import Shuffle from "./Shuffle";

// Lazy load components
const LazyMagnetLines = React.lazy(
  () => import("../Animations/MagnetLines/MagnetLines")
);

// Preload critical images
const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAnimationsReady, setIsAnimationsReady] = useState(false);
  const isMobile = useIsMobile();

  const backgrounds = useMemo(
    () => [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920",
    ],
    []
  );

  // Preload background image
  useEffect(() => {
    backgrounds.forEach(preloadImage);
  }, [backgrounds]);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (!isAnimationsReady) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const elements = {
      title: titleRef.current,
      subtitle: subtitleRef.current,
      cta: ctaRef.current,
      arrow: arrowRef.current,
    };

    if (elements.title && elements.subtitle && elements.cta && elements.arrow) {
      tl.fromTo(
        elements.title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      )
        .fromTo(
          elements.subtitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          elements.cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          elements.arrow,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            onComplete: () => {
              gsap.to(elements.arrow, {
                y: 10,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
            },
          },
          "-=0.2"
        );
    }

    return () => {
      tl.kill();
    };
  }, [isAnimationsReady]);

  // Set animations ready after image loads
  useEffect(() => {
    if (isImageLoaded) {
      setIsAnimationsReady(true);
    }
  }, [isImageLoaded]);

  const MemoizedCTA = useMemo(
    () => (
      <div
        ref={ctaRef}
        className="space-y-4 mt-10 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row"
      >
        <a
          href="#contact"
          className="group px-6 py-3 bg-transparent border  cursor-target  font-medium rounded-full transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="relative z-10 ">
            <BlurText
              text="Contact Me"
              delay={100}
              animateBy="words"
              direction="top"
              className=" group-hover:scale-105 transition-transform duration-300 "
            />
          </div>
        </a>
        <a
          href="#projects"
          className="group px-6 cursor-target py-3 bg-transparent border font-medium rounded-full transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="relative z-10">
            <BlurText
              text="View Projects"
              delay={100}
              animateBy="words"
              direction="top"
              className=" group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </a>
      </div>
    ),
    []
  );

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {!isMobile && (
        <div className="absolute inset-0">
          <Ballpit
            count={100}
            gravity={0.7}
            friction={0.8}
            wallBounce={0.95}
            followCursor={false}
          />
        </div>
      )}
      <div className="absolute inset-0 hero-gradient z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-background/20 to-transparent"></div>

        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/20 filter blur-3xl opacity-30 animate-spin-slow"></div>
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/20 filter blur-3xl opacity-30 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        ></div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
        >
          <Suspense fallback={<div>Jay Sarvaiya</div>}>
            <Shuffle
              text="Jay Sarvaiya"
              tag="span"
              shuffleDirection="right"
              duration={0.6}
              stagger={0.05}
              animationMode="evenodd"
              triggerOnHover={true}
              scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
              onShuffleComplete={() => console.log("Name shuffle complete")}
            />
          </Suspense>
        </h1>

        <TextPressure
          text="Software Developer"
          width={true}
          weight={true}
          italic={true}
          alpha={false}
        />

        {MemoizedCTA}
      </div>

      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToAbout}
      >
        <ArrowDown
          className="text-white glow-on-hover p-2 rounded-full"
          size={32}
        />
      </div>
    </section>
  );
};

export default React.memo(Hero);
