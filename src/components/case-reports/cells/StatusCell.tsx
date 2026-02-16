import { useState } from "react";
import {
  TableCell,
  Stack,
  Chip,
  IconButton,
  Collapse,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import type { CaseReport } from "../../../types/report";
import statusColor from "../../../utils/status_colors";
import { updateStatusReport } from "../../../services/report.service";
import { fetchReportsThunk } from "../../../features/caseReports/reportSlice";
import { useAppDispatch } from "../../../store/hooks";

type Props = {
  row: CaseReport;
};

export default function StatusCell({ row }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [action, setAction] = useState(2);
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateStatusReport({
        id: row.id,
        action,
        reason,
      });
      dispatch(fetchReportsThunk());
      setExpanded(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell sx={{ minWidth: 260 }}>
      <Stack spacing={1}>
        {/* ===== Chip + Expand Button ===== */}
        <Stack direction="row" spacing={1} alignItems="center">
          {row.name_status && (
            <Chip
              label={row.name_status}
              color={statusColor[row.status]}
              size="small"
            />
          )}

          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Stack>

        {/* ===== Collapse Form ===== */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              p: 1.5,
              border: "1px solid #eee",
              borderRadius: 2,
              background: "#fafafa",
            }}
          >
            <Stack spacing={1.5}>
              {/* เลือก action */}
              <FormControl fullWidth size="small">
                <InputLabel>การดำเนินการ</InputLabel>
                <Select
                  value={action}
                  label="การดำเนินการ"
                  onChange={(e) => setAction(e.target.value)}
                >
                  <MenuItem value={2}>ส่งต่อพื้นที่</MenuItem>
                  <MenuItem value={6}>ปฏิเสธ</MenuItem>
                </Select>
              </FormControl>

              {/* เหตุผล */}
              {action == 6 && (
                <TextField
                  label="เหตุผลการปฏิเสธ"
                  multiline
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  fullWidth
                  size="small"
                />
              )}

              {/* ปุ่ม */}
              <Button
                variant="contained"
                size="small"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Stack>
    </TableCell>
  );
}
