"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, FileText, Users, BarChart3, Settings, Shield, AlertTriangle, ClipboardList, MapPin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Panel de Control", href: "/dashboard", icon: Home },
  { name: "Denuncias", href: "/complaints", icon: AlertTriangle },
  { name: "Casos", href: "/cases", icon: FileText },
  { name: "Seguimientos", href: "/tracking", icon: ClipboardList },
  { name: "Usuarios", href: "/users", icon: Users },
  { name: "Analítica", href: "/analytics", icon: BarChart3 },
  { name: "Mapa de Calor", href: "/heatmap", icon: MapPin },
  { name: "Configuración", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">DEMUNA</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Gestión de Denuncias</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive && "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Administrador</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@demuna.gob.pe</p>
          </div>
        </div>
      </div>
    </div>
  )
}
