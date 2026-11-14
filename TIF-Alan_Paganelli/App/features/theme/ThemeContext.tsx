import { Colors, lightColors, darkColors } from "@/features/theme/theme";
import { useStoredState } from "@/shared/useStoredState";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  //useState,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colors: Colors;
  toggleTheme: () => void;
}

//Este código gestiona el Tema, persistiendo en el celular el mismo

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {

  //const [theme, setTheme] = useState<Theme>("light"); → Viejo método, muere al cerrar el app

  const [theme, setTheme] = useStoredState<Theme>("@App:theme", "light");

  const toggleTheme = useCallback(() => { setTheme((prev) => (prev === "light" ? "dark" : "light")); }, [setTheme]);

  //Evitamos que value sea un objeto nuevo en cada render del provider
  const value = useMemo(
    () => ({ theme, colors: theme === "light" ? lightColors : darkColors, toggleTheme, }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un <ThemeProvider>");
  }
  return context;
}