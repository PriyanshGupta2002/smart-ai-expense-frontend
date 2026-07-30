"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";

import { DashboardFilters } from "@/types/dashboard";
import { useCategoryDistribution } from "@/hooks/use-dashboard";

interface CategoryDistributionProps {
  filters: DashboardFilters;
}

const CategoryDistribution = ({ filters }: CategoryDistributionProps) => {
  const { data, isLoading, isError } = useCategoryDistribution(filters);

  const categories = data?.categories ?? [];
  const categoryColors = [
    "var(--primary)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const chartData = categories.map((item, index) => ({
    category: item.category,
    amount: Number(item.amount),
    percentage: Number(item.percentage),

    fill: categoryColors[index % categoryColors.length],
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
    },
  } satisfies ChartConfig;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-44" />
        </CardHeader>

        <CardContent>
          <Skeleton className="mx-auto size-[230px] rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>

        <CardDescription>Where your money is going</CardDescription>
      </CardHeader>

      <CardContent>
        {isError ? (
          <ChartMessage>Unable to load categories.</ChartMessage>
        ) : chartData.length === 0 ? (
          <ChartMessage>No category data available.</ChartMessage>
        ) : (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-55"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />

                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={58}
                  outerRadius={85}
                  strokeWidth={2}
                />
              </PieChart>
            </ChartContainer>

            <div className="mt-4 space-y-3">
              {chartData.slice(0, 5).map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{
                        background: item.fill,
                      }}
                    />

                    <span className="truncate text-sm">
                      {formatCategory(item.category)}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(item.amount)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const ChartMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
    {children}
  </div>
);

const formatCategory = (value: string) =>
  value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default CategoryDistribution;
