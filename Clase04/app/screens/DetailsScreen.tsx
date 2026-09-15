import { Button, Card, Text } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import sharedStyles from "../styles/sharedStyles";

export default function DetailsScreen({ route, navigation }: any) {
  const { item } = route.params || {};

  return (
    <ScreenWrapper title="Detalle del Item">
      {item ? (
        <Card style={sharedStyles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              {" "}
              {item.title}{" "}
            </Text>
            <Text variant="bodyMedium"> {item.description} </Text>
            <Text variant="bodySmall"> Id: {item.id} </Text>
          </Card.Content>
        </Card>
      ) : (
        <Text> Huh? No info? -o=? </Text>
      )}

      <Button
        style={sharedStyles.botonBody}
        mode="contained-tonal"
        onPress={() => navigation.goBack()}
      >
        <Text style={sharedStyles.botonText}>Atrás</Text>
      </Button>
    </ScreenWrapper>
  );
}