import { TableCell, Typography, Stack } from "@mui/material";
import type { CaseReport } from "../../../types/report";
import { formatDateTHBE } from "../../../utils/date";

type Props = {
  row: CaseReport;
};

export default function CreatedATCell({ row }: Props) {
  return (
    <TableCell>
      <Stack spacing={0.5}>
        <Typography fontWeight={600}>{row.title}</Typography>

        {row.created_at && (
          <Typography variant="body2" color="text.secondary">
            {formatDateTHBE(row.created_at)}
          </Typography>
        )}
      </Stack>
    </TableCell>
  );
}
