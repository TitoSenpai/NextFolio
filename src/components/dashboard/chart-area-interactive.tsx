
import { BarChartCard } from "../ui/bar-chart-card"

export const description = "A modern bar chart using Recharts and shadcn/ui styling."

export function ChartAreaInteractive() {
  return (
    <div className="w-full flex justify-center items-center min-h-[350px]">
      <BarChartCard />
    </div>
  );
}

