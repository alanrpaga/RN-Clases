// Nombre de la colección en Firestore
export const GAMES_COLLECTION = "games";

export interface Game {
  id: string;           // ← Firebase lo genera
  nombre: string;       // nombre del juego         Ej: Pathfinder WotR
  usuario: string;      // Usuario que lo carga     Ej: Rigoberto
}