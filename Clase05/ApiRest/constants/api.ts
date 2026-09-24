import { Platform } from "react-native";

// Tu IP local detectada para que funcione en dispositivos físicos
// revisar en CMD -> ipconfig -> ipv4
const IP_LOCAL = "192.168.0.162";

const BASE_URL =
  Platform.OS === "android"
    ? `http://${IP_LOCAL}:3000`
    : `http://localhost:3000`;

export const API_URL = `${BASE_URL}/campaigns`;

export interface Campaign {
  id: number;
  game: string;
  name: string;
  faction: string;
  description: string;
  extra?: string; // "?" implica que no es obligatorio
}

// Datos para el alta de una campaña en la BD (id autogenerado)
export interface CreateCampaignData {
  game: string;
  name: string;
  faction: string;
  description: string;
  extra?: string;
}