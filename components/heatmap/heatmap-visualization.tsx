"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock heatmap data - In production, this would be generated from actual geographic data
const heatmapRegions = [
  { name: "Ucayali", intensity: 85, cases: 45, coordinates: { x: 45, y: 60 } },
  { name: "Loreto", intensity: 95, cases: 67, coordinates: { x: 35, y: 25 } },
  { name: "Amazonas", intensity: 60, cases: 32, coordinates: { x: 25, y: 35 } },
  { name: "San Martín", intensity: 70, cases: 38, coordinates: { x: 40, y: 45 } },
  { name: "Madre de Dios", intensity: 40, cases: 18, coordinates: { x: 55, y: 75 } },
  { name: "Huánuco", intensity: 55, cases: 28, coordinates: { x: 35, y: 55 } },
]

const getIntensityColor = (intensity: number) => {
  if (intensity >= 80) return "bg-red-500"
  if (intensity >= 60) return "bg-orange-500"
  if (intensity >= 40) return "bg-yellow-500"
  return "bg-green-500"
}

const getIntensityOpacity = (intensity: number) => {
  return Math.max(0.3, intensity / 100)
}

export function HeatmapVisualization() {
  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Mapa de Concentración de Denuncias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
          {/* Simplified map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-slate-600 dark:to-slate-700">
            {/* Amazon region representation */}
            <div className="absolute inset-4 bg-green-200 dark:bg-green-800/30 rounded-lg opacity-50" />

            {/* Rivers representation */}
            <div className="absolute top-8 left-8 w-64 h-1 bg-blue-400 dark:bg-blue-600 rounded transform rotate-12" />
            <div className="absolute top-16 left-16 w-48 h-1 bg-blue-400 dark:bg-blue-600 rounded transform -rotate-6" />
            <div className="absolute bottom-20 left-12 w-56 h-1 bg-blue-400 dark:bg-blue-600 rounded transform rotate-45" />
          </div>

          {/* Heatmap points */}
          {heatmapRegions.map((region) => (
            <div
              key={region.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y}%`,
              }}
            >
              {/* Heat circle */}
              <div
                className={`w-16 h-16 rounded-full ${getIntensityColor(region.intensity)} animate-pulse`}
                style={{
                  opacity: getIntensityOpacity(region.intensity),
                }}
              />

              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full" />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                  <div className="font-medium">{region.name}</div>
                  <div>{region.cases} denuncias</div>
                  <div>Intensidad: {region.intensity}%</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
              </div>
            </div>
          ))}

          {/* Region labels */}
          {heatmapRegions.map((region) => (
            <div
              key={`label-${region.name}`}
              className="absolute transform -translate-x-1/2 text-xs font-medium text-slate-700 dark:text-slate-300 pointer-events-none"
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y + 8}%`,
              }}
            >
              {region.name}
            </div>
          ))}
        </div>

        {/* Summary statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {heatmapRegions.map((region) => (
            <div key={region.name} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className={`w-3 h-3 rounded-full ${getIntensityColor(region.intensity)}`} />
                <span className="text-sm font-medium text-slate-900 dark:text-white">{region.name}</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{region.cases}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{region.intensity}% intensidad</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
