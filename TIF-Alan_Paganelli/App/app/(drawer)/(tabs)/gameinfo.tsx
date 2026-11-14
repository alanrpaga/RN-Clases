import { Game } from "@/features/games/games";
import { useGames } from "@/features/games/useGames";
import { useLetsplays } from "@/features/letsplays/useLetsplays";
import { MemoryItem } from "@/features/memories/MemoryItem";
import { useMemories } from "@/features/memories/useMemories";
import { useNotes } from "@/features/notes/useNotes";
import { useSession } from "@/features/session/SessionContext";
import { useTheme } from "@/features/theme/ThemeContext";
import { confirmAction } from "@/shared/confirmAction";
import sharedStyles from "@/shared/sharedStyles";
import useShakeAnimation from "@/shared/useShakeAnimation";
import { useLocalSearchParams } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";
import { useCallback, useMemo, useState } from "react";
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

/*Este pantalla presenta la información de un Juego y sus Recuerdos, plus otras funciones asociadas*/
export default function GameInfo() {

  //Variables utilizadas en la Pantalla
  const { colors, theme, toggleTheme } = useTheme();
  const { user } = useSession();
  const { shake, shakeStyle } = useShakeAnimation();
  const [changer, setChanger] = useState(false);

  //Datos sobre el juego (recibido desde pantalla previa)
  const { gameData } = useLocalSearchParams<{ gameData: string }>();
  const itsGame: Game = useMemo(() => { return JSON.parse(gameData); }, [gameData]);

  //Obtención y manejo de datos
  const { memories, offline, loading, error, addMemory, deleteMemory } = useMemories();
  const { letsplays, deleteLetsplay } = useLetsplays();
  const { notes, deleteNote } = useNotes();
  const { deleteGame } = useGames();

  //Datos dependientes del juego → Importante: si el juego se elimina, estos también.
  const itsMemories = memories.filter((memory) => memory.id_juego === itsGame.id,);
  const itsLetsplays = letsplays.filter((letplay) => letplay.id_juego === itsGame.id,);
  const itsNotes = notes.filter((note) => note.id_juego === itsGame.id);

  //Variables para entradas de datos y control de errores
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorEntryTitle, setErrorEntryTitle] = useState("");
  const [errorEntryDesc, setErrorEntryDesc] = useState("");

  //Función encargada de "voltear" la pantalla: frontal = "Ver Juego" / dorsal = "Nuevo Recuerdo"
  const changeChanger = useCallback(() => {
    setTitle("");
    setDescription("");
    setErrorEntryTitle("");
    setErrorEntryDesc("");
    setChanger(!changer);
  }, [changer, setChanger, setTitle, setDescription, setErrorEntryTitle, setErrorEntryDesc]);

  //Función encargada del alta de un nuevo Recuerdo
  const handleAdd = useCallback(() => {
    //Revisión previa al alta (informa si encuentra error/dato faltante)
    if (!title.trim() || !description.trim()) {
      setErrorEntryTitle("");
      setErrorEntryDesc("");
      if (!title.trim()) {
        setErrorEntryTitle("¿Título?");
        shake();
      }
      if (!description.trim()) {
        setErrorEntryDesc("¿Qué recordamos?");
        shake();
      }
      return;
    }
    //Si llega hasta acá, realiza alta y voltea pantalla
    addMemory(title.trim(), description.trim(), itsGame.id, user ?? "invitado");
    changeChanger();
  }, [shake, addMemory, changeChanger, title, description, user, itsGame]);

  //Función encargada de la baja del Juego y sus dependientes (tras confimación)
  const deleteTheGame = useCallback(() => {
    confirmAction("Eliminar Juego", `¿Seguro? Se eliminará todo lo asociado también.`, async () => {
    deleteGame(itsGame.id);
    itsMemories.forEach((memory) => deleteMemory(memory.id));
    itsLetsplays.forEach((letplay) => deleteLetsplay(letplay.id));
    itsNotes.forEach((note) => deleteNote(note.id));
    goBack();
    });
  }, [itsGame, itsMemories, itsLetsplays, itsNotes, deleteGame, deleteMemory, deleteLetsplay, deleteNote]);

  ////
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={[sharedStyles.fullSize, { backgroundColor: colors.background }]}>

      {/*BOTÓN: Cambia tema (light ↔ dark)*/}
      <TouchableOpacity onPress={toggleTheme} style={[sharedStyles.buttonThemeBorder, { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder }]}>
        <Text style={sharedStyles.buttonThemeText}>{theme === "dark" ? "🌙" : "☀️"}</Text>
      </TouchableOpacity>

      {/*Revisa lo más importante, si tenemos el Juego*/}
      {!itsGame && (
        <View style={[sharedStyles.container, { backgroundColor: colors.background }]}>
          <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
            ⚠️Los datos del juego no se encuentran disponibles⚠️
          </Text>
        </View>
      )}

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
      ) : !changer ? (
        //Esta parte contiene la sección qué muestra los datos del Juego
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={sharedStyles.flexed}>

          <Text style={[sharedStyles.title, { color: colors.textSecondary }]}>
            {itsGame.nombre}
          </Text>

          {/*BOTÓN: Eliminar Juego*/}
          <TouchableOpacity
            style={[sharedStyles.buttonBorder, { borderColor: colors.someError }]} onPress={deleteTheGame}>
            <Text style={[sharedStyles.buttonText, { color: colors.someError }]}>
              Eliminar juego
            </Text>
          </TouchableOpacity>

          <Text style={[sharedStyles.subtitle, { color: colors.textSecondary }]}>
            Recuerdos
          </Text>

          {/*LISTA: Recuerdos asociados al Juego*/}
          <Animated.FlatList
            itemLayoutAnimation={LinearTransition}
            data={itsMemories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<MemoryItem memory={item} onDelete={deleteMemory} />)}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={sharedStyles.flexedGrow}
            ListEmptyComponent={
              <View style={sharedStyles.container}>
                <Text style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
                  No hay nada que recordar
                </Text>
                <Text style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
                  ¿Agregamos algo?
                </Text>
              </View>
            } />

          {/*BOTÓN: Voltea pantalla para iniciar el alta de nuevo Recuerdo*/}
          <TouchableOpacity style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }]} onPress={changeChanger}>
            <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
              +
            </Text>
          </TouchableOpacity>

        </Animated.View>
      ) : (
        //Esta parte contiene la sección qué permite cargar un nuevo Recuerdo
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Título del recuerdo
          </Text>

          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            {/*ENTRADA: Título del Recuerdo*/}
            <TextInput
              style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntryTitle ? colors.someError : colors.inputBorder, color: colors.inputText }]}
              onChangeText={setTitle}
              onSubmitEditing={handleAdd}
              placeholder="..."
              placeholderTextColor={colors.textDisabled}
              value={title} />
            {errorEntryTitle !== "" && (
              <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                {errorEntryTitle}
              </Text>
            )}
          </Animated.View>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Escribe qué quieres recordar
          </Text>

          {/*ENTRADA: Descripción del Recuerdo*/}
          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
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

          <Animated.View style={sharedStyles.buttons}>

            {/*BOTÓN: Agrega nuevo Recuerdo*/}
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