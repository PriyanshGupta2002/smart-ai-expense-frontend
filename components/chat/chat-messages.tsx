"use client";

import { useEffect, useRef } from "react";

import { Bot, User } from "lucide-react";

import type { ChatMessage } from "@/types/chat";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

const ChatMessages = ({ messages, isStreaming }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 pb-8">
        {messages.map((message, index) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            isStreaming={
              isStreaming &&
              index === messages.length - 1 &&
              message.role === "assistant"
            }
          />
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const ChatMessageItem = ({
  message,
  isStreaming,
}: {
  message: ChatMessage;
  isStreaming: boolean;
}) => {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={[
          "flex max-w-[85%] gap-3",
          isUser ? "flex-row-reverse" : "",
        ].join(" ")}
      >
        <div
          className={[
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted",
          ].join(" ")}
        >
          {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
        </div>

        <div
          className={
            isUser
              ? "rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground"
              : "px-1 py-1 text-sm leading-7"
          }
        >
          {message.content}

          {isStreaming && !message.content && <TypingIndicator />}
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex h-7 items-center gap-1">
      <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
      <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
      <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
    </div>
  );
};

export default ChatMessages;
