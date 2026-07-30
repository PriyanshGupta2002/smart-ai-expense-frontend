"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { useSpendingTrend } from "@/hooks/use-dashboard";

interface SpendingTrendProps {
  filters: DashboardFilters;
}

const chartConfig = {
  amount: {
    label: "Spend",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const SpendingTrend = ({ filters }: SpendingTrendProps) => {
  const { data = [], isLoading, isError } = useSpendingTrend(filters);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>

        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>

        <CardDescription>
          Your spending over the selected period
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isError ? (
          <ChartMessage>Unable to load spending trend.</ChartMessage>
        ) : data?.data?.length === 0 ? (
          <ChartMessage>No spending data for this period.</ChartMessage>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
              accessibilityLayer
              data={data.data}
              margin={{
                left: 0,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatDate(value)}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatCompactCurrency(value)}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                }
              />

              <Area
                dataKey="amount"
                type="monotone"
                fill="var(--color-amount)"
                fillOpacity={0.12}
                stroke="var(--color-amount)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

const ChartMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
    {children}
  </div>
);

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCompactCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}k`;
  }

  return `₹${value}`;
};

export default SpendingTrend;
