import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentComplaints } from "@/components/dashboard/recent-complaints"
import { ActivityChart } from "@/components/dashboard/activity-chart"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel de Control</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Resumen general del sistema de denuncias DEMUNA</p>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentComplaints />
            <ActivityChart />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
