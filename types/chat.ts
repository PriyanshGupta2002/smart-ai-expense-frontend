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

export interface ChatRequest {
  message: string;
}

export interface ChatArtifact {
  id?: string;
  name: string;
  mime_type: string;
  url: string;
  file_id?: string;
  size?: number;
}

export interface ChatMessage {
  id: string;
  thread_id: string;
  role: "user" | "assistant";
  content: string;

  artifacts?: ChatArtifact[];
}

export interface MessagesResponse {
  messages: ChatMessage[];
}
