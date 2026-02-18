import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import type { ScenarioSnapshot } from "../types";
import type { ProjectionResult } from "../utils/projection";

interface ComparisonPanelProps {
  scenarioA: ScenarioSnapshot | null;
  scenarioB: ScenarioSnapshot | null;
  projectionA: ProjectionResult | null;
  projectionB: ProjectionResult | null;
  onSaveScenario: (slot: "A" | "B") => void;
  onClearScenario: (slot: "A" | "B") => void;
}

interface ScenarioCardProps {
  title: string;
  scenario: ScenarioSnapshot | null;
  projection: ProjectionResult | null;
  onSave: () => void;
  onClear: () => void;
}

const formatCurrency = (value: number): string =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const ScenarioCard = ({
  title,
  scenario,
  projection,
  onSave,
  onClear,
}: ScenarioCardProps) => {
  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1, flexWrap: "wrap", rowGap: 1 }}
      >
        <Typography variant="h6">{title}</Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={onSave}>
            Save
          </Button>
          <Button size="small" color="error" onClick={onClear} disabled={!scenario}>
            Clear
          </Button>
        </Stack>
      </Stack>

      {!scenario || !projection ? (
        <Typography variant="body2" color="text.secondary">
          No scenario saved.
        </Typography>
      ) : (
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            Saved: {new Date(scenario.capturedAt).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Annual Volume: {projection.totals.annualVolume.toLocaleString()} lbs
          </Typography>
          <Typography variant="body2">
            Annual Savings: ${formatCurrency(projection.totals.annualSavings)}
          </Typography>
          <Typography variant="body2">
            Annual Cost: ${formatCurrency(projection.totals.annualCost)}
          </Typography>
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
            Net Annual Benefit: ${formatCurrency(projection.totals.annualNetBenefit)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export const ComparisonPanel = ({
  scenarioA,
  scenarioB,
  projectionA,
  projectionB,
  onSaveScenario,
  onClearScenario,
}: ComparisonPanelProps) => {
  const delta =
    projectionA && projectionB
      ? projectionB.totals.annualNetBenefit - projectionA.totals.annualNetBenefit
      : null;

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Scenario Comparison
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <ScenarioCard
            title="Scenario A"
            scenario={scenarioA}
            projection={projectionA}
            onSave={() => onSaveScenario("A")}
            onClear={() => onClearScenario("A")}
          />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <ScenarioCard
            title="Scenario B"
            scenario={scenarioB}
            projection={projectionB}
            onSave={() => onSaveScenario("B")}
            onClear={() => onClearScenario("B")}
          />
        </Box>
      </Box>

      {delta !== null && (
        <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "rgba(52,78,65,0.1)" }}>
          <Typography variant="body2">
            Scenario B vs A net annual benefit delta: ${formatCurrency(delta)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
