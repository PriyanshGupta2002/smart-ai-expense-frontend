import { queryKeys } from "@/lib/query-keys";
import { updateUserProfile } from "@/services/user-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.me,
      });
    },
  });
};
