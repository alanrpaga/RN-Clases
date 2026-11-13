export const lightColors = {
  // Colores expecíficos del botón para cambiar "Tema"
  themeBackground: "#BBDDEA",
  themeBorder: "#8CA6AF",

  // Colores de para Fondo y Drawer-Tabs
  background: "#F0F1F2",
  drawerBackground: "#DDDEE1",
  tabsBackground: "#DDDEE1",

  // Colores de texto
  textPrimary: "#222222",
  textSecondary: "#555555",
  textDisabled: "#888888",

  // Colores para botones
  buttonNormal: "#357DE8",
  buttonCancel: "#E2483D",
  textButtonFulled: "#eeeeee", // ← Cuando se tiene texto en un botón con color de fondo

  // Colores de los bordes e ingresos (inputs)
  inputBackground: "#F5F5F5",
  inputBorder: "#dddddd",
  inputText: "#333333",

  // Si hay algún error se usa
  someError: "#E2483D",

  // Colores para items
  itemBackground: "#E7E8EA",
  itemBorder: "#D9D9DB",
};

//Se establece lo que tiene que cumplir cualquier tema
export type Colors = typeof lightColors;

export const darkColors: Colors = {
  // Colores expecíficos del botón para cambiar "Tema"
  themeBackground: "#2A3235",
  themeBorder: "#5F6567",

  // Colores de para Fondo y Drawer-Tabs
  background: "#151B24",
  drawerBackground: "#1B212A",
  tabsBackground: "#1B212A",

  // Colores de texto
  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC",
  textDisabled: "#888888",

  // Colores para botones
  buttonNormal: "#1868DB",
  buttonCancel: "#C9372C",
  textButtonFulled: "#eeeeee", // ← Cuando se tiene texto en un botón con color de fondo

  // Colores de los bordes e ingresos (inputs)
  inputBackground: "#0A0A0A",
  inputBorder: "#222222",
  inputText: "#CCCCCC",

  // Si hay algún error se usa
  someError: "#C9372C", 

  // Colores para items
  itemBackground: "#181E27",
  itemBorder: "#27313F",
};

// Si bien son iguales no los unifico en uno solo por ahora, por si se necesita diferenciar en el futuro
//extra small, small, medium, large, extra large, super large, ultra large, logo ←

export const sizes = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  sl: 28,
  ul: 32,
  logo: 64,
}

//atlassian.design/foundations/color/color-palette ← Algunos colores salen desde esta página