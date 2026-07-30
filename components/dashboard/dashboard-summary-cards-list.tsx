import React, { FC } from "react";

import DashboardSummaryCard from "./dashboard-summary-card";

interface DashboardSummaryCardsProps {
  summary: DashboardSummaryResponse;
}

const DashboardSummaryCards: FC<DashboardSummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Object.entries(summary ?? {}).map(([key, value]) => (
        <DashboardSummaryCard key={key} label={key} value={value} />
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
