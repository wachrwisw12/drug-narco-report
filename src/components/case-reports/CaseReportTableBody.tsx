import { TableBody } from "@mui/material";
import CaseReportTableRow from "./CaseReportTableRow";
import type { CaseReport } from "../../types/report";

type Props = {
  rows: CaseReport[];
  loading: boolean;
};

export default function CaseReportTableBody({ rows }: Props) {
  return (
    <TableBody>
      {rows.map((row) => (
        <CaseReportTableRow key={row.id} row={row} />
      ))}
    </TableBody>
  );
}
