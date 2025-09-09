import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useActiveSection } from "@/hooks/use-active-section";
import PillNav from "./PillNav";
import FlowingMenu from "./FlowingMenu/FlowingMenu";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const navItems = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  const activeSection = useActiveSection(navItems.map((item) => item.href));

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
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
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

  const navClasses = useMemo(
    () => (isScrolled ? "glass-morphism py-3" : "bg-transparent py-5"),
    [isScrolled]
  );

  const MemoizedGooeyNav = useMemo(
    () => (
      <PillNav
        logo={""}
        logoAlt="Company Logo"
        items={navItems}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
    ),
    [navItems, activeSection]
  );

  const MemoizedFlowingMenu = useMemo(
    () => (
      <FlowingMenu
        items={navItems.map((item) => ({
          link: item.href,
          text: item.label,
          isActive: item.href === activeSection,
          image:
            item.href === "home"
              ? "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60"
              : item.href === "about"
              ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60"
              : item.href === "experience"
              ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60"
              : item.href === "skills"
              ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
              : item.href === "projects"
              ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
              : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
        }))}
      />
    ),
    [navItems, activeSection]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
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
          <span className={`font-bold text-lg sm:text-xl`}>DevPortfolio</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-full justify-end items-center ">
          {MemoizedGooeyNav}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 ml-2 hover:text-accent transition-colors cursor-target"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <AnimatedThemeToggler />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden duration-300  ${
          isMobileMenuOpen ? "" : "hidden"
        } h-max absolute inset-0 bg-black/80 backdrop-blur-md z-50`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 hover:text-accent transition-colors cursor-target"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
            {MemoizedFlowingMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
