import React, { FC } from "react";
import {
  ArrowDownUp,
  CreditCard,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardSummaryCardProps {
  label: string;
  value: string | number;
}

const metricConfig: Record<
  string,
  {
    title: string;
    icon: React.ElementType;
    prefix?: string;
  }
> = {
  total_spend: {
    title: "Total Spend",
    icon: WalletCards,
    prefix: "₹",
  },

  transaction_count: {
    title: "Transactions",
    icon: ReceiptText,
  },

  current_month_spend: {
    title: "This Month",
    icon: CreditCard,
    prefix: "₹",
  },

  average_transaction: {
    title: "Avg. Transaction",
    icon: ArrowDownUp,
    prefix: "₹",
  },
};

const DashboardSummaryCard: FC<DashboardSummaryCardProps> = ({
  label,
  value,
}) => {
  const config = metricConfig[label] ?? {
    title: label.replaceAll("_", " "),
    icon: WalletCards,
  };

  const Icon = config.icon;

  return (
    <Card className="gap-4 py-5 shadow-none transition-colors hover:bg-muted/20">
      <CardHeader className="flex flex-row items-center justify-between px-5">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {config.title}
        </CardTitle>

        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <div className="text-2xl font-semibold tracking-tight">
          {config.prefix}
          {formatValue(value)}
        </div>
      </CardContent>
    </Card>
  );
};

const formatValue = (value: string | number) => {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return numericValue.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
};

export default DashboardSummaryCard;
