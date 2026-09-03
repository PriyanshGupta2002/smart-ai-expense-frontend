import { queryKeys } from "@/lib/query-keys";
import { login, logout, register } from "@/services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      // Remove all cached authenticated data
      queryClient.clear();

      // Navigate to landing page
      router.replace("/");

      // Refresh server components so auth state updates
      router.refresh();
    },
  });
};
