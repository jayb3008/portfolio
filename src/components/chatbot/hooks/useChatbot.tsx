
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "../ChatMessage";
import { getResponseCategory, getResponseFromCategory } from "../utils/botResponses";
import { getSystemPrompt } from "../utils/profileInfo";

export const useChatbot = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      text: "Hi there! I'm Jay's virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

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
              { role: "system", content: getSystemPrompt() },
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

  return {
    messages,
    isTyping,
    handleSendMessage,
  };
};
