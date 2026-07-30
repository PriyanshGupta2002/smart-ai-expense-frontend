export type ChatRole = "user" | "assistant";

export type ChatStreamEvent =
  | {
      type: "token";
      content: string;
    }
  | {
      type: "done";
    }
  | {
      type: "error";
      message: string;
    };

export interface MessagesResponse {
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  thread_id?: string;
  role: ChatRole;
  content: string;
  created_at?: string;
}

export interface ChatRequest {
  message: string;
}
