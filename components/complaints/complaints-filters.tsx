"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

export function ComplaintsFilters() {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    region: "",
    ethnicity: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }))
  }

  const clearAllFilters = () => {
    setFilters({ status: "", priority: "", region: "", ethnicity: "" })
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filtros:</span>
          </div>

          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activa">Activa</SelectItem>
              <SelectItem value="en_seguimiento">En Seguimiento</SelectItem>
              <SelectItem value="resuelta">Resuelta</SelectItem>
              <SelectItem value="cerrada">Cerrada</SelectItem>
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

          <Select value={filters.region} onValueChange={(value) => handleFilterChange("region", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ucayali">Ucayali</SelectItem>
              <SelectItem value="Loreto">Loreto</SelectItem>
              <SelectItem value="Amazonas">Amazonas</SelectItem>
              <SelectItem value="San Martín">San Martín</SelectItem>
              <SelectItem value="Madre de Dios">Madre de Dios</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.ethnicity} onValueChange={(value) => handleFilterChange("ethnicity", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Etnia" />
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
                value && (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key}: {value}
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
