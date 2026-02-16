import { TableRow, TableCell } from "@mui/material";
import type { CaseReport } from "../../types/report";
import CaseInfoCell from "./cells/CaseReportCell";
import TrackCodeCell from "./cells/TrackCodeCell";
import CreatedATCell from "./cells/CreatedAtCell";
import StatusCell from "./cells/StatusCell";
import VillageCell from "./cells/VillageCell";

type Props = {
  row: CaseReport;
};

export default function CaseReportTableRow({ row }: Props) {
  return (
    <TableRow hover>
      <TableCell>{row.id}</TableCell>
      <TrackCodeCell row={row} />
      <CaseInfoCell row={row} />
      <CreatedATCell row={row} />

      <TableCell />
      <VillageCell row={row} />

      {/* <StatusNameCell url={row.evidence_url} /> */}

      {/* <ActionCell row={row} /> */}
      <StatusCell row={row} />
    </TableRow>
  );
}
