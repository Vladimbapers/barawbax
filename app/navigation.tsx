"use client"

import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text } from "react-native"
import { useAuth } from "../context/AuthContext"

// Screens
import OnboardingScreen from "../screens/OnboardingScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import HomeScreen from "../screens/HomeScreen"
import BorrowScreen from "../screens/BorrowScreen"
import LendScreen from "../screens/LendScreen"
import TransactionsScreen from "../screens/TransactionsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ItemDetailsScreen from "../screens/ItemDetailsScreen"
import CameraConditionScreen from "../screens/CameraConditionScreen"
import GPSMapScreen from "../screens/GPSMapScreen"
import BarcodeScanScreen from "../screens/BarcodeScanner"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#6A0DAD" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="HomeList" component={HomeScreen} options={{ headerTitle: "BorrowBox" }} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ headerTitle: "Item Details" }} />
      <Stack.Screen
        name="CameraCondition"
        component={CameraConditionScreen}
        options={{ headerTitle: "Condition Report" }}
      />
      <Stack.Screen name="GPSMap" component={GPSMapScreen} options={{ headerTitle: "Campus Locations" }} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanScreen} options={{ headerTitle: "Scan Items" }} />
    </Stack.Navigator>
  )
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#6A0DAD",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopColor: "#ddd",
          borderTopWidth: 1,
        },
        tabBarLabel: route.name === "HomeStack" ? "Home" : route.name,
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Borrow"
        component={BorrowScreen}
        options={{
          tabBarLabel: "Borrow",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📥</Text>,
        }}
      />
      <Tab.Screen
        name="Lend"
        component={LendScreen}
        options={{
          tabBarLabel: "Lend",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📤</Text>,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📋</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  )
}

export function AuthFlow() {
  const [showOnboarding, setShowOnboarding] = React.useState(true)
  const [showRegister, setShowRegister] = React.useState(false)

  return (
    <>
      {showOnboarding ? (
        <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
      ) : showRegister ? (
        <RegisterScreen onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginScreen onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </>
  )
}

export function RootNavigator() {
  const { user, isLoading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={() => (
              <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>Loading...</Text>
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      {user ? (
        <BottomTabNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthFlow} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
