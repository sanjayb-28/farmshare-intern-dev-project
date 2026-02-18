import { Box, Button, Stack, Typography } from "@mui/material";
import { SPECIES_PRESETS } from "../constants/presets";

interface SpeciesPresetsBarProps {
  onApplyPreset: (presetId: string) => void;
}

export const SpeciesPresetsBar = ({ onApplyPreset }: SpeciesPresetsBarProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Species Presets
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {SPECIES_PRESETS.map((preset) => (
          <Button
            key={preset.id}
            variant="outlined"
            size="small"
            onClick={() => onApplyPreset(preset.id)}
          >
            {preset.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
