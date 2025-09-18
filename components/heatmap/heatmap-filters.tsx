"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, MapPin } from "lucide-react"

export function HeatmapFilters() {
  const [filters, setFilters] = useState({
    timeRange: "last_6_months",
    complaintType: "",
    priority: "",
    ethnicity: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }))
  }

  const clearAllFilters = () => {
    setFilters({ timeRange: "last_6_months", complaintType: "", priority: "", ethnicity: "" })
  }

  const activeFiltersCount = Object.values(filters).filter((value, index) =>
    index === 0 ? value !== "last_6_months" : Boolean(value),
  ).length

  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filtros del Mapa:</span>
          </div>

          <Select value={filters.timeRange} onValueChange={(value) => handleFilterChange("timeRange", value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Período de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_month">Último mes</SelectItem>
              <SelectItem value="last_3_months">Últimos 3 meses</SelectItem>
              <SelectItem value="last_6_months">Últimos 6 meses</SelectItem>
              <SelectItem value="last_year">Último año</SelectItem>
              <SelectItem value="all_time">Todo el tiempo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.complaintType} onValueChange={(value) => handleFilterChange("complaintType", value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de denuncia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="violencia_familiar">Violencia Familiar</SelectItem>
              <SelectItem value="trabajo_infantil">Trabajo Infantil</SelectItem>
              <SelectItem value="desnutricion">Desnutrición</SelectItem>
              <SelectItem value="abandono">Abandono</SelectItem>
              <SelectItem value="abuso_sexual">Abuso Sexual</SelectItem>
              <SelectItem value="matrimonio_infantil">Matrimonio Infantil</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critica">Crítica</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="baja">Baja</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.ethnicity} onValueChange={(value) => handleFilterChange("ethnicity", value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pueblo originario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Shipibo-Konibo">Shipibo-Konibo</SelectItem>
              <SelectItem value="Awajún">Awajún</SelectItem>
              <SelectItem value="Kukama">Kukama</SelectItem>
              <SelectItem value="Achuar">Achuar</SelectItem>
              <SelectItem value="Ashaninka">Ashaninka</SelectItem>
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Limpiar filtros ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Active filters display */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">Filtros activos:</span>
            {Object.entries(filters).map(
              ([key, value]) =>
                (key !== "timeRange" || value !== "last_6_months") &&
                value && (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key === "timeRange"
                      ? "Período"
                      : key === "complaintType"
                        ? "Tipo"
                        : key === "priority"
                          ? "Prioridad"
                          : key === "ethnicity"
                            ? "Etnia"
                            : key}
                    :{" "}
                    {key === "timeRange" && value === "last_month"
                      ? "Último mes"
                      : key === "timeRange" && value === "last_3_months"
                        ? "3 meses"
                        : key === "timeRange" && value === "last_year"
                          ? "1 año"
                          : key === "timeRange" && value === "all_time"
                            ? "Todo"
                            : value}
                    <Button variant="ghost" size="sm" className="h-auto p-0 ml-1" onClick={() => clearFilter(key)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ),
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
