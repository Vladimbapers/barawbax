"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

interface Transaction {
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

const MOCK_TRANSACTIONS: Transaction[] = [
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
  {
    id: "4",
    type: "lend",
    itemName: "Portable Speaker",
    otherUser: "Sarah Lee",
    price: 75,
    startDate: "2024-01-15",
    endDate: "2024-01-18",
    status: "pending",
    image: "🔊",
  },
]

const getStatusColor = (status: string): string => {
  switch (status) {
    case "active":
      return "#10B981"
    case "completed":
      return "#0EA5E9"
    case "pending":
      return "#FFD700"
    case "overdue":
      return "#EF4444"
    default:
      return "#999"
  }
}

const getStatusIcon = (status: string): string => {
  switch (status) {
    case "active":
      return "▶️"
    case "completed":
      return "✓"
    case "pending":
      return "⏳"
    case "overdue":
      return "⚠️"
    default:
      return "•"
  }
}

export default function TransactionsScreen() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const statuses = ["all", "active", "completed", "pending", "overdue"]

  const filteredTransactions =
    selectedStatus === "all" ? MOCK_TRANSACTIONS : MOCK_TRANSACTIONS.filter((t) => t.status === selectedStatus)

  const renderTransactionCard = (transaction: Transaction) => (
    <TouchableOpacity key={transaction.id} style={styles.transactionCard} activeOpacity={0.7}>
      <View style={styles.cardLeft}>
        <Text style={styles.itemImage}>{transaction.image}</Text>
      </View>

      <View style={styles.cardMiddle}>
        <View style={styles.header}>
          <Text style={styles.itemName}>{transaction.itemName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) }]}>
            <Text style={styles.statusIcon}>{getStatusIcon(transaction.status)}</Text>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>

        <Text style={styles.userName}>
          {transaction.type === "borrow" ? "📥 from" : "📤 to"} {transaction.otherUser}
        </Text>

        <Text style={styles.dateRange}>
          {transaction.startDate} to {transaction.endDate}
        </Text>
      </View>

      <View style={styles.cardRight}>
        <Text style={styles.price}>₱{transaction.price}</Text>
        <Text style={styles.priceLabel}>{transaction.type === "borrow" ? "cost" : "earn"}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Track your activity</Text>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterButton, selectedStatus === status && styles.filterButtonActive]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[styles.filterText, selectedStatus === status && styles.filterTextActive]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.listSection}>
        {filteredTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No transactions</Text>
          </View>
        ) : (
          filteredTransactions.map(renderTransactionCard)
        )}
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
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 13,
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
  },
  listSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemImage: {
    fontSize: 28,
  },
  cardMiddle: {
    flex: 1,
  },
  header: {
    marginBottom: 6,
  },
  itemName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 4,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  userName: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 11,
    color: "#CCC",
  },
  cardRight: {
    marginLeft: 12,
    alignItems: "flex-end",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 11,
    color: "#999",
  },
  emptyState: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },
})
