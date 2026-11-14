import { Letsplay } from "@/features/letsplays/letsplays";
import { useLetsplays } from "@/features/letsplays/useLetsplays";
import { NoteItem } from "@/features/notes/NoteItem";
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

/*Este pantalla presenta la información de una Partida y sus Notas, plus otras funciones asociadas*/
export default function LetsplayInfo() {

  //Variables utilizadas en la Pantalla
  const { colors, theme, toggleTheme } = useTheme();
  const { user } = useSession();
  const { shake, shakeStyle } = useShakeAnimation();
  const [changer, setChanger] = useState(false);

  //Datos sobre la partida (recibido desde pantalla previa)
  const { letsplayData } = useLocalSearchParams<{ letsplayData: string }>();
  const itsLetsplay: Letsplay = useMemo(() => { return JSON.parse(letsplayData); }, [letsplayData]);

  //Obtención y manejo de datos
  const { notes, offline, loading, error, addNote, toggleNote, deleteNote } = useNotes();
  const { deleteLetsplay } = useLetsplays();

  //Datos dependientes de la Partida → Importante: si la Partida se elimina, estos también.
  const itsNotes = notes.filter((note) => note.id_partida === itsLetsplay.id);

  //Variables para entradas de datos y control de errores
  const [text, setText] = useState("");
  const [errorEntryTitle, setErrorEntryTitle] = useState("");

  //Función encargada de "voltear" la pantalla: frontal = "Ver Partida" / dorsal = "Nueva Nota"
  const changeChanger = useCallback(() => {
    setText("");
    setErrorEntryTitle("");
    setChanger(!changer);
  }, [changer, setChanger, setText, setErrorEntryTitle]);

  //Función encargada del alta de un nueva Notas
  const handleAdd = useCallback(() => {
    //Revisión previa al alta (informa si encuentra error/dato faltante)
    if (!text.trim()) {
      setErrorEntryTitle("¿Qué anotamos?");
      shake();
      return;
    }
    //Si llega hasta acá, realiza alta y voltea pantalla
    addNote(text.trim(), itsLetsplay.id, itsLetsplay.id_juego, user ?? "invitado");
    changeChanger();
  }, [shake, addNote, changeChanger, text, user, itsLetsplay]);

  //Función encargada de la baja de la Partida y sus dependientes (tras confimación)
  const deleteTheGame = useCallback(() => {
    confirmAction("Eliminar Partida", `¿Seguro? Se eliminará todo lo asociado también.`, async () => {
      deleteLetsplay(itsLetsplay.id);
      itsNotes.forEach((note) => deleteNote(note.id));
      goBack();
    });
  }, [itsLetsplay, itsNotes, deleteLetsplay, deleteNote]);

  ////
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[sharedStyles.fullSize, { backgroundColor: colors.background }]}
    >
      {/*BOTÓN: Cambia tema (light ↔ dark)*/}
      <TouchableOpacity onPress={toggleTheme} style={[sharedStyles.buttonThemeBorder, { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder }]}>
        <Text style={sharedStyles.buttonThemeText}>{theme === "dark" ? "🌙" : "☀️"}</Text>
      </TouchableOpacity>

      {/*Revisa lo más importante, si tenemos la Partida*/}
      {!itsLetsplay && (
        <View style={[sharedStyles.container, { backgroundColor: colors.background }]}>
          <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
            ⚠️Los datos de la partida no se encuentran disponibles⚠️
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
          <Text
            style={[sharedStyles.bodyCentredText, { color: colors.textDisabled }]}>
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
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={sharedStyles.flexed}>

          <Text style={[sharedStyles.title, { color: colors.textSecondary }]}>
            {itsLetsplay.nombre}
          </Text>

          {/*BOTÓN: Eliminar Partida*/}
          <TouchableOpacity
            style={[sharedStyles.buttonBorder, { borderColor: colors.someError }]} onPress={deleteTheGame}>
            <Text style={[sharedStyles.buttonText, { color: colors.someError }]}>
              Eliminar partida
            </Text>
          </TouchableOpacity>

          <Text style={[sharedStyles.subtitle, { color: colors.textSecondary }]}>
            Notas
          </Text>

          {/*LISTA: Notas asociadas a la Partida*/}
          <Animated.FlatList
            itemLayoutAnimation={LinearTransition}
            data={itsNotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (<NoteItem note={item} onToggle={toggleNote} onDelete={deleteNote} />)}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={sharedStyles.flexedGrow}
            ListEmptyComponent={
              <View style={sharedStyles.container}>
                <Text style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
                  No hay nada anotado
                </Text>
                <Text
                  style={[{ color: colors.textSecondary }, sharedStyles.buttonBigText]}>
                  ¿Agregamos algo?
                </Text>
              </View>
            } />

          {/*BOTÓN: Voltea pantalla para iniciar el alta de nueva Nota*/}
          <TouchableOpacity
            style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }]} onPress={changeChanger}>
            <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
              +
            </Text>
          </TouchableOpacity>

        </Animated.View>
      ) : (
        //Esta parte contiene la sección qué permite cargar una nueva Nota
        <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

          <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
            Escribe qué quieres anotar
          </Text>

          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            {/*ENTRADA: Texto de la Nota*/}
            <TextInput style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntryTitle ? colors.someError : colors.inputBorder, color: colors.inputText }]}
              onChangeText={setText}
              onSubmitEditing={handleAdd}
              placeholder="..."
              placeholderTextColor={colors.textDisabled}
              value={text} />
            {errorEntryTitle !== "" && (
              <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                {errorEntryTitle}
              </Text>
            )}
          </Animated.View>

          <Animated.View style={sharedStyles.buttons}>

            {/*BOTÓN: Agrega nueva Nota*/}
            <TouchableOpacity style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }]} onPress={handleAdd}>
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