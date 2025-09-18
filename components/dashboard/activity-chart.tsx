"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Ene", denuncias: 12, resueltas: 8 },
  { name: "Feb", denuncias: 19, resueltas: 15 },
  { name: "Mar", denuncias: 15, resueltas: 12 },
  { name: "Abr", denuncias: 22, resueltas: 18 },
  { name: "May", denuncias: 18, resueltas: 14 },
  { name: "Jun", denuncias: 25, resueltas: 20 },
]

export function ActivityChart() {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Actividad Mensual</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="name" className="text-slate-600 dark:text-slate-300" />
            <YAxis className="text-slate-600 dark:text-slate-300" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="denuncias" fill="#3b82f6" name="Denuncias" />
            <Bar dataKey="resueltas" fill="#10b981" name="Resueltas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
