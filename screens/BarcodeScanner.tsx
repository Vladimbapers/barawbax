"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Vibration } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"

export default function BarcodeScanScreen({ navigation, route }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [scannedCodes, setScannedCodes] = useState<string[]>([])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true)
    Vibration.vibrate(200)

    if (!scannedCodes.includes(data)) {
      setScannedCodes([...scannedCodes, data])
      Alert.alert("Item Scanned", `Barcode: ${data}`, [
        {
          text: "Scan Another",
          onPress: () => setScanned(false),
        },
        {
          text: "Finish",
          onPress: () => {
            Alert.alert("Check-in Complete", `${scannedCodes.length + 1} items scanned`, [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ])
          },
        },
      ])
    } else {
      Alert.alert("Already Scanned", "This item has already been scanned")
      setScanned(false)
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required for scanning</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.headerOverlay}>
          <Text style={styles.title}>Scan Item Barcode</Text>
        </View>

        <View style={styles.scanFrame}>
          <View style={styles.scanCorner} />
          <Text style={styles.scanText}>Place barcode in frame</Text>
        </View>

        <View style={styles.bottomOverlay}>
          {scannedCodes.length > 0 && (
            <View style={styles.scannedList}>
              <Text style={styles.scannedTitle}>Scanned Items: {scannedCodes.length}</Text>
              {scannedCodes.map((code, index) => (
                <Text key={index} style={styles.scannedItem}>
                  • {code}
                </Text>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>✕ Close Scanner</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 20,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#6A0DAD",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(106, 13, 173, 0.1)",
  },
  scanCorner: {
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#fff",
    position: "absolute",
    top: 10,
    left: 10,
  },
  scanText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
  },
  bottomOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  scannedList: {
    marginBottom: 12,
  },
  scannedTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  scannedItem: {
    color: "#6A0DAD",
    fontSize: 12,
    marginBottom: 4,
  },
  cancelButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
})
