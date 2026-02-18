import { Box, Button, Stack, Typography } from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { SPECIES_PRESETS } from "../constants/presets";

interface SpeciesPresetsBarProps {
  onApplyPreset: (presetId: string) => void;
}

export const SpeciesPresetsBar = ({ onApplyPreset }: SpeciesPresetsBarProps) => {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
        <AutoAwesomeOutlinedIcon color="primary" fontSize="small" />
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
          Species Presets
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {SPECIES_PRESETS.map((preset) => (
          <Button
            key={preset.id}
            variant="outlined"
            size="small"
            onClick={() => onApplyPreset(preset.id)}
            sx={{
              borderRadius: 2,
              borderColor: "rgba(47,122,103,0.4)",
              bgcolor: "rgba(47,122,103,0.08)",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(47,122,103,0.16)",
              },
            }}
          >
            {preset.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
