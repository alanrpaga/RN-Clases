import { useGetCampaigns } from "@/hooks/useGetCampaigns";
import { useLoadDB } from "@/hooks/useLoadDB";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { loading, errorGet, campaigns, getCampaigns } = useGetCampaigns();
  const { loadCampaigns } = useLoadDB(); //Captura el error pero no lo uso por ahora

  const renderContent = () => {
    if (errorGet) {
      return (
        <View>
          <Text>No se pudo conectar: {errorGet}</Text>
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
            <View style={styles.userItem}>
              <Text style={styles.userName}> {item.name} </Text>
              <Text style={styles.userEmail}> {item.description} </Text>
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
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.header}>
        <Text style={styles.title}> Lista de campañas </Text>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

//Me los tomo prestados por un rato
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formToggle: {
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "rgb(207, 107, 107)",
    marginBottom: 10,
    textAlign: "center",
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#666",
    marginTop: 4,
  },
});