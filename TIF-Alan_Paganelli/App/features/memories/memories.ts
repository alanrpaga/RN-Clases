// Nombre de la colección en Firestore
export const MEMORIES_COLLECTION = "memories";

export interface Memory {
  id: string;           // ← Firebase lo genera
  titulo: string;       // título del recuerdito        Ej: Puzzles Acto 5 - Prison
  texto: string;        // qué se busca recordar        Ej: Las contraseñas son 0356 (catarata), 4365 (totem), 6045 (arco)
  fecha: number;        // fecha en milisegundos ← ordenamos por más nuevo
  usuario: string;      // usuario que lo carga         Ej: Rigoberto
  id_juego: string;     // Juego asocido                Ej: id de "Pathfinder WotR"
}