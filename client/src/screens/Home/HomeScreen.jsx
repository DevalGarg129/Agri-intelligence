import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import ImagePickerButton from "../../components/ImagePicker/ImagePickerButton";

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Agri Intelligence
            </Text>

            <Text style={styles.subtitle}>
                Detect Crop Diseases Using AI
            </Text>

            {selectedImage && (
                <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.preview}
                />
            )}

            <ImagePickerButton
                onImageSelected={(image) => {
                    setSelectedImage(image);
                }}
            />

            {selectedImage && (
                <Pressable style={styles.analyzeButton}>
                    <Text style={styles.analyzeText}>
                        Analyze Crop
                    </Text>
                </Pressable>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },

  preview: {
    width: 280,
    height: 210,
    borderRadius: 15,
    marginBottom: 15,
  },

  analyzeButton: {
    backgroundColor: "#1B5E20",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 15,
  },

  analyzeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
