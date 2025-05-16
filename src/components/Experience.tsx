import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  const experiences = [
    {
      title: "Sr. React Developer",
      company: "Thinktanker",
      location: "Ahmedabad",
      period: "Jan, 2025 - Present",
      type: "Full-time",
      achievements: [
        "Developing user interfaces using React.js, Next.js, and React Native",
        "Building reusable components and implementing state management",
        "Integrating REST APIs and optimizing application performance",
        "Ensuring cross-browser and cross-platform compatibility",
        "Collaborating with team members for project delivery",
      ],
      skills: ["React.js", "Next.js", "React Native", "Redux", "REST APIs"],
    },
    {
      title: "Front-End Developer",
      company: "Technooka",
      location: "Ahmedabad",
      period: "Aug, 2024 - Dec, 2024",
      type: "Full-time",
      achievements: [
        "Developed user interfaces using Angular, React.js, Next.js, and React Native",
        "Built reusable components and implemented state management with Redux, Context API, and NgRx",
        "Integrated REST APIs with Express.js, Node.js, and MongoDB, optimizing data flow",
        "Improved performance with lazy loading and code splitting",
        "Ensured cross-browser and cross-platform compatibility",
      ],
      skills: [
        "Angular",
        "React.js",
        "Next.js",
        "React Native",
        "Redux",
        "NgRx",
        "MongoDB",
      ],
    },
    {
      title: "Junior Front-End Developer",
      company: "Groovy Technoweb PVT LTD",
      location: "Nadiad",
      period: "Jun, 2022 - Aug, 2024",
      type: "Full-time",
      achievements: [
        "Developed responsive web and mobile UIs using React.js, Next.js, React Native",
        "Converted design mock-ups into interactive applications",
        "Built reusable components and implemented state management",
        "Integrated backend APIs and optimized performance",
        "Ensured cross-browser & cross-platform compatibility",
      ],
      skills: ["React.js", "Next.js", "React Native", "Redux", "REST APIs"],
    },
    {
      title: "Intern Front-End Developer",
      company: "Groovy Web LLP",
      location: "Nadiad",
      period: "Feb, 2022 - May, 2022",
      type: "Internship",
      achievements: [
        "Learned and implemented HTML, CSS, and JavaScript",
        "Developed user-friendly and responsive web interfaces",
        "Created interactive features including forms and dynamic content",
        "Explored React.js and React Native development",
        "Implemented mobile UI/UX best practices",
      ],
      skills: ["HTML", "CSS", "JavaScript", "React.js", "React Native"],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;
    const cards = cardsRef.current;

    if (section && heading && timeline) {
      // Animate heading
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate timeline line only if not mobile
      if (!isMobile && timeline.querySelector(".timeline-line")) {
        gsap.fromTo(
          timeline.querySelector(".timeline-line"),
          {
            scaleY: 0,
            opacity: 0,
          },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timeline,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animate cards with stagger
      cards.forEach((card, index) => {
        if (card) {
          // Calculate direction based on screen size
          const direction = isMobile ? 1 : index % 2 === 0 ? -1 : 1;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: direction * 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          // Animate timeline dots if present
          const dot = card.querySelector(".timeline-dot");
          if (dot) {
            gsap.fromTo(
              dot,
              {
                scale: 0,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Animate connector lines if present
          const connector = card.querySelector(".timeline-connector");
          if (connector) {
            gsap.fromTo(
              connector,
              {
                scaleX: 0,
                opacity: 0,
              },
              {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    }
  }, [isMobile]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
        >
          <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Professional Experience
          </span>
        </h2>

        <div ref={timelineRef} className="max-w-6xl mx-auto relative">
          {/* Center timeline line - hidden on mobile */}
          {!isMobile && (
            <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20 transform -translate-x-1/2 origin-top hidden md:block"></div>
          )}

          <div className="space-y-8 md:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative flex items-center ${
                  isMobile
                    ? "flex-col"
                    : index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                }`}
              >
                {/* Timeline dot - hidden on mobile */}
                {!isMobile && (
                  <div className="timeline-dot absolute left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 shadow-md shadow-primary/20 z-10 hidden md:block"></div>
                )}

                {/* Connector line - hidden on mobile */}
                {!isMobile && (
                  <div
                    className={`timeline-connector absolute left-1/2 top-1/2 w-24 h-0.5 bg-gradient-to-r ${
                      index % 2 === 0
                        ? "from-primary/50 to-transparent transform -translate-x-full origin-right"
                        : "from-transparent to-primary/50 origin-left"
                    } hidden md:block`}
                  ></div>
                )}

                <Card
                  className={`relative w-full md:w-[calc(50%-3rem)] border-none bg-background/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${
                    !isMobile && index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full filter blur-xl"></div>
                  <div className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap gap-2 items-baseline">
                        <CardTitle className="text-lg sm:text-xl font-bold text-primary">
                          {exp.title}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary"
                        >
                          {exp.type}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                          <Building2 className="w-3.5 h-3.5 text-primary/70" />
                          <span className="font-medium">{exp.company}</span>
                          <span className="hidden sm:inline">•</span>
                          <div className="flex items-center gap-1.5 w-full sm:w-auto">
                            <MapPin className="w-3.5 h-3.5 text-primary/70 sm:ml-0" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-primary/80">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-base font-semibold mb-2 text-primary">
                          Key Achievements
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-base font-semibold mb-2 text-primary">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="px-2 py-0.5 text-xs font-medium bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
