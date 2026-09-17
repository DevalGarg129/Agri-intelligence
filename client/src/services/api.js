import * as FileSystem from "expo-file-system/legacy";

const API_BASE_URL = "http://172.23.125.126:5000";

export const predictCropDisease = async (image) => {
  if (!image?.uri) {
    throw new Error("No image selected for prediction");
  }

  const fileName =
    image.fileName || image.name || "crop-image.jpeg";

  const mimeType = image.mimeType || "image/jpeg";
  const extension = fileName.includes(".")
    ? fileName.slice(fileName.lastIndexOf("."))
    : ".jpeg";
  const cachedUri = `${FileSystem.cacheDirectory}agri-upload-${Date.now()}${extension}`;

  let result;

  try {
    await FileSystem.copyAsync({
      from: image.uri,
      to: cachedUri,
    });

    const fileInfo = await FileSystem.getInfoAsync(cachedUri);

    if (!fileInfo.exists || !fileInfo.size) {
      throw new Error("Selected image could not be read from the device");
    }

    result = await FileSystem.uploadAsync(
      `${API_BASE_URL}/api/predictions`,
      cachedUri,
      {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
        mimeType,
        headers: { Accept: "application/json" },
      }
    );
  } catch (error) {
    console.error("Image upload failed:", error);

    throw new Error(
      "Upload failed. Check that your phone and laptop are on the same Wi-Fi and the backend is running."
    );
  } finally {
    await FileSystem.deleteAsync(cachedUri, { idempotent: true });
  }

  console.log("API status:", result.status);
  console.log("API response:", result.body);

  let data;

  try {
    data = JSON.parse(result.body);
  } catch {
    throw new Error(
      `Backend returned non-JSON (HTTP ${result.status}).`
    );
  }

  if (result.status < 200 || result.status >= 300 || data.success === false) {
    throw new Error(
      data.message || data.detail || "Prediction failed"
    );
  }

  return data;
};