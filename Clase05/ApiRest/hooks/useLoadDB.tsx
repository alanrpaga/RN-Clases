import { useState } from "react";
import { usePostCampaign } from "./usePostCampaign";

export function useLoadDB() {
  const [errorLoad, setErrorLoad] = useState<string | null>(null);
  const { postCampaign } = usePostCampaign();

  const loadCampaigns = async () => {
    try {
      await postCampaign({
        game: "Warcraft 3 - Reign of Chaos",
        name: "Exodus of the Horde",
        faction: "Orcs",
        description: "Prologue Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - Reign of Chaos",
        name: "The Scourge of Lordaeron",
        faction: "Humans",
        description: "Human Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - Reign of Chaos",
        name: "Path of the Damned",
        faction: "Undeads",
        description: "Undead Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - Reign of Chaos",
        name: "The Invasion of Kalimdor",
        faction: "Orcs",
        description: "Orc Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - Reign of Chaos",
        name: "Eternity's End",
        faction: "Night Elves",
        description: "Night Elf Campaign",
      });

      await postCampaign({
        game: "Warcraft 3 - The Frozen Throne",
        name: "Terror of the Tides",
        faction: "Night Elves",
        description: "Sentinel Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - The Frozen Throne",
        name: "Curse of the Blood Elves",
        faction: "Blood Elves",
        description: "Alliance Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - The Frozen Throne",
        name: "Legacy of the Damned",
        faction: "Undeads",
        description: "Scourge Campaign",
      });
      await postCampaign({
        game: "Warcraft 3 - The Frozen Throne",
        name: "The Founding of Durotar",
        faction: "Orcs",
        description: "Bonus Campaign",
      });

      await postCampaign({
        game: "Warcraft 3 - Forsaken Kingdom",
        name: "The Last Days of Lordaeron",
        faction: "Humans",
        description: "Human Campaign",
        extra: "Demasiada cara la expasión",
      });
      await postCampaign({
        game: "Warcraft 3 - Forsaken Kingdom",
        name: "Forsaken Kingdom",
        faction: "Undeads",
        description: "Undead Campaign",
        extra: "Demasiada cara la expasión",
      });
    } catch (error) {
      setErrorLoad(
        error instanceof Error ? error.message : "Error desconocido",
      );
    }
  };

  return { loadCampaigns, errorLoad };
}