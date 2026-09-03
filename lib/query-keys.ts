import { ReceiptFilters } from "@/types/receipt";

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  dashboard: {
    all: ["dashboard"] as const,

    summary: (filters: DashboardFilters) =>
      ["dashboard", "summary", filters] as const,

    spendingTrend: (filters: DashboardFilters) =>
      ["dashboard", "spending-trend", filters] as const,

    categories: (filters: DashboardFilters) =>
      ["dashboard", "categories", filters] as const,

    merchants: (filters: DashboardFilters) =>
      ["dashboard", "merchants", filters] as const,
    insights: ["dashboard", "ai-insights"] as const,
    me: ["dashboard", "me"] as const,
    budget: ["dashboard", "budget"] as const,
  },
  receipts: {
    all: ["receipts"] as const,

    lists: () => [...queryKeys.receipts.all, "list"] as const,

    list: (filters: ReceiptFilters) =>
      [...queryKeys.receipts.lists(), filters] as const,

    details: () => [...queryKeys.receipts.all, "detail"] as const,

    detail: (receiptId: string) =>
      [...queryKeys.receipts.details(), receiptId] as const,
  },

  threads: {
    all: ["threads"] as const,

    list: ["threads", "list"] as const,

    detail: (threadId: string) => ["threads", "detail", threadId] as const,

    messages: (threadId: string) => ["threads", threadId, "messages"] as const,
  },
  google: {
    connectionStatus: ["google-connection-status"] as const,
  },
};
