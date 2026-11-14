/* eslint-disable react/display-name */
import React, { memo } from "react";
import { Letsplay } from "./letsplays";
import { useTheme } from "../theme/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import sharedStyles from "../../shared/sharedStyles";
import { Link } from "expo-router";

interface LetsplayItemProps {
  letsplay: Letsplay;
  onToggle: (letsplay: Letsplay) => void;
  onFav: (letsplay: Letsplay) => void;
}

//Cuerpo de un LetsplayItem
export const LetsplayItem = memo(({ letsplay, onToggle, onFav }: LetsplayItemProps) => {

  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInLeft.springify()} exiting={FadeOutRight} style={[sharedStyles.itemBody, { backgroundColor: colors.itemBackground }]}>

      {/*BOTÓN: Marca a la Partida como "Favorita" (y viceversa)*/}
      <TouchableOpacity style={sharedStyles.buttonBorderlessTiny} onPress={() => onFav(letsplay)}>
        <Text style={sharedStyles.itemIcon}>
          {letsplay.favorito ? "❤" : "🖤"}
        </Text>
      </TouchableOpacity>

      <View style={sharedStyles.flexed}>
        <Text
          style={[sharedStyles.itemSubTitle, { color: letsplay.estado ? colors.textDisabled : colors.textPrimary }, letsplay.estado && sharedStyles.itemTextDone]}>
          {letsplay.nombre}
        </Text>
        <Text style={[sharedStyles.itemSubTitle, { color: letsplay.estado ? colors.textDisabled : colors.textSecondary }, letsplay.estado && sharedStyles.itemTextDone]}>
          {letsplay.juego}
        </Text>
        <Text
          style={[sharedStyles.itemText, { color: letsplay.estado ? colors.textDisabled : colors.textSecondary }, letsplay.estado && sharedStyles.itemTextDone]}>
          {letsplay.descripcion}
        </Text>
      </View>

      {/*BOTÓN: Redirige a la pantalla de esta Partida pasando los datos de la misma*/}
      <Link href={{ pathname: "/letsplayinfo", params: { letsplayData: JSON.stringify(letsplay) } }} asChild>
        <TouchableOpacity style={StyleSheet.flatten([sharedStyles.buttonBorderTiny, { backgroundColor: colors.itemBackground, borderColor: colors.itemBorder, }])}>
          <Text style={[sharedStyles.itemText, { color: colors.textSecondary }]}>
            Ver
          </Text>
        </TouchableOpacity>
      </Link>

      {/*BOTÓN: Marca a la Partida como "Terminada" (y viceversa)*/}
      <TouchableOpacity onPress={() => onToggle(letsplay)}>
        <Text style={sharedStyles.itemIcon}>
          {letsplay.estado ? "✅" : "⬜"}
        </Text>
      </TouchableOpacity>

    </Animated.View>
  );
});