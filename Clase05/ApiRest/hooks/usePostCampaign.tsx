import { API_URL, CreateCampaignData } from "@/constants/api";
import { useCallback, useState } from "react";

export function usePostCampaign() {
  const [loading, setLoading] = useState(false);
  const [errorPost, setErrorPost] = useState<string | null>(null);

  const postCampaign = useCallback(async (userData: CreateCampaignData) => {
    try {
      setLoading(true);
      setErrorPost(null);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status} al guardar la campaña`);
      }
      await response.json();
      return true;
    } catch (error) {
      setErrorPost(
        error instanceof Error ? error.message : "Error desconocido",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postCampaign, loading, errorPost };
}