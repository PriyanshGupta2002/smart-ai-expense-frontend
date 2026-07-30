export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  dashboard: {
    all: ["dashboard"] as const,

    summary: ["dashboard", "summary"] as const,

    categories: ["dashboard", "categories"] as const,

    merchants: ["dashboard", "merchants"] as const,

    spendingTrend: ["dashboard", "spending-trend"] as const,

    paymentMethods: ["dashboard", "payment-methods"] as const,

    insights: ["dashboard", "ai-insights"] as const,
  },

  receipts: {
    all: ["receipts"] as const,

    list: (params?: Record<string, unknown>) =>
      ["receipts", "list", params] as const,

    detail: (id: string) => ["receipts", id] as const,
  },
};
