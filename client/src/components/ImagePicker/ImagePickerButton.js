import { Alert, Pressable, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/ImagePickerButton.styles";

export default function ImagePickerButton({ onImageSelected = () => {} }) {
  const pickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow access to your photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        onImageSelected(result.assets[0]);
      }
    } catch (error) {
      console.error("Gallery Picker Error:", error);
      Alert.alert("Error", "Could not select an image.");
    }
  };

  const captureFromCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Camera Permission Required",
          "Please allow camera access to take a photo."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        onImageSelected(result.assets[0]);
      }
    } catch (error) {
      console.error("Camera Error:", error);
      Alert.alert("Error", "Could not open the camera.");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.galleryButton} onPress={pickFromGallery}>
        <Text style={styles.buttonText}>Choose from gallery</Text>
      </Pressable>

      <Pressable style={styles.cameraButton} onPress={captureFromCamera}>
        <Text style={styles.buttonText}>Analyze from camera</Text>
      </Pressable>
    </View>
  );
}