"use client";

import { useCallback, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { ChatArtifact, ChatMessage, MessagesResponse } from "@/types/chat";

import { createThread } from "@/services/thread-service";
import { streamChat } from "@/services/chat-service";
import { useThreadMessages } from "@/hooks/use-threads";

import { queryKeys } from "@/lib/query-keys";

export const useChat = (initialThreadId?: string) => {
  const queryClient = useQueryClient();

  const [threadId, setThreadId] = useState<string | undefined>(initialThreadId);

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const activeThreadId = threadId ?? initialThreadId;

  // ============================================================
  // Messages
  // ============================================================

  const { data, isLoading } = useThreadMessages(
    activeThreadId ?? "",
    Boolean(initialThreadId),
  );

  const messages = data?.messages ?? [];

  // ============================================================
  // Update assistant message helper
  // ============================================================

  const updateAssistantMessage = useCallback(
    (
      currentThreadId: string,
      assistantId: string,
      updater: (message: ChatMessage) => ChatMessage,
    ) => {
      queryClient.setQueryData<MessagesResponse>(
        queryKeys.threads.messages(currentThreadId),
        (old) => {
          if (!old) {
            return {
              messages: [],
            };
          }

          return {
            ...old,

            messages: old.messages.map((message) =>
              message.id === assistantId ? updater(message) : message,
            ),
          };
        },
      );
    },
    [queryClient],
  );

  // ============================================================
  // Send message
  // ============================================================

  const sendMessage = useCallback(
    async (content: string) => {
      const value = content.trim();

      if (!value || isStreaming) {
        return;
      }

      setError(null);

      let currentThreadId = threadId ?? initialThreadId;

      try {
        // ======================================================
        // 1. Create thread
        // ======================================================

        if (!currentThreadId) {
          const thread = await createThread();

          currentThreadId = thread.id;

          /*
           * Initialize the cache BEFORE changing threadId.
           *
           * This keeps the current ChatContainer mounted and
           * gives it somewhere to stream messages into.
           */
          queryClient.setQueryData<MessagesResponse>(
            queryKeys.threads.messages(currentThreadId),
            {
              messages: [],
            },
          );

          setThreadId(currentThreadId);

          /*
           * Don't use router.replace() here.
           *
           * That can mount /chat/[threadId] while the current
           * stream belongs to this hook instance.
           */
          window.history.replaceState(
            window.history.state,
            "",
            `/chat/${currentThreadId}`,
          );

          void queryClient.invalidateQueries({
            queryKey: queryKeys.threads.list,
          });
        }

        // TypeScript narrowing safeguard.
        if (!currentThreadId) {
          throw new Error("Unable to create chat thread.");
        }

        // ======================================================
        // 2. Create optimistic messages
        // ======================================================

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
          artifacts: [],
        };

        queryClient.setQueryData<MessagesResponse>(
          queryKeys.threads.messages(currentThreadId),
          (old) => ({
            messages: [...(old?.messages ?? []), userMessage, assistantMessage],
          }),
        );

        setIsStreaming(true);

        // ======================================================
        // 3. Abort controller
        // ======================================================

        const controller = new AbortController();

        abortControllerRef.current = controller;

        // ======================================================
        // 4. Start backend stream
        // ======================================================

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

        // ======================================================
        // 5. Handle individual SSE event
        // ======================================================

        const handleEvent = (eventBlock: string) => {
          const line = eventBlock
            .split("\n")
            .find((line) => line.startsWith("data:"));

          if (!line) {
            return;
          }

          const raw = line.slice(5).trim();

          if (!raw) {
            return;
          }

          const event = JSON.parse(raw);

          // ====================================================
          // Token
          // ====================================================

          if (event.type === "token") {
            updateAssistantMessage(
              currentThreadId || "",
              assistantId,
              (message) => ({
                ...message,

                content:
                  message.content +
                  (typeof event.content === "string" ? event.content : ""),
              }),
            );

            return;
          }

          // ====================================================
          // Artifact
          // ====================================================

          if (event.type === "artifact") {
            const artifact = event.artifact as ChatArtifact;

            if (!artifact) {
              return;
            }

            updateAssistantMessage(
              currentThreadId || "",
              assistantId,
              (message) => ({
                ...message,

                artifacts: [...(message.artifacts ?? []), artifact],
              }),
            );

            return;
          }

          // ====================================================
          // Backend error
          // ====================================================

          if (event.type === "error") {
            throw new Error(event.message ?? "Unable to generate response");
          }

          // ====================================================
          // Done
          // ====================================================

          if (event.type === "done") {
            return;
          }
        };

        // ======================================================
        // 6. Read SSE
        // ======================================================

        while (true) {
          const { done, value: chunk } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(chunk, {
            stream: true,
          });

          const events = buffer.split("\n\n");

          /*
           * Last item may be an incomplete event.
           * Keep it until the next chunk arrives.
           */
          buffer = events.pop() ?? "";

          for (const eventBlock of events) {
            handleEvent(eventBlock);
          }
        }

        // ======================================================
        // 7. Flush decoder
        // ======================================================

        buffer += decoder.decode();

        /*
         * Handle final SSE event in case the server closed
         * without another "\n\n".
         */
        if (buffer.trim()) {
          handleEvent(buffer);
        }

        // ======================================================
        // 8. Stream finished
        // ======================================================

        /*
         * For a thread that existed before this component
         * mounted, refetch messages from the DB.
         *
         * For a thread created from /chat, preserve the
         * streamed cache. Fetching immediately could replace
         * optimistic/streamed messages before backend state
         * has fully settled.
         */
        if (initialThreadId) {
          await queryClient.invalidateQueries({
            queryKey: queryKeys.threads.messages(currentThreadId),
          });
        }

        /*
         * Refresh sidebar:
         * - thread title may have changed
         * - thread ordering may have changed
         */
        await queryClient.invalidateQueries({
          queryKey: queryKeys.threads.list,
        });
      } catch (err) {
        // ======================================================
        // Abort
        // ======================================================

        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Chat error:", err);

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsStreaming(false);

        abortControllerRef.current = null;
      }
    },
    [
      threadId,
      initialThreadId,
      isStreaming,
      queryClient,
      updateAssistantMessage,
    ],
  );

  // ============================================================
  // Stop
  // ============================================================

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();

    abortControllerRef.current = null;

    setIsStreaming(false);
  }, []);

  // ============================================================
  // Return
  // ============================================================

  return {
    threadId: activeThreadId,

    messages,

    isLoading: Boolean(initialThreadId) && isLoading,

    isStreaming,

    error,

    sendMessage,

    stop,
  };
};
