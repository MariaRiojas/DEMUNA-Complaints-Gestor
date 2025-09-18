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

export function NewComplaintForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    complaintType: "",
    priority: "",

    // Complainant info
    complainantName: "",
    complainantPhone: "",
    complainantEmail: "",
    complainantRelationship: "",

    // Victim info
    victimName: "",
    victimAge: "",
    victimGender: "",
    victimEthnicity: "",
    victimLanguage: "",

    // Location
    region: "",
    province: "",
    district: "",
    community: "",
    address: "",
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
    if (!formData.title || !formData.description || !formData.victimName) {
      setError("Por favor completa todos los campos obligatorios.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would be an actual API call
      console.log("Nueva denuncia:", formData)

      // Redirect to complaints list
      router.push("/complaints")
    } catch (err) {
      setError("Error al crear la denuncia. Por favor intenta nuevamente.")
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

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica de la Denuncia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la Denuncia *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Breve descripción del caso"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complaintType">Tipo de Denuncia *</Label>
              <Select
                value={formData.complaintType}
                onValueChange={(value) => handleInputChange("complaintType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="violencia_familiar">Violencia Familiar</SelectItem>
                  <SelectItem value="trabajo_infantil">Trabajo Infantil</SelectItem>
                  <SelectItem value="desnutricion">Desnutrición</SelectItem>
                  <SelectItem value="abandono">Abandono</SelectItem>
                  <SelectItem value="abuso_sexual">Abuso Sexual</SelectItem>
                  <SelectItem value="matrimonio_infantil">Matrimonio Infantil</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Prioridad *</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Selecciona prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critica">Crítica</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción Detallada *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe detalladamente la situación reportada..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Complainant Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Denunciante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="complainantName">Nombre Completo</Label>
              <Input
                id="complainantName"
                value={formData.complainantName}
                onChange={(e) => handleInputChange("complainantName", e.target.value)}
                placeholder="Nombre del denunciante"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complainantPhone">Teléfono</Label>
              <Input
                id="complainantPhone"
                value={formData.complainantPhone}
                onChange={(e) => handleInputChange("complainantPhone", e.target.value)}
                placeholder="+51-999-000-000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="complainantEmail">Correo Electrónico</Label>
              <Input
                id="complainantEmail"
                type="email"
                value={formData.complainantEmail}
                onChange={(e) => handleInputChange("complainantEmail", e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complainantRelationship">Relación con la Víctima</Label>
              <Select
                value={formData.complainantRelationship}
                onValueChange={(value) => handleInputChange("complainantRelationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona relación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madre">Madre</SelectItem>
                  <SelectItem value="padre">Padre</SelectItem>
                  <SelectItem value="familiar">Familiar</SelectItem>
                  <SelectItem value="vecino">Vecino</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                  <SelectItem value="personal_salud">Personal de Salud</SelectItem>
                  <SelectItem value="autoridad">Autoridad</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Victim Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Víctima</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="victimName">Nombre Completo *</Label>
              <Input
                id="victimName"
                value={formData.victimName}
                onChange={(e) => handleInputChange("victimName", e.target.value)}
                placeholder="Nombre de la víctima"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="victimAge">Edad</Label>
              <Input
                id="victimAge"
                type="number"
                value={formData.victimAge}
                onChange={(e) => handleInputChange("victimAge", e.target.value)}
                placeholder="Edad en años"
                min="0"
                max="18"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="victimGender">Género</Label>
              <Select value={formData.victimGender} onValueChange={(value) => handleInputChange("victimGender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="victimEthnicity">Pueblo Originario</Label>
              <Select
                value={formData.victimEthnicity}
                onValueChange={(value) => handleInputChange("victimEthnicity", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona etnia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shipibo-Konibo">Shipibo-Konibo</SelectItem>
                  <SelectItem value="Awajún">Awajún</SelectItem>
                  <SelectItem value="Kukama">Kukama</SelectItem>
                  <SelectItem value="Achuar">Achuar</SelectItem>
                  <SelectItem value="Ashaninka">Ashaninka</SelectItem>
                  <SelectItem value="Matsés">Matsés</SelectItem>
                  <SelectItem value="Shuar">Shuar</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="victimLanguage">Idioma Principal</Label>
              <Input
                id="victimLanguage"
                value={formData.victimLanguage}
                onChange={(e) => handleInputChange("victimLanguage", e.target.value)}
                placeholder="Idioma que habla la víctima"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle>Ubicación del Caso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Región *</Label>
              <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ucayali">Ucayali</SelectItem>
                  <SelectItem value="Loreto">Loreto</SelectItem>
                  <SelectItem value="Amazonas">Amazonas</SelectItem>
                  <SelectItem value="San Martín">San Martín</SelectItem>
                  <SelectItem value="Madre de Dios">Madre de Dios</SelectItem>
                  <SelectItem value="Huánuco">Huánuco</SelectItem>
                  <SelectItem value="Pasco">Pasco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Provincia</Label>
              <Input
                id="province"
                value={formData.province}
                onChange={(e) => handleInputChange("province", e.target.value)}
                placeholder="Provincia"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">Distrito</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                placeholder="Distrito"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="community">Comunidad</Label>
              <Input
                id="community"
                value={formData.community}
                onChange={(e) => handleInputChange("community", e.target.value)}
                placeholder="Nombre de la comunidad"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección Específica</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Dirección detallada"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/complaints")} disabled={isLoading}>
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
              Crear Denuncia
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
