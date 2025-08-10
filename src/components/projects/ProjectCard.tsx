import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import BlurText from "../../TextAnimations/BlurText/BlurText";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    image: string;
    link: string;
    type: "mobile" | "web";
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="overflow-hidden group transition-all duration-300 relative"
      >
        <div className="h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="shimmer-text text-xl font-bold mb-3">
            {project.title}
          </h3>
          <p className="text-foreground/70 mb-4 text-sm">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-foreground/10 rounded-full text-foreground/80 transition-all duration-200 hover:bg-accent/20 hover:text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-block text-accent hover:text-accent/80 text-sm font-medium transition-colors reveal-border cursor-target"
          >
            <BlurText
              text="View Project →"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-accent hover:text-accent/80"
            />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl font-semibold">{project.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-[calc(90vh-80px)] bg-background/95">
            {project.type === "mobile" ? (
              <div className="w-full h-full flex items-center justify-center p-6">
                <div className="relative w-[375px] min-h-[600px] h-full border-8 border-gray-800 rounded-[60px] overflow-hidden shadow-2xl bg-white">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    src={project.link}
                    className="w-full min-h-[600px] h-[103%]"
                    title={project.title}
                    onLoad={handleIframeLoad}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full p-6">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-border relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/95">
                      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    src={project.link}
                    className="w-full h-full"
                    title={project.title}
                    onLoad={handleIframeLoad}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
