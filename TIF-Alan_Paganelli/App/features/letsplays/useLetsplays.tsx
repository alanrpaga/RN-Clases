import { LETSPLAYS_COLLECTION, Letsplay } from "@/features/letsplays/letsplays";
import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "../session/SessionContext";

//Este código controla las solicitudes a la base de datos asociadas a las Partidas
export function useLetsplays() {

  //Variables usadas
  const [letsplays, setLetsplays] = useState<Letsplay[]>([]);
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

    //Trae todos las Partidas desde la base de datos
    const letsplayQuery = query(collection(db, LETSPLAYS_COLLECTION), orderBy("fecha", "asc"));

    //Revisión cada cierto tiempo
    const slowTimer = setTimeout(() => {
      setLoading(false);
      setOffline(true);
    }, 8000);

    const unsubscribe = onSnapshot(letsplayQuery, { includeMetadataChanges: true }, (snapshot) => {
      if (!snapshot.metadata.fromCache) {
        clearTimeout(slowTimer);
        setOffline(false);
      }
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Letsplay);
      setLetsplays(data);
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

  //Alta de una Partida
  const addLetsplay = useCallback(
    async (nombre: string, descripcion: string, juego: string, id_juego: string, usuario: string) => {
      if (!db) {
        return false;
      }
      try {
        await addDoc(collection(db, LETSPLAYS_COLLECTION), { nombre, descripcion, favorito: false, estado: false, juego, fecha: Date.now(), usuario, id_juego });
        return true;
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
        return false;
      }
    }, []);

  //Modifica una Partida → pendiente o terminada?
  const toggleLetsplay = useCallback(async (letsplay: Letsplay) => {

    if (!db) return;
    try {
      await updateDoc(doc(db, LETSPLAYS_COLLECTION, letsplay.id), { estado: !letsplay.estado });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  //Modifica una Partida → favorita?
  const favLetsplay = useCallback(async (letsplay: Letsplay) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, LETSPLAYS_COLLECTION, letsplay.id), { favorito: !letsplay.favorito });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  //Baja de una Partida por id
  const deleteLetsplay = useCallback(async (id: string) => {
    if (!db) {
      return;
    }
    try {
      await deleteDoc(doc(db, LETSPLAYS_COLLECTION, id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  return { letsplays, loading, error, offline, addLetsplay, toggleLetsplay, favLetsplay, deleteLetsplay };
}