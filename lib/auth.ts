// Authentication utilities and types
export interface User {
  id: number
  username: string
  email: string
  fullName: string
  role: "operador" | "trabajador_demuna" | "supervisor"
  phone?: string
  isActive: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication - In production, this would connect to your database
const mockUsers: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin123",
    user: {
      id: 1,
      username: "admin",
      email: "admin@demuna.gob.pe",
      fullName: "Administrador del Sistema",
      role: "supervisor",
      phone: "+51-999-000-001",
      isActive: true,
    },
  },
  operador01: {
    password: "operador123",
    user: {
      id: 2,
      username: "operador01",
      email: "operador01@demuna.gob.pe",
      fullName: "María González Pérez",
      role: "operador",
      phone: "+51-999-000-002",
      isActive: true,
    },
  },
  trabajador01: {
    password: "trabajador123",
    user: {
      id: 3,
      username: "trabajador01",
      email: "trabajador01@demuna.gob.pe",
      fullName: "Carlos Ramírez Silva",
      role: "trabajador_demuna",
      phone: "+51-999-000-003",
      isActive: true,
    },
  },
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const userRecord = mockUsers[username]
  if (userRecord && userRecord.password === password && userRecord.user.isActive) {
    return userRecord.user
  }

  return null
}

export function getRoleDisplayName(role: string): string {
  switch (role) {
    case "operador":
      return "Operador"
    case "trabajador_demuna":
      return "Trabajador DEMUNA"
    case "supervisor":
      return "Supervisor"
    default:
      return role
  }
}

export function getRolePermissions(role: string) {
  const permissions = {
    operador: {
      canCreateComplaints: true,
      canViewComplaints: true,
      canEditComplaints: false,
      canDeleteComplaints: false,
      canManageCases: false,
      canViewAnalytics: false,
      canManageUsers: false,
    },
    trabajador_demuna: {
      canCreateComplaints: true,
      canViewComplaints: true,
      canEditComplaints: true,
      canDeleteComplaints: false,
      canManageCases: true,
      canViewAnalytics: true,
      canManageUsers: false,
    },
    supervisor: {
      canCreateComplaints: true,
      canViewComplaints: true,
      canEditComplaints: true,
      canDeleteComplaints: true,
      canManageCases: true,
      canViewAnalytics: true,
      canManageUsers: true,
    },
  }

  return permissions[role as keyof typeof permissions] || permissions.operador
}
