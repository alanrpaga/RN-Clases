import { API_URL, Campaign } from "@/constants/api";
import { useEffect, useState } from "react";

export function useGetCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorGet, setErrorGet] = useState<string | null>(null);

  const getCampaigns = async () => {
    try {
      setLoading(true);
      setErrorGet(null);
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status} en el servidor`);
      } else {
        const data: Campaign[] = await response.json();
        setCampaigns(data);
      }
    } catch (error) {
      setErrorGet(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return { campaigns, loading, errorGet, getCampaigns };
}