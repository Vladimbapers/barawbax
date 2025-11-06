"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface AuthUser {
  id: string
  email: string
  name: string
  course: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, course: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user was previously logged in
  const checkAuth = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("currentUser")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.log("Error checking auth:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call backend API
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const mockUser: AuthUser = {
      id: "user_123",
      email,
      name: email.split("@")[0],
      course: "Computer Science",
    }

    setUser(mockUser)
    await AsyncStorage.setItem("currentUser", JSON.stringify(mockUser))
  }

  const register = async (email: string, password: string, name: string, course: string) => {
    // Mock registration - in real app, this would call backend API
    if (!email || !password || !name || !course) {
      throw new Error("All fields are required")
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      course,
    }

    setUser(newUser)
    await AsyncStorage.setItem("currentUser", JSON.stringify(newUser))
  }

  const logout = async () => {
    setUser(null)
    await AsyncStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
