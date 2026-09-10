"use client";

import React from "react";
import { Bell } from "lucide-react";

import {
  PreferenceItem,
  PreferenceSection,
  PreferenceSeparator,
} from "./preference-section";

import { Switch } from "@/components/ui/switch";

interface NotificationPreferencesProps {
  weeklySummary: boolean;
  monthlySummary: boolean;
  budgetAlerts: boolean;
  unusualSpendingAlerts: boolean;

  onWeeklySummaryChange: (value: boolean) => void;
  onMonthlySummaryChange: (value: boolean) => void;
  onBudgetAlertsChange: (value: boolean) => void;
  onUnusualSpendingAlertsChange: (value: boolean) => void;
}

export function NotificationPreferences({
  weeklySummary,
  monthlySummary,
  budgetAlerts,
  unusualSpendingAlerts,
  onWeeklySummaryChange,
  onMonthlySummaryChange,
  onBudgetAlertsChange,
  onUnusualSpendingAlertsChange,
}: NotificationPreferencesProps) {
  return (
    <PreferenceSection
      icon={<Bell className="h-4 w-4" />}
      title="Notifications"
      description="Choose which financial updates you'd like to receive."
    >
      <PreferenceItem
        title="Weekly spending summary"
        description="Get a summary of your spending every week."
      >
        <Switch
          checked={weeklySummary}
          onCheckedChange={onWeeklySummaryChange}
        />
      </PreferenceItem>

      <PreferenceSeparator />

      <PreferenceItem
        title="Monthly spending summary"
        description="Get a summary of your spending at the end of each month."
      >
        <Switch
          checked={monthlySummary}
          onCheckedChange={onMonthlySummaryChange}
        />
      </PreferenceItem>

      <PreferenceSeparator />

      <PreferenceItem
        title="Budget alerts"
        description="Get notified when you're approaching or exceeding a budget."
      >
        <Switch checked={budgetAlerts} onCheckedChange={onBudgetAlertsChange} />
      </PreferenceItem>

      <PreferenceSeparator />

      <PreferenceItem
        title="Unusual spending alerts"
        description="Get notified when Expense AI detects unusual spending patterns."
      >
        <Switch
          checked={unusualSpendingAlerts}
          onCheckedChange={onUnusualSpendingAlertsChange}
        />
      </PreferenceItem>
    </PreferenceSection>
  );
}
