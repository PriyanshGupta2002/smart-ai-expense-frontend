import { queryKeys } from "@/lib/query-keys";
import { login, register } from "@/services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
