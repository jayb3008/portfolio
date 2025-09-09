import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["6834076b-ba9b-4faf-8f90-1d834d7d50a2.lovableproject.com"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    cssMinify: true,
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router")
          ) {
            return "react-vendor";
          }
          // Three.js ecosystem
          if (id.includes("three") || id.includes("@react-three")) {
            return "three-vendor";
          }
          // Radix UI components
          if (id.includes("@radix-ui")) {
            return "ui-vendor";
          }
          // Animation libraries
          if (
            id.includes("framer-motion") ||
            id.includes("gsap") ||
            id.includes("@gsap")
          ) {
            return "animations";
          }
          // Form libraries
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("zod")
          ) {
            return "forms";
          }
          // Utility libraries
          if (
            id.includes("clsx") ||
            id.includes("tailwind-merge") ||
            id.includes("class-variance-authority")
          ) {
            return "utils";
          }
          // Node modules
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
        pure_funcs:
          mode === "production" ? ["console.log", "console.info"] : [],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@tanstack/react-query",
      "framer-motion",
    ],
    exclude: ["@lovable-tagger"],
  },
  css: {
    devSourcemap: mode === "development",
  },
}));
