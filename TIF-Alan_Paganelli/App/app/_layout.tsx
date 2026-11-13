import { SessionProvider, useSession } from "@/features/session/SessionContext";
import { ThemeProvider, useTheme } from "@/features/theme/ThemeContext";
import sharedStyles from "@/shared/sharedStyles";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Este componente existe porque useTheme solo funciona DENTRO del Provider.
// RootLayout es quien lo monta, así que no puede consumirlo a la vez.
function RootLayoutNav() {
  const { theme, colors } = useTheme();
  const { user, isReady } = useSession();

  if (!isReady) return null;

  return (
    //Este View está para evitar el flashbang al cambiar entre "login" y "index"
    <View style={[sharedStyles.flexed, { backgroundColor: colors.background }]}>
      <Stack
        screenOptions={{
          animation: "none",
          headerStyle: { backgroundColor: colors.itemBackground },
          headerTintColor: colors.textPrimary,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(drawer)" options={{ animation: "none", headerShown: false}} />
        </Stack.Protected>
        {/* TODO -> stack para LOGIN */}
        <Stack.Protected guard={!user}>
          <Stack.Screen
            name="login"
            options={{ animation: "none", headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
      {/* Fondo oscuro -> íconos claros, y viceversa */}
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
        <ThemeProvider>
          <SessionProvider>
            <SafeAreaProvider>
            <RootLayoutNav />
            </SafeAreaProvider>
          </SessionProvider>
        </ThemeProvider>
    </GestureHandlerRootView>
  );
}
