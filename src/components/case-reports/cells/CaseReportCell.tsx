import { TableCell, Typography, Stack } from "@mui/material";
import type { CaseReport } from "../../../types/report";

type Props = {
  row: CaseReport;
};

export default function CaseInfoCell({ row }: Props) {
  return (
    <TableCell>
      <Stack spacing={0.5}>
        <Typography fontWeight={600}>{row.title}</Typography>

        {row.details && (
          <Typography variant="body2" color="text.secondary">
            {row.details}
          </Typography>
        )}
      </Stack>
    </TableCell>
  );
}
