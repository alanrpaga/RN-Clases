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

/*Este pantalla presenta un listado de cada Juego y permite el alta de estos*/
export default function Games() {

  //Variables utilizadas en la Pantalla
  const { colors, theme, toggleTheme } = useTheme();
  const { user } = useSession();
  const { shake, shakeStyle } = useShakeAnimation();
  const [changer, setChanger] = useState(false);

  //Obtención y manejo de datos
  const { games, loading, error, offline, addGame } = useGames();

  //Variables para entradas de datos y control de errores
  const [name, setName] = useState("");
  const [errorEntry, setErrorEntry] = useState("");

  //Función encargada de "voltear" la pantalla: frontal = "Ver Juegos" / dorsal = "Nuevo Juego"
  const changeChanger = useCallback(() => {
    setName("");
    setErrorEntry("");
    setChanger(!changer);
  }, [changer, setChanger, setName, setErrorEntry]);

  //Función encargada del alta de un nuevo Juego
  const handleAdd = useCallback(() => {
    //Revisión previa al alta (informa si encuentra error/dato faltante)
    if (!name.trim()) {
      setErrorEntry("¿Nombre?");
      shake();
      return;
    }
    //Si llega hasta acá, realiza alta y voltea pantalla
    addGame(name.trim(), user ?? "invitado");
    setName("");
    changeChanger();
  }, [shake, addGame, changeChanger, name, user]);

  ////
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={[sharedStyles.fullSize, { backgroundColor: colors.background }]}>

      {/*BOTÓN: Cambia tema (light ↔ dark)*/}
      <TouchableOpacity onPress={toggleTheme} style={[sharedStyles.buttonThemeBorder, { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder }]}>
        <Text style={sharedStyles.buttonThemeText}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>

      {/*Revisa si Firebase está o no*/}
      {offline && !error && (
        //Esta parte informa si Firebase no se encuentra disponible
        <View style={[sharedStyles.padded, { backgroundColor: colors.background }]}>
          <Text
            style={[sharedStyles.fbOfflineText, { color: colors.someError }]}
          >
            ⚠️Firebase no está disponible, evitemos guardar datos⚠️
          </Text>
        </View>
      )}

      {/*INICIA LO DURO*/}
      {error ? (
        //Esta parte informa qué el problema con la conexión a Firebase es local
        <View style={sharedStyles.container}>
          <Text style={[sharedStyles.fbErrorText, { color: colors.someError }]}>
            No se pudo conectar con Firebase
          </Text>
          <Text style={[sharedStyles.fbErrorText, { color: colors.textSecondary }]}>
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
        //Esta parte contiene la sección qué muestra el listado de Juegos
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={sharedStyles.flexed}>

          {/*LISTA: listado de Juegos*/}
          <Animated.FlatList
            itemLayoutAnimation={LinearTransition}
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<GameItem game={item} />)}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={sharedStyles.flexedGrow}
            ListEmptyComponent={
              <View style={sharedStyles.container}>
                <Text style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
                  No hay juegos cargados
                </Text>
              </View>
            } />

          {/*BOTÓN: Voltea pantalla para iniciar el alta de nuevo Juego*/}
          <TouchableOpacity style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }]} onPress={changeChanger}>
            <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
              +
            </Text>
          </TouchableOpacity>

        </Animated.View>
      ) : (
        //Esta parte contiene la sección qué permite cargar un nuevo Juego
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Nombre del juego
          </Text>

          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            {/*ENTRADA: Nombre del Juego*/}
            <TextInput style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntry ? colors.someError : colors.inputBorder, color: colors.inputText }]}
              onChangeText={setName}
              onSubmitEditing={handleAdd}
              placeholder="..."
              placeholderTextColor={colors.textDisabled}
              value={name} />
            {errorEntry !== "" && (
              <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                {errorEntry}
              </Text>
            )}
          </Animated.View>

          <Animated.View style={sharedStyles.buttons}>

            {/*BOTÓN: Agrega nuevo Juego*/}
            <TouchableOpacity
              style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }]} onPress={handleAdd}>
              <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
                ✔
              </Text>
            </TouchableOpacity>

            {/*BOTÓN: Cancela y voltea*/}
            <TouchableOpacity
              style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonCancel }]} onPress={changeChanger}>
              <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
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