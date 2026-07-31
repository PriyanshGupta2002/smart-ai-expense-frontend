import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createThread,
  deleteThread,
  getThreadMessages,
  getThreads,
  updateThread,
} from "@/services/thread-service";

import { queryKeys } from "@/lib/query-keys";

export const useThreads = () => {
  return useQuery({
    queryKey: queryKeys.threads.list,
    queryFn: getThreads,
  });
};
export const useThreadMessages = (threadId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.threads.messages(threadId),

    queryFn: () => getThreadMessages(threadId),

    enabled: Boolean(threadId) && enabled,
  });
};
export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createThread,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.threads.list,
      });
    },
  });
};

export const useUpdateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateThread,

    onSuccess: (thread) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.threads.list,
      });

      queryClient.setQueryData(queryKeys.threads.detail(thread.id), thread);
    },
  });
};

export const useDeleteThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteThread,

    onSuccess: (_, threadId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.threads.list,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.threads.detail(threadId),
      });

      queryClient.removeQueries({
        queryKey: queryKeys.threads.messages(threadId),
      });
    },
  });
};
