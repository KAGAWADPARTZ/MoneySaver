import { UserEarnings } from "@/app/utils/userAmountDb";

export type MonthlyEarningsProps = {
  monthly: number;
  daily: number;
  weekly: number;
  diff: number; 
};

export function computeEarnings(amounts: UserEarnings[]): MonthlyEarningsProps {
  if (!amounts.length) {
    return { monthly: 0, daily: 0, weekly: 0, diff: 0 };
  }

  // Sort by timestamp ascending
  const sorted = [...amounts].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const latest = sorted[sorted.length - 1];
  const prev = sorted.length > 1 ? sorted[sorted.length - 2] : null;

  const monthly = latest.amount;
  const weekly = monthly / 4;
  const daily = monthly / 30;
  const diff = prev ? latest.amount - prev.amount : 0;

  return { monthly, weekly, daily, diff };
}