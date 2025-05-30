
import React from 'react';
import SkillBar from './SkillBar';
import SpotlightCard from '../SpotlightCard/SpotlightCard';

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
    <SpotlightCard
      className="h-full glass-morphism p-6 rounded-xl"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >

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
    </SpotlightCard>
  );
};

export default SkillCategory;
