import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTableSimple } from "@/components/dashboard/data-table-simple"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SectionCards } from "@/components/dashboard/section-cards"

import data from "./data.json"

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SectionCards />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ChartAreaInteractive />
        </div>
        <div className="md:col-span-1">
          <RecentActivity />
        </div>
      </div>
      <div className="grid gap-4">
        <DataTableSimple data={data} />
      </div>
    </>
  );
}
