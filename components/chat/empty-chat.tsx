"use client";

import { Sparkles } from "lucide-react";

interface EmptyChatProps {
  onSuggestion: (value: string) => void;
}

const suggestions = [
  "How much did I spend this month?",
  "What is my biggest expense category?",
  "Where did I spend the most money?",
  "Compare my spending with last month",
];

const EmptyChat = ({ onSuggestion }: EmptyChatProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-xl flex-col items-center">
        {/* Icon */}
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="size-6 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Ask about your expenses
        </h1>

        <p className="mt-2 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          Understand your spending, discover patterns, and get answers about
          your expenses.
        </p>

        {/* Suggestions */}
        <div className="mt-8 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestion(suggestion)}
              className="rounded-xl border bg-card p-4 text-left text-sm transition-colors hover:bg-muted/50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
