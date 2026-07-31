import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

import { uploadReceipt } from "@/services/receipt-service";
import { queryKeys } from "@/lib/query-keys";
import { deleteReceipt, getReceipts } from "@/services/receipt-service";

import type { ReceiptFilters } from "@/types/receipt";
import { useRouter } from "next/navigation";

export const useUploadReceipt = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: uploadReceipt,

    onSuccess: async () => {
      const id = toast.add({
        title: "Receipt uploaded",
        description:
          "Processing in the background. Track its progress from Receipts.",
        type: "success",

        actionProps: {
          children: "View receipts",
          onClick: () => {
            toast.close(id);
            router.push("/receipts");
          },
        },
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.receipts.all,
      });
    },

    onError: () => {
      toast.add({
        title: "Upload failed",
        description: "We couldn't upload your receipt. Please try again.",
        type: "error",
      });
    },
  });
};
export const useReceipts = (params: ReceiptFilters) => {
  return useQuery({
    queryKey: queryKeys.receipts.list(params),
    queryFn: () => getReceipts(params),

    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) {
        return false;
      }

      const hasProcessingReceipt = data.items.some(
        (receipt) =>
          receipt.processing_status === "PENDING" ||
          receipt.processing_status === "PROCESSING",
      );

      return hasProcessingReceipt ? 2000 : false;
    },
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
