import { useGames } from "@/features/games/useGames";
import { LetsplayItem } from "@/features/letsplays/LetsplayItem";
import { useLetsplays } from "@/features/letsplays/useLetsplays";
import { useSession } from "@/features/session/SessionContext";
import { useTheme } from "@/features/theme/ThemeContext";
import sharedStyles from "@/shared/sharedStyles";
import useShakeAnimation from "@/shared/useShakeAnimation";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, {
  FadeInLeft,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Game } from "@/features/games/games";

/*Este pantalla presenta un listado de cada Partida y permite el alta de estas*/
export default function Letsplays() {

  //Variables utilizadas en la Pantalla
  const { colors, theme, toggleTheme } = useTheme();
  const { user } = useSession();
  const { shake, shakeStyle } = useShakeAnimation();
  const [changer, setChanger] = useState(false);

  //Obtención y manejo de datos
  const { letsplays, loading, error, offline, addLetsplay, toggleLetsplay, favLetsplay } = useLetsplays();
  const { games } = useGames();

  //Variables para entradas de datos y control de errores
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game>();
  const [errorEntryName, setErrorEntryName] = useState("");
  const [errorEntryDesc, setErrorEntryDesc] = useState("");
  const [errorEntryGame, setErrorEntryGame] = useState("");

  //Función encargada de "voltear" la pantalla: frontal = "Ver Juegos" / dorsal = "Nuevo Juego"
  const changeChanger = useCallback(() => {
    setName("");
    setDescription("");
    setSelectedGame(undefined);
    setErrorEntryName("");
    setErrorEntryDesc("");
    setErrorEntryGame("");
    setChanger(!changer);
  }, [changer, setChanger, setName, setDescription, setSelectedGame, setErrorEntryName, setErrorEntryDesc, setErrorEntryGame]);

  //Función encargada del alta de una nueva Partida
  const handleAdd = useCallback(() => {
    //Revisión previa al alta (informa si encuentra error/dato faltante)
    if (!name.trim() || !description.trim() || !selectedGame) {
      setErrorEntryName("");
      setErrorEntryDesc("");
      setErrorEntryGame("");

      if (!name.trim()) {
        setErrorEntryName("¿Nombre?");
        shake();
      }

      if (!description.trim()) {
        setErrorEntryDesc("¿Descripción?");
        shake();
      }

      if (!selectedGame) {
        setErrorEntryGame("¿Juego?");
        shake();
      }

      return;
    }
    //Si llega hasta acá, realiza alta y voltea pantalla
    addLetsplay(name.trim(), description.trim(), selectedGame.nombre, selectedGame.id, user ?? "invitado");
    changeChanger();
  }, [shake, addLetsplay, changeChanger, name, description, user, selectedGame]);

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
          <Text style={[sharedStyles.fbOfflineText, { color: colors.someError }]}>
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
          <Text style={[sharedStyles.bodyCentredText, { color: colors.textDisabled }]}>
            Revisá el archivo .env y las reglas de Firestore. Después reiniciá
            con: npx expo start -c
          </Text>
        </View>
      ) : loading ? (
        //Esta parte espera a que se carge los datos mostrando un indicador de cara al usuario
        <View style={sharedStyles.container}>
          <ActivityIndicator size="large" color={colors.buttonNormal} />
        </View>
      ) : games.length === 0 ? (<View style={sharedStyles.container}>
        <Text style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
          No hay juegos cargados, primero carga al menos uno
        </Text>
      </View>
      ) : !changer ? (
        //Esta parte contiene la pantalla mostrando los datos
        <View style={sharedStyles.flexed}>

          {/*LISTA: listado de Partidas*/}
          <Animated.FlatList
            itemLayoutAnimation={LinearTransition}
            data={letsplays}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<LetsplayItem letsplay={item} onToggle={toggleLetsplay} onFav={favLetsplay} />)}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={sharedStyles.flexedGrow}
            ListEmptyComponent={
              <View style={sharedStyles.container}>
                <Text
                  style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
                  No hay partidas cargadas
                </Text>
              </View>
            } />

          {/*BOTÓN: Voltea pantalla para iniciar el alta de nueva Partida*/}
          <TouchableOpacity
            style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal },]} onPress={changeChanger}>
            <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
              +
            </Text>
          </TouchableOpacity>

        </View>
      ) : (
        //Esta parte contiene la sección qué permite cargar una nueva Partida
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Nombre de la partida
          </Text>

          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            {/*ENTRADA: Nombre de la Partida*/}
            <TextInput
              style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntryName ? colors.someError : colors.inputBorder, color: colors.inputText }]}
              onChangeText={setName}
              onSubmitEditing={handleAdd}
              placeholder="..."
              placeholderTextColor={colors.textDisabled}
              value={name} />
            {errorEntryName !== "" && (
              <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                {errorEntryName}
              </Text>
            )}
          </Animated.View>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Descripción de la partida
          </Text>

          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            {/*ENTRADA: Descripción de la Partida*/}
            <TextInput
              style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntryDesc ? colors.someError : colors.inputBorder, color: colors.inputText }]}
              onChangeText={setDescription}
              onSubmitEditing={handleAdd}
              placeholder="..."
              placeholderTextColor={colors.textDisabled}
              value={description} />
            {errorEntryDesc !== "" && (
              <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                {errorEntryDesc}
              </Text>
            )}
          </Animated.View>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Juego asociado
          </Text>

          <View style={[sharedStyles.picker, { borderColor: errorEntryGame ? colors.someError : colors.inputBorder }]}>

            {/*SELECTOR: Juego asociado a la Partida*/}
            <Picker mode="dropdown" style={{ backgroundColor: colors.inputBackground }} dropdownIconColor={colors.inputText} selectedValue={selectedGame} onValueChange={(itemValue) => setSelectedGame(itemValue)}>

              {/*Inseleccionable → Default para evitar caso "nada seleccionado"*/}
              <Picker.Item label="..." value="..." color={colors.textDisabled} style={{ backgroundColor: colors.inputBackground }} enabled={false} />
              {/*Seleccionables → Juegos cargados*/}
              {games.map((game) => (
                <Picker.Item key={game.id} label={game.nombre} value={game} color={colors.textPrimary} style={{ backgroundColor: colors.inputBackground }} />
              ))}

            </Picker>

          </View>
          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            {errorEntryGame !== "" && (
              <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                {errorEntryGame}
              </Text>
            )}
          </Animated.View>

          <Animated.View style={sharedStyles.buttons}>

            {/*BOTÓN: Agrega nueva Paritda*/}
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
      )}
    </SafeAreaView>
  );
}