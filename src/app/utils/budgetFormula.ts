export interface BudgetResult {
  needs: number;
  wants: number;
  savings: number;
  investment: number;
}

export function calculateBudget(amount: number): BudgetResult {
  return {
    needs: Math.round(amount * 0.5),
    wants: Math.round(amount * 0.2),
    savings: Math.round(amount * 0.2),
    investment: Math.round(amount * 0.1),
  };
}