import type { ReceiptUploadResponse } from "@/types/receipt";
import api from "./instance/axios-instance";

import type { ReceiptFilters, ReceiptListResponse } from "@/types/receipt";

const BASE_RECEIPT_PREFIX = "receipts";
export const uploadReceipt = async (
  file: File,
): Promise<ReceiptUploadResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post<ReceiptUploadResponse>(
    `${BASE_RECEIPT_PREFIX}`,
    formData,
  );

  return data;
};

export const getReceipts = async (
  filters: ReceiptFilters,
): Promise<ReceiptListResponse> => {
  const { data } = await api.get<ReceiptListResponse>("/receipts", {
    params: {
      page: filters.page,
      page_size: filters.pageSize,

      search: filters.search || undefined,
      category: filters.category || undefined,
      status: filters.status || undefined,
    },
  });

  return data;
};

export const deleteReceipt = async (receiptId: string): Promise<void> => {
  await api.delete(`/receipts/${receiptId}`);
};
