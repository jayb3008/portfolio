import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { useChatbot } from "./hooks/useChatbot";
import ChatBotUI from "./ChatBotUI";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, handleSendMessage } = useChatbot();
  const { theme } = useTheme();

  return (
    <>
      {/* Chat button (fixed position) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            asChild
            className="bg-transparent hover:bg-transparent"
          >
            <Button
              className="group px-6 py-6 bg-transparent border  font-medium rounded-full transition-all duration-300 relative overflow-hidden"
              size="icon"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent  to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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
              "z-50"
            )}
            align="end"
            sideOffset={5}
          >
            <ChatBotUI
              messages={messages}
              isTyping={isTyping}
              onClose={() => setIsOpen(false)}
              onSendMessage={handleSendMessage}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ChatBot;
