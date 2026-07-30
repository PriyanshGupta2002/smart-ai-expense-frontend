"use client";

import React, { useState } from "react";

import DashboardSummaryCards from "./dashboard-summary-cards-list";
import SpendingTrend from "./spending-trend";
import CategoryDistribution from "./category-distribution";
import TopMerchants from "./top-merchants";
import DashboardFiltersPane from "./dashboard-filters";

import { useFetchDashboardSummary } from "@/hooks/use-dashboard";
import { DashboardFilters } from "@/types/dashboard";
import AIInsights from "./ai-insights";
import UploadReceiptDialog from "../receipt/upload-receipt-dialog";

const DashboardContainer = () => {
  const { data: summaryCards, isLoading } = useFetchDashboardSummary();

  const [filters, setFilters] = useState<DashboardFilters>({
    period: "this_month",
  });

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

          <p className="text-sm text-muted-foreground">
            An overview of your spending activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DashboardFiltersPane filters={filters} onChange={setFilters} />

          <UploadReceiptDialog />
        </div>
      </div>

      {/* Summary */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DashboardSummaryCards summary={summaryCards} />
      )}

      {/* Main charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <SpendingTrend filters={filters} />
        </div>

        <div className="min-w-0">
          <CategoryDistribution filters={filters} />
        </div>
      </div>

      {/* Merchants */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopMerchants filters={filters} />

        <AIInsights />
      </div>
    </div>
  );
};

export default DashboardContainer;
