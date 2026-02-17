import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import type { JSX } from "react";

// export default function OverviewTab(): JSX.Element {
//   return (
//     <Grid container spacing={2}>
//       {/* KPI 1 */}
//       <Grid size={{ xs: 12, md: 3 }}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="subtitle2">เคสทั้งหมด</Typography>
//           <Typography variant="h4">1,245</Typography>
//         </Paper>
//       </Grid>

//       {/* KPI 2 */}
//       <Grid size={{ xs: 12, md: 3 }}>
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="subtitle2">วันนี้</Typography>
//           <Typography variant="h4">12</Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

export default function OverviewCompareTab(): JSX.Element {
  return (
    <Grid container spacing={2}>
      {/* ===== KPI ===== */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">เคสทั้งหมด</Typography>
          <Typography variant="h4">1,245</Typography>
          <Typography color="success.main">+20.8% จากปีก่อน</Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">ปิดเคสแล้ว</Typography>
          <Typography variant="h4">980</Typography>
          <Typography color="success.main">+15%</Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">กำลังดำเนินการ</Typography>
          <Typography variant="h4">210</Typography>
          <Typography color="error.main">-8%</Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">SLA ผ่าน</Typography>
          <Typography variant="h4">87%</Typography>
          <Typography color="success.main">+5%</Typography>
        </Paper>
      </Grid>

      {/* ===== Line Chart ===== */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2, height: 350 }}>
          <Typography variant="h6">
            แนวโน้มเคสรายเดือน (ปีนี้ vs ปีก่อน)
          </Typography>
          {/* ใส่ Chart ตรงนี้ */}
        </Paper>
      </Grid>

      {/* ===== Area Compare ===== */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="h6">เปรียบเทียบรายอำเภอ</Typography>
        </Paper>
      </Grid>

      {/* ===== Status Compare ===== */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="h6">สถานะเคส (เทียบปี)</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
