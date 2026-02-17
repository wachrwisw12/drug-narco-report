import { Tabs, Tab, Box, Container } from "@mui/material";
import { useState } from "react";

import OverviewTab from "../../components/dashboard/tabs/OverviewTab";
import PerformanceTab from "../../components/dashboard/tabs/PerformanceTab";
import AreaRiskTab from "../../components/dashboard/tabs/AreaRiskTab";
import RealtimeTab from "../../components/dashboard/tabs/RealtimeTab";

export default function ExecutiveDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable">
          <Tab label="Overview" />
          <Tab label="Performance" />
          <Tab label="Area Risk" />
          <Tab label="Realtime" />
        </Tabs>

        <Box mt={2}>
          {tab === 0 && <OverviewTab />}
          {tab === 1 && <PerformanceTab />}
          {tab === 2 && <AreaRiskTab />}
          {tab === 3 && <RealtimeTab />}
        </Box>
      </Box>
    </Container>
  );
}
