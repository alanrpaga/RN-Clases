import { useSession } from "@/features/session/SessionContext";
import { useTheme } from "@/features/theme/ThemeContext";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import sharedStyles from "../shared/sharedStyles";
import useShakeAnimation from "@/shared/useShakeAnimation";

export default function Login() {
  const { colors, theme, toggleTheme } = useTheme();
  const { login } = useSession();
  const {shake, shakeStyle} = useShakeAnimation();

  const [name, setName] = useState("");
  const [errorEntry, setErrorEntry] = useState("");

  const handleLogin = () => {
    if (!name.trim()) {
      setErrorEntry("Nombre por favor");
      shake();
      return;
    }
    setErrorEntry("");
    login(name);
  };

  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={[sharedStyles.fullSize, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          sharedStyles.buttonThemeBorder,
          { backgroundColor: colors.themeBackground, borderColor: colors.themeBorder },
        ]}
      >
        <Text style={sharedStyles.buttonThemeText}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>
      <Text style={[sharedStyles.logo, { color: colors.textPrimary, textShadowColor: colors.textPrimary }]}>
        LUDERE
      </Text>
      <View
        style={[sharedStyles.container, { backgroundColor: colors.background }]}
      >
        <Animated.View
          entering={ZoomIn.springify()}
          style={sharedStyles.wrapper}
        >
          <Text style={[sharedStyles.title, { color: colors.textPrimary }]}>
            ✨Hola~✨
          </Text>
          <Text
            style={[sharedStyles.subtitle, { color: colors.textSecondary }]}
          >
            Espero poder ayudarte
          </Text>
          <Text
            style={[sharedStyles.subtitle, { color: colors.textSecondary }]}
          >
            ¿Cómo quieres que te llame?
          </Text>
          <Animated.View style={[sharedStyles.inputCard, shakeStyle]}>
            <TextInput
              style={[
                sharedStyles.inputText,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: errorEntry ? colors.someError : colors.inputBorder,
                  color: colors.inputText,
                },
              ]}
              autoCapitalize="words"
              onChangeText={setName}
              onSubmitEditing={handleLogin}
              placeholder="Rigoberto"
              placeholderTextColor={colors.textDisabled}
              value={name}
            />
            {errorEntry !== "" && (
              <Text style={[{ alignSelf: "center" }, { color: colors.someError }]}>
                {errorEntry}
              </Text>
            )}
          </Animated.View>
          <TouchableOpacity
            style={[sharedStyles.buttonBorderless, { backgroundColor: colors.buttonNormal }]}
            onPress={handleLogin}
          >
            <Text
              style={[
                sharedStyles.buttonText,
                { color: colors.textButtonFulled },
              ]}
            >
              Entrar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}