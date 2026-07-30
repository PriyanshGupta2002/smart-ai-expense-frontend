import type { ChatRequest } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const streamChat = async (
  threadId: string,
  payload: ChatRequest,
  signal: AbortSignal,
) => {
  const response = await fetch(`${API_URL}/chat/${threadId}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(payload),

    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  if (!response.body) {
    throw new Error("Streaming response is unavailable");
  }

  return response.body;
};
