
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
      style={{ animationDuration: "0.2s" }} // Fast animation
    >
      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[85%] break-words transition-colors duration-200", // Fast transition
          isBot
            ? "bg-muted text-foreground rounded-tl-none border border-border/30 hover:shadow-md relative"
            : theme === "dark"
            ? "bg-accent text-accent-foreground rounded-br-none border border-accent/20 card-3d"
            : "bg-accent/90 text-accent-foreground rounded-br-none border border-accent/10 card-3d"
        )}
      >
        {isBot && (
          <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-accent animate-ping opacity-75"></div>
        )}
        <p className="text-sm sm:text-base relative z-10">
          {message.text.startsWith("http") ? (
            <a 
              href={message.text} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent underline reveal-border"
            >
              {message.text}
            </a>
          ) : (
            message.text
          )}
        </p>
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
