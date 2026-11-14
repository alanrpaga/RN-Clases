/* eslint-disable react/display-name */
import React, { memo, useCallback } from "react";
import { Memory } from "./memories";
import { useTheme } from "../theme/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import sharedStyles from "../../shared/sharedStyles";
import { confirmAction } from "@/shared/confirmAction";

interface MemoryItemProps {
  memory: Memory;
  onDelete: (id: string) => void;
}

//Cuerpo de un MemoryItem
export const MemoryItem = memo(({ memory, onDelete }: MemoryItemProps) => {

  const { colors } = useTheme();

  //Función encargada de la baja del Recuerdo (tras confimación)
  const deleteTheMemory = useCallback((id: string) => {
      confirmAction("Eliminar Recuerdo", `¿Seguro?`, async () => {
      onDelete(id);
      });
    }, [onDelete]);

  return (
    <Animated.View entering={FadeInLeft.springify()} exiting={FadeOutRight} style={[sharedStyles.itemBody, { backgroundColor: colors.itemBackground }]}>

      <View style={sharedStyles.flexed}>
        <Text style={[sharedStyles.itemSubTitle, { color: colors.textPrimary }]}>
          {memory.titulo}
        </Text>
        <Text style={[sharedStyles.itemText, { color: colors.textSecondary }]}>
          {memory.texto}
        </Text>
      </View>

      {/*BOTÓN: Este Recuerdo se perderá en el tiempo igual que lagrimas en la lluvia*/}
      <TouchableOpacity onPress={() => deleteTheMemory(memory.id)}>
        <Text style={sharedStyles.itemIcon}>❌</Text>
      </TouchableOpacity>

    </Animated.View>
  );
});