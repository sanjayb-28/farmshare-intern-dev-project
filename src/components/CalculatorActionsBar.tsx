import { Button, Stack } from "@mui/material";

interface CalculatorActionsBarProps {
  isClearAllDisabled: boolean;
  onOpenClearAll: () => void;
  onResetSavedData: () => void;
}

export const CalculatorActionsBar = ({
  isClearAllDisabled,
  onOpenClearAll,
  onResetSavedData,
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
    </Stack>
  );
};
