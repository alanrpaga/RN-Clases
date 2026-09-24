import { API_URL, CreateCampaignData } from "@/constants/api";
import { useEffect, useState } from "react";

export function usePostCampaign() {
  const [newCampaigns, setNewCampaigns] = useState<CreateCampaignData[]>([]);
  const [errorPost, setErrorPost] = useState<string | null>(null);

  const postCampaign = async () => {
    setNewCampaigns([
      {
        game: "Warcraft 3 - Reign of Chaos",
        name: "Exodus of the Horde",
        faction: "Orcs",
        description: "Prologue Campaign",
      },
      {
        game: "Warcraft 3 - Reign of Chaos",
        name: "The Scourge of Lordaeron",
        faction: "Humans",
        description: "Human Campaign",
      },
      {
        game: "Warcraft 3 - Reign of Chaos",
        name: "Path of the Damned",
        faction: "Undeads",
        description: "Undead Campaign",
      },
      {
        game: "Warcraft 3 - Reign of Chaos",
        name: "The Invasion of Kalimdor",
        faction: "Orcs",
        description: "Orc Campaign",
      },
      {
        game: "Warcraft 3 - Reign of Chaos",
        name: "Eternity's End",
        faction: "Night Elves",
        description: "Night Elf Campaign",
      },
      {
        game: "Warcraft 3 - The Frozen Throne",
        name: "Terror of the Tides",
        faction: "Night Elves",
        description: "Sentinel Campaign",
      },
      {
        game: "Warcraft 3 - The Frozen Throne",
        name: "Curse of the Blood Elves",
        faction: "Blood Elves",
        description: "Alliance Campaign",
      },
      {
        game: "Warcraft 3 - The Frozen Throne",
        name: "Legacy of the Damned",
        faction: "Undeads",
        description: "Scourge Campaign",
      },
      {
        game: "Warcraft 3 - The Frozen Throne",
        name: "The Founding of Durotar",
        faction: "Orcs",
        description: "Bonus Campaign",
      },
      {
        game: "Warcraft 3 - Forsaken Kingdom",
        name: "The Last Days of Lordaeron",
        faction: "Humans",
        description: "Human Campaign",
        extra: "Demasiada cara la expasión",
      },
      {
        game: "Warcraft 3 - Forsaken Kingdom",
        name: "Forsaken Kingdom",
        faction: "Undeads",
        description: "Undead Campaign",
        extra: "Demasiada cara la expasión",
      },
    ]);

    try {
      setErrorPost(null);

      const requests = newCampaigns.map((item) =>
        fetch(`${API_URL}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item), //
        })
      );

      await Promise.all(requests);
    } catch (error) {
      setErrorPost(
        error instanceof Error ? error.message : "Error desconocido",
      );
    }
  };

  useEffect(() => {
    postCampaign();
  },[]);

  return { postCampaign, errorPost };
}