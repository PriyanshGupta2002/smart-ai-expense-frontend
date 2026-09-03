import { queryKeys } from "@/lib/query-keys";
import {
  fetchDashboardSummary,
  getCategoryDistribution,
  getSpendingTrend,
  getTopMerchants,
  getAIInsights,
  getDashboardMe,
} from "@/services/dashboard-service";

import { useQuery } from "@tanstack/react-query";

export const useFetchDashboardSummary = (filters?: DashboardFilters) => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(filters || {}),
    queryFn: fetchDashboardSummary,
  });
};

export const useSpendingTrend = (filters: DashboardFilters) => {
  return useQuery({
    queryKey: queryKeys.dashboard.spendingTrend(filters),

    queryFn: () => getSpendingTrend(filters),
  });
};

export const useCategoryDistribution = (filters: DashboardFilters) => {
  return useQuery({
    queryKey: queryKeys.dashboard.categories(filters),

    queryFn: () => getCategoryDistribution(filters),
  });
};

export const useTopMerchants = (filters: DashboardFilters) => {
  return useQuery({
    queryKey: queryKeys.dashboard.merchants(filters),

    queryFn: () => getTopMerchants(filters),
  });
};

export const useAIInsights = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.insights,
    queryFn: getAIInsights,

    // Backend Redis remains the actual cache.
    // This just prevents unnecessary browser refetching.
    staleTime: 5 * 60 * 1000,
  });
};

export const useDashboardMe = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.me,
    queryFn: getDashboardMe,
  });
};
