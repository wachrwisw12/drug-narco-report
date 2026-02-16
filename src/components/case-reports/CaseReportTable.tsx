import { TableContainer, Paper, Table } from "@mui/material";
import CaseReportTableBody from "./CaseReportTableBody";
import CaseReportTableHead from "./CaseReportTableHead";
import { useAppSelector } from "../../store/hooks";

export default function CaseReportTable() {
  const { list, loading } = useAppSelector((s) => s.report);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <CaseReportTableHead />

        <CaseReportTableBody rows={list} loading={loading} />
      </Table>
    </TableContainer>
  );
}
