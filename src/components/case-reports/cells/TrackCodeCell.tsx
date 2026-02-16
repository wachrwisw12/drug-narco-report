import { TableCell, Typography, Stack } from "@mui/material";
import type { CaseReport } from "../../../types/report";

type Props = {
  row: CaseReport;
};

export default function TrackCodeCell({ row }: Props) {
  return (
    <TableCell>
      <Stack spacing={0.5}>
        {row.tracking_code && (
          <Typography variant="body2" color="text.secondary">
            {row.tracking_code}
          </Typography>
        )}
      </Stack>
    </TableCell>
  );
}
