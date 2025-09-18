import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"

const stats = [
  {
    title: "Denuncias Activas",
    value: "24",
    change: "+12%",
    changeType: "increase" as const,
    icon: AlertTriangle,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Casos Resueltos",
    value: "156",
    change: "+8%",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "En Seguimiento",
    value: "43",
    change: "-3%",
    changeType: "decrease" as const,
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Usuarios Activos",
    value: "12",
    change: "+2",
    changeType: "increase" as const,
    icon: Users,
    color: "text-purple-600 dark:text-purple-400",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "increase" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {stat.change} desde el mes pasado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
