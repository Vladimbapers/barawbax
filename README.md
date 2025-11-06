# BorrowBox USTP - React Native Mobile App

A modern borrowing and lending platform for USTP (Universiti Sains Dan Teknologi Petronast) students and faculty built with React Native and Expo.

## Features

### Core Features
- Browse and search available items
- Borrow items from other users
- Lend your items to earn credits
- Track transactions and rental history
- User profile management with ratings
- Category-based filtering
- Real-time item availability

### Advanced Features
- **Camera Integration**: Capture item condition reports before/after rental
- **GPS Location**: Find campus meet-up points
- **Barcode Scanner**: Quick item check-in/out using QR/Barcodes
- **Notifications**: Reminders for overdue rentals
- **Local Storage**: Persistent user data with AsyncStorage

### Design Features
- Purple gradient color scheme (#6A0DAD primary)
- Responsive design for mobile and web
- Smooth animations and transitions
- Accessible UI components
- Status-based color coding (green/yellow/red)

## Tech Stack

- **Framework**: React Native 0.72.4
- **Bundler**: Expo CLI 54.0.4
- **Navigation**: React Navigation v6
- **State Management**: React Context + AsyncStorage
- **UI Components**: React Native components
- **APIs**: Expo Camera, Location, Barcode Scanner

## Project Structure

\`\`\`
borrowbox-ustp/
├── App.tsx                 # Main app entry
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── screens/               # Screen components
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── BorrowScreen.tsx
│   ├── LendScreen.tsx
│   ├── TransactionsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── ItemDetailsScreen.tsx
│   ├── CameraConditionScreen.tsx
│   ├── GPSMapScreen.tsx
│   └── BarcodeScanScreen.tsx
├── context/               # State management
│   └── AppContext.tsx
├── utils/                 # Utilities & mock data
│   └── mockData.ts
└── assets/               # Images and icons
\`\`\`

## Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for mobile testing)

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd borrowbox-ustp
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npx expo start
\`\`\`

### Running the App

**On Mobile (Expo Go)**
\`\`\`bash
# After running 'npx expo start', scan the QR code with Expo Go app
# Available on iOS App Store and Google Play Store
\`\`\`

**On Web**
\`\`\`bash
# From the Expo terminal, press 'w' to open web version
# Or run:
npx expo start --web
\`\`\`

**On iOS Simulator**
\`\`\`bash
npx expo start --ios
\`\`\`

**On Android Emulator**
\`\`\`bash
npx expo start --android
\`\`\`

## Features Demo

### Onboarding Flow
- 3-step gradient introduction
- Skip or progress through screens
- Smooth transitions

### Home Screen
- Grid layout of available items
- Search functionality
- Category filters
- Quick item preview with ratings

### Item Details
- Full item information
- Owner details with verification badge
- Rental price and duration selector
- Contact owner messaging
- Condition report camera
- Campus location selector
- Barcode scanner for check-in

### Borrow Screen
- Browse all available items
- Search and filter options
- Item cards with owner info
- Quick rental request

### Lend Screen
- Add items to lending list
- Set rental prices
- Manage active lendings
- View lending stats

### Transactions
- Filter by status (active, pending, completed, overdue)
- Color-coded status indicators
- Transaction details and timeline
- Easy tracking of all activity

### Profile
- User information display
- Stats dashboard (rating, credits, borrowed/lent items)
- Recent reviews
- Settings and preferences
- Logout functionality

## API Endpoints (Mocked)

All data is currently mocked using React Context and stored locally. Future versions will integrate with a backend API.

## Colors & Design System

- **Primary**: #6A0DAD (Purple)
- **Gradient**: #B24BF3 to #D4A5FF (Pink-Lavender)
- **Success**: #10B981 (Emerald Green)
- **Warning**: #FFD700 (Yellow)
- **Error**: #EF4444 (Red)
- **Neutral**: #f5f5f5 (Soft Gray)

## Permissions

The app requests the following permissions:
- **Camera**: For condition reports and barcode scanning
- **Location**: For campus location detection
- **Photo Library**: For image selection (optional)

## Error Handling

- Permission denial handling
- Graceful fallbacks for unavailable features
- User-friendly error messages
- Alert dialogs for important actions

## Known Limitations

- No real backend integration (all data is local)
- Barcode and QR code data is not persisted
- GPS location is simulated
- Photos are stored locally only

## Future Enhancements

- Backend API integration
- Real-time messaging
- Payment integration
- Advanced recommendation algorithm
- Social features (ratings, reviews)
- Push notifications (actual)
- Item image gallery uploads
- Dispute resolution system

## Troubleshooting

### App won't run
- Clear cache: `expo start -c`
- Rebuild: `expo prebuild`

### Camera not working
- Check permissions in device settings
- Ensure camera access is granted to Expo Go

### GPS not working on web
- GPS is simulated on web
- Use physical device for real GPS

### Performance issues
- Reduce item count in mock data
- Clear AsyncStorage: Delete app and reinstall

## Contributing

For bug reports and feature requests, please open an issue.

## License

MIT License - Feel free to use this for your mobile programming subject.

## Support

For questions about the app, reach out to your instructor or check the app documentation.

---

**Built for USTP Mobile Programming Subject**
Version 1.0.0
