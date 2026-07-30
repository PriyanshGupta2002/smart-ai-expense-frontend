"use client";

import { ArrowUpRight, Lightbulb, Sparkles, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useAIInsights } from "@/hooks/use-dashboard";
import type { AIInsight } from "@/types/dashboard";

const AIInsights = () => {
  const { data, isLoading, isError } = useAIInsights();

  const insights = data?.insights ?? [];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </div>

          <div>
            <CardTitle>AI Insights</CardTitle>

            <CardDescription>Based on your spending this month</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <InsightSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-[220px] items-center justify-center text-sm text-muted-foreground">
            Unable to load AI insights.
          </div>
        ) : insights.length === 0 ? (
          <div className="flex min-h-[220px] items-center justify-center text-sm text-muted-foreground">
            No insights available yet.
          </div>
        ) : (
          <div className="space-y-1">
            {insights.map((insight, index) => (
              <InsightItem key={`${insight.type}-${index}`} insight={insight} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const InsightItem = ({ insight }: { insight: AIInsight }) => {
  const Icon =
    insight.type === "trend"
      ? TrendingUp
      : insight.type === "recommendation"
        ? Lightbulb
        : ArrowUpRight;

  return (
    <div className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-4 text-primary" />
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug">{insight.title}</p>

          {insight.importance === "high" && (
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              Important
            </Badge>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {insight.description}
        </p>

        {insight.related_category && (
          <Badge variant="outline" className="mt-1 capitalize">
            {formatCategory(insight.related_category)}
          </Badge>
        )}
      </div>
    </div>
  );
};

const InsightSkeleton = () => (
  <div className="flex gap-3 p-3">
    <Skeleton className="size-8 shrink-0 rounded-md" />

    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  </div>
);

const formatCategory = (value: string) =>
  value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

export default AIInsights;
