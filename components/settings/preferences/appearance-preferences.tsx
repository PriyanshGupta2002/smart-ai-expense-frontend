"use client";

import React from "react";
import { Palette } from "lucide-react";

import { PreferenceItem, PreferenceSection } from "./preference-section";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ThemePreference = "system" | "light" | "dark";

interface AppearancePreferencesProps {
  theme: ThemePreference;
  onThemeChange: (value: ThemePreference) => void;
}

export function AppearancePreferences({
  theme,
  onThemeChange,
}: AppearancePreferencesProps) {
  return (
    <PreferenceSection
      icon={<Palette className="h-4 w-4" />}
      title="Appearance"
      description="Customize how Expense AI looks on your device."
    >
      <PreferenceItem
        title="Theme"
        description="Choose your preferred appearance."
      >
        <Select
          value={theme}
          onValueChange={(value) => onThemeChange(value as ThemePreference)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="system">System</SelectItem>

            <SelectItem value="light">Light</SelectItem>

            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </PreferenceItem>
    </PreferenceSection>
  );
}
