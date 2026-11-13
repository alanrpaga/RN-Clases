import { GAMES_COLLECTION, Game } from "@/features/games/games";
import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "../session/SessionContext";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false); //
  const { user } = useSession();

    useEffect(() => {
      if (!db) {
        setError("Configuración faltante de Firebase - revisar .env");
        setLoading(false);
        return;
      }
      const gamesQuery = query(
        collection(db, GAMES_COLLECTION),
        orderBy("nombre", "asc"),
      );
  
      const slowTimer = setTimeout(() => {
        setLoading(false);
        setOffline(true);
      }, 8000);
  
      const unsubscribe = onSnapshot(
        gamesQuery,
        { includeMetadataChanges: true },
        (snapshot) => {
          if (!snapshot.metadata.fromCache) {
            clearTimeout(slowTimer);
            setOffline(false);
          }
          const data = snapshot.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as Game,
          );
          setGames(data);
          setError(null);
          setLoading(false);
        },
        (err) => {
          clearTimeout(slowTimer);
          setError(err.message);
          setLoading(false);
        },
      );
  
      return () => {
        clearTimeout(slowTimer);
        unsubscribe();
      };
    }, [user]);

    const addGame = useCallback(
        async (nombre: string, usuario: string) => {
          if (!db) {
            return false;
          }
          try {
            await addDoc(collection(db, GAMES_COLLECTION), {
              nombre,
              usuario,
            });
            return true;
          } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
            return false;
          }
        },
        [],
      );

        const deleteGame = useCallback(async (id: string) => {
          if (!db) {
            return;
          }
          try {
            await deleteDoc(doc(db, GAMES_COLLECTION, id));
          } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
          }
        }, []);
      
        return { games, loading, error, offline, addGame, deleteGame };
    }