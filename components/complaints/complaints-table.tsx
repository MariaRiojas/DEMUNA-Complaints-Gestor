"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Search, MapPin, Calendar } from "lucide-react"

// Mock data - In production, this would come from your database
const mockComplaints = [
  {
    id: 1,
    complaintCode: "DEN-2024-001",
    title: "Violencia familiar en comunidad Shipibo",
    victimName: "Luz María Campos",
    victimAge: 12,
    ethnicity: "Shipibo-Konibo",
    status: "activa",
    priority: "alta",
    region: "Ucayali",
    community: "San Francisco",
    createdAt: "2024-01-15",
    assignedTo: "Carlos Ramírez Silva",
  },
  {
    id: 2,
    complaintCode: "DEN-2024-002",
    title: "Abandono escolar por trabajo infantil",
    victimName: "Pedro Shahuano",
    victimAge: 14,
    ethnicity: "Kukama",
    status: "en_seguimiento",
    priority: "media",
    region: "Loreto",
    community: "Padre Cocha",
    createdAt: "2024-01-14",
    assignedTo: "Carlos Ramírez Silva",
  },
  {
    id: 3,
    complaintCode: "DEN-2024-003",
    title: "Desnutrición infantil severa",
    victimName: "Esperanza Tsamaraint",
    victimAge: 8,
    ethnicity: "Awajún",
    status: "resuelta",
    priority: "critica",
    region: "Amazonas",
    community: "Chapiza",
    createdAt: "2024-01-13",
    assignedTo: "Carlos Ramírez Silva",
  },
  {
    id: 4,
    complaintCode: "DEN-2024-004",
    title: "Matrimonio infantil forzado",
    victimName: "María Yagkug",
    victimAge: 15,
    ethnicity: "Achuar",
    status: "activa",
    priority: "critica",
    region: "Loreto",
    community: "Wijint",
    createdAt: "2024-01-12",
    assignedTo: "Ana Lucia Torres",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "activa":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "en_seguimiento":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "resuelta":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    case "cerrada":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critica":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "alta":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
    case "media":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "baja":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

export function ComplaintsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [complaints] = useState(mockComplaints)

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.complaintCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.community.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-900 dark:text-white">Lista de Denuncias</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar denuncias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Víctima</TableHead>
                <TableHead>Comunidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-mono text-sm">{complaint.complaintCode}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{complaint.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Asignado a: {complaint.assignedTo}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{complaint.victimName}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {complaint.victimAge} años - {complaint.ethnicity}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <span className="text-sm">
                        {complaint.community}, {complaint.region}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(complaint.status)}>{complaint.status.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span className="text-sm">{complaint.createdAt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">
              No se encontraron denuncias que coincidan con la búsqueda.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
