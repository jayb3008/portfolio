interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  type: "web" | "mobile";
}

export const projects: Project[] = [
  
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe API"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=500&fit=crop",
    link: "https://e-commerce-orcin-psi-42.vercel.app/",
    type: "web",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
    tech: ["React.js", "Firebase", "Material-UI", "Redux"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&fit=crop",
    link: "#",
    type: "web",
  },
  {
    title: "Code Puzzle",
    description:
      "An interactive coding puzzle game that helps developers learn and practice programming concepts through engaging challenges.",
    tech: ["React.js", "TypeScript", "Next.js", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=500&fit=crop",
    link: "https://code-puzzle-sable.vercel.app/",
    type: "web",
  },
  {
    title: "Fitness Tracking App",
    description:
      "A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
    tech: ["React Native", "Node.js", "MongoDB", "Redux"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&fit=crop",
    link: "#",
    type: "mobile",
  },
  {
    title: "Real Estate Platform",
    description:
      "A modern real estate platform with property listings, virtual tours, and mortgage calculator features.",
    tech: ["Next.js", "Three.js", "Node.js", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&fit=crop",
    link: "#",
    type: "web",
  },
];
