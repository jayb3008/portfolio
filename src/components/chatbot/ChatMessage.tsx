import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

export type MessageType = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === "bot";
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "mb-4 flex animate-fade-in-up",
        isBot ? "justify-start" : "justify-end"
      )}
      style={{ animationDuration: "0.2s" }} // Faster animation
    >
      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[85%] break-words transition-colors duration-200", // Faster transition
          isBot
            ? "bg-muted text-foreground rounded-tl-none border border-border/30"
            : theme === "dark"
            ? "bg-accent text-accent-foreground rounded-br-none border border-accent/20"
            : "bg-accent/90 text-accent-foreground rounded-br-none border border-accent/10"
        )}
      >
        <p className="text-sm sm:text-base">{message.text}</p>
        <p className="text-xs opacity-70 text-right mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
