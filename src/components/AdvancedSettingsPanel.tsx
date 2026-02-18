import { Box, Collapse, IconButton, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AdvancedSettingsPanelProps {
  showAdvanced: boolean;
  timePerAnimal: string;
  hourlyWage: string;
  timePerAnimalError?: string;
  hourlyWageError?: string;
  maxTimePerAnimal: number;
  maxHourlyWage: number;
  onToggleAdvanced: () => void;
  onTimePerAnimalChange: (value: string) => void;
  onHourlyWageChange: (value: string) => void;
}

export const AdvancedSettingsPanel = ({
  showAdvanced,
  timePerAnimal,
  hourlyWage,
  timePerAnimalError,
  hourlyWageError,
  maxTimePerAnimal,
  maxHourlyWage,
  onToggleAdvanced,
  onTimePerAnimalChange,
  onHourlyWageChange,
}: AdvancedSettingsPanelProps) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Advanced Settings
        </Typography>
        <IconButton
          onClick={onToggleAdvanced}
          sx={{
            transform: showAdvanced ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={showAdvanced}>
        <TextField
          fullWidth
          label="Time Savings per Animal (minutes)"
          type="number"
          value={timePerAnimal}
          onChange={(event) => onTimePerAnimalChange(event.target.value)}
          sx={{ mb: 2 }}
          inputProps={{ min: 0, max: maxTimePerAnimal }}
          error={Boolean(timePerAnimalError)}
          helperText={timePerAnimalError}
        />
        <TextField
          fullWidth
          label="Average Hourly Wage ($)"
          type="number"
          value={hourlyWage}
          onChange={(event) => onHourlyWageChange(event.target.value)}
          sx={{ mb: 2 }}
          inputProps={{ min: 0, max: maxHourlyWage }}
          error={Boolean(hourlyWageError)}
          helperText={hourlyWageError}
        />
      </Collapse>
    </>
  );
};
