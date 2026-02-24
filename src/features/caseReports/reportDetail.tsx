import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchReportByIdThunk } from "./reportSlice";
import { statusColor } from "../../constants/status_colors";
import { formatDateTHBE, timeAgo } from "../../utils/date";

export default function ReportDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { selected, loading } = useAppSelector((state) => state.report);

  useEffect(() => {
    if (!id) {
      navigate("/reportsList");
    } else {
      dispatch(fetchReportByIdThunk(id));
    }
  }, [dispatch, id, navigate]);

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!selected) {
    return (
      <Box p={5} textAlign="center">
        <Typography color="error">ไม่พบข้อมูลรายงาน</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            กลับ
          </Button>

          <Typography variant="h6" fontWeight={600}>
            {selected.tracking_code}
          </Typography>

          <Chip
            label={selected.name_status}
            color={statusColor[selected.status] ?? "default"}
          />
        </Stack>
      </Stack>

      {/* ข้อมูลเหตุการณ์ */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          ข้อมูลเหตุการณ์
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              รายละเอียด
            </Typography>
            <Typography>{selected.details || "-"}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              พื้นที่เกิดเหตุ
            </Typography>
            <Typography>{selected.full_area || "-"}</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                วันที่สร้าง
              </Typography>
              <Typography>
                {formatDateTHBE(selected.created_at)} (
                <Box component="span" sx={{ color: "error.main" }}>
                  {timeAgo(selected.created_at)}
                </Box>
                )
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                แก้ไขล่าสุด
              </Typography>
              <Typography>{formatDateTHBE(selected.updated_at)}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      {/* รูปภาพ */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          รูปภาพประกอบ
        </Typography>

        <Grid container spacing={2}>
          {(!selected.files || selected.files.length === 0) && (
            <Typography color="text.secondary">ไม่มีรูปภาพ</Typography>
          )}

          {selected.files?.map((file) => (
            <Grid size={{ xs: 6, md: 3 }} key={file.id}>
              <Box
                component="img"
                src={file.stream_url}
                alt={file.file_name}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  objectFit: "cover",
                  height: 160,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
