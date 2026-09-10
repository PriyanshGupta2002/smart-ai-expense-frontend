import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PreferenceSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PreferenceSection({
  icon,
  title,
  description,
  children,
}: PreferenceSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm">
            {icon}
          </div>

          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

interface PreferenceItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PreferenceItem({
  title,
  description,
  children,
  className,
}: PreferenceItemProps) {
  return (
    <div
      className={`flex items-center justify-between gap-6 px-6 py-5 ${className ?? ""}`}
    >
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-medium">{title}</p>

        {description && (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function PreferenceSeparator() {
  return <Separator />;
}
