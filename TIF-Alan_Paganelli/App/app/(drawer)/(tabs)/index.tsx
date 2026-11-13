import { useGames } from "@/features/games/useGames";
import { useLetsplays } from "@/features/letsplays/useLetsplays";
import { useMemories } from "@/features/memories/useMemories";
import { useNotes } from "@/features/notes/useNotes";
import { useTheme } from "@/features/theme/ThemeContext";
import sharedStyles from "@/shared/sharedStyles";
import { Text, TouchableOpacity } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors, theme, toggleTheme } = useTheme();

  const {error, offline} = useGames();
  const hmGames = useGames().games.length;
  const hmLetsplays = useLetsplays().letsplays.length;
  const hmMemories = useMemories().memories.length;
  const hmNotes = useNotes().notes.length;

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[sharedStyles.fullSize, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          sharedStyles.buttonThemeBorder,
          { alignSelf: "flex-end" },
          {
            backgroundColor: colors.themeBackground,
            borderColor: colors.themeBorder,
          },
        ]}
      >
        <Text style={sharedStyles.buttonThemeText}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>
      <Animated.View entering={ZoomIn.springify()} style={sharedStyles.wrapper}>
        <Text
          style={[
            sharedStyles.logo,
            { color: colors.textPrimary, textShadowColor: colors.textPrimary },
          ]}
        >
          LUDERE
        </Text>
      </Animated.View>

{!offline && !error &&(
      <Animated.View entering={ZoomIn.springify()} style={sharedStyles.wrapper}>
        <Text
          style={[
            sharedStyles.title,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Juegos cargados: {hmGames}
        </Text>

        <Text
          style={[
            sharedStyles.subtitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Recuerdos cargados: {hmMemories}
        </Text>

        <Text
          style={[
            sharedStyles.title,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Partidas cargadas: {hmLetsplays}
        </Text>

        <Text
          style={[
            sharedStyles.subtitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Notas cargadas: {hmNotes}
        </Text>

        <Text
          style={[
            sharedStyles.bodyCentredText,
            {
              color: colors.textDisabled,
            },
          ]}
        >
          Feedback
        </Text>
      </Animated.View>
)}
    </SafeAreaView>
  );
}
