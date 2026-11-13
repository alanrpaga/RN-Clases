import { useTheme } from "@/features/theme/ThemeContext";
import sharedStyles from "@/shared/sharedStyles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function DrawerLayout() {
  const { colors } = useTheme();

  return (
    //Este View está para evitar el flashbang al cambiar entre tabs
    <View style={[sharedStyles.flexed, { backgroundColor: colors.background }]}>
      <Tabs
        screenOptions={{
          animation: "none",
          headerShown: false,
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.textDisabled,
          tabBarStyle: [
            { backgroundColor: colors.tabsBackground },
            sharedStyles.tabBar,
          ],
          sceneStyle: { backgroundColor: colors.tabsBackground },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="games"
          options={{
            title: "Juegos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="letsplays"
          options={{
            title: "Partidas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="game-controller-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="gameinfo"
          options={{
            title: "Juego",
            href: null,
          }}
        />

        <Tabs.Screen
          name="letsplayinfo"
          options={{
            title: "Partida",
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}