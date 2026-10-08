export const lightColors = {
  // Colores de fondos
  background: "#ffffff",
  surface: "#dddddd",
  card: "#bbbbbb",

  // Colores de texto
  textPrimary: "#333344",
  textSecondary: "#666677",
  textDisable: "#9999aa",

  // Colores de acciones y estados
  primary: "#3333bb",
  sucess: "#33bb33",
  sucessDisabled: "#99bb99",
  error: "#ff3333",
  onPrimary: "#eeeeff", // ← Cuando se tiene texto en un botón con color de fondo

  // Colores de los bordes e ingresos (inputs)
  border: "#e0e0e0",
  inputBackground: "#f5f5f5",
  inputBorder: "#dddddd",
  inputText: "#333333",
};

//Se establece lo que tiene que cumplir cualquier tema
export type Colors = typeof lightColors;

export const darkColors: Colors = {
  // Colores de fondos
  background: "#000000",
  surface: "#222222",
  card: "#444444",

  // Colores de texto
  textPrimary: "#BBBBCC",
  textSecondary: "#888899",
  textDisable: "#555566",

  // Colores de acciones y estados
  primary: "#4444CC",
  sucess: "#44CC44",
  sucessDisabled: "#446644",
  error: "#CC0000",
  onPrimary: "#eeeeff", // ← Cuando se tiene texto en un botón con color de fondo

  // Colores de los bordes e ingresos (inputs)
  border: "#1F1F1F",
  inputBackground: "#0A0A0A",
  inputBorder: "#222222",
  inputText: "#CCCCCC",
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
