// Nombre de la colección en Firestore
export const NOTES_COLLECTION = "notes";

export interface Note {
  id: string;           // ← Firebase lo genera
  texto: string;        // qué se busca recordar        Ej: Encontré un cofre en la prisión pero no veo como llegar
  estado: boolean;      // estado de lo anotado         Ej: false: pendiente → true: realizada
  usuario: string;      // usuario que lo carga         Ej: Rigoberto
  id_partida: string;   // Partida asociada             Ej: id de "Partida con Bardo/Azata"
  id_juego: string;     // Juego asociado               Ej: id de "Pathfinder WotR"
  fecha: number;        // fecha en milisegundos ← ordenamos por más viejo
}