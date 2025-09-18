"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const overviewStats = [
  {
    title: "Total de Denuncias",
    value: "247",
    change: "+12%",
    changeType: "increase" as const,
    icon: AlertTriangle,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Casos Resueltos",
    value: "156",
    change: "+8%",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "En Proceso",
    value: "67",
    change: "-3%",
    changeType: "decrease" as const,
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    title: "Tiempo Promedio",
    value: "18 días",
    change: "-2 días",
    changeType: "decrease" as const,
    icon: TrendingDown,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
]

const resolutionStats = [
  { status: "Resueltas", count: 156, percentage: 63, color: "bg-green-500" },
  { status: "En Proceso", count: 67, percentage: 27, color: "bg-yellow-500" },
  { status: "Pendientes", count: 24, percentage: 10, color: "bg-red-500" },
]

export function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title} className="bg-white dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center text-sm ${
                    stat.changeType === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resolution Status */}
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Estado de Resolución</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resolutionStats.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{item.status}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 w-12 text-right">{item.count}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 w-8 text-right">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
