import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useActiveSection } from "@/hooks/use-active-section";
import GooeyNav from "./GooeyNav/GooeyNav";
import FlowingMenu from "./FlowingMenu/FlowingMenu";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const navItems = useMemo(() => [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ], []);

  const activeSection = useActiveSection(navItems.map(item => item.id));

  useEffect(() => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  }, [activeSection]);

  // Optimized scroll handler with RAF and throttling
  const handleScroll = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
  }, []);

  useEffect(() => {
    const scrollHandler = handleScroll();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [handleScroll]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = isMobile ? 70 : 80;
    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Optimized easing function
      const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
    setIsMobileMenuOpen(false);
  }, [isMobile]);

  const navClasses = useMemo(() =>
    isScrolled ? "glass-morphism py-3" : "bg-transparent py-5",
    [isScrolled]
  );

  const MemoizedGooeyNav = useMemo(() => (
    <GooeyNav
      items={navItems.map((item) => ({
        ...item,
        href: `#${item.id}`,
        isActive: item.id === activeSection,
      }))}
      particleCount={15}
      particleDistances={[90, 10]}
      particleR={100}
      initialActiveIndex={navItems.findIndex(item => item.id === activeSection)}
      animationTime={600}
      timeVariance={300}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    />
  ), [navItems, activeSection]);

  const MemoizedFlowingMenu = useMemo(() => (
    <FlowingMenu
      items={navItems.map((item) => ({
        link: `#${item.id}`,
        text: item.label,
        isActive: item.id === activeSection,
        image: item.id === "home"
          ? "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60"
          : item.id === "about"
            ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60"
            : item.id === "experience"
              ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60"
              : item.id === "skills"
                ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
                : item.id === "projects"
                  ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
                  : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60"
      }))}
    />
  ), [navItems, activeSection]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navClasses}`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mr-2 sm:mr-3 shadow-lg shadow-accent/20">
            <span className="text-base sm:text-lg font-bold text-white">
              JS
            </span>
          </div>
          <span
            className={`font-bold text-lg sm:text-xl ${isScrolled ? "text-white" : "text-white"}`}
          >
            DevPortfolio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {MemoizedGooeyNav}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 ml-2 hover:text-accent transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden duration-300  ${isMobileMenuOpen ? "" : "hidden"} h-max absolute inset-0 bg-black/80 backdrop-blur-md z-50`}>
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 hover:text-accent transition-colors"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>
          {MemoizedFlowingMenu}
        </div>
      </div>

    </nav>
  );
};

export default React.memo(NavBar);
