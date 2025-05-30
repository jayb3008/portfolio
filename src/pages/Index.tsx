import React, { useState, useEffect, lazy, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { ThemeProvider } from "../components/ThemeProvider";

// Lazy load components
const About = lazy(() => import("../components/About"));
const Skills = lazy(() => import("../components/Skills"));
const Projects = lazy(() => import("../components/Projects"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));
const Experience = lazy(() => import("@/components/Experience"));
const ChatBot = lazy(() => import("@/components/chatbot/ChatBot"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate assets loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
              <Hero />
              <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
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
