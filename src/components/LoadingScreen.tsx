
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the loading screen
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5, // Faster fadeout
          onComplete: onLoadingComplete
        });
      }
    });

    // Initial animation
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" } // Faster animation
    );

    // Text animation
    tl.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }, // Faster animation
      "-=0.2"
    );

    // Animate the progress bar
    tl.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "power2.inOut" }, // Faster progress
      "-=0.4"
    );

    // Clean up
    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50"
    >
      <div ref={logoRef} className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">JS</span>
        </div>
      </div>
      <div ref={textRef} className="mb-8">
        <h1 className="text-gradient text-3xl font-bold mb-2">Developer Portfolio</h1>
        <p className="text-foreground/70">Building awesome experiences...</p>
      </div>
      <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-accent rounded-full w-0"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
