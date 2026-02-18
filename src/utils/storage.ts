import { EAnimalSpecies } from "../types";
import type { EAnimalSpecies as AnimalSpecies } from "../types";

const STORAGE_KEY = "farmshare-calculator-state";
const STORAGE_VERSION = 1;

const VALID_SPECIES = new Set<string>(Object.values(EAnimalSpecies));

export interface PersistedCalculatorState {
  selectedSpecies: AnimalSpecies[];
  volumes: Partial<Record<AnimalSpecies, string>>;
  timePerAnimal: string;
  hourlyWage: string;
  showAdvanced: boolean;
}

interface PersistedPayload {
  version: number;
  state: PersistedCalculatorState;
}

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const sanitizeSpecies = (value: unknown): AnimalSpecies[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (species): species is AnimalSpecies =>
      typeof species === "string" && VALID_SPECIES.has(species),
  );
};

const sanitizeVolumes = (
  value: unknown,
): Partial<Record<AnimalSpecies, string>> => {
  if (!isObjectRecord(value)) {
    return {};
  }

  const entries = Object.entries(value).filter(
    ([species, rawVolume]) =>
      VALID_SPECIES.has(species) && typeof rawVolume === "string",
  );

  return Object.fromEntries(entries) as Partial<Record<AnimalSpecies, string>>;
};

const sanitizeState = (value: unknown): PersistedCalculatorState | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  if (typeof value.timePerAnimal !== "string") {
    return null;
  }

  if (typeof value.hourlyWage !== "string") {
    return null;
  }

  if (typeof value.showAdvanced !== "boolean") {
    return null;
  }

  return {
    selectedSpecies: sanitizeSpecies(value.selectedSpecies),
    volumes: sanitizeVolumes(value.volumes),
    timePerAnimal: value.timePerAnimal,
    hourlyWage: value.hourlyWage,
    showAdvanced: value.showAdvanced,
  };
};

export const loadPersistedState = (): PersistedCalculatorState | null => {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as unknown;
    if (!isObjectRecord(parsedValue)) {
      return null;
    }

    if (parsedValue.version !== STORAGE_VERSION) {
      return null;
    }

    return sanitizeState(parsedValue.state);
  } catch {
    return null;
  }
};

export const persistState = (state: PersistedCalculatorState): void => {
  const payload: PersistedPayload = {
    version: STORAGE_VERSION,
    state,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const clearPersistedState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
