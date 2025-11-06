"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import * as Notifications from "expo-notifications"
import { AppProvider } from "./context/AppContext"
import { AuthProvider } from "./context/AuthContext"
import { RootNavigator } from "./app/navigation"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <RootNavigator />
        <StatusBar barStyle="light-content" />
      </AppProvider>
    </AuthProvider>
  )
}
