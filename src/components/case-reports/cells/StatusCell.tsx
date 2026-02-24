import { useState, useMemo, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import type { CaseReport } from "../../../types/report";
import { statusColor } from "../../../constants/status_colors";
import { updateStatusReport } from "../../../services/report.service";
import { fetchReportsThunk } from "../../../features/caseReports/reportSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { STATUS, type StatusType } from "../../../constants/status.config";
import { getAllowedActions } from "../../../utils/role";
import { ROLE } from "../../../constants/menu.config";

type Props = {
  row: CaseReport;
};

export default function StatusCell({ row }: Props) {
  const dispatch = useAppDispatch();
  const roleId = useAppSelector((s) => s.auth.user?.role_id);

  const [expanded, setExpanded] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== Permission Logic =====
  const allowedActions = useMemo(() => {
    if (!roleId) return [];
    return getAllowedActions(roleId, row.status);
  }, [roleId, row.status]);

  const isOwner = row.assigned_role_id === roleId;
  const isSuper = roleId === ROLE.SUPER_ADMIN;

  const canEdit = allowedActions.length > 0 && (isSuper || isOwner);
  console.log(
    "🚀 ~ file: StatusCell.tsx:50 ~ StatusCell ~ allowedActions:",
    allowedActions,
    "isOwner:",
    isOwner,
    "isSuper:",
    isSuper,
  );
  // ===== Default Action =====
  const [action, setAction] = useState<StatusType | "">("");
  useEffect(() => {
    if (allowedActions.length > 0) {
      setAction(allowedActions[0]);
    } else {
      setAction("");
    }
  }, [allowedActions]);

  // ===== Save =====
  const handleSave = async () => {
    if (!action || !allowedActions.includes(action)) return;

    try {
      setLoading(true);

      await updateStatusReport({
        id: row.id,
        action,
        reason,
      });

      dispatch(fetchReportsThunk({ status: row.status }));
      setExpanded(false);
      setReason("");
    } finally {
      setLoading(false);
    }
  };

  // ===== ถ้าไม่มีสิทธิ์ แสดง text อย่างเดียว =====
  if (!canEdit) {
    return (
      <TableCell>
        <Chip
          label={row.name_status}
          color={statusColor[row.status]}
          size="small"
        />
      </TableCell>
    );
  }

  return (
    <TableCell sx={{ minWidth: 260 }}>
      <Stack spacing={1}>
        {/* ===== Chip + Expand ===== */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={row.name_status}
            color={statusColor[row.status]}
            size="small"
          />

          <IconButton size="small" onClick={() => setExpanded((prev) => !prev)}>
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
              <FormControl fullWidth size="small">
                <InputLabel>การดำเนินการ</InputLabel>
                <Select
                  value={action}
                  label="การดำเนินการ"
                  onChange={(e) =>
                    setAction(Number(e.target.value) as StatusType)
                  }
                >
                  {allowedActions.includes(STATUS.FORWARDED_TO_AREA) && (
                    <MenuItem value={STATUS.FORWARDED_TO_AREA}>
                      ส่งพื้นที่
                    </MenuItem>
                  )}

                  {allowedActions.includes(STATUS.PROCESSING) && (
                    <MenuItem value={STATUS.PROCESSING}>รับดำเนินการ</MenuItem>
                  )}

                  {allowedActions.includes(STATUS.CLOSED) && (
                    <MenuItem value={STATUS.CLOSED}>ปิดเคส</MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* เหตุผลกรณี reject (ถ้ามี STATUS.REJECT เพิ่มภายหลัง) */}
              {action === STATUS.REJECTED && (
                <TextField
                  label="เหตุผล"
                  multiline
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  fullWidth
                  size="small"
                />
              )}

              <Button
                variant="contained"
                size="small"
                onClick={handleSave}
                disabled={loading || !action}
              >
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </Button>

              {!allowedActions.length && (
                <Typography variant="caption" color="error">
                  ไม่มีสิทธิ์ดำเนินการ
                </Typography>
              )}
            </Stack>
          </Box>
        </Collapse>
      </Stack>
    </TableCell>
  );
}
