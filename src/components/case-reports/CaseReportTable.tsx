import { TableContainer, Paper, Table, Tabs, Tab, Box } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import CaseReportTableBody from "./CaseReportTableBody";
import CaseReportTableHead from "./CaseReportTableHead";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reportTabs } from "../../constants/status.config";
import { fetchReportsThunk } from "../../features/caseReports/reportSlice";

export default function CaseReportTable() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.report);
  const roleId = useAppSelector((s) => s.auth.user?.role_id);

  const [tab, setTab] = useState<number | "all">("all");
  console.log(
    "🚀 ~ file: CaseReportTable.tsx:17 ~ CaseReportTable ~ tab:",
    tab,
  );
  const visibleTabs = useMemo(() => {
    if (!roleId) return [];
    return reportTabs.filter((t) => t.roles.includes(roleId));
  }, [roleId]);

  // 🔥 fetch เมื่อ tab เปลี่ยน
  useEffect(() => {
    if (!roleId) return;

    dispatch(
      fetchReportsThunk({
        status: tab === "all" ? undefined : tab,
      }),
    );
  }, [tab, dispatch, roleId]);

  // 🔥 reset tab ถ้า role เปลี่ยน
  useEffect(() => {
    if (!visibleTabs.some((t) => t.value === tab)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTab("all");
    }
  }, [visibleTabs, tab]);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
        {visibleTabs.map((t) => (
          <Tab key={t.value} label={t.label} value={t.value} />
        ))}
      </Tabs>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <CaseReportTableHead />
          <CaseReportTableBody rows={list} loading={loading} />
        </Table>
      </TableContainer>
    </Box>
  );
}
