import React, {
  useMemo,
  Suspense,
  useState,
  useEffect,
  useCallback,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills, groupByCategory, title } from "./skills/skillCardsData";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollFloat from "@/TextAnimations/ScrollFloat/ScrollFloat";
import { Search } from "lucide-react";

// Lazy load components
const LazySkillCard = React.lazy(() => import("./skills/SkillCard"));

const Skills: React.FC = () => {
  const isMobile = useIsMobile();
  const [isAnimationsReady, setIsAnimationsReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });

  const fadeInUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    }),
    []
  );

  const staggerContainer = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
      hover: {
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  // Group skills by category using the new structure
  const groupedSkills = useMemo(() => {
    return groupByCategory(searchTerm);
  }, [searchTerm]);

  // Set animations ready after initial render
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsAnimationsReady(true);
    });
  }, []);

  const MemoizedSkillCards = useMemo(
    () =>
      skills.map((skill, index) => (
        <Suspense
          key={skill.slug}
          fallback={
            <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
          }
        >
          <LazySkillCard
            name={skill.name}
            color={skill.color}
            delay={index}
            logo={skill.logo}
            slug={skill.slug}
          />
        </Suspense>
      )),
    []
  );

  const MemoizedDecorativeElements = useMemo(
    () => (
      <>
        <motion.div
          className="absolute top-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-3xl"
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
    ),
    []
  );

  return (
    <motion.section
      id="skills"
      className="relative overflow-hidden px-6 py-16 md:px-8 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background"
        style={{ y: backgroundY, opacity }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          className="mb-10 text-center md:mb-16"
          variants={fadeInUp} // This now has a faster transition from useMemo
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-4 px-2 text-3xl font-bold md:text-5xl">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              {title}
            </ScrollFloat>
          </h2>

          <motion.p
            className="mx-auto mb-8 max-w-3xl px-2 text-base text-foreground/80 md:text-lg"
            variants={fadeInUp} // This now has a faster transition from useMemo
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            I've worked with a variety of technologies in the web development
            world. Here's an overview of my technical skills and proficiency
            levels.
          </motion.p>
        </motion.div>

        {/* Skills by Category */}
        <motion.div className="space-y-8" variants={staggerContainer}>
          {groupedSkills.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center gap-3 py-8"
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-4xl">📦</div>
              <p className="text-base font-light text-muted-foreground">
                Could not find anything...
              </p>
            </motion.div>
          ) : (
            groupedSkills.map((group, groupIndex) => (
              <motion.div
                key={group.category.slug}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }} // This transition is fine
                className="space-y-5"
              >
                {/* Category Header with Divider */}
                <div className="flex items-center gap-4 px-2">
                  <div className="h-px w-4 bg-muted-foreground" />
                  <p className="whitespace-nowrap text-lg font-medium text-muted-foreground">
                    {group.category.name}
                  </p>
                  <div className="h-px flex-1 bg-muted-foreground" />
                </div>

                {/* Skills Grid - Responsive grid with better breakpoints */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {group.items.map((skill, index) => (
                    <Suspense
                      key={skill.slug}
                      fallback={
                        <div className="h-24 animate-pulse rounded-xl bg-gray-200 sm:h-28" />
                      }
                    >
                      <LazySkillCard
                        name={skill.name}
                        color={skill.color}
                        delay={index}
                        logo={skill.logo}
                        slug={skill.slug}
                      />
                    </Suspense>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {MemoizedDecorativeElements}
      </div>
    </motion.section>
  );
};

export default React.memo(Skills);
