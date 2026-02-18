import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import type { EAnimalSpecies } from "../types";
import { AVG_HANGING_WEIGHTS } from "../types";

interface VolumeInputsSectionProps {
  selectedSpecies: EAnimalSpecies[];
  volumes: Record<EAnimalSpecies, string>;
  volumeErrors: Partial<Record<EAnimalSpecies, string>>;
  maxAnnualVolume: number;
  onVolumeChange: (species: EAnimalSpecies, value: string) => void;
}

export const VolumeInputsSection = ({
  selectedSpecies,
  volumes,
  volumeErrors,
  maxAnnualVolume,
  onVolumeChange,
}: VolumeInputsSectionProps) => {
  if (selectedSpecies.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Annual Processing Volume by Species
      </Typography>
      {selectedSpecies.map((species) => (
        <Card key={species} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              {species.charAt(0).toUpperCase() + species.slice(1)}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                (Avg: {AVG_HANGING_WEIGHTS[species]} lbs/animal)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              label="Total Annual Hanging Weight (lbs)"
              type="number"
              value={volumes[species] || ""}
              onChange={(event) => onVolumeChange(species, event.target.value)}
              inputProps={{ min: 0, max: maxAnnualVolume }}
              error={Boolean(volumeErrors[species])}
              helperText={volumeErrors[species]}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
