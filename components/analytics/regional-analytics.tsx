"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const regionalData = [
  { region: "Ucayali", denuncias: 45, resueltas: 28, poblacion: "496,459" },
  { region: "Loreto", denuncias: 67, resueltas: 41, poblacion: "1,039,372" },
  { region: "Amazonas", denuncias: 32, resueltas: 24, poblacion: "379,384" },
  { region: "San Martín", denuncias: 38, resueltas: 29, poblacion: "813,381" },
  { region: "Madre de Dios", denuncias: 18, resueltas: 12, poblacion: "141,070" },
  { region: "Huánuco", denuncias: 28, resueltas: 15, poblacion: "721,047" },
]

export function RegionalAnalytics() {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Análisis por Región</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionalData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="region" className="text-slate-600 dark:text-slate-300" fontSize={12} />
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
            <Bar dataKey="denuncias" fill="#3b82f6" name="Denuncias" />
            <Bar dataKey="resueltas" fill="#10b981" name="Resueltas" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-slate-900 dark:text-white text-sm">Datos Poblacionales</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {regionalData.map((item) => (
              <div key={item.region} className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{item.region}:</span>
                <span>{item.poblacion} hab.</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
