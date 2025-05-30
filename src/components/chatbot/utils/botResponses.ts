
// Sample responses for the chatbot
// Enhanced bot responses with categories
export const botResponses = {
  greeting: [
    "Hello! I'm Jay's chatbot assistant. How can I help you today?",
    "Hi there! I'm here to tell you about Jay's work and experience. What would you like to know?",
    "Welcome! I can help you learn more about Jay's skills and projects.",
  ],
  skills: [
    "Jay is proficient in React, TypeScript, React Native, and Java programming.",
    "Some of Jay's key skills include web development, mobile app development, and software engineering.",
    "Jay has experience with modern web technologies and frameworks like React, TypeScript, and more.",
  ],
  contact: [
    "You can reach Jay through email at jay32402@gmail.com",
    "Feel free to connect with Jay on LinkedIn at https://www.linkedin.com/in/jay-sarvaiya-6728b5228/",
    "You can find Jay's projects on GitHub at https://github.com/jayb3008",
  ],
  projects: [
    "Jay has worked on various web and mobile development projects.",
    "Would you like to see Jay's portfolio? Check out the projects section above!",
    "Jay has experience building responsive and user-friendly applications.",
  ],
  default: [
    "I'd be happy to tell you more about Jay's experience and skills.",
    "Is there anything specific you'd like to know about Jay's work?",
    "Feel free to ask about Jay's projects, skills, or how to get in touch!",
  ],
};

// Function to determine response category based on user input
export const getResponseCategory = (input: string): keyof typeof botResponses => {
  const lowerInput = input.toLowerCase();

  if (
    lowerInput.includes("hi") ||
    lowerInput.includes("hello") ||
    lowerInput.includes("hey")
  ) {
    return "greeting";
  }
  if (
    lowerInput.includes("skill") ||
    lowerInput.includes("know") ||
    lowerInput.includes("tech")
  ) {
    return "skills";
  }
  if (
    lowerInput.includes("contact") ||
    lowerInput.includes("email") ||
    lowerInput.includes("reach")
  ) {
    return "contact";
  }
  if (
    lowerInput.includes("project") ||
    lowerInput.includes("work") ||
    lowerInput.includes("portfolio")
  ) {
    return "projects";
  }
  return "default";
};

// Get a random response from a specific category
export const getResponseFromCategory = (category: keyof typeof botResponses) => {
  const responses = botResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};
