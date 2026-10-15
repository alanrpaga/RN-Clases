import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#9EA5A5" },
          headerTintColor: "#ffffff",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Menu"}} />
        <Stack.Screen name="camera" options={{ title: "Cámara" }} />
        <Stack.Screen name="sensors" options={{ title: "Sensores" }} />
        <Stack.Screen name="location" options={{ title: "Ubicación" }} />
        <StatusBar style="auto"/>
      </Stack>
    </>
  );
}
// Cambios: 
// Colores porque el color del fondo era similar al color de la informaicón mostrada en la parte superior por el celular, "perdiendo" la misma contra el fondo.
// StatusBar movido dentro de Stack para evitar que la primera se superponga sobre la información nombrada arriba.