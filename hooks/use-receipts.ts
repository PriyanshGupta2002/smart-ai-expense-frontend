import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { uploadReceipt } from "@/services/receipt-service";
import { queryKeys } from "@/lib/query-keys";
import { deleteReceipt, getReceipts } from "@/services/receipt-service";

import type { ReceiptFilters } from "@/types/receipt";

export const useUploadReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadReceipt,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.receipts.all,
      });
    },
  });
};

export const useReceipts = (filters: ReceiptFilters) => {
  return useQuery({
    queryKey: queryKeys.receipts.list(filters),

    queryFn: () => getReceipts(filters),

    placeholderData: keepPreviousData,
  });
};

export const useDeleteReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReceipt,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.receipts.lists(),
      });

      // Receipt deletion changes dashboard data.
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};
