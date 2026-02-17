import Grid from "@mui/material/Grid";
import { Paper, Typography, List, ListItem } from "@mui/material";
import type { JSX } from "react";

export default function RealtimeTab(): JSX.Element {
  return (
    <Grid container spacing={2}>
      {/* เคสใหม่ล่าสุด */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" mb={2}>
            เคสใหม่ล่าสุด
          </Typography>

          <List>
            <ListItem>แจ้งเบาะแส อ.เมือง (5 นาทีที่แล้ว)</ListItem>
            <ListItem>พบการค้ายา อ.วาริชภูมิ</ListItem>
          </List>
        </Paper>
      </Grid>

      {/* เคสด่วน / SLA */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" mb={2}>
            เคสด่วน / SLA
          </Typography>

          <List>
            <ListItem>เคสค้างเกิน 7 วัน 12 เคส</ListItem>
            <ListItem>รอส่งต่อ 8 เคส</ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
