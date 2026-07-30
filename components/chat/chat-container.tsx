"use client";

import { useState } from "react";

import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import EmptyChat from "./empty-chat";

import { useChat } from "@/hooks/use-chat";

interface ChatContainerProps {
  threadId?: string;
}

const ChatContainer = ({ threadId }: ChatContainerProps) => {
  const [input, setInput] = useState("");

  const { messages, isLoading, isStreaming, error, sendMessage, stop } =
    useChat(threadId);

  const handleSubmit = async () => {
    const message = input.trim();

    if (!message || isStreaming) {
      return;
    }

    setInput("");

    await sendMessage(message);
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex h-[calc(100vh-7.5rem)] max-w-4xl items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-7.5rem)] max-w-4xl flex-col">
      {messages.length === 0 ? (
        <EmptyChat onSuggestion={setInput} />
      ) : (
        <ChatMessages messages={messages} isStreaming={isStreaming} />
      )}

      {error && (
        <p className="mb-2 text-center text-sm text-destructive">{error}</p>
      )}

      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isStreaming={isStreaming}
        onStop={stop}
      />
    </div>
  );
};

export default ChatContainer;
