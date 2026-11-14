import { useSession } from "@/features/session/SessionContext";
import { useTheme } from "@/features/theme/ThemeContext";
import { confirmAction } from "@/shared/confirmAction";
import sharedStyles from "@/shared/sharedStyles";
import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

/*Este pantalla presenta la información del Usuario*/
export default function Profile() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, logout } = useSession();

  //Función encargada de cerrar la sesión (tras confimación)
  const handleDelete = useCallback(
    () => {
      // Borrar no se puede deshacer: primero pedimos confirmación.
      confirmAction("Cerrar sesión", `¿Seguro que querés cerrar tu sesión?`, async () => {
        await logout();
        return;
      });
    }, [logout]);


  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={[{ width: "100%", height: "100%" }, { backgroundColor: colors.background }]}>
      {/*La falta del fondo generaba ese molesto rectángulo color blanco hueso]*/}

      {/*BOTÓN: Cambia tema (light ↔ dark)*/}
      <TouchableOpacity onPress={toggleTheme} style={[sharedStyles.buttonThemeBorder, { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder }]}>
        <Text style={sharedStyles.buttonThemeText}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>

      <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={[sharedStyles.container, { backgroundColor: colors.background }]}>

        <Text style={[sharedStyles.title, { color: colors.textPrimary }]}>
          Hola, {user} 👋
        </Text>

        <Text style={[sharedStyles.title, { color: colors.textPrimary }]}>
          Encantado de verte 👀
        </Text>

        {<Text style={[sharedStyles.secretText, { color: colors.drawerBackground }]}>
          Behind you, boo!
        </Text>}

        {/*BOTÓN: cierra la sesión aniquilando al Usuario*/}
        <TouchableOpacity style={[sharedStyles.buttonBorder, { borderColor: colors.someError }]} onPress={handleDelete}>
          <Text style={[sharedStyles.buttonText, { color: colors.someError }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>

      </Animated.View>
    </SafeAreaView>
  );
}