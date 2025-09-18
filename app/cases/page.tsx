"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data para casos
const mockCases = [
  {
    id: "CASO-001",
    title: "Caso de Violencia Familiar - Comunidad Shipibo",
    status: "En Proceso",
    priority: "Alta",
    assignedTo: "María González",
    createdAt: "2024-01-15",
    lastUpdate: "2024-01-20",
    complaintsCount: 3,
    community: "Shipibo-Konibo",
  },
  {
    id: "CASO-002",
    title: "Caso de Negligencia Parental - Comunidad Awajún",
    status: "Pendiente",
    priority: "Media",
    assignedTo: "Carlos Mendoza",
    createdAt: "2024-01-18",
    lastUpdate: "2024-01-19",
    complaintsCount: 1,
    community: "Awajún",
  },
  {
    id: "CASO-003",
    title: "Caso de Abuso Escolar - Comunidad Quechua",
    status: "Resuelto",
    priority: "Baja",
    assignedTo: "Ana Quispe",
    createdAt: "2024-01-10",
    lastUpdate: "2024-01-22",
    complaintsCount: 2,
    community: "Quechua",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "En Proceso":
      return <Clock className="h-4 w-4" />
    case "Resuelto":
      return <CheckCircle className="h-4 w-4" />
    case "Pendiente":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "En Proceso":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    case "Resuelto":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "Media":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
    case "Baja":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

export default function CasesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Casos</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Administra y da seguimiento a los casos de protección infantil
              </p>
            </div>
            <Link href="/cases/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Caso
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Buscar casos..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="in-progress">En Proceso</SelectItem>
                    <SelectItem value="resolved">Resuelto</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las prioridades</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Comunidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las comunidades</SelectItem>
                    <SelectItem value="shipibo">Shipibo-Konibo</SelectItem>
                    <SelectItem value="awajun">Awajún</SelectItem>
                    <SelectItem value="quechua">Quechua</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cases List */}
          <div className="grid gap-4">
            {mockCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(case_.status)}
                          <span className="font-mono text-sm text-slate-600 dark:text-slate-400">{case_.id}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{case_.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Asignado a: {case_.assignedTo} • Comunidad: {case_.community}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                        <Badge className={getPriorityColor(case_.priority)}>Prioridad {case_.priority}</Badge>
                        <Badge variant="outline">
                          {case_.complaintsCount} denuncia{case_.complaintsCount !== 1 ? "s" : ""}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>Creado: {case_.createdAt}</span>
                        <span>Última actualización: {case_.lastUpdate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/cases/${case_.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {mockCases.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No hay casos registrados</h3>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                  Comienza creando tu primer caso de protección infantil
                </p>
                <Link href="/cases/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Caso
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
