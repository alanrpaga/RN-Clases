/* eslint-disable react/display-name */
import React, { memo, useCallback } from "react";
import { Note } from "./notes";
import { useTheme } from "../theme/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import sharedStyles from "../../shared/sharedStyles";
import { confirmAction } from "@/shared/confirmAction";

interface NoteItemProps {
  note: Note;
  onToggle: (note: Note) => void;
  onDelete: (id: string) => void;
}

//Cuerpo de un NoteItem
export const NoteItem = memo(({ note, onToggle, onDelete }: NoteItemProps) => {

  const { colors } = useTheme();

  //Función encargada de la baja de la Nota (tras confimación)
  const deleteTheNote = useCallback((id: string) => {
    confirmAction("Eliminar Nota", `¿Seguro?`, async () => {
      onDelete(id);
    });
  }, [onDelete]);

  return (
    <Animated.View entering={FadeInLeft.springify()} exiting={FadeOutRight} style={[sharedStyles.itemBody, { backgroundColor: colors.itemBackground }]}>

      <TouchableOpacity style={sharedStyles.itemContent} onPress={() => onToggle(note)}>
        <Text style={sharedStyles.itemText}>{note.estado ? "✅" : "⬜"}</Text>
        <View style={sharedStyles.flexed}>
          <Text style={[sharedStyles.itemText, { color: note.estado ? colors.textDisabled : colors.textSecondary, }, note.estado && sharedStyles.itemTextDone]}>
            {note.texto}
          </Text>
        </View>
      </TouchableOpacity>

      {/*BOTÓN: Solicita la eliminación de esta Nota*/}
      <TouchableOpacity onPress={() => deleteTheNote(note.id)}>
        <Text style={sharedStyles.itemIcon}>❌</Text>
      </TouchableOpacity>

    </Animated.View>
  );
});