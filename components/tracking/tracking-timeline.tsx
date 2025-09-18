"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, FileText, Eye, Edit } from "lucide-react"

// Mock data for tracking activities
const trackingActivities = [
  {
    id: 1,
    complaintCode: "DEN-2024-001",
    caseCode: "CASO-2024-001",
    trackingType: "visita_domiciliaria",
    title: "Primera visita domiciliaria - Familia Campos",
    description:
      "Visita realizada al domicilio de la menor Luz María Campos para evaluar la situación familiar y condiciones de vida.",
    activityDate: "2024-01-16T09:00:00",
    location: "Calle Los Cedros 123, San Francisco, Callería",
    participants: "Carlos Ramírez (Trabajador DEMUNA), Rosa Mendoza (Denunciante), Familia Campos",
    outcomes:
      "Se confirmó situación de violencia. Padres muestran disposición a recibir ayuda. Menor en condiciones físicas estables.",
    nextSteps: "Programar sesiones de terapia familiar. Coordinar con centro de salud para evaluación médica completa.",
    createdBy: "Carlos Ramírez Silva",
    createdAt: "2024-01-16T10:30:00",
    hasMinutes: true,
    hasEvidence: true,
  },
  {
    id: 2,
    complaintCode: "DEN-2024-002",
    caseCode: "CASO-2024-002",
    trackingType: "entrevista",
    title: "Entrevista con menor Pedro Shahuano",
    description: "Entrevista individual con el menor para conocer su perspectiva sobre la situación escolar y laboral.",
    activityDate: "2024-01-17T14:00:00",
    location: "Oficina DEMUNA Iquitos",
    participants: "Carlos Ramírez (Trabajador DEMUNA), Pedro Shahuano (Menor)",
    outcomes:
      "El menor expresa deseo de continuar estudios pero comprende necesidad económica familiar. Muestra interés en programas de apoyo.",
    nextSteps: "Gestionar beca de estudios. Coordinar con programa de apoyo económico familiar.",
    createdBy: "Carlos Ramírez Silva",
    createdAt: "2024-01-17T15:30:00",
    hasMinutes: false,
    hasEvidence: true,
  },
  {
    id: 3,
    complaintCode: "DEN-2024-001",
    caseCode: "CASO-2024-001",
    trackingType: "coordinacion",
    title: "Coordinación con centro de salud",
    description: "Reunión con personal del centro de salud para coordinar evaluación médica y apoyo psicológico.",
    activityDate: "2024-01-18T11:00:00",
    location: "Centro de Salud San Francisco",
    participants: "Carlos Ramírez (Trabajador DEMUNA), Dra. María Vásquez (Médico), Psic. Ana Torres",
    outcomes: "Se programó evaluación médica completa para el 20/01. Se asignó psicólogo para terapia familiar.",
    nextSteps: "Acompañar a la familia a la cita médica. Iniciar sesiones de terapia familiar.",
    createdBy: "Carlos Ramírez Silva",
    createdAt: "2024-01-18T12:00:00",
    hasMinutes: true,
    hasEvidence: false,
  },
]

const getTrackingTypeColor = (type: string) => {
  switch (type) {
    case "visita_domiciliaria":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    case "entrevista":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    case "coordinacion":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
    case "seguimiento_telefonico":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "reunion":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

const getTrackingTypeLabel = (type: string) => {
  switch (type) {
    case "visita_domiciliaria":
      return "Visita Domiciliaria"
    case "entrevista":
      return "Entrevista"
    case "coordinacion":
      return "Coordinación"
    case "seguimiento_telefonico":
      return "Seguimiento Telefónico"
    case "reunion":
      return "Reunión"
    default:
      return type
  }
}

export function TrackingTimeline() {
  return (
    <div className="space-y-4">
      {trackingActivities.map((activity, index) => (
        <Card key={activity.id} className="bg-white dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={getTrackingTypeColor(activity.trackingType)}>
                    {getTrackingTypeLabel(activity.trackingType)}
                  </Badge>
                  <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                    {activity.complaintCode} • {activity.caseCode}
                  </span>
                </div>
                <CardTitle className="text-lg text-slate-900 dark:text-white">{activity.title}</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activity.description}</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Activity Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(activity.activityDate).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4" />
                <span>{activity.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{activity.participants}</span>
            </div>

            {/* Outcomes */}
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900 dark:text-white">Resultados:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                {activity.outcomes}
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900 dark:text-white">Próximos Pasos:</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                {activity.nextSteps}
              </p>
            </div>

            {/* Attachments */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span>Registrado por: {activity.createdBy}</span>
                <span>•</span>
                <span>{new Date(activity.createdAt).toLocaleDateString("es-PE")}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                {activity.hasMinutes && (
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    Acta
                  </Badge>
                )}
                {activity.hasEvidence && (
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    Evidencias
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {trackingActivities.length === 0 && (
        <Card className="bg-white dark:bg-slate-800">
          <CardContent className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">No hay actividades de seguimiento registradas.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
