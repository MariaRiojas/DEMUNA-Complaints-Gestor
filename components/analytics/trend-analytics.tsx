"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const trendData = [
  { month: "Ene", denuncias: 18, resueltas: 12, nuevas: 18 },
  { month: "Feb", denuncias: 22, resueltas: 16, nuevas: 22 },
  { month: "Mar", denuncias: 19, resueltas: 14, nuevas: 19 },
  { month: "Abr", denuncias: 28, resueltas: 20, nuevas: 28 },
  { month: "May", denuncias: 24, resueltas: 18, nuevas: 24 },
  { month: "Jun", denuncias: 32, resueltas: 24, nuevas: 32 },
  { month: "Jul", denuncias: 29, resueltas: 22, nuevas: 29 },
  { month: "Ago", denuncias: 35, resueltas: 26, nuevas: 35 },
  { month: "Sep", denuncias: 31, resueltas: 24, nuevas: 31 },
  { month: "Oct", denuncias: 27, resueltas: 21, nuevas: 27 },
  { month: "Nov", denuncias: 33, resueltas: 25, nuevas: 33 },
  { month: "Dic", denuncias: 29, resueltas: 22, nuevas: 29 },
]

export function TrendAnalytics() {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Tendencias Mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorDenuncias" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorResueltas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="month" className="text-slate-600 dark:text-slate-300" fontSize={12} />
            <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value, name) => [value, name === "denuncias" ? "Denuncias" : "Resueltas"]}
            />
            <Area
              type="monotone"
              dataKey="denuncias"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorDenuncias)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="resueltas"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorResueltas)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">327</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Total Denuncias</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">244</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Total Resueltas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">74.6%</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Tasa de Resolución</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
