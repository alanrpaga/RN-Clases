import { StyleSheet } from "react-native";

export const SPACING = 16;
export const RADIUS = 12;

const sharedStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f0f1f2" },
  content: {
    flex: 1,
    padding: SPACING,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING,
    color: "#1d1b20",
  },
  subtitle: {
    fontSize: 16,
    color: "#5d5b60",
  },
  card: {
    marginBottom: SPACING,
    borderRadius: RADIUS,
    elevation: 2,
    backgroundColor: "#fdfeff",
  },
  fab: {
    position: "absolute",
    margin: SPACING,
    right: 0,
    bottom: 0,
    backgroundColor: "#d0bcff",
  },
  botonBody: {
    marginBottom: SPACING,
    borderRadius: RADIUS,
    elevation: 2,
    backgroundColor: "#aabbff",
    width: "60%",
    alignSelf: "center",
  },
  botonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default sharedStyles;