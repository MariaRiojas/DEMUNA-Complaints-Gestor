"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(formData.username, formData.password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Credenciales incorrectas. Verifica tu usuario y contraseña.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-slate-700 dark:text-slate-300">
          Usuario
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="username"
            type="text"
            placeholder="Ingresa tu usuario"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="pl-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
          Contraseña
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 pr-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>

      <div className="text-center text-sm text-slate-500 dark:text-slate-400 space-y-1">
        <p>
          <strong>Usuarios de prueba:</strong>
        </p>
        <p>admin / admin123 (Supervisor)</p>
        <p>operador01 / operador123 (Operador)</p>
        <p>trabajador01 / trabajador123 (Trabajador DEMUNA)</p>
      </div>
    </form>
  )
}
