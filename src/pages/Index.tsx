import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import Experience from "@/components/Experience";
import ChatBot from "@/components/chatbot/ChatBot";

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
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
            <ChatBot />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
