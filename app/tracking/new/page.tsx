import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { NewTrackingForm } from "@/components/tracking/new-tracking-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewTrackingPage() {
  return (
    <ProtectedRoute requiredRole="trabajador_demuna">
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/tracking">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nuevo Seguimiento</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">Registra una nueva actividad de seguimiento</p>
            </div>
          </div>

          <NewTrackingForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
