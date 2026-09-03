import { queryKeys } from "@/lib/query-keys";
import { createBudget, getBudget } from "@/services/budget-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBudget = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.budget,
    queryFn: getBudget,
  });
};

export const useUpdateCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.budget,
      });
    },
  });
};
