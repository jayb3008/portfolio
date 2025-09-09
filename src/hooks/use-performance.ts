import { useEffect, useRef } from "react";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

export const usePerformance = (componentName: string) => {
  const startTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - renderStartTime.current;

      // Log performance metrics in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Performance] ${componentName}:`, {
          renderTime: `${renderTime.toFixed(2)}ms`,
          memoryUsage: (performance as any).memory
            ? `${Math.round(
                (performance as any).memory.usedJSHeapSize / 1024 / 1024
              )}MB`
            : "N/A",
        });
      }
    };
  }, [componentName]);

  // Measure component load time
  useEffect(() => {
    const loadTime = Date.now() - startTime.current;

    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${componentName} loaded in:`, `${loadTime}ms`);
    }
  }, [componentName]);

  return {
    measureRender: (fn: () => void) => {
      const start = performance.now();
      fn();
      const end = performance.now();

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Performance] ${componentName} render:`,
          `${(end - start).toFixed(2)}ms`
        );
      }
    },
  };
};
