import { queryKeys } from "@/lib/query-keys";
import {
  getPreferences,
  updatePreferences,
} from "@/services/preferences-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

export const useGetPreferences = () => {
  return useQuery({
    queryKey: queryKeys.preferences.preferencesData,
    queryFn: getPreferences,
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePreferences,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.preferences.preferencesData,
      });

      toast.add({
        title: "Preferences updated",
        description:
          "Your Expense AI preferences have been saved successfully.",
        type: "success",
      });
    },

    onError: (error) => {
      console.error("Failed to update preferences:", error);

      toast.add({
        title: "Couldn't update preferences",
        description: "We couldn't save your preferences. Please try again.",
        type: "error",
      });
    },
  });
};
