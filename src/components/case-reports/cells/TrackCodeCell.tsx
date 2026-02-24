import { TableCell, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { CaseReport } from "../../../types/report";

type Props = {
  row: CaseReport;
};

export default function TrackCodeCell({ row }: Props) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // กันไม่ให้ trigger TableRow
    navigate(`/reportsList/${row.id}`);
  };

  return (
    <TableCell onClick={handleClick} sx={{ cursor: "pointer" }}>
      <Stack spacing={0.5}>
        {row.tracking_code && (
          <Typography
            variant="body2"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            {row.tracking_code}
          </Typography>
        )}
      </Stack>
    </TableCell>
  );
}
