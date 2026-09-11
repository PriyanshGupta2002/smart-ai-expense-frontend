export type DashboardPeriod =
  | "this_week"
  | "this_month"
  | "last_month"
  | "last_30_days"
  | "this_year"
  | "all_time";

export interface DashboardFilters {
  period: DashboardPeriod;
  category?: string;
}

export interface SpendingTrendItem {
  date: string;
  amount: number;
}

export interface CategoryDistributionItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface CategoryDistributionResponse {
  categories: CategoryDistributionItem[];
}

export interface TopMerchantItem {
  merchant: string;
  amount: number;
  transaction_count: number;
}

export type InsightType = "trend" | "observation" | "recommendation";

export type InsightImportance = "high" | "medium" | "low";

export interface AIInsight {
  title: string;
  description: string;
  type: InsightType;
  importance: InsightImportance;
  related_category: string | null;
}

export interface AIInsightsResponse {
  insights: AIInsight[];
}

export interface ProfileAvatarCardProps {
  image_url: string | null;
  loading: boolean;
}

export interface ProfileInformationFormProps {
  first_name: string;
  last_name: string;
  email: string;
  loading: boolean;
}

export interface AccountInformationCardProps {
  created_at: string;
  loading: boolean;
  connectionStatus: boolean;
  connectionStatusLoading: boolean;
  authorizationStatus: string;
}
