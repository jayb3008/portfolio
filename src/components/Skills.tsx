
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillCategory from './skills/SkillCategory';
import { skills } from './skills/skillsData';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
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
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
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
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-secondary/20"
    >
      <div className="container mx-auto">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          <span className="text-gradient">My Skills</span>
        </h2>
        
        <p 
          ref={introRef}
          className="text-center text-lg text-foreground/80 mb-16 max-w-3xl mx-auto"
        >
          I've worked with a variety of technologies in the web development world.
          Here's an overview of my technical skills and proficiency levels.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills.map((skillCategory, categoryIndex) => (
            <SkillCategory 
              key={skillCategory.category}
              category={skillCategory.category}
              technologies={skillCategory.technologies}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
