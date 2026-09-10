"use client";

import { useState } from "react";
import { Loader2, Save, Settings } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { AIPreferences, ResponseStyle } from "./ai-preferences";
import { ExpensePreferences } from "./expense-preferences";

import { NotificationPreferences } from "./notification-preferences";
import {
  AppearancePreferences,
  ThemePreference,
} from "./appearance-preferences";

import {
  useGetPreferences,
  useUpdatePreferences,
} from "@/hooks/use-preferences";
import {
  ExpensePeriod,
  ReportFormat,
  UserPreferences,
} from "@/types/preferences";

export interface Preferences {
  responseStyle: ResponseStyle;
  defaultExpensePeriod: ExpensePeriod;
  defaultReportFormat: ReportFormat;
  confirmBeforeActions: boolean;
  weeklySummary: boolean;
  monthlySummary: boolean;
  budgetAlerts: boolean;
  unusualSpendingAlerts: boolean;
  theme: ThemePreference;
}

const DEFAULT_PREFERENCES: Preferences = {
  responseStyle: "balanced",
  defaultExpensePeriod: "this_month",
  defaultReportFormat: "pdf",
  confirmBeforeActions: true,
  weeklySummary: true,
  monthlySummary: true,
  budgetAlerts: true,
  unusualSpendingAlerts: false,
  theme: "system",
};

const mapPreferences = (data: UserPreferences): Preferences => ({
  responseStyle: data.response_style ?? DEFAULT_PREFERENCES.responseStyle,

  defaultExpensePeriod:
    data.default_expense_period ?? DEFAULT_PREFERENCES.defaultExpensePeriod,

  defaultReportFormat:
    data.default_report_format ?? DEFAULT_PREFERENCES.defaultReportFormat,

  confirmBeforeActions:
    data.confirm_before_actions ?? DEFAULT_PREFERENCES.confirmBeforeActions,

  weeklySummary: data.weekly_summary ?? DEFAULT_PREFERENCES.weeklySummary,

  monthlySummary: data.monthly_summary ?? DEFAULT_PREFERENCES.monthlySummary,

  budgetAlerts: data.budget_alerts ?? DEFAULT_PREFERENCES.budgetAlerts,

  unusualSpendingAlerts:
    data.unusual_spending_alerts ?? DEFAULT_PREFERENCES.unusualSpendingAlerts,

  theme: data.theme ?? DEFAULT_PREFERENCES.theme,
});

export function PreferencesPage() {
  const { data: preferencesData, isLoading, isError } = useGetPreferences();

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-100 w-full max-w-4xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading preferences...
        </div>
      </main>
    );
  }

  if (isError || !preferencesData) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Unable to load your preferences.
          </p>
        </div>
      </main>
    );
  }

  return (
    <PreferencesForm initialPreferences={mapPreferences(preferencesData)} />
  );
}

interface PreferencesFormProps {
  initialPreferences: Preferences;
}

function PreferencesForm({ initialPreferences }: PreferencesFormProps) {
  const { setTheme } = useTheme();

  const { mutateAsync: updatePreferences, isPending: isSaving } =
    useUpdatePreferences();

  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences);

  const update = <K extends keyof Preferences>(
    key: K,
    value: Preferences[K],
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const savePreferences = async () => {
    await updatePreferences({
      response_style: preferences.responseStyle,
      default_expense_period: preferences.defaultExpensePeriod,
      default_report_format: preferences.defaultReportFormat,
      confirm_before_actions: preferences.confirmBeforeActions,
      weekly_summary: preferences.weeklySummary,
      monthly_summary: preferences.monthlySummary,
      budget_alerts: preferences.budgetAlerts,
      unusual_spending_alerts: preferences.unusualSpendingAlerts,
      theme: preferences.theme,
    });
  };

  const handleThemeChange = (value: ThemePreference) => {
    update("theme", value);
    setTheme(value);
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/50">
            <Settings className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Preferences
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Customize how Expense AI works for you.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        <AIPreferences
          responseStyle={preferences.responseStyle}
          confirmBeforeActions={preferences.confirmBeforeActions}
          onResponseStyleChange={(value) => update("responseStyle", value)}
          onConfirmBeforeActionsChange={(value) =>
            update("confirmBeforeActions", value)
          }
        />

        <ExpensePreferences
          defaultExpensePeriod={preferences.defaultExpensePeriod}
          defaultReportFormat={preferences.defaultReportFormat}
          onExpensePeriodChange={(value) =>
            update("defaultExpensePeriod", value)
          }
          onReportFormatChange={(value) => update("defaultReportFormat", value)}
        />

        <NotificationPreferences
          weeklySummary={preferences.weeklySummary}
          monthlySummary={preferences.monthlySummary}
          budgetAlerts={preferences.budgetAlerts}
          unusualSpendingAlerts={preferences.unusualSpendingAlerts}
          onWeeklySummaryChange={(value) => update("weeklySummary", value)}
          onMonthlySummaryChange={(value) => update("monthlySummary", value)}
          onBudgetAlertsChange={(value) => update("budgetAlerts", value)}
          onUnusualSpendingAlertsChange={(value) =>
            update("unusualSpendingAlerts", value)
          }
        />

        <AppearancePreferences
          theme={preferences.theme}
          onThemeChange={handleThemeChange}
        />
      </div>

      {/* Save bar */}
      <div className="sticky bottom-4 z-10 mt-8">
        <div className="flex items-center justify-between rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur">
          <p className="hidden pl-2 text-sm text-muted-foreground sm:block">
            Changes aren&apos;t saved yet.
          </p>

          <div className="ml-auto">
            <Button onClick={savePreferences} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
