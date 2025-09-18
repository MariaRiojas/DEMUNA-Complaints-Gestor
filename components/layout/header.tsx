"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, LogOut, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { getRoleDisplayName } from "@/lib/auth"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {user && (
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Bienvenido, {user.fullName}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getRoleDisplayName(user.role)}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{user.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
