import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Stack,

  //LinearProgress,
} from "@mui/material";
import type { ReportPayload } from "../types/report";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AreaSelectButton from "./autocompletes/AreaSelectButton";
import type { Area } from "../types/village";

type Props = {
  title?: string;
  onSubmit: (data: ReportPayload) => void;
  loading?: boolean;
  progress?: number;
};

export default function ReportForm({
  title = "คำชี้แจง",
  onSubmit,
  loading,
  // progress = 0,
}: Props) {
  const [detail, setDetail] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [village, setVillage] = useState("");
  const [area, setArea] = useState<Area | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);

    e.target.value = ""; // ⭐ เลือกรูปเดิมซ้ำได้
  };
  const handleRemoveImage = (index: number) => {
    // ล้าง memory
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (loading) return; // 🔒 กันซ้ำ
    if (!area) {
      alert("กรุณาเลือกพื้นที่");
      return;
    }
    onSubmit({
      village,
      sub_districts_id: area.id,
      detail,
      // name,
      // phone,
      images,
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          หากท่านพบเห็นการกระทำที่เกี่ยวข้องกับยาเสพติด เช่น การจำหน่าย
          การครอบครอง การลักลอบขนส่ง การเสพ
          หรือพฤติการณ์ที่น่าสงสัยว่าเกี่ยวข้องกับยาเสพติด
          ซึ่งอาจก่อให้เกิดผลกระทบต่อความปลอดภัยในชีวิตและทรัพย์สินของประชาชน
          ตลอดจนความสงบเรียบร้อยของสังคม
          ท่านสามารถแจ้งเบาะแสหรือร้องเรียนผ่านช่องทางนี้ได้
          การแจ้งข้อมูลของท่านจะถูกเก็บรักษาเป็นความลับ <br></br>ทั้งนี้
          ขอความกรุณาระบุรายละเอียดให้ครบถ้วน เช่น สถานที่ วันเวลา บุคคล
          หรือพฤติการณ์ที่พบเห็น
          เพื่อให้การตรวจสอบเป็นไปอย่างรวดเร็วและมีประสิทธิภาพ
          หน่วยงานขอขอบคุณท่านที่มีส่วนร่วมในการเฝ้าระวังและสร้างสังคมที่ปลอดภัยจากยาเสพติดร่วมกัน
        </Typography>
        {/* {area?.id} {village} */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="หมู่บ้าน / ชุมชน"
              placeholder="เช่น บ้านโนนสว่าง หมู่ 5"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              inputProps={{ maxLength: 100 }}
            />
            <AreaSelectButton value={area} onChange={(data) => setArea(data)} />

            {/* <TextField
            fullWidth
            label="ชื่อผู้แจ้ง (ไม่บังคับ)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          /> */}

            {/* <TextField
            fullWidth
            label="เบอร์ติดต่อ (ไม่บังคับ)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          /> */}

            <TextField
              fullWidth
              label="รายละเอียดเหตุการณ์"
              placeholder="เช่น พบเห็นการลักลอบจำหน่ายยาเสพติดบริเวณ..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              multiline
              rows={6}
              required
              margin="normal"
            />

            {/* แนบรูป */}
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" component="label">
                แนบรูปภาพ
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>

            {/* preview */}
            {previews.length > 0 && (
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                {previews.map((src, i) => (
                  <Box key={i} sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={src}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 1,
                        border: "1px solid #ddd",
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(i)}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.8)",
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
            {/* 
          {loading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )} */}

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? "กำลังบันทึก" : "ส่งข้อมูล"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
