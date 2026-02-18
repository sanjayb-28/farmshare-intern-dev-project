import type { EAnimalSpecies } from "../types";

export interface SpeciesPreset {
  id: string;
  label: string;
  species: EAnimalSpecies[];
  volumes: Partial<Record<EAnimalSpecies, string>>;
}

export const SPECIES_PRESETS: SpeciesPreset[] = [
  {
    id: "beef-focused",
    label: "Beef Focused",
    species: ["beef"],
    volumes: {
      beef: "2000000",
    },
  },
  {
    id: "mixed-processor",
    label: "Mixed Processor",
    species: ["beef", "hog"],
    volumes: {
      beef: "1200000",
      hog: "1000000",
    },
  },
  {
    id: "small-ruminant",
    label: "Small Ruminant",
    species: ["lamb", "goat"],
    volumes: {
      lamb: "350000",
      goat: "250000",
    },
  },
];
