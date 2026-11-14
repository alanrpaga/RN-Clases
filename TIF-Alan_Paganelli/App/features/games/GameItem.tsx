/* eslint-disable react/display-name */
import React, { memo } from "react";
import { Game } from "./games";
import { useTheme } from "../theme/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import sharedStyles from "../../shared/sharedStyles";
import { Link } from "expo-router";

interface GameItemProps {
  game: Game;
}

//Cuerpo de un GameItem
export const GameItem = memo(({ game }: GameItemProps) => {

  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInLeft.springify()} exiting={FadeOutRight} style={[sharedStyles.itemBody, { backgroundColor: colors.itemBackground, borderColor: colors.itemBorder }]}>

      <View style={sharedStyles.flexed}>
        <Text style={[sharedStyles.itemTitle, { color: colors.textPrimary }]}>
          {game.nombre}
        </Text>
      </View>

      {/*BOTÓN: Redirige a la pantalla de este Juego pasando los datos del mismo*/}
      <Link href={{ pathname: "/gameinfo", params: { gameData: JSON.stringify(game) } }} asChild>
        <TouchableOpacity style={StyleSheet.flatten([sharedStyles.buttonBorderTiny, { backgroundColor: colors.itemBackground, borderColor: colors.itemBorder }])}>
          <Text style={[sharedStyles.itemText, { color: colors.textSecondary }]}>
            Ver
          </Text>
        </TouchableOpacity>
      </Link>

    </Animated.View>
  );
});