"use client"

import { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native"
import { Camera, CameraView } from "expo-camera"

interface CameraConditionScreenProps {
  navigation: any
  route: any
}

export default function CameraConditionScreen({ navigation, route }: CameraConditionScreenProps) {
  const { itemName } = route.params || { itemName: "Item" }
  const [permission, setPermission] = useState<boolean | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const cameraRef = useRef<CameraView>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setPermission(status === "granted")
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        })
        if (photo) {
          setPhotos([...photos, photo.uri])
          Alert.alert("Success", "Photo saved for condition report!")
        }
      } catch (error) {
        Alert.alert("Error", "Failed to take photo")
      }
    }
  }

  const handleSubmit = () => {
    Alert.alert("Condition Report Submitted", `${photos.length} photos attached for ${itemName}`, [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ])
  }

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    )
  }

  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required. Please enable it in settings.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing="back">
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Capture item condition</Text>
        </View>
      </CameraView>

      <View style={styles.controlsSection}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.captureText}>📸 Take Photo</Text>
        </TouchableOpacity>
      </View>

      {photos.length > 0 && (
        <View style={styles.photosSection}>
          <Text style={styles.photosTitle}>Photos ({photos.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoPreview}>
                <Image source={{ uri: photo }} style={styles.photoImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setPhotos(photos.filter((_, i) => i !== index))}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>✓ Submit Report</Text>
          </TouchableOpacity>
        </View>
      )}
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
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  overlayText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  controlsSection: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  captureText: {
    color: "#6A0DAD",
    fontSize: 16,
    fontWeight: "600",
  },
  photosSection: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 16,
    paddingHorizontal: 16,
    maxHeight: 180,
  },
  photosTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  photoPreview: {
    position: "relative",
    marginRight: 8,
  },
  photoImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#6A0DAD",
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
})
