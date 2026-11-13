import { MEMORIES_COLLECTION, Memory } from "@/features/memories/memories";
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

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
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
    const memoriesQuery = query(
      collection(db, MEMORIES_COLLECTION),
      orderBy("fecha", "asc"),
    );

    const slowTimer = setTimeout(() => {
      setLoading(false);
      setOffline(true);
    }, 8000);

    const unsubscribe = onSnapshot(
      memoriesQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        if (!snapshot.metadata.fromCache) {
          clearTimeout(slowTimer);
          setOffline(false);
        }
        const data = snapshot.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Memory,
        );
        setMemories(data);
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

  const addMemory = useCallback(
    async (titulo: string, texto: string, id_juego: string, usuario: string) => {
      if (!db) {
        return false;
      }
      try {
        await addDoc(collection(db, MEMORIES_COLLECTION), {
          titulo,
          texto,
          fecha: Date.now(),
          usuario,
          id_juego,
        });
        return true;
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
        return false;
      }
    },
    [],
  );

  const deleteMemory = useCallback(async (id: string) => {
    if (!db) {
      return;
    }
    try {
      await deleteDoc(doc(db, MEMORIES_COLLECTION, id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  return { memories, loading, error, offline, addMemory, deleteMemory };
}