import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import type { JSX } from "react";

export default function PerformanceTab(): JSX.Element {
  return (
    <Grid container spacing={2}>
      {/* KPI 1 */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2">เวลาปิดเคสเฉลี่ย</Typography>
          <Typography variant="h4" fontWeight="bold">
            3.4 วัน
          </Typography>
        </Paper>
      </Grid>

      {/* KPI 2 */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2">SLA ผ่าน</Typography>
          <Typography variant="h4" fontWeight="bold">
            87%
          </Typography>
        </Paper>
      </Grid>

      {/* KPI 3 */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2">เคสค้าง</Typography>
          <Typography variant="h4" fontWeight="bold">
            45
          </Typography>
        </Paper>
      </Grid>

      {/* Officer Workload */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={panelStyle}>
          <Typography variant="h6" mb={2}>
            Officer Workload
          </Typography>
        </Paper>
      </Grid>

      {/* Unit Ranking */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={panelStyle}>
          <Typography variant="h6" mb={2}>
            Unit Ranking
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
const cardStyle = {
  p: 2.5,
  borderRadius: 3,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
};

const panelStyle = {
  p: 2.5,
  height: 300,
  borderRadius: 3,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
};
