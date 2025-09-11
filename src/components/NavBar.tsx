import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Menu } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useActiveSection } from "@/hooks/use-active-section";
import PillNav from "./PillNav";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";
import BubbleMenu, { BubbleMenuRef } from "./BubbleMenu";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const bubbleMenuRef = useRef<BubbleMenuRef>(null);

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
        activeHref={activeSection}
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

  const logoComponent = (
    <div className="flex items-center">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mr-2 sm:mr-3 shadow-lg shadow-accent/20">
        <span className="text-base sm:text-lg font-bold ">JS</span>
      </div>
      <span className={`font-bold text-lg sm:text-xl text-foreground`}>
        DevPortfolio
      </span>
    </div>
  );

  if (isMobile) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navClasses}`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
          {logoComponent}
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <button
              onClick={() => bubbleMenuRef.current?.toggle()}
              className="p-2 hover:text-accent transition-colors cursor-target"
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        <BubbleMenu
          ref={bubbleMenuRef}
          items={navItems}
          displayHeader={false}
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </header>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navClasses}`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        {logoComponent}
        <div className="flex w-full justify-end items-center ">
          {MemoizedGooeyNav}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
