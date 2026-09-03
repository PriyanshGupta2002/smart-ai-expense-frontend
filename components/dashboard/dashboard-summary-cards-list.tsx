import { FC } from "react";

import DashboardSummaryCard from "./dashboard-summary-card";
import BudgetCard from "../budget/budget-card";
import { useGetBudget } from "@/hooks/use-budget";

interface DashboardSummaryCardsProps {
  summary: DashboardSummaryResponse;
}

const DashboardSummaryCards: FC<DashboardSummaryCardsProps> = ({ summary }) => {
  const { data: budget } = useGetBudget();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Object.entries(summary ?? {}).map(([key, value]) => (
        <DashboardSummaryCard key={key} label={key} value={value} />
      ))}
      <BudgetCard budget={budget} />
    </div>
  );
};

export default DashboardSummaryCards;
