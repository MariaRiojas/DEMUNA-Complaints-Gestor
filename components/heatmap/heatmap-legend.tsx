import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const intensityLevels = [
  { range: "80-100%", color: "bg-red-500", label: "Muy Alta", description: "Concentración crítica de denuncias" },
  { range: "60-79%", color: "bg-orange-500", label: "Alta", description: "Concentración elevada" },
  { range: "40-59%", color: "bg-yellow-500", label: "Media", description: "Concentración moderada" },
  { range: "0-39%", color: "bg-green-500", label: "Baja", description: "Concentración baja" },
]

const mapSymbols = [
  {
    symbol: "●",
    color: "text-slate-900 dark:text-white",
    label: "Ubicación exacta",
    description: "Punto de referencia regional",
  },
  { symbol: "~", color: "text-blue-500", label: "Ríos principales", description: "Cursos de agua importantes" },
  { symbol: "▢", color: "text-green-600", label: "Área amazónica", description: "Región de selva tropical" },
]

export function HeatmapLegend() {
  return (
    <div className="space-y-4">
      {/* Intensity Legend */}
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-white">Intensidad de Denuncias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {intensityLevels.map((level) => (
            <div key={level.range} className="flex items-start gap-3">
              <div className={`w-4 h-4 rounded-full ${level.color} mt-0.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{level.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {level.range}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{level.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Map Symbols */}
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-white">Símbolos del Mapa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mapSymbols.map((symbol) => (
            <div key={symbol.label} className="flex items-start gap-3">
              <div className={`text-lg ${symbol.color} font-bold mt-0.5 flex-shrink-0 w-4 text-center`}>
                {symbol.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">{symbol.label}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{symbol.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-white">Resumen Estadístico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Total de regiones:</span>
              <span className="font-medium text-slate-900 dark:text-white">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Región más afectada:</span>
              <span className="font-medium text-slate-900 dark:text-white">Loreto</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Promedio de casos:</span>
              <span className="font-medium text-slate-900 dark:text-white">38 por región</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">Intensidad promedio:</span>
              <span className="font-medium text-slate-900 dark:text-white">67.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
