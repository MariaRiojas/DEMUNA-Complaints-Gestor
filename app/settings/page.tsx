"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Database, Mail, FileText, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Configuración del Sistema</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Administra la configuración general de la plataforma DEMUNA
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuraciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    General
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notificaciones
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Seguridad
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Base de Datos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Reportes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuración General
                  </CardTitle>
                  <CardDescription>Configuración básica del sistema DEMUNA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">Nombre del Sistema</Label>
                      <Input id="system-name" defaultValue="DEMUNA - Gestión de Denuncias" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organización</Label>
                      <Input id="organization" defaultValue="Ministerio de la Mujer y Poblaciones Vulnerables" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      defaultValue="Sistema de gestión de denuncias para la protección de niñas de pueblos originarios"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona Horaria</Label>
                      <Select defaultValue="america/lima">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america/lima">América/Lima (UTC-5)</SelectItem>
                          <SelectItem value="america/bogota">América/Bogotá (UTC-5)</SelectItem>
                          <SelectItem value="america/caracas">América/Caracas (UTC-4)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select defaultValue="es">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="qu">Quechua</SelectItem>
                          <SelectItem value="ay">Aymara</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Configuración de Notificaciones
                  </CardTitle>
                  <CardDescription>Gestiona las notificaciones del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones por Email</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Enviar notificaciones importantes por correo electrónico
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificaciones de Nuevas Denuncias</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Notificar cuando se registre una nueva denuncia
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recordatorios de Seguimiento</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Enviar recordatorios para casos pendientes de seguimiento
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reportes Automáticos</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Generar y enviar reportes periódicos automáticamente
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Configuración de Seguridad
                  </CardTitle>
                  <CardDescription>Configuración de seguridad y acceso al sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                      <Input id="session-timeout" type="number" defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Máximo Intentos de Login</Label>
                      <Input id="max-attempts" type="number" defaultValue="3" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticación de Dos Factores</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Requerir verificación adicional para el acceso
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auditoría de Acciones</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Registrar todas las acciones de los usuarios
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Estado del Sistema
                  </CardTitle>
                  <CardDescription>Información sobre el estado actual del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Base de Datos</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        Conectada
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Servidor Email</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        Activo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Almacenamiento</span>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        75% Usado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Última Copia de Seguridad</span>
                      <Badge variant="outline">Hace 2 horas</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restablecer Valores
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
