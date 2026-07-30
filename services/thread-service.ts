import type {
  Thread,
  ThreadsResponse,
  UpdateThreadPayload,
} from "@/types/thread";

import type { MessagesResponse } from "@/types/chat";
import api from "./instance/axios-instance";

export const createThread = async (): Promise<Thread> => {
  const { data } = await api.post<Thread>("/threads", {});

  return data;
};

export const getThreads = async (): Promise<ThreadsResponse> => {
  const { data } = await api.get<ThreadsResponse>("/threads");

  return data;
};

export const getThread = async (threadId: string): Promise<Thread> => {
  const { data } = await api.get<Thread>(`/threads/${threadId}`);

  return data;
};

export const getThreadMessages = async (
  threadId: string,
): Promise<MessagesResponse> => {
  const { data } = await api.get<MessagesResponse>(
    `/threads/${threadId}/messages`,
  );

  return data;
};

export const updateThread = async ({
  threadId,
  title,
}: {
  threadId: string;
  title: string;
}): Promise<Thread> => {
  const { data } = await api.patch<Thread>(`/threads/${threadId}`, {
    title,
  } satisfies UpdateThreadPayload);

  return data;
};

export const deleteThread = async (threadId: string): Promise<void> => {
  await api.delete(`/threads/${threadId}`);
};
