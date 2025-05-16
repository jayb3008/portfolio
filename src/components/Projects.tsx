import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Rejuuv Marketplace",
    description:
      "A platform revolutionizing the spa and massage industry in the USA by connecting providers, professionals, and customers.",
    tech: ["React.js", "Next.js", "Redux", "Context API", "Express.js"],
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=500&fit=crop",
    link: "#",
  },
  {
    title: "Happy Kamper",
    description:
      "An innovative platform connecting activity providers with parents in Indonesia, making it easy to find enriching experiences for children.",
    tech: ["React Native", "Redux", "Node.js", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=500&fit=crop",
    link: "#",
  },
  {
    title: "Let's Go",
    description:
      "A comprehensive travel planning and booking platform with real-time updates and personalized recommendations.",
    tech: ["Angular", "NgRx", "Express.js", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=500&fit=crop",
    link: "#",
  },
  // {
  //   title: "Interactive Data Visualization",
  //   description:
  //     "A data visualization project that transforms complex datasets into interactive, intuitive charts and graphs for better insights.",
  //   tech: ["D3.js", "React", "Node.js", "Express"],
  //   image:
  //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&fit=crop",
  //   link: "#",
  // },
  // {
  //   title: "3D Product Configurator",
  //   description:
  //     "An interactive 3D product configurator allowing users to customize products in real-time with color and feature options.",
  //   tech: ["Three.js", "React", "GSAP", "WebGL"],
  //   image:
  //     "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=500&fit=crop",
  //   link: "#",
  // },
];

const ProjectCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
}> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass-morphism rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-accent/20"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gradient-blue">
          {project.title}
        </h3>
        <p className="text-foreground/70 mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-foreground/10 rounded-full text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          className="inline-block text-accent hover:text-accent/80 text-sm font-medium transition-colors"
        >
          View Project →
        </a>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const intro = introRef.current;

    if (section && heading && intro) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        intro,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-background relative"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/10 to-background pointer-events-none"></div>

      <div className="container mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          <span className="text-gradient">Featured Projects</span>
        </h2>

        <p
          ref={introRef}
          className="text-center text-lg text-foreground/80 mb-16 max-w-3xl mx-auto"
        >
          Here are some of my recent projects that showcase my skills and
          expertise in web development and design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="px-8 py-3 bg-accent hover:bg-accent/80 text-white font-medium rounded-full transition-colors duration-300 inline-block"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
