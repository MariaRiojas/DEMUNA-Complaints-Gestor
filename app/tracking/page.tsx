import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TrackingTimeline } from "@/components/tracking/tracking-timeline"
import { TrackingFilters } from "@/components/tracking/tracking-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function TrackingPage() {
  return (
    <ProtectedRoute requiredRole="trabajador_demuna">
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Seguimiento de Casos</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Registra y da seguimiento a las actividades realizadas en cada caso
              </p>
            </div>
            <Link href="/tracking/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Seguimiento
              </Button>
            </Link>
          </div>

          <TrackingFilters />
          <TrackingTimeline />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
