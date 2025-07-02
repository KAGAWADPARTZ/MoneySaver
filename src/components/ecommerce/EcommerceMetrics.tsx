"use client";
import { useState } from "react";
// import Badge from "../ui/badge/Badge";
// import { ArrowDownIcon, ArrowUpIcon,} from "@/icons";
import { calculateBudget, BudgetResult } from "@/app/utils/budgetFormula";
import { insertUserAmount } from "@/app/utils/userAmountDb";
export const EcommerceMetrics = () => {

  const [amount, setAmount] = useState<string>("");
  const [budget, setBudget] = useState<BudgetResult | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!isNaN(num) && amount !== "") {
      const computedBudget = calculateBudget(num);
      setBudget(computedBudget);
      await insertUserAmount({
        amount: num,
        timestamp: new Date(),
        ...computedBudget,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Metric Item Start */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-5">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Enter your income
            </span>
            <div className="flex flex-col items-center mt-2 gap-4">
              <input
                type="number"
                className="appearance-none w-28 px-2 py-1 border rounded text-gray-800 dark:bg-gray-900 dark:text-white/90"
                value={amount}
                onChange={(e) => setAmount((e.target.value))}
              />
              <button
                type="submit"
                className="w-28 px-2 py-1 text-sm font-semibold bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.11%
          </Badge> */}
        </div>
      </div>
      {/* Metric Item End */}

      {/* Metric Item Start */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Budget Breakdown
            </span>
            <div className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {budget ? (
                <ul className="text-sm text-green-500 dark:text-green-400">
                  <li>Needs: ₱{budget.needs.toFixed(2)}</li>
                  <li>Wants: ₱{budget.wants.toFixed(2)}</li>
                  <li>Savings: ₱{budget.savings.toFixed(2)}</li>
                  <li>Investment: ₱{budget.investment.toFixed(2)}</li>
                </ul>
              ) : (
                <span className="text-md"></span>
              )}
            </div>
          </div>
          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* Metric Item End */}
    </div>
  );
};
