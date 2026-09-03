import {
  AIInsightsResponse,
  CategoryDistributionResponse,
} from "@/types/dashboard";
import api from "./instance/axios-instance";

const BASE_DASHBOARD_PREFIX = "/dashboard";
export const fetchDashboardSummary = async () => {
  const { data } = await api.get(`${BASE_DASHBOARD_PREFIX}/dashboard-summary`);
  return data;
};

export const getSpendingTrend = async (filters: DashboardFilters) => {
  const { data } = await api.get(`${BASE_DASHBOARD_PREFIX}/spending-trend`, {
    params: filters,
  });

  return data;
};

export const getCategoryDistribution = async (
  filters: DashboardFilters,
): Promise<CategoryDistributionResponse> => {
  const { data } = await api.get<CategoryDistributionResponse>(
    "/dashboard/categories",
    {
      params: filters,
    },
  );

  return data;
};

export const getTopMerchants = async (filters: DashboardFilters) => {
  const { data } = await api.get(`${BASE_DASHBOARD_PREFIX}/top-merchants`, {
    params: filters,
  });

  return data.top_merchants;
};

export const getAIInsights = async (): Promise<AIInsightsResponse> => {
  const { data } = await api.get<AIInsightsResponse>(
    `${BASE_DASHBOARD_PREFIX}/ai-insights`,
  );

  return data;
};

export const getDashboardMe = async () => {
  const { data } = await api.get(`${BASE_DASHBOARD_PREFIX}/me`);
  return data;
};
