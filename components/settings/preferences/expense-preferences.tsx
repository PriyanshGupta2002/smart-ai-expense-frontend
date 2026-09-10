"use client";

import React from "react";
import { FileText, Wallet } from "lucide-react";

import {
  PreferenceItem,
  PreferenceSection,
  PreferenceSeparator,
} from "./preference-section";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpensePeriod, ReportFormat } from "@/types/preferences";

interface ExpensePreferencesProps {
  defaultExpensePeriod: ExpensePeriod;
  defaultReportFormat: ReportFormat;

  onExpensePeriodChange: (value: ExpensePeriod) => void;
  onReportFormatChange: (value: ReportFormat) => void;
}

export function ExpensePreferences({
  defaultExpensePeriod,
  defaultReportFormat,
  onExpensePeriodChange,
  onReportFormatChange,
}: ExpensePreferencesProps) {
  return (
    <PreferenceSection
      icon={<Wallet className="h-4 w-4" />}
      title="Expenses"
      description="Set defaults for how Expense AI handles your expense data."
    >
      <PreferenceItem
        title="Default expense period"
        description="Used when you don't specify a time period."
      >
        <Select
          value={defaultExpensePeriod}
          onValueChange={(value) =>
            onExpensePeriodChange(value as ExpensePeriod)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="this_month">This month</SelectItem>

            <SelectItem value="last_month">Last month</SelectItem>

            <SelectItem value="last_30_days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </PreferenceItem>

      <PreferenceSeparator />

      <PreferenceItem
        title="Default report format"
        description="Format used when Expense AI generates an expense report."
      >
        <Select
          value={defaultReportFormat}
          onValueChange={(value) => onReportFormatChange(value as ReportFormat)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="pdf">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                PDF
              </span>
            </SelectItem>

            <SelectItem value="xlsx">Excel</SelectItem>

            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
      </PreferenceItem>
    </PreferenceSection>
  );
}
