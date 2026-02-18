import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { EAnimalSpecies } from "./types";
import { AVG_HANGING_WEIGHTS } from "./types";
import { calculateHeads, calculateLaborValue } from "./utils/calculations";
import {
  AdvancedSettingsPanel,
  AnnualSummary,
  CalculatorActionsBar,
  ClearAllDialog,
  MonthlyBreakdown,
  SpeciesPresetsBar,
  SpeciesSelectField,
  VolumeInputsSection,
} from "./components";
import {
  COST_PER_LB,
  DEFAULT_HOURLY_WAGE,
  DEFAULT_TIME_PER_ANIMAL_MINUTES,
  MAX_ANNUAL_VOLUME,
  MAX_HOURLY_WAGE,
  MAX_TIME_PER_ANIMAL_MINUTES,
} from "./constants/calculator";
import { SPECIES_PRESETS } from "./constants/presets";
import {
  hasValidationErrors,
  parseNonNegativeNumber,
  validateInputs,
} from "./utils/validation";
import {
  clearPersistedState,
  loadPersistedState,
  persistState,
} from "./utils/storage";
import "./App.css";

function App() {
  const initialPersistedState = useMemo(() => loadPersistedState(), []);
  const [selectedSpecies, setSelectedSpecies] = useState<EAnimalSpecies[]>(
    () => initialPersistedState?.selectedSpecies ?? [],
  );
  const [volumes, setVolumes] = useState<Partial<Record<EAnimalSpecies, string>>>(
    () => initialPersistedState?.volumes ?? {},
  );
  const [isSpeciesMenuOpen, setIsSpeciesMenuOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(
    () => initialPersistedState?.showAdvanced ?? false,
  );
  const [showClearAllDialog, setShowClearAllDialog] = useState(false);
  const [timePerAnimal, setTimePerAnimal] = useState(
    () => initialPersistedState?.timePerAnimal ?? DEFAULT_TIME_PER_ANIMAL_MINUTES,
  );
  const [hourlyWage, setHourlyWage] = useState(
    () => initialPersistedState?.hourlyWage ?? DEFAULT_HOURLY_WAGE,
  );
  const menuReopenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPersistedInitialState = useRef(false);
  const validationErrors = useMemo(
    () =>
      validateInputs({
        selectedSpecies,
        volumes,
        timePerAnimal,
        hourlyWage,
      }),
    [selectedSpecies, volumes, timePerAnimal, hourlyWage],
  );
  const hasErrors = hasValidationErrors(validationErrors);
  const projectionRows = useMemo(
    () =>
      selectedSpecies.map((species) => {
        const annualVolume = validationErrors.volumes[species]
          ? 0
          : parseNonNegativeNumber(volumes[species] || "");
        const annualHeads =
          annualVolume > 0
            ? calculateHeads(annualVolume, AVG_HANGING_WEIGHTS[species])
            : 0;
        const annualSavings = calculateLaborValue(
          annualHeads,
          validationErrors.timePerAnimal ? 0 : parseNonNegativeNumber(timePerAnimal),
          validationErrors.hourlyWage ? 0 : parseNonNegativeNumber(hourlyWage),
        );
        const annualCost = annualVolume * COST_PER_LB;
        const annualNetBenefit = annualSavings - annualCost;

        return {
          species,
          annualHeads,
          annualVolume,
          annualSavings,
          annualCost,
          annualNetBenefit,
          monthlyVolume: annualVolume / 12,
          monthlySavings: annualSavings / 12,
          monthlyCost: annualCost / 12,
          monthlyNetBenefit: annualNetBenefit / 12,
        };
      }),
    [selectedSpecies, volumes, timePerAnimal, hourlyWage, validationErrors],
  );
  const projectionTotals = useMemo(
    () =>
      projectionRows.reduce(
        (totals, row) => ({
          annualVolume: totals.annualVolume + row.annualVolume,
          annualSavings: totals.annualSavings + row.annualSavings,
          annualCost: totals.annualCost + row.annualCost,
          annualNetBenefit: totals.annualNetBenefit + row.annualNetBenefit,
          monthlyVolume: totals.monthlyVolume + row.monthlyVolume,
          monthlySavings: totals.monthlySavings + row.monthlySavings,
          monthlyCost: totals.monthlyCost + row.monthlyCost,
          monthlyNetBenefit: totals.monthlyNetBenefit + row.monthlyNetBenefit,
        }),
        {
          annualVolume: 0,
          annualSavings: 0,
          annualCost: 0,
          annualNetBenefit: 0,
          monthlyVolume: 0,
          monthlySavings: 0,
          monthlyCost: 0,
          monthlyNetBenefit: 0,
        },
      ),
    [projectionRows],
  );
  const isAtDefaults =
    selectedSpecies.length === 0 &&
    Object.keys(volumes).length === 0 &&
    timePerAnimal === DEFAULT_TIME_PER_ANIMAL_MINUTES &&
    hourlyWage === DEFAULT_HOURLY_WAGE &&
    !showAdvanced;

  useEffect(() => {
    if (!hasPersistedInitialState.current) {
      hasPersistedInitialState.current = true;
      return;
    }

    persistState({
      selectedSpecies,
      volumes,
      timePerAnimal,
      hourlyWage,
      showAdvanced,
    });
  }, [
    selectedSpecies,
    volumes,
    timePerAnimal,
    hourlyWage,
    showAdvanced,
  ]);

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

  const handleApplyPreset = (presetId: string) => {
    const preset = SPECIES_PRESETS.find((entry) => entry.id === presetId);
    if (!preset) {
      return;
    }

    setSelectedSpecies(preset.species);
    setVolumes(preset.volumes);
    setIsSpeciesMenuOpen(false);
  };

  const resetToDefaults = () => {
    setSelectedSpecies([]);
    setVolumes({});
    setTimePerAnimal(DEFAULT_TIME_PER_ANIMAL_MINUTES);
    setHourlyWage(DEFAULT_HOURLY_WAGE);
    setShowAdvanced(false);
    setIsSpeciesMenuOpen(false);
  };

  const handleOpenClearAll = () => {
    setShowClearAllDialog(true);
  };

  const handleCloseClearAll = () => {
    setShowClearAllDialog(false);
  };

  const handleConfirmClearAll = () => {
    resetToDefaults();
    setShowClearAllDialog(false);
  };

  const handleResetSavedData = () => {
    clearPersistedState();
    resetToDefaults();
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meat Processor Value Calculator
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <SpeciesPresetsBar onApplyPreset={handleApplyPreset} />
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
            volumeErrors={validationErrors.volumes}
            maxAnnualVolume={MAX_ANNUAL_VOLUME}
            onVolumeChange={handleVolumeChange}
          />
          <CalculatorActionsBar
            isClearAllDisabled={isAtDefaults}
            onOpenClearAll={handleOpenClearAll}
            onResetSavedData={handleResetSavedData}
          />

          <AdvancedSettingsPanel
            showAdvanced={showAdvanced}
            timePerAnimal={timePerAnimal}
            hourlyWage={hourlyWage}
            timePerAnimalError={validationErrors.timePerAnimal}
            hourlyWageError={validationErrors.hourlyWage}
            maxTimePerAnimal={MAX_TIME_PER_ANIMAL_MINUTES}
            maxHourlyWage={MAX_HOURLY_WAGE}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            onTimePerAnimalChange={setTimePerAnimal}
            onHourlyWageChange={setHourlyWage}
          />
        </Paper>

        <AnnualSummary
          totalAnnualVolume={projectionTotals.annualVolume}
          totalAnnualSavings={projectionTotals.annualSavings}
          totalAnnualCost={projectionTotals.annualCost}
          hasErrors={hasErrors}
        />
        <MonthlyBreakdown
          rows={projectionRows}
          monthlyVolume={projectionTotals.monthlyVolume}
          monthlySavings={projectionTotals.monthlySavings}
          monthlyCost={projectionTotals.monthlyCost}
          monthlyNetBenefit={projectionTotals.monthlyNetBenefit}
        />
        <ClearAllDialog
          open={showClearAllDialog}
          onCancel={handleCloseClearAll}
          onConfirm={handleConfirmClearAll}
        />
      </Box>
    </Container>
  );
}

export default App;
