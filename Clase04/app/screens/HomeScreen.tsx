import React, { useState } from "react";
import { Card, Text } from "react-native-paper";
import sharedStyles from "../styles/sharedStyles";
import ScreenWrapper from "../components/ScreenWrapper";
import { FlatList } from "react-native";

interface Item {
  id: number;
  title: string;
  description: string;
}

export default function HomeScreen({ navigation }: any) {
  const [items] = useState<Item[]>([
    { id: 1, title: "Tarea 1", description: "Encontrar el saxofón de Lisa" },
    { id: 2, title: "Tarea 2", description: "Programa de alfabetización" },
    {
      id: 3,
      title: "Tarea 3",
      description: "Conservación de nuestros bellos puentes cubiertos",
    },
    { id: 4, title: "Tarea 4", description: "Dominación del mundo" },
    { id: 5, title: "Nota mental", description: "La niña sabe demasiado" },
  ]);

  const renderItem = ({ item }: { item: Item }) => (
    <Card
      style={sharedStyles.card}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Card.Content>
        <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={{ fontWeight: "condensedBold" }}>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScreenWrapper title="Actividades de Homero">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </ScreenWrapper>
  );
}