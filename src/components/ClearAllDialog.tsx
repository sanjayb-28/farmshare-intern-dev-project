import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Clear all calculator data?</DialogTitle>
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
