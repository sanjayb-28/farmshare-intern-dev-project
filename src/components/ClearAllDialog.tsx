import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

interface ClearAllDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ClearAllDialog = ({
  open,
  onCancel,
  onConfirm,
}: ClearAllDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel} PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <WarningAmberOutlinedIcon color="warning" />
          <span>Clear all calculator data?</span>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will reset species, volumes, and advanced settings to defaults.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Clear All
        </Button>
      </DialogActions>
    </Dialog>
  );
};
