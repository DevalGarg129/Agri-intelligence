import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B5E20",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#555555",
  },

  imageContainer: {
    width: "100%",
    alignItems: "center",
  },

  preview: {
    width: "100%",
    height: 230,
    borderRadius: 15,
    marginBottom: 15,
  },

  placeholder: {
    width: "100%",
    height: 230,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  placeholderText: {
    color: "#47734B",
    textAlign: "center",
    fontSize: 16,
  },

  pickerContainer: {
    width: "100%",
  },

  analyzeButton: {
    backgroundColor: "#1B5E20",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 15,
    minWidth: 190,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  analyzeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  resultContainer: {
    marginTop: 25,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    width: "100%",
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1B5E20",
  },

  diseaseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },

  confidenceLabel: {
    marginTop: 14,
    fontSize: 14,
    color: "#555555",
  },

  confidenceValue: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "700",
    color: "#1B5E20",
  },

  note: {
    marginTop: 14,
    fontSize: 12,
    color: "#555555",
    lineHeight: 18,
  },
});
