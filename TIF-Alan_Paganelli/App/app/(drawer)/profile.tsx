import { useSession } from "@/features/session/SessionContext";
import { useTheme } from "@/features/theme/ThemeContext";
import sharedStyles from "@/shared/sharedStyles";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, logout } = useSession();

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[{ width: "100%", height: "100%" }, { backgroundColor: colors.background }]} //La falta del fondo generaba ese molesto rectángulo color blanco hueso
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          sharedStyles.buttonThemeBorder,
          { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder },
        ]}
      >
        <Text style={sharedStyles.buttonThemeText}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>
      <View
        style={[sharedStyles.container, { backgroundColor: colors.background }]}
      >
        <Animated.Text
          entering={FadeInDown.delay(100)}
          style={[sharedStyles.title, { color: colors.textPrimary }]}
        >
          Hola, {user} 👋
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(200)}
          style={{ alignSelf: "stretch" }}
        >
          <TouchableOpacity
            style={[sharedStyles.buttonBorder, { borderColor: colors.someError }]}
            onPress={logout}
          >
            <Text style={[sharedStyles.buttonText, { color: colors.someError }]}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}