"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"

export default function ItemDetailsScreen({ route, navigation }: any) {
  const { item } = route.params
  const [quantity, setQuantity] = useState(1)
  const [isRenting, setIsRenting] = useState(false)

  const handleRent = () => {
    setIsRenting(true)
    Alert.alert("Rental Request Sent", `Your request to rent "${item.title}" has been submitted to ${item.owner}`, [
      {
        text: "OK",
        onPress: () => {
          setIsRenting(false)
          navigation.goBack()
        },
      },
    ])
  }

  const handleContactOwner = () => {
    Alert.alert("Contact Owner", `Opening chat with ${item.owner}...`, [{ text: "OK" }])
  }

  const handleCameraReport = () => {
    navigation.navigate("CameraCondition", { itemName: item.title })
  }

  const handleMapLocation = () => {
    navigation.navigate("GPSMap")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageSection}>
        <Text style={styles.largeImage}>{item.image}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.ratingSection}>
          <Text style={styles.rating}>⭐ {item.rating} rating</Text>
          <Text style={styles.reviews}>(128 reviews)</Text>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Rental Price</Text>
          <Text style={styles.price}>
            ₱{item.price}
            <Text style={styles.priceUnit}>/day</Text>
          </Text>
        </View>

        <View style={styles.ownerSection}>
          <Text style={styles.ownerLabel}>Owner</Text>
          <View style={styles.ownerInfo}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.avatarText}>{item.owner.charAt(0)}</Text>
            </View>
            <View style={styles.ownerDetails}>
              <Text style={styles.ownerName}>{item.owner}</Text>
              <Text style={styles.ownerStatus}>Verified Member</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Item Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{item.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, { color: item.status === "available" ? "#10B981" : "#FFD700" }]}>
              {item.status === "available" ? "✓ Available" : "⏳ Pending"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Condition:</Text>
            <Text style={styles.detailValue}>Excellent</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            This item is in excellent condition and ready for rental. The owner has verified the item quality and
            ensures safe delivery.
          </Text>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Rental Duration</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity} day(s)</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Cost</Text>
          <Text style={styles.totalPrice}>₱{item.price * quantity}</Text>
        </View>

        <View style={styles.featureButtonsSection}>
          <TouchableOpacity style={styles.featureButton} onPress={handleCameraReport}>
            <Text style={styles.featureButtonIcon}>📷</Text>
            <Text style={styles.featureButtonText}>Condition Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={handleMapLocation}>
            <Text style={styles.featureButtonIcon}>📍</Text>
            <Text style={styles.featureButtonText}>Meet Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("BarcodeScanner")}>
            <Text style={styles.featureButtonIcon}>📱</Text>
            <Text style={styles.featureButtonText}>Scan QR/Barcode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactOwner}>
          <Text style={styles.contactButtonText}>💬 Contact Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rentButton, isRenting && styles.rentButtonDisabled]}
          onPress={handleRent}
          disabled={isRenting || item.status !== "available"}
        >
          <Text style={styles.rentButtonText}>{isRenting ? "Processing..." : "🛒 Request to Rent"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageSection: {
    backgroundColor: "#f0f0f0",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  largeImage: {
    fontSize: 100,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rating: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "600",
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: "#999",
  },
  priceSection: {
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  priceUnit: {
    fontSize: 16,
    fontWeight: "normal",
  },
  ownerSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  ownerLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6A0DAD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  ownerStatus: {
    fontSize: 12,
    color: "#10B981",
    marginTop: 2,
  },
  detailsSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: "#999",
  },
  detailValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  descriptionSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  quantitySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  totalSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  buttonSection: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  contactButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6A0DAD",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  contactButtonText: {
    color: "#6A0DAD",
    fontSize: 14,
    fontWeight: "600",
  },
  rentButton: {
    flex: 1.5,
    backgroundColor: "#6A0DAD",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  rentButtonDisabled: {
    opacity: 0.5,
  },
  rentButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  featureButtonsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    flexWrap: "wrap",
  },
  featureButton: {
    flex: 1,
    minWidth: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  featureButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureButtonText: {
    fontSize: 11,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
})
