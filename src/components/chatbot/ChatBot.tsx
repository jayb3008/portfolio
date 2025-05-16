import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/ThemeProvider";
import ChatMessage, { MessageType } from "./ChatMessage";
import ChatInput from "./ChatInput";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Sample responses for the chatbot
// Enhanced bot responses with categories
const botResponses = {
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
const getResponseCategory = (input: string): keyof typeof botResponses => {
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

// Profile information for AI training
const profileInfo = {
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
const systemPrompt = `You are an AI assistant for ${
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

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      text: "Hi there! I'm Jay's virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = async (userInput: string) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userInput },
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        throw new Error(
          `API Error: ${
            errorData.error?.message || "Failed to get AI response"
          }`
        );
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating AI response:", error);
      // Show error toast to user
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Using fallback response.",
        duration: 3000,
      });
      return getResponseFromCategory(getResponseCategory(userInput));
    }
  };

  const getResponseFromCategory = (category: keyof typeof botResponses) => {
    const responses = botResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(text);

      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      // Fallback to category-based response if AI fails
      const fallbackMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: getResponseFromCategory(getResponseCategory(text)),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buttonClasses =
    theme === "dark"
      ? "bg-accent hover:bg-accent/80 text-white shadow-lg shadow-accent/20"
      : "bg-accent hover:bg-accent/90 text-white shadow-lg";

  return (
    <>
      {/* Chat button (fixed position) */}
      <div className="fixed bottom-6 right-6 z-50">
        {" "}
        {/* Added z-50 to ensure the button stays on top */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "h-14 w-14 rounded-full transition-all duration-200", // Faster transition
                "hover:scale-105 hover:shadow-xl",
                buttonClasses
              )}
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className={cn(
              "w-[calc(100vw-32px)] sm:w-[400px] p-0",
              "fixed bottom-[80px] right-4",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:slide-in-from-bottom-5 data-[state=closed]:slide-out-to-bottom-5",
              "h-[500px] max-h-[calc(100vh-100px)]",
              "flex flex-col",
              "border border-border shadow-lg",
              theme === "dark"
                ? "glass-morphism"
                : "bg-card/95 backdrop-blur-sm",
              "z-50" // Added z-50 to ensure popover appears above other content
            )}
            align="end"
            sideOffset={5}
          >
            <Card className="border-0 bg-transparent shadow-none h-full flex flex-col">
              <CardHeader
                className={cn(
                  "px-4 py-4 flex flex-row items-center justify-between border-b",
                  theme === "dark" ? "border-border/20" : "border-border/10"
                )}
              >
                <CardTitle className="text-xl font-medium flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-accent" />
                  <span>Chat with Jay's Assistant</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>

              <ScrollArea className="flex-grow px-4 py-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isTyping && (
                  <div className="flex items-center justify-start mb-4">
                    <div
                      className={cn(
                        "bg-muted text-foreground px-4 py-3 rounded-2xl rounded-tl-none",
                        "border border-border/30"
                      )}
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-150" />
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-300" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </ScrollArea>

              <CardFooter
                className={cn(
                  "p-4 border-t",
                  theme === "dark" ? "border-border/20" : "border-border/10"
                )}
              >
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isTyping}
                />
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ChatBot;
