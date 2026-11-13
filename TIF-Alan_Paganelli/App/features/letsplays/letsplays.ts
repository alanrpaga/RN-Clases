// Nombre de la colección en Firestore
export const LETSPLAYS_COLLECTION = "letsplays";

export interface Letsplay {
  id: string;           // ← Firebase lo genera
  nombre: string;       // nombre de la partida             Ej: Partida con Bardo/Azata
  descripcion: string;  // texto descriptivo vario          Ej: Intentando pasar el juego utilizando magia de invocación por el camino Azata
  favorito: boolean;    // si es o no es favorita ← si al usuario le interesa marcarla por algo
  estado: boolean;      // estado de la partida             Ej: false: pendiente → true: terminada
  juego: string;        // nombre del juego                 Ej: Pathfinder WotR
  fecha: number;        // fecha en milisegundos ← ordenamos por más nueva/vieja → usuario elige
  usuario: string;      // usuario que lo carga             Ej: Rigoberto
  id_juego: string;     // Juego asocido                    Ej: id de "Pathfinder WotR"
}