export type ResponseStyle = "concise" | "balanced" | "detailed";

export type ExpensePeriod =
  | "this_month"
  | "last_month"
  | "last_30_days"
  | "this_year"
  | "last_year";

export type ReportFormat = "pdf" | "csv" | "xlsx";

export type Theme = "system" | "light" | "dark";

export interface UserPreferences {
  id: string;
  user_id: string;

  response_style: ResponseStyle;
  default_expense_period: ExpensePeriod;
  default_report_format: ReportFormat;

  confirm_before_actions: boolean;

  weekly_summary: boolean;
  monthly_summary: boolean;
  budget_alerts: boolean;
  unusual_spending_alerts: boolean;

  theme: Theme;
}
