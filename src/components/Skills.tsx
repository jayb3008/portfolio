import React, { useMemo, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "./skills/skillsData";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollFloat from "@/TextAnimations/ScrollFloat/ScrollFloat";

// Lazy load components
const LazySkillCategory = React.lazy(() => import("./skills/SkillCategory"));

const Skills: React.FC = () => {
  const isMobile = useIsMobile();
  const [isAnimationsReady, setIsAnimationsReady] = useState(false);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }), []);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }), []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  // Set animations ready after initial render
  useEffect(() => {
    setIsAnimationsReady(true);
  }, []);

  const MemoizedSkillCategories = useMemo(() => (
    skills.map((skillCategory, categoryIndex) => (
      <Suspense
        key={skillCategory.category}
        fallback={
          <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
        }
      >
        <LazySkillCategory
          category={skillCategory.category}
          technologies={skillCategory.technologies}
          categoryIndex={categoryIndex}
        />
      </Suspense>
    ))
  ), []);

  const MemoizedDecorativeElements = useMemo(() => (
    <>
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
    </>
  ), []);

  return (
    <motion.section
      id="skills"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background"
        style={{ y: backgroundY, opacity }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              My Skills
            </ScrollFloat>
          </h2>

          <motion.p
            className="text-lg text-foreground/80 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            I've worked with a variety of technologies in the web development
            world. Here's an overview of my technical skills and proficiency
            levels.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={staggerContainer}
        >
          {MemoizedSkillCategories}
        </motion.div>

        {MemoizedDecorativeElements}
      </div>
    </motion.section>
  );
};

export default React.memo(Skills);
