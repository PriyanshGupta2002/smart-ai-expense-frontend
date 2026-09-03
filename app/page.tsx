import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  MessageSquareText,
  ReceiptText,
  ScanLine,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Startup from "@/components/landing/startup";

const features = [
  {
    icon: ScanLine,
    title: "Smart receipt extraction",
    description:
      "Upload receipts and let AI extract merchants, totals, categories, dates, and payment details.",
  },
  {
    icon: BarChart3,
    title: "Understand your spending",
    description:
      "See spending trends, category breakdowns, top merchants, and useful insights in one dashboard.",
  },
  {
    icon: MessageSquareText,
    title: "Ask your expenses",
    description:
      "Ask questions about your spending in plain English and get answers based on your actual receipts.",
  },
];

const LandingPage = async () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Expense AI
            </span>
          </Link>
          <Startup />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center md:pt-32">
          <Badge variant="secondary" className="mb-6 gap-1.5 rounded-full px-3">
            <Sparkles className="size-3.5" />
            AI-powered expense tracking
          </Badge>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Your receipts know where your money went.
            <span className="text-primary"> Now you do too.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Upload your receipts, automatically organize expenses, discover
            spending patterns, and ask AI anything about your money.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              className="rounded-xl"
              render={
                <Link href={"/sign-up"}>
                  {" "}
                  Start tracking
                  <ArrowRight className="size-4" />
                </Link>
              }
            />

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl"
              nativeButton={false}
              render={
                <Link href={"/sign-in"}>
                  {" "}
                  Sign In
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Upload a receipt. AI handles the rest.
          </p>
        </div>
      </section>

      {/* Product Preview */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-2 shadow-xl shadow-black/5">
          <div className="rounded-xl border bg-background">
            <div className="flex h-12 items-center gap-2 border-b px-4">
              <span className="size-2.5 rounded-full bg-muted-foreground/20" />
              <span className="size-2.5 rounded-full bg-muted-foreground/20" />
              <span className="size-2.5 rounded-full bg-muted-foreground/20" />

              <span className="ml-3 text-xs text-muted-foreground">
                Dashboard
              </span>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-4">
              <PreviewCard label="Total spend" value="₹18,759" />
              <PreviewCard label="This month" value="₹3,328" />
              <PreviewCard label="Transactions" value="11" />
              <PreviewCard label="Average" value="₹1,705" />
            </div>

            <div className="grid gap-4 px-5 pb-5 md:grid-cols-5">
              <div className="rounded-xl border p-5 md:col-span-3">
                <div className="mb-8">
                  <p className="font-medium">Spending trend</p>
                  <p className="text-xs text-muted-foreground">
                    Your expenses over time
                  </p>
                </div>

                <div className="flex h-40 items-end gap-3">
                  {[35, 55, 40, 75, 50, 90, 65, 80].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col rounded-xl border p-5 md:col-span-2">
                <p className="font-medium">AI Insight</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Based on your recent spending
                </p>

                <div className="mt-6 rounded-xl bg-primary/5 p-4">
                  <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="size-4 text-primary" />
                  </div>

                  <p className="text-sm font-medium">
                    Medical is your largest category
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    It accounts for around 63% of your spending this month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Simple by design</p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            From receipt to insight in seconds.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Stop manually entering every transaction. Upload your receipts and
            let AI organize the details.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6 transition-colors hover:bg-muted/30"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>

                <h3 className="font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary-foreground/10">
            <Upload className="size-5" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Start understanding your spending.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-primary-foreground/70">
            Turn your receipts into organized expenses and useful financial
            insights without spreadsheets or manual entry.
          </p>

          <Button
            size="lg"
            variant="secondary"
            className="mt-7 rounded-xl"
            nativeButton={false}
            render={
              <Link href="/sign-up">
                {" "}
                Upload your first receipt
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ReceiptText className="size-4" />
            <span>Expense AI</span>
          </div>

          <span>AI-powered expense tracking</span>
        </div>
      </footer>
    </main>
  );
};

const PreviewCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight">{value}</p>
    </div>
  );
};

export default LandingPage;
