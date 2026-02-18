import { Button, Stack } from "@mui/material";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

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
    <Stack direction="row" spacing={1} sx={{ mb: 2.5 }} flexWrap="wrap" useFlexGap>
      <Button
        variant="outlined"
        color="error"
        disabled={isClearAllDisabled}
        onClick={onOpenClearAll}
        startIcon={<DeleteSweepOutlinedIcon />}
      >
        Clear All
      </Button>
      <Button variant="text" onClick={onResetSavedData} startIcon={<RestartAltOutlinedIcon />}>
        Reset Saved Data
      </Button>
      <Button
        variant="outlined"
        onClick={onExportCsv}
        disabled={isExportDisabled}
        startIcon={<DownloadOutlinedIcon />}
      >
        Export CSV
      </Button>
      <Button
        variant="outlined"
        onClick={onPrintReport}
        disabled={isExportDisabled}
        startIcon={<PrintOutlinedIcon />}
      >
        Print Report
      </Button>
    </Stack>
  );
};
