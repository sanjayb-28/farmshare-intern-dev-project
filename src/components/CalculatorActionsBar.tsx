import { Button, Stack } from "@mui/material";

interface CalculatorActionsBarProps {
  isClearAllDisabled: boolean;
  onOpenClearAll: () => void;
  onResetSavedData: () => void;
  onExportCsv: () => void;
  onPrintReport: () => void;
  isExportDisabled: boolean;
}

export const CalculatorActionsBar = ({
  isClearAllDisabled,
  onOpenClearAll,
  onResetSavedData,
  onExportCsv,
  onPrintReport,
  isExportDisabled,
}: CalculatorActionsBarProps) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
      <Button
        variant="outlined"
        color="error"
        disabled={isClearAllDisabled}
        onClick={onOpenClearAll}
      >
        Clear All
      </Button>
      <Button variant="text" onClick={onResetSavedData}>
        Reset Saved Data
      </Button>
      <Button variant="outlined" onClick={onExportCsv} disabled={isExportDisabled}>
        Export CSV
      </Button>
      <Button variant="outlined" onClick={onPrintReport} disabled={isExportDisabled}>
        Print Report
      </Button>
    </Stack>
  );
};
