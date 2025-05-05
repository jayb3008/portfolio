import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after hydration to prevent UI mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full" aria-hidden="true" />;
  }

  return (
    <div className="relative inline-block">
      <div className="flex rounded-full bg-secondary/80 p-1">
        <button
          onClick={() => setTheme("light")}
          className={`rounded-full p-1.5 transition-colors ${
            theme === "light"
              ? "bg-white text-accent shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Light theme"
        >
          <Sun className="h-4 w-4" />
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`rounded-full p-1.5 transition-colors ${
            theme === "system"
              ? "bg-white text-accent shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="System theme"
        >
          <Laptop className="h-4 w-4" />
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`rounded-full p-1.5 transition-colors ${
            theme === "dark"
              ? "bg-white text-accent shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Dark theme"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
