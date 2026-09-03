export interface Budget {
  id: string;
  user_id: string;

  amount: number;
  month: string;

  created_at: string;
  updated_at: string;
}

export interface CurrentBudget {
  month: string;

  amount: number;

  amount_spent: number;

  remaining: number;

  percentage_used: number;
}

export interface SetBudgetRequest {
  amount: number;
}
