"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Search, Plus, Edit, Trash2, Shield, User, UserCheck } from "lucide-react"
import Link from "next/link"

// Mock data para usuarios
const mockUsers = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@demuna.gob.pe",
    role: "trabajador_demuna",
    status: "Activo",
    lastLogin: "2024-01-22",
    casesAssigned: 5,
    community: "Shipibo-Konibo",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@demuna.gob.pe",
    role: "operador",
    status: "Activo",
    lastLogin: "2024-01-21",
    casesAssigned: 3,
    community: "Awajún",
  },
  {
    id: "3",
    name: "Ana Quispe",
    email: "ana.quispe@demuna.gob.pe",
    role: "trabajador_demuna",
    status: "Inactivo",
    lastLogin: "2024-01-15",
    casesAssigned: 2,
    community: "Quechua",
  },
  {
    id: "4",
    name: "Administrador Sistema",
    email: "admin@demuna.gob.pe",
    role: "admin",
    status: "Activo",
    lastLogin: "2024-01-22",
    casesAssigned: 0,
    community: "Todas",
  },
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Shield className="h-4 w-4" />
    case "trabajador_demuna":
      return <UserCheck className="h-4 w-4" />
    case "operador":
      return <User className="h-4 w-4" />
    default:
      return <User className="h-4 w-4" />
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case "admin":
      return "Administrador"
    case "trabajador_demuna":
      return "Trabajador DEMUNA"
    case "operador":
      return "Operador"
    default:
      return role
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
    case "trabajador_demuna":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    case "operador":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    case "Inactivo":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Usuarios</h1>
              <p className="text-slate-600 dark:text-slate-400">Administra los usuarios del sistema DEMUNA</p>
            </div>
            <Link href="/users/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Usuarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Usuarios Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">1</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Administradores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">2</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Trabajadores DEMUNA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  <Input placeholder="Buscar usuarios..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="trabajador_demuna">Trabajador DEMUNA</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
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

          {/* Users List */}
          <div className="grid gap-4">
            {mockUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          <AvatarInitials name={user.name} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getRoleIcon(user.role)}
                          <h3 className="font-semibold text-slate-900 dark:text-white">{user.name}</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{user.email}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getRoleColor(user.role)}>{getRoleLabel(user.role)}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          <Badge variant="outline">{user.casesAssigned} casos asignados</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-2">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <p>Comunidad: {user.community}</p>
                        <p>Último acceso: {user.lastLogin}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/users/${user.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
