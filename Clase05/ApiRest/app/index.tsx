import { useTheme } from "@/context/ThemeContext";
import { useGetCampaigns } from "@/hooks/useGetCampaigns";
import { useLoadDB } from "@/hooks/useLoadDB";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { loading, errorGet, campaigns, getCampaigns } = useGetCampaigns();
  const { loadCampaigns } = useLoadDB(); //Captura el error pero no lo uso por ahora
  const { theme, colors, toggleTheme } = useTheme();

  const renderContent = () => {
    if (errorGet) {
      return (
        <View style={[styles.centered, { backgroundColor: colors.background }]}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            No se pudo conectar: {errorGet}
          </Text>
          <Button title="Reintentar" onPress={getCampaigns} />
        </View>
      );
    } else if (loading && campaigns.length === 0) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#5d5da3" />
        </View>
      );
    } else {
      return (
        <FlatList
          style={{ height: "80%" }}
          data={campaigns}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={stylesCard.userItem}>
              <Text style={[stylesCard.userName, { color: colors.textPrimary }]}> {item.name} </Text>
              <Text style={[stylesCard.userEmail, { color: colors.textSecondary }]}> {item.description} </Text>
            </View>
          )}
          refreshing={loading}
          onRefresh={getCampaigns}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text> No hay nada para mostrar </Text>
              <Button title="Cargar" onPress={loadCampaigns} />
            </View>
          }
        ></FlatList>
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "bottom", "left", "right"]}
    >
      <View
        style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Lista de campañas</Text>
          </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={toggleTheme}
          >
            <Text style={styles.themeButtonText}>{theme === "light" ? "🌙" : "☀️"}</Text>
          </TouchableOpacity>
          </View>
        
      </View>
      {renderContent()}
    </SafeAreaView>
  );
}

//
const styles = StyleSheet.create({
  // Solo estructura: los colores se aplican arriba con useTheme().
  container: { flex: 1 },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 22, fontWeight: "bold" },
  renderText: { fontSize: 12, fontStyle: "italic" },
  themeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  themeButtonText: { fontSize: 18 },
  addButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  addButtonText: { fontWeight: "600" },
  searchContainer: { padding: 10, borderBottomWidth: 1 },
  searchInput: { height: 40, borderRadius: 8, paddingHorizontal: 15 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: { marginBottom: 10, textAlign: "center" },
});

const stylesCard = StyleSheet.create({
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    marginTop: 4,
  },
});