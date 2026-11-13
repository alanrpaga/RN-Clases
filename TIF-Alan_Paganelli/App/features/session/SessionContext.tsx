import { useStoredState } from "@/shared/useStoredState";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface SessionContextType {
  user: string | null;
  isReady: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser, isReady] = useStoredState<string | null>(
    "@App:session",
    null,
  );

  const login = useCallback((name: string) => setUser(name.trim()), [setUser]);

  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, isReady, login, logout }),
    [user, isReady, login, logout],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession debe usarse dentro de un <SessionProvider>");
  }
  return context;
}
