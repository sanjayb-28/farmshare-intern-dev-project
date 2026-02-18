import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { EAnimalSpecies } from "../types";
import { EAnimalSpecies as AnimalSpecies } from "../types";

interface SpeciesSelectFieldProps {
  selectedSpecies: EAnimalSpecies[];
  isSpeciesMenuOpen: boolean;
  onSpeciesChange: (event: SelectChangeEvent<EAnimalSpecies[]>) => void;
  onSpeciesMenuOpen: () => void;
  onSpeciesMenuClose: () => void;
  onSpeciesRemove: (species: EAnimalSpecies) => void;
}

export const SpeciesSelectField = ({
  selectedSpecies,
  isSpeciesMenuOpen,
  onSpeciesChange,
  onSpeciesMenuOpen,
  onSpeciesMenuClose,
  onSpeciesRemove,
}: SpeciesSelectFieldProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Select Animal Species</InputLabel>
      <Select
        multiple
        value={selectedSpecies}
        onChange={onSpeciesChange}
        open={isSpeciesMenuOpen}
        onOpen={onSpeciesMenuOpen}
        onClose={onSpeciesMenuClose}
        input={<OutlinedInput label="Select Animal Species" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value.charAt(0).toUpperCase() + value.slice(1)}
                aria-label={`remove ${value}`}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={() => onSpeciesRemove(value)}
                onDelete={() => onSpeciesRemove(value)}
              />
            ))}
          </Box>
        )}
      >
        {Object.values(AnimalSpecies).map((species) => (
          <MenuItem key={species} value={species}>
            {species.charAt(0).toUpperCase() + species.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
