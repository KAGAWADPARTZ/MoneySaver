"use client";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { getUserAmounts } from "@/app/utils/userAmountDb";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// function getMonthLabel(date: Date) {
//   return date.toLocaleString("default", { month: "short" });
// }

export default function MonthlySavingsChart() {
  const [series, setSeries] = useState([{ name: "Savings", data: Array(12).fill(0) }]);
  

  useEffect(() => {
    async function fetchData() {
      const amounts = await getUserAmounts();
      // Group and sum savings by month (Jan=0, ..., Dec=11)
      const monthlySavings = Array(12).fill(0);
      amounts.forEach((entry) => {
        const month = new Date(entry.timestamp).getMonth();
        monthlySavings[month] += entry.savings;
      });
      setSeries([{ name: "Savings", data: monthlySavings }]);
    }
    fetchData();
  }, []);

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val}` },
    },
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Savings
        </h3>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}