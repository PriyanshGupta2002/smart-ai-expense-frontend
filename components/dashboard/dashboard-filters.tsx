"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DashboardFilters as DashboardFiltersType,
  DashboardPeriod,
} from "@/types/dashboard";

interface DashboardFiltersProps {
  filters: DashboardFiltersType;

  onChange: (filters: DashboardFiltersType) => void;
}

const periodOptions: {
  label: string;
  value: DashboardPeriod;
}[] = [
  {
    label: "This week",
    value: "this_week",
  },
  {
    label: "This month",
    value: "this_month",
  },
  {
    label: "Last month",
    value: "last_month",
  },
  {
    label: "Last 30 days",
    value: "last_30_days",
  },
  {
    label: "This year",
    value: "this_year",
  },
  {
    label: "All time",
    value: "all_time",
  },
];

const categories = [
  "groceries",
  "restaurant",
  "shopping",
  "fuel",
  "travel",
  "medical",
  "electronics",
  "entertainment",
  "utilities",
  "education",
  "home_services",
  "personal_care",
  "transportation",
  "subscriptions",
  "other",
];

const DashboardFiltersPane = ({ filters, onChange }: DashboardFiltersProps) => {
  const resetFilters = () => {
    onChange({
      period: "this_month",
      category: undefined,
    });
  };

  const hasFilters =
    filters.period !== "this_month" || filters.category !== undefined;
  const selectedPeriod = periodOptions.find(
    (option) => option.value === filters.period,
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={filters.period}
        onValueChange={(value) => {
          if (!value) return;

          onChange({
            ...filters,
            period: value as DashboardPeriod,
          });
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue>{selectedPeriod?.label ?? "Select period"}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {periodOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.category ?? "all"}
        onValueChange={(value) =>
          onChange({
            ...filters,
            category: value == null || value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-42.5">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>

          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {formatCategory(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <RotateCcw className="size-4" />
          Reset
        </Button>
      )}
    </div>
  );
};

const formatCategory = (category: string) => {
  return category
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default DashboardFiltersPane;
