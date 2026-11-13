/* eslint-disable react/display-name */
import React, { memo } from "react";
import { Note } from "./notes";
import { useTheme } from "../theme/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import sharedStyles from "../../shared/sharedStyles";

interface NoteItemProps {
  note: Note;
  onToggle: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteItem = memo(({ note, onToggle, onDelete }: NoteItemProps) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeInLeft.springify()}
      exiting={FadeOutRight}
      style={[sharedStyles.itemBody, { backgroundColor: colors.itemBackground }]}
    >
      <TouchableOpacity
        style={sharedStyles.itemContent}
        onPress={() => onToggle(note)}
      >
        <Text style={sharedStyles.itemText}>{note.estado ? "✅" : "⬜"}</Text>
        <View style={sharedStyles.flexed}>
          <Text
            style={[
              sharedStyles.itemText,
              {
                color: note.estado ? colors.textDisabled : colors.textSecondary,
              },
              note.estado && sharedStyles.itemTextDone,
            ]}
          >
            {note.texto}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <Text style={sharedStyles.itemIcon}>❌</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});