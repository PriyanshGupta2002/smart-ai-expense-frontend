"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { DashboardFilters, TopMerchantItem } from "@/types/dashboard";
import { useTopMerchants } from "@/hooks/use-dashboard";

interface TopMerchantsProps {
  filters: DashboardFilters;
}

const TopMerchants = ({ filters }: TopMerchantsProps) => {
  const { data = [], isLoading, isError } = useTopMerchants(filters);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>

        <CardContent className="space-y-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Merchants</CardTitle>

        <CardDescription>Merchants you spend the most with</CardDescription>
      </CardHeader>

      <CardContent>
        {isError ? (
          <MerchantMessage>Unable to load merchants.</MerchantMessage>
        ) : data.length === 0 ? (
          <MerchantMessage>No merchant data available.</MerchantMessage>
        ) : (
          <div className="divide-y">
            {data.map((merchant: TopMerchantItem, index: number) => (
              <div
                key={merchant.merchant}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {merchant.merchant}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {merchant.transaction_count}{" "}
                    {merchant.transaction_count === 1
                      ? "transaction"
                      : "transactions"}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold">
                  {formatCurrency(merchant.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const MerchantMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
    {children}
  </div>
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default TopMerchants;
