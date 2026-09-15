import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import sharedStyles from "../styles/sharedStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={sharedStyles.screen}>
      <View style={sharedStyles.content}>
        <Text style={sharedStyles.title}>Mi aplicación</Text>
        <Text style={sharedStyles.subtitle}>Lista para explotar</Text>
      </View>
    </SafeAreaView>
  );
}