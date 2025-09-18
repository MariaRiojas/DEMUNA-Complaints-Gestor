"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const ethnicityData = [
  { name: "Shipibo-Konibo", value: 45, color: "#3b82f6" },
  { name: "Awajún", value: 38, color: "#10b981" },
  { name: "Kukama", value: 32, color: "#f59e0b" },
  { name: "Achuar", value: 28, color: "#ef4444" },
  { name: "Ashaninka", value: 24, color: "#8b5cf6" },
  { name: "Otros", value: 80, color: "#6b7280" },
]

export function EthnicityAnalytics() {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Distribución por Etnia</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ethnicityData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {ethnicityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value) => <span className="text-slate-600 dark:text-slate-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-2">
            {ethnicityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{item.value} casos</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
