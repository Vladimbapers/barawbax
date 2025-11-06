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



export interface BorrowItem {
  id: string
  title: string
  price: number
  category: string
  status: "available" | "pending" | "borrowed"
  image: string
  rating: number
  owner: string
  description?: string
}

export interface Transaction {
  id: string
  type: "borrow" | "lend"
  itemName: string
  otherUser: string
  price: number
  startDate: string
  endDate: string
  status: "pending" | "active" | "completed" | "overdue"
  image: string
}

export interface UserProfile {
  name: string
  course: string
  yearLevel: string
  email: string
  phone: string
  rating: number
  credits: number
  itemsBorrowed: number
  itemsLent: number
  memberSince: string
}

interface AppContextType {
  borrowItems: BorrowItem[]
  addBorrowItem: (item: BorrowItem) => void
  updateItemStatus: (itemId: string, status: "available" | "pending" | "borrowed") => void
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  userProfile: UserProfile
  updateUserProfile: (profile: Partial<UserProfile>) => void
  addCredits: (amount: number) => void
  favoriteItems: string[]
  toggleFavorite: (itemId: string) => void
  searchHistory: string[]
  addSearchHistory: (query: string) => void
  clearSearchHistory: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const INITIAL_ITEMS: BorrowItem[] = [
    {
      id: "1",
      title: "Laptop - Dell XPS 13",
      price: 50,
      category: "Electronics",
      status: "available",
      image: "💻",
      rating: 4.8,
      owner: "John Doe",
      description: "High-performance laptop, great for coding",
    },
    {
      id: "2",
      title: "Textbook - Physics 101",
      price: 10,
      category: "Books",
      status: "available",
      image: "📚",
      rating: 4.5,
      owner: "Jane Smith",
      description: "Latest edition physics textbook",
    },
    {
      id: "3",
      title: "Scientific Calculator",
      price: 15,
      category: "Electronics",
      status: "pending",
      image: "🧮",
      rating: 4.7,
      owner: "Mike Johnson",
      description: "For engineering calculations",
    },
    {
      id: "4",
      title: "Project Kit - Arduino",
      price: 30,
      category: "Electronics",
      status: "available",
      image: "⚙️",
      rating: 4.9,
      owner: "Sarah Lee",
      description: "Complete Arduino development kit",
    },
    {
      id: "5",
      title: "Canon EOS Camera",
      price: 100,
      category: "Electronics",
      status: "available",
      image: "📷",
      rating: 4.9,
      owner: "Robert Chen",
      description: "Professional DSLR camera",
    },
    {
      id: "6",
      title: "Sports Bicycle",
      price: 80,
      category: "Sports",
      status: "available",
      image: "🚴",
      rating: 4.6,
      owner: "Lisa Rodriguez",
      description: "Mountain bike with accessories",
    },
  ]

  const INITIAL_TRANSACTIONS: Transaction[] = [
    {
      id: "1",
      type: "borrow",
      itemName: "Laptop - Dell XPS 13",
      otherUser: "John Doe",
      price: 50,
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      status: "active",
      image: "💻",
    },
    {
      id: "2",
      type: "lend",
      itemName: "Projector",
      otherUser: "Jane Smith",
      price: 200,
      startDate: "2024-01-08",
      endDate: "2024-01-09",
      status: "completed",
      image: "📽️",
    },
    {
      id: "3",
      type: "borrow",
      itemName: "Textbook - Physics 101",
      otherUser: "Mike Johnson",
      price: 10,
      startDate: "2024-01-05",
      endDate: "2024-01-07",
      status: "overdue",
      image: "📚",
    },
  ]

  const INITIAL_USER: UserProfile = {
    name: "Juan Dela Cruz",
    course: "Computer Science",
    yearLevel: "3rd Year",
    email: "juan.delacruz@ustp.edu.ph",
    phone: "+63 917 123 4567",
    rating: 4.8,
    credits: 2450,
    itemsBorrowed: 8,
    itemsLent: 12,
    memberSince: "January 2024",
  }

  const [borrowItems, setBorrowItems] = useState<BorrowItem[]>(INITIAL_ITEMS)
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER)
  const [favoriteItems, setFavoriteItems] = useState<string[]>(["1", "4"])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const addBorrowItem = (item: BorrowItem) => {
    const updated = [...borrowItems, item]
    setBorrowItems(updated)
    saveToStorage("borrowItems", updated)
  }

  const updateItemStatus = (itemId: string, status: "available" | "pending" | "borrowed") => {
    const updated = borrowItems.map((item) => (item.id === itemId ? { ...item, status } : item))
    setBorrowItems(updated)
    saveToStorage("borrowItems", updated)
  }

  const addTransaction = (transaction: Transaction) => {
    const updated = [...transactions, transaction]
    setTransactions(updated)
    saveToStorage("transactions", updated)
  }

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...profile }
    setUserProfile(updated)
    saveToStorage("userProfile", updated)
  }

  const addCredits = (amount: number) => {
    const updated = { ...userProfile, credits: userProfile.credits + amount }
    setUserProfile(updated)
    saveToStorage("userProfile", updated)
  }

  const toggleFavorite = (itemId: string) => {
    const updated = favoriteItems.includes(itemId)
      ? favoriteItems.filter((id) => id !== itemId)
      : [...favoriteItems, itemId]
    setFavoriteItems(updated)
    saveToStorage("favoriteItems", updated)
  }

  const addSearchHistory = (query: string) => {
    if (query.trim()) {
      const updated = [query, ...searchHistory.filter((h) => h !== query)].slice(0, 10)
      setSearchHistory(updated)
      saveToStorage("searchHistory", updated)
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    saveToStorage("searchHistory", [])
  }

  const saveToStorage = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(`Error saving ${key}:`, error)
    }
  }

  const value: AppContextType = {
    borrowItems,
    addBorrowItem,
    updateItemStatus,
    transactions,
    addTransaction,
    userProfile,
    updateUserProfile,
    addCredits,
    favoriteItems,
    toggleFavorite,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
