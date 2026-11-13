import { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export default function useShakeAnimation(){
  
  //Inicia animación sacudir //Gracias profe por la animación
  const x = useSharedValue(0);
  const shake = () => {
    x.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 100 }), 4, true),
      withTiming(0, { duration: 50 }),
    );
  };
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));
  //Fin animación

  return {shake, shakeStyle}
}
  