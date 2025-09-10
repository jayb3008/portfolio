
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  proficiency: number;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, proficiency, delay }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const bar = barRef.current;
    const progress = progressRef.current;
    
    if (bar && progress) {
      gsap.fromTo(
        bar,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: delay * 0.1,
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
      
      gsap.fromTo(
        progress,
        { width: "0%" },
        {
          width: `${proficiency}%`,
          duration: 1,
          delay: 0.2 + delay * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, [delay, proficiency]);
  
  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm font-medium text-foreground/60">{proficiency}%</span>
      </div>
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <div 
          ref={progressRef} 
          className="h-full bg-gradient-to-r from-accent to-purple-600 rounded-full" 
          style={{ width: "0%" }} 
        />
      </div>
    </div>
  );
};

export default SkillBar;
