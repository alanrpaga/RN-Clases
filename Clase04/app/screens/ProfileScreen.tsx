import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import sharedStyles from "../styles/sharedStyles";

function ProfileScreen() {
  return (
    <ScreenWrapper title="Perfil de Homero">
      <View style={styles.header}>
        <Avatar.Icon style={{backgroundColor: "#99bbff"}} size={80} icon="account" />
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
          Homero J. Simpson
        </Text>
      </View>

      <Card style={sharedStyles.card}>
        <Card.Content>
          <Text variant="bodyLarge">Rol: Vigilante Ciudadano</Text>
          <Text variant="bodyLarge">Objetivo: El Gato de Springfield</Text>
        </Card.Content>
      </Card>
    </ScreenWrapper>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  name: {
    marginTop: 12,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 8,
    color: "#49454f",
  },
});