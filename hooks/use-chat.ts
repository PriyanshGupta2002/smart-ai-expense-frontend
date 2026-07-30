"use client";

import { useCallback, useRef, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import type { ChatMessage, MessagesResponse } from "@/types/chat";

import { createThread } from "@/services/thread-service";

import { streamChat } from "@/services/chat-service";

import { useThreadMessages } from "@/hooks/use-threads";

import { queryKeys } from "@/lib/query-keys";

export const useChat = (initialThreadId?: string) => {
  const queryClient = useQueryClient();

  const [threadId, setThreadId] = useState(initialThreadId);

  const [newChatMessages, setNewChatMessages] = useState<ChatMessage[]>([]);

  const [isStreaming, setIsStreaming] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const { data, isLoading } = useThreadMessages(initialThreadId ?? "");

  /*
   * Existing thread:
   * TanStack Query owns messages.
   *
   * New /chat:
   * local state owns messages until
   * a thread has been created.
   */
  const messages = initialThreadId ? (data?.messages ?? []) : newChatMessages;

  const sendMessage = useCallback(
    async (content: string) => {
      const value = content.trim();

      if (!value || isStreaming) {
        return;
      }

      setError(null);

      let currentThreadId = threadId;

      let isNewThread = false;

      try {
        // --------------------------------
        // Create thread
        // --------------------------------

        if (!currentThreadId) {
          const thread = await createThread();

          currentThreadId = thread.id;

          isNewThread = true;

          setThreadId(currentThreadId);

          await queryClient.invalidateQueries({
            queryKey: queryKeys.threads.list,
          });

          window.history.replaceState(null, "", `/chat/${currentThreadId}`);
        }

        // --------------------------------
        // Optimistic messages
        // --------------------------------

        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          thread_id: currentThreadId,
          role: "user",
          content: value,
        };

        const assistantId = crypto.randomUUID();

        const assistantMessage: ChatMessage = {
          id: assistantId,
          thread_id: currentThreadId,
          role: "assistant",
          content: "",
        };

        const optimisticMessages = [userMessage, assistantMessage];

        /*
         * /chat hasn't been loaded through
         * useThreadMessages, so use local
         * state for the first interaction.
         */
        if (isNewThread) {
          setNewChatMessages(optimisticMessages);
        } else {
          queryClient.setQueryData<MessagesResponse>(
            queryKeys.threads.messages(currentThreadId),
            (old) => ({
              messages: [...(old?.messages ?? []), ...optimisticMessages],
            }),
          );
        }

        setIsStreaming(true);

        // --------------------------------
        // Controller
        // --------------------------------

        const controller = new AbortController();

        abortControllerRef.current = controller;

        // --------------------------------
        // Start stream
        // --------------------------------

        const body = await streamChat(
          currentThreadId,
          {
            message: value,
          },
          controller.signal,
        );

        const reader = body.getReader();

        const decoder = new TextDecoder();

        let buffer = "";

        // --------------------------------
        // Stream
        // --------------------------------

        while (true) {
          const { done, value: chunk } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(chunk, {
            stream: true,
          });

          const events = buffer.split("\n\n");

          buffer = events.pop() ?? "";

          for (const eventBlock of events) {
            const line = eventBlock
              .split("\n")
              .find((line) => line.startsWith("data:"));

            if (!line) {
              continue;
            }

            const raw = line.slice(5).trim();

            if (!raw) {
              continue;
            }

            const event = JSON.parse(raw);

            // ----------------------------
            // Token
            // ----------------------------

            if (event.type === "token") {
              if (isNewThread) {
                setNewChatMessages((previous) =>
                  previous.map((message) =>
                    message.id === assistantId
                      ? {
                          ...message,
                          content: message.content + event.content,
                        }
                      : message,
                  ),
                );
              } else {
                queryClient.setQueryData<MessagesResponse>(
                  queryKeys.threads.messages(currentThreadId),
                  (old) => {
                    if (!old) {
                      return old;
                    }

                    return {
                      ...old,

                      messages: old.messages.map((message) =>
                        message.id === assistantId
                          ? {
                              ...message,
                              content: message.content + event.content,
                            }
                          : message,
                      ),
                    };
                  },
                );
              }
            }

            // ----------------------------
            // Error
            // ----------------------------

            if (event.type === "error") {
              throw new Error(event.message ?? "Unable to generate response");
            }
          }
        }

        // --------------------------------
        // Server is source of truth
        // --------------------------------

        await queryClient.invalidateQueries({
          queryKey: queryKeys.threads.messages(currentThreadId),
        });

        await queryClient.invalidateQueries({
          queryKey: queryKeys.threads.list,
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error(err);

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsStreaming(false);

        abortControllerRef.current = null;
      }
    },
    [threadId, isStreaming, queryClient],
  );

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();

    abortControllerRef.current = null;

    setIsStreaming(false);
  }, []);

  return {
    threadId,
    messages,

    isLoading: !!initialThreadId && isLoading,

    isStreaming,
    error,

    sendMessage,
    stop,
  };
};
