import { Box, Paper, Typography } from "@mui/material";

interface AnnualSummaryProps {
  totalAnnualVolume: number;
  totalAnnualSavings: number;
  totalAnnualCost: number;
}

export const AnnualSummary = ({
  totalAnnualVolume,
  totalAnnualSavings,
  totalAnnualCost,
}: AnnualSummaryProps) => {
  const netAnnualBenefit = totalAnnualSavings - totalAnnualCost;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Annual Summary
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            pb: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="body1">Total Annual Volume:</Typography>
          <Typography variant="body1" fontWeight="bold">
            {totalAnnualVolume.toLocaleString()} lbs
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            pb: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="body1" color="success.main">
            Total Annual Savings:
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="success.main">
            $
            {totalAnnualSavings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="body1" color="error.main">
            Total Annual Cost:
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="error.main">
            $
            {totalAnnualCost.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
            borderTop: 2,
            borderColor: "primary.main",
          }}
        >
          <Typography variant="h6">Net Annual Benefit:</Typography>
          <Typography variant="h5" fontWeight="bold" color="primary">
            $
            {netAnnualBenefit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
