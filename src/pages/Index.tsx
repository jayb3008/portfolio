import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { ThemeProvider } from "../components/ThemeProvider";
import TargetCursor from "@/Animations/TargetCursor/TargetCursor";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load components with better error boundaries
const About = lazy(() => import("../components/About"));
const Skills = lazy(() => import("../components/Skills"));
const Projects = lazy(() => import("../components/Projects"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));
const Experience = lazy(() => import("@/components/Experience"));
const ChatBot = lazy(() => import("@/components/chatbot/ChatBot"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Memoize loading logic
  const loadingConfig = useMemo(
    () => ({
      minLoadingTime: 2000, // Minimum loading time for better UX
      maxLoadingTime: 5000, // Maximum loading time
    }),
    []
  );

  useEffect(() => {
    // Simulate assets loading with better timing
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, loadingConfig.minLoadingTime - elapsed);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadingConfig]);

  const handleLoadingComplete = () => {
    document.body.style.overflow = "auto";
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative min-h-screen">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <>
            <NavBar />
            <main>
              {!isMobile && (
                <TargetCursor spinDuration={2} hideDefaultCursor={true} />
              )}
              <Hero />
              <Suspense fallback={<LoadingFallback />}>
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
              <ChatBot />
            </Suspense>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
