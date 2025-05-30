
// Profile information for AI training
export const profileInfo = {
  personal: {
    name: "Jay Sarvaiya",
    role: "Software Developer",
    location: "Bhavanipura, Petlad, Anand, 388450",
    email: "jay32402@gmail.com",
    phone: "+91 81286 41992",
  },
  social: {
    github: "https://github.com/jayb3008",
    linkedin: "https://www.linkedin.com/in/jay-sarvaiya-6728b5228/",
    instagram: "https://www.instagram.com/jay.darji.30",
  },
  skills: [
    "React",
    "TypeScript",
    "React Native",
    "Java",
    "Web Development",
    "Mobile App Development",
    "Software Engineering",
  ],
  experience: [
    "Software Development",
    "Web Application Development",
    "Mobile Application Development",
    "Frontend Development",
  ],
};

// System prompt for ChatGPT
export const getSystemPrompt = (): string => {
  return `You are an AI assistant for ${
    profileInfo.personal.name
  }, a ${profileInfo.personal.role}. 
You should help visitors learn about Jay's skills, experience, and work.

Key Information:
- Skills: ${profileInfo.skills.join(", ")}
- Experience: ${profileInfo.experience.join(", ")}
- Contact: ${profileInfo.personal.email}

Please provide helpful, professional responses about Jay's work and experience.
Direct technical questions to relevant skills and projects.
For contact inquiries, provide appropriate contact information.
Maintain a professional and friendly tone.`;
};
