import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyEarningsPage from "@/components/ecommerce/MonthlyEarningsPage";
import MonthlySavingsChart from "@/components/ecommerce/MonthlySavingsChart";
import StatisticsInvestmentChart from "@/components/ecommerce/StatisticsInvestmentChart";
import StatisticsNeedsChart from "@/components/ecommerce/StatisticsNeedCharts";

export const metadata: Metadata = {
  title: "MoneySaver",
  description: "App that calculates your spending habits and helps you save money",
};

export default function Ecommerce() {
 
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        <MonthlySavingsChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <MonthlyEarningsPage/>
      </div>
      <div className="col-span-12">
        <StatisticsInvestmentChart />
      </div>
      <div className="col-span-12">
        <StatisticsNeedsChart />
      </div>
      
      <div className="col-span-12 xl:col-span-7">

      </div>
    </div>
  );
}