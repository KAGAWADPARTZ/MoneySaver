"use client";
import { useEffect, useState } from "react";
import { getUserAmounts } from "@/app/utils/userAmountDb";
import { computeEarnings, MonthlyEarningsProps } from "@/app/utils/EarningsFormula";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Badge from "@/components/ui/badge/Badge";
import ArrowUpIcon from "@/icons/arrow-up.svg";
import ArrowDownIcon from "@/icons/arrow-down.svg";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyEarningsPage() {
  const [earnings, setEarnings] = useState<MonthlyEarningsProps>({
    monthly: 0,
    weekly: 0,
    daily: 0,
    diff: 0,
  });

  const [prevMonthly, setPrevMonthly] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const amounts = await getUserAmounts();
      setEarnings(computeEarnings(amounts));
      // Get previous monthly for percentage calculation
      if (amounts.length > 1) {
        // Sort by timestamp ascending
        const sorted = [...amounts].sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setPrevMonthly(sorted[sorted.length - 2].amount);
      } else {
        setPrevMonthly(0);
      }
    }
    fetchData();
  }, []);

   // Calculate percentage change
  let percentChange = 0;
  if (prevMonthly !== 0) {
    percentChange = ((earnings.monthly - prevMonthly) / prevMonthly) * 100;
  }

  const series = [75.55];
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Earnings
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Your earnings monthly
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>
          <span className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium 
            ${percentChange >= 0 ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"}`}>
            {percentChange >= 0 ? "+" : "-"}
            {Math.abs(percentChange).toLocaleString(undefined, { maximumFractionDigits: 2 })}%
          </span>
        </div>
        <p className="mx-auto mt-10 w-1/2 max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          You earn ₱{(typeof earnings.daily === "number" ? earnings.daily : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })} today, keep up your good work!
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 px-6 py-3.5 sm:gap-8 sm:py-">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Daily
          </p>
          <p className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-800 dark:text-white/90 sm:text-md">
            ₱{(typeof earnings.daily === "number" ? earnings.daily : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            <Badge
              color={earnings.diff >= 0 ? "success" : "error"}
              size="sm"
              startIcon={earnings.diff >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            >
              {earnings.diff >= 0 ? "" : ""}
            </Badge>
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Weekly
          </p>
          <p className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-800 dark:text-white/90 sm:text-md">
             ₱{(typeof earnings.weekly === "number" ? earnings.weekly : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            <Badge
              color={earnings.diff >= 0 ? "success" : "error"}
              size="sm"
              startIcon={earnings.diff >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            >
              {earnings.diff >= 0 ? "" : ""}
            </Badge>
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-md">
            Monthly
          </p>
          <p className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-800 dark:text-white/90 sm:text-md">
             ₱{(typeof earnings.monthly === "number" ? earnings.monthly : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            <Badge
              color={earnings.diff >= 0 ? "success" : "error"}
              size="sm"
              startIcon={earnings.diff >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            >
              {earnings.diff >= 0 ? "" : ""}
            </Badge>
          </p>
        </div>
      </div>
    </div>
  );
}