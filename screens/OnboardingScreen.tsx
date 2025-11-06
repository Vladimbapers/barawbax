"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

interface OnboardingScreenProps {
  onComplete: () => void
}

const SCREENS = [
  {
    title: "Welcome to BorrowBox",
    subtitle: "Share and borrow items from your campus community",
    description: "Connect with USTP students and faculty to share resources",
    gradient: ["#6A0DAD", "#B24BF3"],
  },
  {
    title: "Browse & Borrow",
    subtitle: "Find items you need",
    description: "Browse available items from trusted members",
    gradient: ["#B24BF3", "#D4A5FF"],
  },
  {
    title: "Lend & Earn",
    subtitle: "Share what you have",
    description: "Earn USTP credits by lending your items",
    gradient: ["#D4A5FF", "#6A0DAD"],
  },
]

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  const handleNext = () => {
    if (currentScreen < SCREENS.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const current = SCREENS[currentScreen]

  return (
    <LinearGradient colors={current.gradient} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>{currentScreen === 0 ? "📦" : currentScreen === 1 ? "🔍" : "💳"}</Text>
        </View>

        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>
        <Text style={styles.description}>{current.description}</Text>

        <View style={styles.dots}>
          {SCREENS.map((_, index) => (
            <View key={index} style={[styles.dot, { opacity: index === currentScreen ? 1 : 0.5 }]} />
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>{currentScreen === SCREENS.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  illustrationText: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 40,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    color: "#6A0DAD",
    fontSize: 16,
    fontWeight: "600",
  },
})
