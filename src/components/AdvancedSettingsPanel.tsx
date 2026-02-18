import { Box, Collapse, IconButton, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AdvancedSettingsPanelProps {
  showAdvanced: boolean;
  timePerAnimal: string;
  hourlyWage: string;
  onToggleAdvanced: () => void;
  onTimePerAnimalChange: (value: string) => void;
  onHourlyWageChange: (value: string) => void;
}

export const AdvancedSettingsPanel = ({
  showAdvanced,
  timePerAnimal,
  hourlyWage,
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
        />
        <TextField
          fullWidth
          label="Average Hourly Wage ($)"
          type="number"
          value={hourlyWage}
          onChange={(event) => onHourlyWageChange(event.target.value)}
          sx={{ mb: 2 }}
        />
      </Collapse>
    </>
  );
};
