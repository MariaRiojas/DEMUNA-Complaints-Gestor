"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Search, Calendar } from "lucide-react"

export function TrackingFilters() {
  const [filters, setFilters] = useState({
    trackingType: "",
    complaintCode: "",
    caseCode: "",
    dateFrom: "",
    dateTo: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }))
  }

  const clearAllFilters = () => {
    setFilters({ trackingType: "", complaintCode: "", caseCode: "", dateFrom: "", dateTo: "" })
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* First row of filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filtros:</span>
            </div>

            <Select value={filters.trackingType} onValueChange={(value) => handleFilterChange("trackingType", value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo de Actividad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visita_domiciliaria">Visita Domiciliaria</SelectItem>
                <SelectItem value="entrevista">Entrevista</SelectItem>
                <SelectItem value="coordinacion">Coordinación</SelectItem>
                <SelectItem value="seguimiento_telefonico">Seguimiento Telefónico</SelectItem>
                <SelectItem value="reunion">Reunión</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Código de denuncia"
                value={filters.complaintCode}
                onChange={(e) => handleFilterChange("complaintCode", e.target.value)}
                className="pl-10 w-48"
              />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Código de caso"
                value={filters.caseCode}
                onChange={(e) => handleFilterChange("caseCode", e.target.value)}
                className="pl-10 w-48"
              />
            </div>
          </div>

          {/* Second row - Date filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Fecha:</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Desde:</span>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Hasta:</span>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="w-40"
              />
            </div>

            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Limpiar filtros ({activeFiltersCount})
              </Button>
            )}
          </div>

          {/* Active filters display */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400">Filtros activos:</span>
              {Object.entries(filters).map(
                ([key, value]) =>
                  value && (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key === "trackingType"
                        ? "Tipo"
                        : key === "complaintCode"
                          ? "Denuncia"
                          : key === "caseCode"
                            ? "Caso"
                            : key === "dateFrom"
                              ? "Desde"
                              : key === "dateTo"
                                ? "Hasta"
                                : key}
                      : {value}
                      <Button variant="ghost" size="sm" className="h-auto p-0 ml-1" onClick={() => clearFilter(key)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ),
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
