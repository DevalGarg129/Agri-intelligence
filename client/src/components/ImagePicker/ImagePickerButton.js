import { Alert, Pressable, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerButton({ onImageSelected }) {
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permission.granted){
            Alert.alert("Permission Required", "Please allow access to the Photos.")
            return;
        }
    

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.0
        });

        if(!result.canceled){
            onImageSelected(result.assets[0])
        }
    };

    return (
        <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.Text}>
                Choose From gallery
            </Text>
        </Pressable>
    )
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 12,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});