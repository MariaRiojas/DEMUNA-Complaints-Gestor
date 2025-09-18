import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const complaints = [
  {
    id: "DEN-2024-001",
    title: "Violencia familiar en comunidad Shipibo",
    status: "Activa",
    priority: "Alta",
    date: "2024-01-15",
    location: "Ucayali",
  },
  {
    id: "DEN-2024-002",
    title: "Abandono escolar por trabajo infantil",
    status: "En seguimiento",
    priority: "Media",
    date: "2024-01-14",
    location: "Loreto",
  },
  {
    id: "DEN-2024-003",
    title: "Desnutrición infantil",
    status: "Resuelta",
    priority: "Alta",
    date: "2024-01-13",
    location: "Amazonas",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Activa":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "En seguimiento":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "Resuelta":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "Media":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "Baja":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

export function RecentComplaints() {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Denuncias Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{complaint.id}</span>
                  <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                </div>
                <h4 className="font-medium text-slate-900 dark:text-white truncate">{complaint.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{complaint.location}</span>
                  <span>{complaint.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
