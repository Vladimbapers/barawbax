"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const MOCK_ITEMS = [
  {
    id: "1",
    title: "Laptop - Dell XPS 13",
    price: 50,
    category: "Electronics",
    status: "available",
    image: "💻",
    rating: 4.8,
    owner: "John Doe",
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
  },
]

const CATEGORIES = ["All", "Electronics", "Books", "Sports", "Tools"]

interface Item {
  id: string
  title: string
  price: number
  category: string
  status: string
  image: string
  rating: number
  owner: string
}

export default function HomeScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS)

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderItemCard = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate("ItemDetails", { item })}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.itemImage}>{item.image}</Text>
        {item.status !== "available" && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status === "pending" ? "⏳" : "❌"}</Text>
          </View>
        )}
      </View>
      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.priceRatingRow}>
        <Text style={styles.price}>₱{item.price}/day</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
      <Text style={styles.owner}>{item.owner}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BorrowBox</Text>
        <Text style={styles.headerSubtitle}>Find what you need</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.itemsContainer}>
          <FlatList
            data={filteredItems}
            renderItem={renderItemCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
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
  categoriesSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryButtonActive: {
    backgroundColor: "#6A0DAD",
    borderColor: "#6A0DAD",
  },
  categoryText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
  },
  itemsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  listContent: {
    paddingTop: 8,
  },
  row: {
    justifyContent: "space-between",
  },
  itemCard: {
    width: (width - 40) / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 8,
    position: "relative",
  },
  itemImage: {
    fontSize: 48,
  },
  statusBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FFD700",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  priceRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6A0DAD",
  },
  rating: {
    fontSize: 12,
    color: "#FF6B6B",
  },
  owner: {
    fontSize: 11,
    color: "#999",
  },
})
