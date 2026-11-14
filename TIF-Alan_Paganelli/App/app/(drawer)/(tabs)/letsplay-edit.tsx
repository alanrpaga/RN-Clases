import { Letsplay } from "@/features/letsplays/letsplays";
import { useLetsplays } from "@/features/letsplays/useLetsplays";
import { useTheme } from "@/features/theme/ThemeContext";
import { SCREEN_ROUTES } from "@/shared/screenRoutes";
import sharedStyles from "@/shared/sharedStyles"
import useShakeAnimation from "@/shared/useShakeAnimation";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context";

/*Este pantalla presenta la información de una Partida para editarla*/
export default function LetsplayEdit() {

    //Variables utilizadas en la Pantalla
    const { colors, theme, toggleTheme } = useTheme();
    const { shake, shakeStyle } = useShakeAnimation();
    const router = useRouter();

    //Obtención y manejo de datos
    const { error, offline, editLetsplay } = useLetsplays();

    //Datos sobre la partida (recibido desde pantalla previa)
    const { letsplayData } = useLocalSearchParams<{ letsplayData: string }>();
    const itsLetsplay: Letsplay = useMemo(() => { return JSON.parse(letsplayData); }, [letsplayData]);

    const editedLetsplay: Letsplay = itsLetsplay;

    //Variables para entradas de datos y control de errores
    const [name, setName] = useState(itsLetsplay.nombre);
    const [description, setDescription] = useState(itsLetsplay.descripcion);
    const [errorEntryName, setErrorEntryName] = useState("");
    const [errorEntryDesc, setErrorEntryDesc] = useState("");

    //Función encargada de editar esta Partida
    const handleEdit = useCallback(() => {
        //Revisión previa al alta (informa si encuentra error/dato faltante)
        if (!name.trim() || !description.trim()) {
            setErrorEntryName("");
            setErrorEntryDesc("");

            if (!name.trim()) {
                setErrorEntryName("¿Nombre?");
                shake();
            }

            if (!description.trim()) {
                setErrorEntryDesc("¿Descripción?");
                shake();
            }

            return;
        }
        //Si llega hasta acá, realiza edición si y solo si existen cambios de verdad
        if (itsLetsplay.nombre !== name.trim() || itsLetsplay.descripcion !== description.trim()) {

            //Prepara el "editado" para su uso
            editedLetsplay.nombre = name.trim();
            editedLetsplay.descripcion = description.trim();
            editLetsplay(editedLetsplay);
            setName(editedLetsplay.nombre);
            setDescription(editedLetsplay.descripcion);
        }
        //Retorna a la pantalla anterior tras realizar todo
        router.navigate({ pathname: `/${SCREEN_ROUTES.LETSPLAY_INFO}`, params: { letsplayData: JSON.stringify(editedLetsplay) } });
    }, [shake, name, setName, description, setDescription, itsLetsplay, editLetsplay, editedLetsplay, router]);

    //Función encanrgada de retroceder tras cancelar la edición
    const handleBack = useCallback(() => {
        setName(itsLetsplay.nombre);
        setDescription(itsLetsplay.descripcion);
        router.navigate({ pathname: `/${SCREEN_ROUTES.LETSPLAY_INFO}`, params: { letsplayData: JSON.stringify(itsLetsplay) } });
    }, [setName, setDescription, itsLetsplay, router])

    ////
    return (

        <SafeAreaView>

            {/*BOTÓN: Cambia tema (light ↔ dark)*/}
            <TouchableOpacity onPress={toggleTheme} style={[sharedStyles.buttonThemeBorder, { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder }]}>
                <Text style={sharedStyles.buttonThemeText}>{theme === "dark" ? "🌙" : "☀️"}</Text>
            </TouchableOpacity>

            {/*Revisa lo más importante, si tenemos el Juego*/}
            {!itsLetsplay && (
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
                //Esta parte contiene la sección qué permite editar esta Partida
                <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

                    <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
                        Nuevo nombre
                    </Text>

                    <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
                        {/*ENTRADA: Nombre de la Partida para editarlo*/}
                        <TextInput
                            style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntryName ? colors.someError : colors.inputBorder, color: colors.inputText }]}
                            onChangeText={setName}
                            onSubmitEditing={handleEdit}
                            placeholder={itsLetsplay.nombre}
                            placeholderTextColor={colors.textDisabled}
                            value={name} />
                        {errorEntryName !== "" && (
                            <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                                {errorEntryName}
                            </Text>
                        )}
                    </Animated.View>

                    <Text style={[sharedStyles.bodyTitle, { color: colors.textPrimary }]}>
                        Nueva descripción
                    </Text>

                    <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
                        {/*ENTRADA: Descripción de la Partida para editarla*/}
                        <TextInput
                            style={[sharedStyles.inputText, { backgroundColor: colors.inputBackground, borderColor: errorEntryDesc ? colors.someError : colors.inputBorder, color: colors.inputText }]}
                            onChangeText={setDescription}
                            onSubmitEditing={handleEdit}
                            placeholder={itsLetsplay.descripcion}
                            placeholderTextColor={colors.textDisabled}
                            value={description} />
                        {errorEntryDesc !== "" && (
                            <Text style={[sharedStyles.bodyCentredText, { color: colors.someError }]}>
                                {errorEntryDesc}
                            </Text>
                        )}
                    </Animated.View>

                    <Animated.View style={sharedStyles.buttons}>

                        {/*BOTÓN: Edita esta Partida*/}
                        <TouchableOpacity
                            style={StyleSheet.flatten([sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }])} onPress={handleEdit}>
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