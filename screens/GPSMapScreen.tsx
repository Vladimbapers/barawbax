"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native"
import * as Location from "expo-location"

interface CampusLocation {
  id: string
  name: string
  lat: number
  lng: number
  distance: string
  icon: string
  category: string
}

const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: "1",
    name: "Engineering Building",
    lat: 8.5236,
    lng: 124.6543,
    distance: "0.5 km",
    icon: "🏗️",
    category: "Academic",
  },
  {
    id: "2",
    name: "Library",
    lat: 8.5245,
    lng: 124.6548,
    distance: "0.3 km",
    icon: "📚",
    category: "Academic",
  },
  {
    id: "3",
    name: "Student Cafeteria",
    lat: 8.525,
    lng: 124.6538,
    distance: "0.2 km",
    icon: "🍽️",
    category: "Facility",
  },
  {
    id: "4",
    name: "Sports Complex",
    lat: 8.5255,
    lng: 124.6555,
    distance: "0.8 km",
    icon: "⚽",
    category: "Facility",
  },
  {
    id: "5",
    name: "Student Center",
    lat: 8.526,
    lng: 124.6552,
    distance: "1.0 km",
    icon: "🏢",
    category: "Facility",
  },
]

export default function GPSMapScreen({ navigation }: any) {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null)
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === "granted") {
        setPermissionGranted(true)
        const location = await Location.getCurrentPositionAsync({})
        setUserLocation(location)
      } else {
        Alert.alert("Permission Denied", "Location permission is required")
      }
    } catch (error) {
      console.log("Error requesting location:", error)
    }
  }

  const handleLocationSelect = (location: CampusLocation) => {
    Alert.alert(
      "Meeting Location",
      `Selected: ${location.name}\n\nDistance: ${location.distance}\n\nYou can arrange to meet here for the item exchange.`,
      [{ text: "OK" }],
    )
  }

  const renderLocationItem = ({ item }: { item: CampusLocation }) => (
    <TouchableOpacity style={styles.locationCard} onPress={() => handleLocationSelect(item)} activeOpacity={0.7}>
      <View style={styles.locationLeft}>
        <Text style={styles.locationIcon}>{item.icon}</Text>
      </View>
      <View style={styles.locationMiddle}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationCategory}>{item.category}</Text>
        <Text style={styles.locationDistance}>{item.distance} away</Text>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus Meet Points</Text>
        <Text style={styles.subtitle}>Choose a location to meet</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
        <Text style={styles.mapPlaceholderText}>Campus Map - USTP</Text>
        {permissionGranted && userLocation && (
          <Text style={styles.locationStatus}>
            📍 You are here: ({userLocation.coords.latitude.toFixed(4)}, {userLocation.coords.longitude.toFixed(4)})
          </Text>
        )}
      </View>

      <ScrollView style={styles.listSection} showsVerticalScrollIndicator={false}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Locations</Text>
          <Text style={styles.listCount}>{CAMPUS_LOCATIONS.length}</Text>
        </View>

        <FlatList
          data={CAMPUS_LOCATIONS}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  mapPlaceholder: {
    backgroundColor: "#e8e8e8",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  mapPlaceholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  locationStatus: {
    fontSize: 11,
    color: "#999",
    marginTop: 8,
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  listCount: {
    fontSize: 14,
    color: "#999",
  },
  locationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationLeft: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  locationIcon: {
    fontSize: 28,
  },
  locationMiddle: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  locationCategory: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 12,
    color: "#6A0DAD",
    fontWeight: "500",
  },
  arrowIcon: {
    fontSize: 18,
    color: "#999",
    marginLeft: 8,
  },
})
