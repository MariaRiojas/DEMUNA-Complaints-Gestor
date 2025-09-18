import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ComplaintsTable } from "@/components/complaints/complaints-table"
import { ComplaintsFilters } from "@/components/complaints/complaints-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ComplaintsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestión de Denuncias</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Administra y da seguimiento a todas las denuncias del sistema
              </p>
            </div>
            <Link href="/complaints/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Denuncia
              </Button>
            </Link>
          </div>

          <ComplaintsFilters />
          <ComplaintsTable />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
