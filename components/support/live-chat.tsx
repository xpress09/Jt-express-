"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

const botResponses: Record<string, string> = {
  track:
    "You can track your package by visiting our Track Package page and entering your tracking number. Would you like me to redirect you there?",
  delivery:
    "Standard delivery takes 3-5 business days. Express delivery is 1-2 business days. Same-day delivery is available in select metro areas.",
  refund:
    "Refund requests can be submitted through our ticket system. Go to the Support Ticket section on this page, select 'Refund Request' as the category, and provide your order details.",
  contact:
    "You can reach us via this live chat, submit a support ticket below, email us at support@jtexpress.com, or call +66 2 000 0000 during business hours.",
  default:
    "Thank you for reaching out. I can help with tracking, delivery times, refunds, and general inquiries. Could you please provide more details about your question?",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("track") || lower.includes("package") || lower.includes("where"))
    return botResponses.track;
  if (lower.includes("deliver") || lower.includes("time") || lower.includes("how long"))
    return botResponses.delivery;
  if (lower.includes("refund") || lower.includes("return") || lower.includes("money"))
    return botResponses.refund;
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email"))
    return botResponses.contact;
  return botResponses.default;
}

function getTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content:
        "Hello! I'm JT Express virtual assistant. How can I help you today? You can ask about tracking, delivery times, refunds, or anything else.",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: getBotResponse(userMessage.content),
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:hidden",
          isOpen && "scale-0"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat panel - full screen on mobile, inline on desktop */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background md:static md:z-auto md:rounded-lg md:border md:border-border md:bg-card",
          "md:flex md:h-[500px]",
          isOpen ? "flex" : "hidden md:flex"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                JT Express Support
              </p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    msg.role === "bot"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-foreground"
                  )}
                >
                  {msg.role === "bot" ? (
                    <Bot className="h-3.5 w-3.5" />
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2",
                    msg.role === "bot"
                      ? "bg-secondary text-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p
                    className={cn(
                      "mt-1 text-right text-[10px]",
                      msg.role === "bot"
                        ? "text-muted-foreground"
                        : "text-primary-foreground/60"
                    )}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex gap-1 rounded-lg bg-secondary px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-11 flex-1 rounded-md border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
