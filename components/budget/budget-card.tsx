import { ArrowRight, PiggyBank, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useUpdateCreateBudget } from "@/hooks/use-budget";
import { CurrentBudget } from "@/types/budget";

interface BudgetCardProps {
  budget: CurrentBudget | null;
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  const [budgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const createBudget = useUpdateCreateBudget();

  const isEditing = !!budget;

  const openModal = () => {
    // Pre-fill with the existing budget amount when editing,
    // start blank when creating for the first time.
    setAmount(budget ? String(budget.amount) : "");
    setBudgetModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }

    createBudget.mutate(numericAmount, {
      onSuccess: () => {
        setBudgetModalOpen(false);
        setAmount("");
      },
    });
  };

  const budgetModal = (
    <Dialog open={budgetModalOpen} onOpenChange={setBudgetModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Monthly Budget" : "Set Monthly Budget"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the amount you'd like to budget for this month."
              : "Enter the amount you'd like to budget for this month."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="e.g. 20000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setBudgetModalOpen(false)}
              disabled={createBudget.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createBudget.isPending}>
              {createBudget.isPending
                ? "Saving..."
                : isEditing
                  ? "Update Budget"
                  : "Save Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  if (!budget) {
    return (
      <>
        <Card className="flex h-full flex-col justify-between rounded-2xl border p-6">
          <div>
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <PiggyBank className="size-5 text-primary" />
            </div>

            <p className="text-sm font-medium">Monthly Budget</p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Set a monthly budget to track your spending and receive AI-powered
              insights before you overspend.
            </p>
          </div>

          <Button className="mt-6 w-full" onClick={openModal}>
            Set Budget
            <ArrowRight className="size-4" />
          </Button>
        </Card>

        {budgetModal}
      </>
    );
  }

  const percentageUsed = Math.min(budget.percentage_used, 100);
  const isOverBudget = budget.remaining < 0;

  const progressColorClass =
    budget.percentage_used >= 90
      ? "*:data-[slot=progress-indicator]:bg-red-500"
      : budget.percentage_used >= 70
        ? "*:data-[slot=progress-indicator]:bg-amber-500"
        : "*:data-[slot=progress-indicator]:bg-green-500";

  return (
    <>
      <Card className="rounded-2xl border p-5 col-span-full">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Monthly Budget</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Current month&apos;s progress
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={openModal}
              aria-label="Edit budget"
            >
              <Pencil className="size-4" />
            </Button>

            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <PiggyBank className="size-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-3xl font-bold tracking-tight">
              ₹{budget.amount.toLocaleString()}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              ₹{budget.amount_spent.toLocaleString()} spent
            </p>
          </div>

          <Progress value={percentageUsed} className={progressColorClass} />

          <div className="flex justify-between text-sm">
            <div>
              <p className="font-semibold">
                {budget.percentage_used.toFixed(0)}%
              </p>

              <p className="text-muted-foreground">Used</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{isOverBudget ? "0" : budget.remaining.toLocaleString()}
              </p>

              <p className="text-muted-foreground">
                {isOverBudget ? "Over budget" : "Remaining"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {budgetModal}
    </>
  );
};

export default BudgetCard;
