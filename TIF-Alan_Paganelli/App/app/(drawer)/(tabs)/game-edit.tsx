import { Game } from "@/features/games/games";
import { useGames } from "@/features/games/useGames";
import { useLetsplays } from "@/features/letsplays/useLetsplays";
import { useTheme } from "@/features/theme/ThemeContext";
import { SCREEN_ROUTES } from "@/shared/screenRoutes";
import sharedStyles from "@/shared/sharedStyles"
import useShakeAnimation from "@/shared/useShakeAnimation";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

/*Este pantalla presenta la información de un Juego para editarlo*/
export default function GameEdit() {

    //Variables utilizadas en la Pantalla
    const { colors, theme, toggleTheme } = useTheme();
    const { shake, shakeStyle } = useShakeAnimation();
    const router = useRouter();

    //Datos sobre el juego (recibido desde pantalla previa)
    const { gameData } = useLocalSearchParams<{ gameData: string }>();
    const itsGame: Game = useMemo(() => { return JSON.parse(gameData); }, [gameData]);

    const editedGame: Game = itsGame;

    //Obtención y manejo de datos
    const { error, offline, editGame } = useGames();
    const { letsplays, editLetsplay } = useLetsplays();
    const itsLetsplays = letsplays.filter((letplay) => letplay.id_juego === itsGame.id);

    //Variables para entradas de datos y control de errores
    const [name, setName] = useState(itsGame.nombre);
    const [errorEntry, setErrorEntry] = useState("");

    //Función encargada de editar este Juego
    const handleEdit = useCallback(() => {
        //Revisión previa al alta (informa si encuentra error/dato faltante)
        if (!name.trim()) {
            setErrorEntry("¿Nombre?");
            shake();
            return;
        }
        //Si llega hasta acá, realiza edición si y solo si existen cambios de verdad
        if (itsGame.nombre !== name.trim()) {

            //Prepara el "editado" para su uso
            editedGame.nombre = name.trim();
            editGame(editedGame);
            setName(editedGame.nombre);

            //Propaga el cambio de nombe a las partidas asociadas
            itsLetsplays.forEach((letsplay) => {
                letsplay.juego = editedGame.nombre;
                editLetsplay(letsplay);
            })
        }
        //Retorna a la pantalla anterior tras realizar todo
        router.navigate({ pathname: `/${SCREEN_ROUTES.GAME_INFO}`, params: { gameData: JSON.stringify(editedGame) } });
    }, [shake, editGame, name, setName, itsGame, itsLetsplays, editLetsplay, editedGame, router]);

    //Función encanrgada de retroceder tras cancelar la edición
    const handleBack = useCallback(() => {
        setName(itsGame.nombre);
        router.navigate({ pathname: `/${SCREEN_ROUTES.GAME_INFO}`, params: { gameData: JSON.stringify(itsGame) } });
    }, [setName, itsGame, router])

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
                        ⚠️Firebase no está disponible, evitemos editar datos, espere...⚠️
                    </Text>
                </View>
            )}

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
            ) : (
                //Esta parte contiene la sección qué permite editar este Juego
                <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

                    <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
                        Nuevo nombre
                    </Text>

                    <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
                        {/*ENTRADA: Nombre del Juego para editarlo*/}
                        <TextInput style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntry ? colors.someError : colors.inputBorder, color: colors.inputText }]}
                            onChangeText={setName}
                            onSubmitEditing={handleEdit}
                            placeholder={itsGame.nombre}
                            placeholderTextColor={colors.textDisabled}
                            value={name} />
                        {errorEntry !== "" && (
                            <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                                {errorEntry}
                            </Text>
                        )}
                    </Animated.View>

                    <Animated.View style={sharedStyles.buttons}>

                        {/*BOTÓN: Edita este Juego*/}
                        <TouchableOpacity
                            style={StyleSheet.flatten([sharedStyles.buttonBorderless, { backgroundColor: colors.buttonEdit }])} onPress={handleEdit}>
                            <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
                                ✔
                            </Text>
                        </TouchableOpacity>

                        {/*BOTÓN: Cancela y devuelve a la pantalla previa*/}
                        <TouchableOpacity
                            style={StyleSheet.flatten([sharedStyles.buttonBorderless, { backgroundColor: colors.buttonCancel }])} onPress={handleBack}>
                            <Text style={[sharedStyles.buttonBigText, { color: colors.textButtonFulled }]}>
                                ✖
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>
                </Animated.View>
            )}
        </SafeAreaView>
    )
}