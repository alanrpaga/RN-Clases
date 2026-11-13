import { GameItem } from "@/features/games/GameItem";
import { useGames } from "@/features/games/useGames";
import { useSession } from "@/features/session/SessionContext";
import { useTheme } from "@/features/theme/ThemeContext";
import sharedStyles from "@/shared/sharedStyles";
import useShakeAnimation from "@/shared/useShakeAnimation";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInLeft,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Games() {
  //Utilizadas en la Pantalla
  const { colors, theme, toggleTheme } = useTheme();
  const { user } = useSession();
  const { shake, shakeStyle } = useShakeAnimation();
  const [changer, setChanger] = useState(false);

  //Persistencia y obtención de datos
  const { games, loading, error, offline, addGame } = useGames();

  //Entradas de datos
  const [name, setName] = useState("");
  const [errorEntry, setErrorEntry] = useState("");

  //"Volteador" entre partes: frontal = "Ver Juego" / dorsal = "Nuevo Juego" 
  const changeChanger = useCallback(() => {
    setChanger(!changer);
    setName("");
    setErrorEntry("");
  }, [changer, setChanger, setName, setErrorEntry]);

  //
  const handleAdd = useCallback(() => {
    if (!name.trim()) {
      setErrorEntry("¿Nombre?");
      shake();
      return;
    }
    setErrorEntry("");
    addGame(name.trim(), user ?? "invitado");
    setName("");
    changeChanger();
  }, [shake, addGame, changeChanger, name, user]);

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[sharedStyles.fullSize,
        { backgroundColor: colors.background },
      ]}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          sharedStyles.buttonThemeBorder,
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

      {offline && !error && (
        //Esta parte informa si Firebase no se encuentra disponible
        <View
          style={[sharedStyles.padded, { backgroundColor: colors.background }]}
        >
          <Text
            style={[sharedStyles.fbOfflineText, { color: colors.someError }]}
          >
            ⚠️Firebase no está disponible, evitemos guardar datos⚠️
          </Text>
        </View>
      )}

      {error ? (
        //Esta parte informa qué el problema con la conexión a Firebase es local
        <View style={sharedStyles.container}>
          <Text style={[sharedStyles.fbErrorText, { color: colors.someError }]}>
            No se pudo conectar con Firebase
          </Text>
          <Text style={[sharedStyles.fbErrorText,{ color: colors.textSecondary }]}>
            {error}
          </Text>
          <Text
            style={[sharedStyles.bodyCentredText, { color: colors.textDisabled }]}
          >
            Revisá el archivo .env y las reglas de Firestore. Después reiniciá
            con: npx expo start -c
          </Text>
        </View>
      ) : loading ? (
        //Esta parte espera a que se carge los datos mostrando un indicador de cara al usuario
        <View style={sharedStyles.container}>
          <ActivityIndicator size="large" color={colors.buttonNormal} />
        </View>
      ) : !changer ? (
        //Esta parte contiene la pantalla mostrando los datos
        <View style={sharedStyles.flexed}>
          <Animated.FlatList
            itemLayoutAnimation={LinearTransition}
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameItem game={item}/>
            )}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <View
                style={sharedStyles.container}
              >
                <Text
                  style={[
                    { color: colors.textSecondary },
                    sharedStyles.buttonBigText,
                  ]}
                >
                  No hay juegos cargados
                </Text>
              </View>
            }
          />
          <TouchableOpacity
            style={[
              sharedStyles.buttonBorderless,
              { backgroundColor: colors.buttonNormal },
            ]}
            onPress={changeChanger}
          >
            <Text
              style={[
                sharedStyles.buttonBigText,
                { color: colors.textButtonFulled },
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        ////
        //Esta parte contiene la pantalla permitiendo el alta de un nuevo dato
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
          <Text
            style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}
          >
            Nombre del juego
          </Text>
          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            <TextInput
              style={[
                sharedStyles.inputText,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: errorEntry
                    ? colors.someError
                    : colors.inputBorder,
                  color: colors.inputText,
                },
              ]}
              onChangeText={setName}
              onSubmitEditing={handleAdd}
              placeholder="..."
              placeholderTextColor={colors.textDisabled}
              value={name}
            />
            {errorEntry !== "" && (
              <Text
                style={[sharedStyles.bodyCentredText, { color: colors.someError }]}
              >
                {errorEntry}
              </Text>
            )}
          </Animated.View>
          <Animated.View style={sharedStyles.buttons}>
            <TouchableOpacity
              style={[
                sharedStyles.buttonBorderless,
                { backgroundColor: colors.buttonNormal },
              ]}
              onPress={handleAdd}
            >
              <Text
                style={[
                  sharedStyles.buttonBigText,
                  { color: colors.textButtonFulled },
                ]}
              >
                ✔
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                sharedStyles.buttonBorderless,
                { backgroundColor: colors.buttonCancel },
              ]}
              onPress={changeChanger}
            >
              <Text
                style={[
                  sharedStyles.buttonBigText,
                  { color: colors.textButtonFulled },
                ]}
              >
                ✖
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        ////
      )}
    </SafeAreaView>
  );
}