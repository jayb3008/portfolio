
import React from 'react';
import SkillBar from './SkillBar';

interface Technology {
  name: string;
  proficiency: number;
}

interface SkillCategoryProps {
  category: string;
  technologies: Technology[];
  categoryIndex: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  category, 
  technologies, 
  categoryIndex 
}) => {
  return (
    <div className="glass-morphism rounded-xl p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full filter blur-xl"></div>
      
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gradient-blue">
        {category}
      </h3>
      
      <div>
        {technologies.map((tech, techIndex) => (
          <SkillBar 
            key={tech.name}
            name={tech.name}
            proficiency={tech.proficiency}
            delay={categoryIndex * 5 + techIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
