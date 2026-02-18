import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { EAnimalSpecies } from "../types";

interface MonthlyBreakdownRow {
  species: EAnimalSpecies;
  annualHeads: number;
  monthlyVolume: number;
  monthlySavings: number;
  monthlyCost: number;
  monthlyNetBenefit: number;
}

interface MonthlyBreakdownProps {
  rows: MonthlyBreakdownRow[];
  monthlyVolume: number;
  monthlySavings: number;
  monthlyCost: number;
  monthlyNetBenefit: number;
}

const formatCurrency = (value: number): string =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const MonthlyBreakdown = ({
  rows,
  monthlyVolume,
  monthlySavings,
  monthlyCost,
  monthlyNetBenefit,
}: MonthlyBreakdownProps) => {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Monthly Breakdown
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(88,129,87,0.12)" }}>
          <Typography variant="body2" color="text.secondary">
            Monthly Volume
          </Typography>
          <Typography variant="h6">
            {monthlyVolume.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            lbs
          </Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(64,145,108,0.12)" }}>
          <Typography variant="body2" color="text.secondary">
            Monthly Savings
          </Typography>
          <Typography variant="h6">${formatCurrency(monthlySavings)}</Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(188,71,73,0.12)" }}>
          <Typography variant="body2" color="text.secondary">
            Monthly Cost
          </Typography>
          <Typography variant="h6">${formatCurrency(monthlyCost)}</Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(52,78,65,0.12)" }}>
          <Typography variant="body2" color="text.secondary">
            Monthly Net
          </Typography>
          <Typography variant="h6">${formatCurrency(monthlyNetBenefit)}</Typography>
        </Box>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Species</TableCell>
              <TableCell align="right">Annual Heads</TableCell>
              <TableCell align="right">Monthly Volume</TableCell>
              <TableCell align="right">Monthly Savings</TableCell>
              <TableCell align="right">Monthly Cost</TableCell>
              <TableCell align="right">Monthly Net</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No species selected.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.species}>
                  <TableCell>
                    {row.species.charAt(0).toUpperCase() + row.species.slice(1)}
                  </TableCell>
                  <TableCell align="right">
                    {row.annualHeads.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.monthlyVolume.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="right">
                    ${formatCurrency(row.monthlySavings)}
                  </TableCell>
                  <TableCell align="right">${formatCurrency(row.monthlyCost)}</TableCell>
                  <TableCell align="right">
                    ${formatCurrency(row.monthlyNetBenefit)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
