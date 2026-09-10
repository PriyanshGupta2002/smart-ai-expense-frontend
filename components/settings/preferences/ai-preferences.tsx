"use client";

import React from "react";
import { Bot, ShieldCheck } from "lucide-react";

import {
  PreferenceItem,
  PreferenceSection,
  PreferenceSeparator,
} from "./preference-section";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export type ResponseStyle = "concise" | "balanced" | "detailed";

interface AIPreferencesProps {
  responseStyle: ResponseStyle;
  confirmBeforeActions: boolean;

  onResponseStyleChange: (value: ResponseStyle) => void;
  onConfirmBeforeActionsChange: (value: boolean) => void;
}

const RESPONSE_STYLES = [
  {
    value: "concise",
    label: "Concise",
    description: "Short and direct responses",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Clear answers with useful context",
  },
  {
    value: "detailed",
    label: "Detailed",
    description: "More explanation and insights",
  },
] as const;

export function AIPreferences({
  responseStyle,
  confirmBeforeActions,
  onResponseStyleChange,
  onConfirmBeforeActionsChange,
}: AIPreferencesProps) {
  return (
    <PreferenceSection
      icon={<Bot className="h-4 w-4" />}
      title="AI Assistant"
      description="Customize how Expense AI responds and performs actions."
    >
      <div className="px-6 py-5">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Response style</p>

            <p className="text-sm text-muted-foreground">
              Choose how Expense AI communicates with you.
            </p>
          </div>

          <RadioGroup
            value={responseStyle}
            onValueChange={(value) =>
              onResponseStyleChange(value as ResponseStyle)
            }
            className="grid gap-3 md:grid-cols-3"
          >
            {RESPONSE_STYLES.map((style) => (
              <Label
                key={style.value}
                htmlFor={`response-${style.value}`}
                className="cursor-pointer"
              >
                <div className="flex h-full items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem
                    id={`response-${style.value}`}
                    value={style.value}
                    className="mt-0.5"
                  />

                  <div className="space-y-1">
                    <p className="text-sm font-medium">{style.label}</p>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {style.description}
                    </p>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>

      <PreferenceSeparator />

      <PreferenceItem
        title="Confirm before actions"
        description="Ask for confirmation before sending messages, emails, or expense reports."
      >
        <Switch
          checked={confirmBeforeActions}
          onCheckedChange={onConfirmBeforeActionsChange}
          aria-label="Confirm before actions"
        />
      </PreferenceItem>
    </PreferenceSection>
  );
}
