interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface DashboardSummaryResponse {
  total_spend: number;
  transaction_count: number;
  current_month_spend: number;
  average_transaction: number;
}

interface DashboardFilters {
  period?:
    | "this_week"
    | "this_month"
    | "last_month"
    | "last_30_days"
    | "this_year"
    | "all_time"
    | undefined;
  category?: string;
  merchant?: string;
}
