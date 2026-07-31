export type ReceiptProcessingStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "NEEDS_REVIEW"
  | "FAILED";

export interface ReceiptUploadResponse {
  id: string;
  processing_status: ReceiptProcessingStatus;
  image_url: string | null;
  created_at: string;
}

export interface ReceiptListItem {
  id: string;

  merchant_name: string | null;
  purchase_datetime: string | null;

  expense_type: string | null;

  total: number | null;
  currency: string | null;

  payment_method: string | null;
  processing_status: string;

  image_url: string | null;
}

export interface ReceiptListResponse {
  items: ReceiptListItem[];

  page: number;
  page_size: number;

  total: number;
  total_pages: number;
}

export interface ReceiptFilters {
  page: number;
  pageSize: number;

  search?: string;
  category?: string;
  status?: string;
}
