"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"

interface UserProfile {
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

const MOCK_USER: UserProfile = {
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

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile>(MOCK_USER)
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => Alert.alert("Logged out", "You have been logged out"),
      },
    ])
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.profilePictureContainer}>
          <Text style={styles.profilePictureText}>{user.name.charAt(0)}</Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.courseInfo}>{user.course}</Text>
        <Text style={styles.yearInfo}>{user.yearLevel}</Text>

        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButtonText}>{isEditing ? "✓ Done" : "✏️ Edit Profile"}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
          <Text style={styles.statIcon}>⭐</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.credits}</Text>
          <Text style={styles.statLabel}>Credits</Text>
          <Text style={styles.statIcon}>💳</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.itemsBorrowed}</Text>
          <Text style={styles.statLabel}>Borrowed</Text>
          <Text style={styles.statIcon}>📥</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.itemsLent}</Text>
          <Text style={styles.statLabel}>Lent</Text>
          <Text style={styles.statIcon}>📤</Text>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>{user.memberSince}</Text>
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>

        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.reviewBox}>
            <View style={styles.reviewerInfo}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerAvatarText}>👤</Text>
              </View>
              <View style={styles.reviewerDetails}>
                <Text style={styles.reviewerName}>{index === 0 ? "Alex" : index === 1 ? "Maria" : "Carlos"}</Text>
                <Text style={styles.reviewRating}>⭐ {4.5 + index * 0.2}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              {index === 0
                ? "Great communication and item was in perfect condition!"
                : index === 1
                  ? "Very reliable and trustworthy seller"
                  : "Returned on time, highly recommended!"}
            </Text>
          </View>
        ))}
      </View>

      {/* Settings & Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>🔒 Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>🔔 Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>💬 Support & Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>📋 Terms & Privacy</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>🚪 Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>BorrowBox USTP v1.0.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerSection: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 30,
    paddingHorizontal: 16,
    paddingTop: 40,
    alignItems: "center",
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profilePictureText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  courseInfo: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 2,
  },
  yearInfo: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 10,
  },
  statItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginTop: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  reviewBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  reviewerAvatarText: {
    fontSize: 20,
  },
  reviewerDetails: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  reviewRating: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 2,
  },
  reviewText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  settingButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
})
