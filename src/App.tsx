import { useRef, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { EAnimalSpecies } from "./types";
import { AVG_HANGING_WEIGHTS } from "./types";
import { calculateHeads, calculateLaborValue } from "./utils/calculations";
import {
  AdvancedSettingsPanel,
  AnnualSummary,
  SpeciesSelectField,
  VolumeInputsSection,
} from "./components";
import {
  COST_PER_LB,
  DEFAULT_HOURLY_WAGE,
  DEFAULT_TIME_PER_ANIMAL_MINUTES,
} from "./constants/calculator";
import "./App.css";

function App() {
  const [selectedSpecies, setSelectedSpecies] = useState<EAnimalSpecies[]>([]);
  const [volumes, setVolumes] = useState<Record<EAnimalSpecies, string>>(
    {} as Record<EAnimalSpecies, string>,
  );
  const [isSpeciesMenuOpen, setIsSpeciesMenuOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [timePerAnimal, setTimePerAnimal] = useState(
    DEFAULT_TIME_PER_ANIMAL_MINUTES,
  );
  const [hourlyWage, setHourlyWage] = useState(DEFAULT_HOURLY_WAGE);
  const menuReopenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpeciesChange = (event: SelectChangeEvent<EAnimalSpecies[]>) => {
    const value = event.target.value;
    const species = typeof value === "string" ? value.split(",") : value;
    setSelectedSpecies(species as EAnimalSpecies[]);

    if (menuReopenTimer.current !== null) {
      clearTimeout(menuReopenTimer.current);
    }
    menuReopenTimer.current = setTimeout(() => {
      setIsSpeciesMenuOpen(true);
      menuReopenTimer.current = null;
    }, 0);
  };

  const handleVolumeChange = (species: EAnimalSpecies, value: string) => {
    setVolumes((prev) => ({ ...prev, [species]: value }));
  };

  const handleSpeciesRemove = (speciesToRemove: EAnimalSpecies) => {
    setSelectedSpecies((prev) =>
      prev.filter((species) => species !== speciesToRemove),
    );
    setVolumes((prev) => {
      const next = { ...prev };
      delete next[speciesToRemove];
      return next;
    });
  };

  const calculateTotalAnnualSavings = () => {
    return selectedSpecies.reduce((total, species) => {
      const volume = parseFloat(volumes[species] || "0");
      if (volume > 0) {
        const avgWeight = AVG_HANGING_WEIGHTS[species];
        const heads = calculateHeads(volume, avgWeight);
        const savings = calculateLaborValue(
          heads,
          parseFloat(timePerAnimal),
          parseFloat(hourlyWage),
        );
        return total + savings;
      }
      return total;
    }, 0);
  };

  const calculateTotalAnnualCost = () => {
    return selectedSpecies.reduce((total, species) => {
      const volume = parseFloat(volumes[species] || "0");
      return total + volume * COST_PER_LB;
    }, 0);
  };

  const getTotalVolume = () => {
    return selectedSpecies.reduce((total, species) => {
      return total + parseFloat(volumes[species] || "0");
    }, 0);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meat Processor Value Calculator
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <SpeciesSelectField
            selectedSpecies={selectedSpecies}
            isSpeciesMenuOpen={isSpeciesMenuOpen}
            onSpeciesChange={handleSpeciesChange}
            onSpeciesMenuOpen={() => setIsSpeciesMenuOpen(true)}
            onSpeciesMenuClose={() => setIsSpeciesMenuOpen(false)}
            onSpeciesRemove={handleSpeciesRemove}
          />

          <VolumeInputsSection
            selectedSpecies={selectedSpecies}
            volumes={volumes}
            onVolumeChange={handleVolumeChange}
          />

          <AdvancedSettingsPanel
            showAdvanced={showAdvanced}
            timePerAnimal={timePerAnimal}
            hourlyWage={hourlyWage}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            onTimePerAnimalChange={setTimePerAnimal}
            onHourlyWageChange={setHourlyWage}
          />
        </Paper>

        <AnnualSummary
          totalAnnualVolume={getTotalVolume()}
          totalAnnualSavings={calculateTotalAnnualSavings()}
          totalAnnualCost={calculateTotalAnnualCost()}
        />
      </Box>
    </Container>
  );
}

export default App;
