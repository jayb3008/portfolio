export interface SkillCategory {
  name: string;
  slug: string;
}

export interface Skill {
  slug: string;
  name: string;
  color: string;
  logo: string;
  category?: SkillCategory;
  description?: string;
}

export const categories: SkillCategory[] = [
  { name: "Programming Languages", slug: "pro-lang" },
  { name: "Frameworks", slug: "framework" },
  { name: "Libraries", slug: "library" },
  { name: "Languages", slug: "lang" },
  { name: "Databases", slug: "db" },
  { name: "ORMs", slug: "orm" },
  { name: "DevOps", slug: "devops" },
  { name: "Testing", slug: "test" },
  { name: "Dev Tools", slug: "devtools" },
  { name: "Markup & Style", slug: "markup-style" },
  { name: "Design", slug: "design" },
  { name: "Soft Skills", slug: "soft" },
];

export const skills: Skill[] = [
  {
    slug: "js",
    name: "JavaScript",
    color: "yellow",
    logo: "JS",
    category: categories.find((c) => c.slug === "pro-lang"),
    description:
      "A high-level, interpreted programming language that is one of the core technologies of the World Wide Web.",
  },
  {
    slug: "ts",
    name: "TypeScript",
    color: "blue",
    logo: "TS",
    category: categories.find((c) => c.slug === "pro-lang"),
    description:
      "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  },
  {
    slug: "css",
    name: "CSS",
    color: "blue",
    logo: "F",
    category: categories.find((c) => c.slug === "markup-style"),
    description:
      "A stylesheet language used to describe the presentation of a document written in HTML or XML.",
  },
  {
    slug: "html",
    name: "HTML",
    color: "orange",
    logo: "5",
    category: categories.find((c) => c.slug === "markup-style"),
    description:
      "The standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    slug: "sass",
    name: "Sass",
    color: "pink",
    logo: "S",
    category: categories.find((c) => c.slug === "markup-style"),
    description:
      "A preprocessor scripting language that is interpreted or compiled into CSS.",
  },
  {
    slug: "reactjs",
    name: "React Js",
    color: "cyan",
    logo: "⚛",
    category: categories.find((c) => c.slug === "library"),
    description:
      "A JavaScript library for building user interfaces, particularly web applications.",
  },
  {
    slug: "svelte",
    name: "Svelte",
    color: "orange",
    logo: "S",
    category: categories.find((c) => c.slug === "library"),
    description:
      "A modern JavaScript framework for building user interfaces with a compiler approach.",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    color: "black",
    logo: "N",
    category: categories.find((c) => c.slug === "framework"),
    description:
      "A React framework for production with features like server-side rendering and static site generation.",
  },
  {
    slug: "angular",
    name: "Angular",
    color: "red",
    logo: "A",
    category: categories.find((c) => c.slug === "framework"),
    description:
      "A platform and framework for building single-page client applications using HTML and TypeScript.",
  },
  {
    slug: "vue",
    name: "Vue.js",
    color: "green",
    logo: "V",
    category: categories.find((c) => c.slug === "framework"),
    description:
      "A progressive JavaScript framework for building user interfaces and single-page applications.",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    color: "green",
    logo: "N",
    category: categories.find((c) => c.slug === "pro-lang"),
    description:
      "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
  },
  {
    slug: "express",
    name: "Express.js",
    color: "black",
    logo: "E",
    category: categories.find((c) => c.slug === "framework"),
    description: "A fast, unopinionated, minimalist web framework for Node.js.",
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    color: "green",
    logo: "M",
    category: categories.find((c) => c.slug === "db"),
    description:
      "A source-available cross-platform document-oriented database program.",
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    color: "blue",
    logo: "P",
    category: categories.find((c) => c.slug === "db"),
    description: "A powerful, open source object-relational database system.",
  },
  {
    slug: "tailwind",
    name: "Tailwind CSS",
    color: "cyan",
    logo: "T",
    category: categories.find((c) => c.slug === "markup-style"),
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces.",
  },
  {
    slug: "styled-components",
    name: "Styled Components",
    color: "pink",
    logo: "SC",
    category: categories.find((c) => c.slug === "library"),
    description:
      "A CSS-in-JS library that uses tagged template literals to style your components.",
  },
  {
    slug: "figma",
    name: "Figma",
    color: "purple",
    logo: "F",
    category: categories.find((c) => c.slug === "design"),
    description:
      "A collaborative interface design tool for creating, testing, and sharing designs.",
  },
  {
    slug: "git",
    name: "Git",
    color: "orange",
    logo: "G",
    category: categories.find((c) => c.slug === "devtools"),
    description:
      "A distributed version control system for tracking changes in source code during software development.",
  },
  {
    slug: "docker",
    name: "Docker",
    color: "blue",
    logo: "D",
    category: categories.find((c) => c.slug === "devops"),
    description:
      "A platform that uses containerization to make it easier to create, deploy, and run applications.",
  },
  {
    slug: "aws",
    name: "AWS",
    color: "orange",
    logo: "A",
    category: categories.find((c) => c.slug === "devops"),
    description:
      "Amazon Web Services - a comprehensive cloud computing platform offered by Amazon.",
  },
  {
    slug: "jest",
    name: "Jest",
    color: "red",
    logo: "J",
    category: categories.find((c) => c.slug === "test"),
    description:
      "A JavaScript testing framework designed to ensure correctness of any JavaScript codebase.",
  },
];

export const title = "Skills";

export const getSkills = (...slugs: string[]): Skill[] =>
  skills.filter((skill) => slugs.includes(skill.slug));

export const groupByCategory = (
  query: string
): Array<{ category: SkillCategory; items: Skill[] }> => {
  const result: Array<{ category: SkillCategory; items: Skill[] }> = [];
  const others: Skill[] = [];

  skills.forEach((skill) => {
    if (
      query.trim() &&
      !skill.name.toLowerCase().includes(query.trim().toLowerCase())
    ) {
      return;
    }

    // Push to others if skill doesn't have a category
    if (!skill.category) {
      others.push(skill);
      return;
    }

    // Check if category exists
    let category = result.find(
      (item) => item.category.slug === skill.category?.slug
    );

    if (!category) {
      category = { items: [], category: skill.category };
      result.push(category);
    }

    category.items.push(skill);
  });

  if (others.length !== 0) {
    result.push({
      category: { name: "Others", slug: "others" },
      items: others,
    });
  }

  return result;
};
