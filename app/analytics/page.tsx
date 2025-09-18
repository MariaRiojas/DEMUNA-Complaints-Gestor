import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { RegionalAnalytics } from "@/components/analytics/regional-analytics"
import { EthnicityAnalytics } from "@/components/analytics/ethnicity-analytics"
import { TrendAnalytics } from "@/components/analytics/trend-analytics"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requiredRole="trabajador_demuna">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analítica y Reportes</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Análisis estadístico y tendencias del sistema de denuncias DEMUNA
            </p>
          </div>

          <AnalyticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RegionalAnalytics />
            <EthnicityAnalytics />
          </div>

          <TrendAnalytics />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
