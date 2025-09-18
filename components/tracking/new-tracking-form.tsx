"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, AlertCircle } from "lucide-react"

export function NewTrackingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    complaintCode: "",
    caseCode: "",
    trackingType: "",
    title: "",
    description: "",
    activityDate: "",
    activityTime: "",
    location: "",
    participants: "",
    outcomes: "",
    nextSteps: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.title || !formData.description || !formData.trackingType || !formData.activityDate) {
      setError("Por favor completa todos los campos obligatorios.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would be an actual API call
      console.log("Nuevo seguimiento:", formData)

      // Redirect to tracking list
      router.push("/tracking")
    } catch (err) {
      setError("Error al crear el seguimiento. Por favor intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Case Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selección de Caso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="complaintCode">Código de Denuncia</Label>
              <Select
                value={formData.complaintCode}
                onValueChange={(value) => handleInputChange("complaintCode", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una denuncia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEN-2024-001">DEN-2024-001 - Violencia familiar en comunidad Shipibo</SelectItem>
                  <SelectItem value="DEN-2024-002">DEN-2024-002 - Abandono escolar por trabajo infantil</SelectItem>
                  <SelectItem value="DEN-2024-003">DEN-2024-003 - Desnutrición infantil severa</SelectItem>
                  <SelectItem value="DEN-2024-004">DEN-2024-004 - Matrimonio infantil forzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caseCode">Código de Caso (Opcional)</Label>
              <Select value={formData.caseCode} onValueChange={(value) => handleInputChange("caseCode", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un caso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASO-2024-001">
                    CASO-2024-001 - Intervención integral en comunidad San Francisco
                  </SelectItem>
                  <SelectItem value="CASO-2024-002">
                    CASO-2024-002 - Programa de prevención de trabajo infantil - Loreto
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Actividad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trackingType">Tipo de Actividad *</Label>
              <Select value={formData.trackingType} onValueChange={(value) => handleInputChange("trackingType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visita_domiciliaria">Visita Domiciliaria</SelectItem>
                  <SelectItem value="entrevista">Entrevista</SelectItem>
                  <SelectItem value="coordinacion">Coordinación</SelectItem>
                  <SelectItem value="seguimiento_telefonico">Seguimiento Telefónico</SelectItem>
                  <SelectItem value="reunion">Reunión</SelectItem>
                  <SelectItem value="evaluacion">Evaluación</SelectItem>
                  <SelectItem value="derivacion">Derivación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Título de la Actividad *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Breve descripción de la actividad"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción Detallada *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe detalladamente la actividad realizada..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activityDate">Fecha de Actividad *</Label>
              <Input
                id="activityDate"
                type="date"
                value={formData.activityDate}
                onChange={(e) => handleInputChange("activityDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activityTime">Hora de Actividad</Label>
              <Input
                id="activityTime"
                type="time"
                value={formData.activityTime}
                onChange={(e) => handleInputChange("activityTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Lugar donde se realizó la actividad"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Participantes</Label>
            <Textarea
              id="participants"
              value={formData.participants}
              onChange={(e) => handleInputChange("participants", e.target.value)}
              placeholder="Lista de personas que participaron en la actividad..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results and Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados y Próximos Pasos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="outcomes">Resultados Obtenidos</Label>
            <Textarea
              id="outcomes"
              value={formData.outcomes}
              onChange={(e) => handleInputChange("outcomes", e.target.value)}
              placeholder="Describe los resultados y conclusiones de la actividad..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextSteps">Próximos Pasos</Label>
            <Textarea
              id="nextSteps"
              value={formData.nextSteps}
              onChange={(e) => handleInputChange("nextSteps", e.target.value)}
              placeholder="Describe las acciones a seguir y próximas actividades..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/tracking")} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? (
            <>
              <Save className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Crear Seguimiento
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
