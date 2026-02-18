import { Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { ProjectionResult } from "../utils/projection";

interface ProjectionChartProps {
  projection: ProjectionResult;
}

export const ProjectionChart = ({ projection }: ProjectionChartProps) => {
  const formatCurrency = (value: number): string =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formatCompactCurrency = (value: number): string =>
    new Intl.NumberFormat(undefined, {
      notation: "compact",
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 1,
    }).format(value);

  const metricColors = ["#2d6a4f", "#bc4749", "#355070"] as const;
  const dataset = [
    { metric: "Savings", value: projection.totals.annualSavings },
    { metric: "Cost", value: projection.totals.annualCost },
    { metric: "Net Benefit", value: projection.totals.annualNetBenefit },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Annual Projection Chart
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Annual savings, cost, and net benefit in USD.
      </Typography>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "metric",
            colorMap: {
              type: "ordinal",
              values: ["Savings", "Cost", "Net Benefit"],
              colors: [...metricColors],
            },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value: number | null) =>
              typeof value === "number" ? formatCompactCurrency(value) : "",
          },
        ]}
        series={[
          {
            dataKey: "value",
            label: "Annual Value",
            valueFormatter: (value: number | null) =>
              value == null ? "" : `$${formatCurrency(value)}`,
            colorGetter: ({ dataIndex }) =>
              metricColors[dataIndex] ?? metricColors[0],
            barLabel: (item) =>
              item.value == null ? null : formatCompactCurrency(item.value),
            barLabelPlacement: "outside",
          },
        ]}
        grid={{ horizontal: true }}
        hideLegend
        height={320}
        margin={{ top: 40, right: 20, bottom: 35, left: 90 }}
        sx={{
          "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": {
            stroke: "rgba(0,0,0,0.35)",
          },
          "& .MuiChartsAxis-tickLabel": {
            fill: "rgba(0,0,0,0.75)",
            fontSize: 12,
          },
          "& .MuiChartsGrid-horizontalLine": {
            strokeDasharray: "4 4",
            stroke: "rgba(0,0,0,0.12)",
          },
          "& .MuiBarLabel-root": {
            fill: "rgba(0,0,0,0.78)",
            fontSize: 11,
            fontWeight: 600,
          },
        }}
      />
    </Paper>
  );
};
