import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { CalculatorInputs, ComparisonState, EAnimalSpecies } from "./types";
import {
  AdvancedSettingsPanel,
  AnnualSummary,
  CalculatorActionsBar,
  ComparisonPanel,
  ClearAllDialog,
  MonthlyBreakdown,
  SpeciesPresetsBar,
  SpeciesSelectField,
  VolumeInputsSection,
} from "./components";
import {
  DEFAULT_HOURLY_WAGE,
  DEFAULT_TIME_PER_ANIMAL_MINUTES,
  MAX_ANNUAL_VOLUME,
  MAX_HOURLY_WAGE,
  MAX_TIME_PER_ANIMAL_MINUTES,
} from "./constants/calculator";
import { SPECIES_PRESETS } from "./constants/presets";
import {
  hasValidationErrors,
  validateInputs,
} from "./utils/validation";
import {
  clearPersistedState,
  loadPersistedState,
  persistState,
} from "./utils/storage";
import { calculateProjection } from "./utils/projection";
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
  const [comparison, setComparison] = useState<ComparisonState>(
    () => initialPersistedState?.comparison ?? { A: null, B: null },
  );
  const menuReopenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPersistedInitialState = useRef(false);
  const currentInputs = useMemo<CalculatorInputs>(
    () => ({
      selectedSpecies,
      volumes,
      timePerAnimal,
      hourlyWage,
    }),
    [selectedSpecies, volumes, timePerAnimal, hourlyWage],
  );
  const validationErrors = useMemo(
    () => validateInputs(currentInputs),
    [currentInputs],
  );
  const currentProjection = useMemo(
    () => calculateProjection(currentInputs),
    [currentInputs],
  );
  const scenarioAProjection = useMemo(
    () => (comparison.A ? calculateProjection(comparison.A.inputs) : null),
    [comparison.A],
  );
  const scenarioBProjection = useMemo(
    () => (comparison.B ? calculateProjection(comparison.B.inputs) : null),
    [comparison.B],
  );
  const hasErrors = hasValidationErrors(validationErrors);
  const isAtDefaults =
    selectedSpecies.length === 0 &&
    Object.keys(volumes).length === 0 &&
    timePerAnimal === DEFAULT_TIME_PER_ANIMAL_MINUTES &&
    hourlyWage === DEFAULT_HOURLY_WAGE &&
    !showAdvanced &&
    comparison.A === null &&
    comparison.B === null;

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
      comparison,
    });
  }, [
    selectedSpecies,
    volumes,
    timePerAnimal,
    hourlyWage,
    showAdvanced,
    comparison,
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
    setComparison({ A: null, B: null });
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

  const handleSaveScenario = (slot: "A" | "B") => {
    const snapshotInputs: CalculatorInputs = {
      selectedSpecies: [...selectedSpecies],
      volumes: { ...volumes },
      timePerAnimal,
      hourlyWage,
    };

    setComparison((prev) => ({
      ...prev,
      [slot]: {
        inputs: snapshotInputs,
        capturedAt: new Date().toISOString(),
      },
    }));
  };

  const handleClearScenario = (slot: "A" | "B") => {
    setComparison((prev) => ({
      ...prev,
      [slot]: null,
    }));
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1680px",
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
      }}
    >
      <Box className="app-shell" sx={{ my: { xs: 3, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          Meat Processor Value Calculator
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              xl: "minmax(380px, 430px) minmax(0, 1fr)",
            },
            alignItems: "start",
          }}
        >
          <Paper
            sx={{
              p: 2,
              position: { xl: "sticky" },
              top: { xl: 24 },
            }}
          >
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

          <Box sx={{ display: "grid", gap: 3 }}>
            <AnnualSummary
              totalAnnualVolume={currentProjection.totals.annualVolume}
              totalAnnualSavings={currentProjection.totals.annualSavings}
              totalAnnualCost={currentProjection.totals.annualCost}
              hasErrors={hasErrors}
            />
            <MonthlyBreakdown
              rows={currentProjection.rows}
              monthlyVolume={currentProjection.totals.monthlyVolume}
              monthlySavings={currentProjection.totals.monthlySavings}
              monthlyCost={currentProjection.totals.monthlyCost}
              monthlyNetBenefit={currentProjection.totals.monthlyNetBenefit}
            />
            <ComparisonPanel
              scenarioA={comparison.A}
              scenarioB={comparison.B}
              projectionA={scenarioAProjection}
              projectionB={scenarioBProjection}
              onSaveScenario={handleSaveScenario}
              onClearScenario={handleClearScenario}
            />
          </Box>
        </Box>

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
