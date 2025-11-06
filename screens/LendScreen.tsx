"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native"

interface LendForm {
  itemName: string
  category: string
  price: string
  description: string
}

export default function LendScreen() {
  const [form, setForm] = useState<LendForm>({
    itemName: "",
    category: "Electronics",
    price: "",
    description: "",
  })

  const [myItems, setMyItems] = useState([
    { id: "1", name: "Projector", price: 200, category: "Electronics" },
    { id: "2", name: "Portable Speaker", price: 75, category: "Electronics" },
  ])

  const categories = ["Electronics", "Books", "Sports", "Tools", "Other"]

  const handleAddItem = () => {
    if (!form.itemName || !form.price) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const newItem = {
      id: Date.now().toString(),
      name: form.itemName,
      price: Number.parseFloat(form.price),
      category: form.category,
    }

    setMyItems([...myItems, newItem])
    setForm({ itemName: "", category: "Electronics", price: "", description: "" })
    Alert.alert("Success", "Item added to your lending list!")
  }

  const handleRemoveItem = (id: string) => {
    setMyItems(myItems.filter((item) => item.id !== id))
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Lend Your Items</Text>
        <Text style={styles.subtitle}>Earn credits by lending</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Add New Item</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Gaming Laptop"
            value={form.itemName}
            onChangeText={(text) => setForm({ ...form, itemName: text })}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryPicker}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryOption, form.category === cat && styles.categoryOptionActive]}
                onPress={() => setForm({ ...form, category: cat })}
              >
                <Text style={[styles.categoryOptionText, form.category === cat && styles.categoryOptionTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Daily Rental Price (₱)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 250"
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the condition and features..."
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>+ Add Item to Lend</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.myItemsSection}>
        <Text style={styles.sectionTitle}>My Items for Lending</Text>
        {myItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📦</Text>
            <Text style={styles.emptyStateText}>No items yet</Text>
            <Text style={styles.emptyStateSubtext}>Add items to start earning credits</Text>
          </View>
        ) : (
          myItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>₱{item.price}/day</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 How it works</Text>
        <Text style={styles.infoText}>
          1. Add items you want to lend{"\n"}
          2. Set your daily rental price{"\n"}
          3. When someone borrows, you earn credits{"\n"}
          4. Build your reputation and unlock rewards
        </Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Items Lent</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>850</Text>
          <Text style={styles.statLabel}>Credits Earned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  formSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  categoryPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryOptionActive: {
    backgroundColor: "#6A0DAD",
    borderColor: "#6A0DAD",
  },
  categoryOptionText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  categoryOptionTextActive: {
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  myItemsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: "#999",
  },
  itemRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6A0DAD",
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  infoBox: {
    backgroundColor: "#6A0DAD",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 30,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },
})
