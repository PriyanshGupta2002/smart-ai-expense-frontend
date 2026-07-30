export interface StreamEvent {
  type: "token" | "done" | "error";
  content?: string;
  message?: string;
}

export const parseSSEEvent = (value: string): StreamEvent | null => {
  const line = value.split("\n").find((line) => line.startsWith("data:"));

  if (!line) {
    return null;
  }

  const data = line.slice(5).trim();

  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};
