/* eslint-disable react/display-name */
import React, { memo } from "react";
import { Memory } from "./memories";
import { useTheme } from "../theme/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import sharedStyles from "../../shared/sharedStyles";

interface MemoryItemProps {
  memory: Memory;
  onDelete: (id: string) => void;
}

export const MemoryItem = memo(({ memory, onDelete }: MemoryItemProps) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeInLeft.springify()}
      exiting={FadeOutRight}
      style={[sharedStyles.itemBody, { backgroundColor: colors.itemBackground }]}
    >
      <View style={sharedStyles.flexed}>
        <Text style={[sharedStyles.itemSubTitle, { color: colors.textPrimary }]}>
          {memory.titulo}
        </Text>
        <Text style={[sharedStyles.itemText, { color: colors.textSecondary }]}>
          {memory.texto}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(memory.id)}>
        <Text style={sharedStyles.itemIcon}>❌</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});