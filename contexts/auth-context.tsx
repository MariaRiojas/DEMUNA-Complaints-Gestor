"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type AuthState, authenticateUser } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem("demuna_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        localStorage.removeItem("demuna_user")
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await authenticateUser(username, password)

      if (user) {
        localStorage.setItem("demuna_user", JSON.stringify(user))
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        return true
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        return false
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("demuna_user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
