import { TableCell, Typography, Stack } from "@mui/material";
import type { CaseReport } from "../../../types/report";

type Props = {
  row: CaseReport;
};

export default function CreatedATCell({ row }: Props) {
  return (
    <TableCell>
      <Stack spacing={0.5}>
        <Typography fontWeight={600}>{row.title}</Typography>

        {row.file_count && (
          <Typography variant="body2" color="text.secondary">
            {row.file_count > 0 && "มีรูปประกอบ - "}
          </Typography>
        )}
      </Stack>
    </TableCell>
  );
}
