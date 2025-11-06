"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const MOCK_BORROW_ITEMS = [
  {
    id: "1",
    title: "Laptop - Dell XPS 13",
    category: "Electronics",
    price: 50,
    image: "💻",
    owner: "John Doe",
    available: 3,
  },
  {
    id: "2",
    title: "Textbook - Physics 101",
    category: "Books",
    price: 10,
    image: "📚",
    owner: "Jane Smith",
    available: 5,
  },
  {
    id: "3",
    title: "Camera - Canon EOS",
    category: "Electronics",
    price: 100,
    image: "📷",
    owner: "Mike Johnson",
    available: 2,
  },
  {
    id: "4",
    title: "Project Kit - Arduino",
    category: "Electronics",
    price: 30,
    image: "⚙️",
    owner: "Sarah Lee",
    available: 4,
  },
]

interface BorrowItem {
  id: string
  title: string
  category: string
  price: number
  image: string
  owner: string
  available: number
}

export default function BorrowScreen() {
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [items, setItems] = useState<BorrowItem[]>(MOCK_BORROW_ITEMS)

  const categories = ["All", "Electronics", "Books", "Sports", "Tools"]

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderItem = ({ item }: { item: BorrowItem }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemCardLeft}>
        <Text style={styles.itemImage}>{item.image}</Text>
      </View>
      <View style={styles.itemCardRight}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.price}>₱{item.price}/day</Text>
          <Text style={styles.available}>{item.available} available</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.borrowButton}>
        <Text style={styles.borrowButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Items</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items to borrow..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.filterButton, selectedCategory === cat && styles.filterButtonActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.listSection}>
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
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
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterButtonActive: {
    backgroundColor: "#6A0DAD",
    borderColor: "#6A0DAD",
  },
  filterText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
  },
  listSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  itemCard: {
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
  itemCardLeft: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemImage: {
    fontSize: 32,
  },
  itemCardRight: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6A0DAD",
  },
  available: {
    fontSize: 12,
    color: "#10B981",
  },
  borrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6A0DAD",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  borrowButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})
