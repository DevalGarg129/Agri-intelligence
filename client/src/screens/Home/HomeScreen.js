import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import ImagePickerButton from "../../components/ImagePicker/ImagePickerButton";
import { predictCropDisease } from "../../services/api";
import styles from "../../styles/HomeScreen.styles";

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleImageSelected = (image) => {
    setSelectedImage(image);
    setPrediction(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert("Select an Image", "Choose an image or take a photo first.");
      return;
    }

    try {
      setLoading(true);
      setPrediction(null);

      const result = await predictCropDisease(selectedImage);
      console.log("Prediction result:", result);

      setPrediction(result.prediction);
    } catch (error) {
      console.error("Prediction failed:", error);
      Alert.alert(
        "Prediction Failed",
        error.message || "Could not analyze the image."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDiseaseName = (className = "") =>
    className.replace(/___/g, " — ").replace(/_/g, " ");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Agri Intelligence</Text>

      <Text style={styles.subtitle}>
        Detect Crop Diseases Using AI
      </Text>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.preview}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Choose a crop image or take a photo
            </Text>
          </View>
        )}
      </View>

      <View style={styles.pickerContainer}>
        <ImagePickerButton onImageSelected={handleImageSelected} />
      </View>

      <Pressable
        style={[
          styles.analyzeButton,
          (!selectedImage || loading) && styles.disabledButton,
        ]}
        onPress={handleAnalyze}
        disabled={!selectedImage || loading}
      >
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.analyzeText}>Analyzing...</Text>
          </View>
        ) : (
          <Text style={styles.analyzeText}>Analyze Crop</Text>
        )}
      </Pressable>

      {prediction && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Analysis Result</Text>

          <Text style={styles.diseaseName}>
            {formatDiseaseName(prediction.class_name)}
          </Text>

          <Text style={styles.confidenceLabel}>Model confidence</Text>
          <Text style={styles.confidenceValue}>
            {(prediction.confidence * 100).toFixed(2)}%
          </Text>

          <Text style={styles.note}>
            This is an AI model prediction, not a confirmed diagnosis.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
