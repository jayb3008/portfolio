
import React, { useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import ChatMessage, { MessageType } from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatBotUIProps {
  messages: MessageType[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

const ChatBotUI: React.FC<ChatBotUIProps> = ({ 
  messages, 
  isTyping, 
  onClose, 
  onSendMessage 
}) => {
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
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
          onClick={onClose}
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
          onSendMessage={onSendMessage}
          isLoading={isTyping}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatBotUI;
