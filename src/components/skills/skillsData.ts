
export interface Technology {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  category: string;
  technologies: Technology[];
}

export const skills = [
  {
    category: "Programming Languages",
    technologies: [
      { name: "JavaScript", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "HTML/CSS", proficiency: 95 }
    ]
  },
  {
    category: "Front-End Development",
    technologies: [
      { name: "React.js", proficiency: 90 },
      { name: "Next.js", proficiency: 85 },
      { name: "Angular", proficiency: 85 },
      { name: "React Native", proficiency: 80 }
    ]
  },
  {
    category: "State Management",
    technologies: [
      { name: "Redux", proficiency: 85 },
      { name: "Context API", proficiency: 90 },
      { name: "NgRx", proficiency: 80 },
      { name: "RxJS", proficiency: 75 }
    ]
  },
  {
    category: "CSS Frameworks & Tools",
    technologies: [
      { name: "Tailwind CSS", proficiency: 90 },
      { name: "Styled Components", proficiency: 85 },
      { name: "SCSS/SASS", proficiency: 80 }
    ]
  },
  {
    category: "Design & UI",
    technologies: [
      { name: "Responsive Design", proficiency: 90 },
      { name: "UI/UX Principles", proficiency: 85 },
      { name: "Figma", proficiency: 75 }
    ]
  },
  {
    category: "Tools & Others",
    technologies: [
      { name: "Git", proficiency: 85 },
      { name: "REST APIs", proficiency: 90 },
      { name: "Jest/Testing", proficiency: 80 }
    ]
  }
];
