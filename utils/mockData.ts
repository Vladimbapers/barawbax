export const MOCK_CATEGORIES = ["All", "Electronics", "Books", "Sports", "Tools", "Other"]

export const MOCK_STATUS_COLORS: { [key: string]: string } = {
  active: "#10B981",
  completed: "#0EA5E9",
  pending: "#FFD700",
  overdue: "#EF4444",
}

export const MOCK_STATUS_ICONS: { [key: string]: string } = {
  active: "▶️",
  completed: "✓",
  pending: "⏳",
  overdue: "⚠️",
}

export const CAMPUS_LOCATIONS = [
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

export const NOTIFICATION_TEMPLATES = {
  rentalReminder: (itemName: string, daysLeft: number) =>
    `Your rental of "${itemName}" expires in ${daysLeft} day(s). Return before overdue.`,

  newLendRequest: (userName: string, itemName: string) => `${userName} requested to borrow your ${itemName}`,

  creditsEarned: (amount: number) => `You earned ${amount} credits from lending!`,

  itemReturned: (itemName: string, creditsEarned: number) =>
    `${itemName} was returned successfully. ${creditsEarned} credits added to your account.`,
}
