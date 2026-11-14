import { NOTES_COLLECTION, Note } from "@/features/notes/notes";
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

//Este código controla las solicitudes a la base de datos asociadas a las Notas
export function useNotes() {

  //Variables usadas
  const [notes, setNotes] = useState<Note[]>([]);
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

    //Trae todos las Notas desde la base de datos
    const notesQuery = query(collection(db, NOTES_COLLECTION), orderBy("fecha", "asc"));

    const slowTimer = setTimeout(() => {
      setLoading(false);
      setOffline(true);
    }, 8000);

    const unsubscribe = onSnapshot(notesQuery, { includeMetadataChanges: true }, (snapshot) => {
      if (!snapshot.metadata.fromCache) {
        clearTimeout(slowTimer);
        setOffline(false);
      }
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Note);
      setNotes(data);
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

  //Alta de una Nota
  const addNote = useCallback(
    async (texto: string, id_partida: string, id_juego: string, usuario: string) => {
      if (!db) {
        return false;
      }
      try {
        await addDoc(collection(db, NOTES_COLLECTION), { texto, estado: false, fecha: Date.now(), usuario, id_partida, id_juego });
        return true;
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
        return false;
      }
    }, []);

  //Modifica una Nota → hecha o no?
  const toggleNote = useCallback(async (note: Note) => {
    if (!db) {
      return;
    }
    try {
      await updateDoc(doc(db, NOTES_COLLECTION, note.id), {
        estado: !note.estado,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  //Baja de una Nota por id
  const deleteNote = useCallback(async (id: string) => {
    if (!db) {
      return;
    }
    try {
      await deleteDoc(doc(db, NOTES_COLLECTION, id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }, []);

  return { notes, loading, error, offline, addNote, toggleNote, deleteNote };
}