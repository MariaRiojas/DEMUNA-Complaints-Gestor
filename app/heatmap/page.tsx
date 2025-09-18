import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { HeatmapVisualization } from "@/components/heatmap/heatmap-visualization"
import { HeatmapFilters } from "@/components/heatmap/heatmap-filters"
import { HeatmapLegend } from "@/components/heatmap/heatmap-legend"

export default function HeatmapPage() {
  return (
    <ProtectedRoute requiredRole="trabajador_demuna">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mapa de Calor de Denuncias</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Visualización geográfica de la concentración de denuncias por región
            </p>
          </div>

          <HeatmapFilters />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <HeatmapVisualization />
            </div>
            <div className="lg:col-span-1">
              <HeatmapLegend />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
