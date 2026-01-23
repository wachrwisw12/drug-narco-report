import * as React from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const reportTypes = [
  'ร้องเรียนทั่วไป',
  'แจ้งปัญหา',
  'เสนอแนะ',
  'อื่น ๆ',
];

export default function ReportPage() {
  const [form, setForm] = React.useState({
    type: '',
    title: '',
    detail: '',
    name: '',
    phone: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('REPORT DATA:', form);
    // 👉 ตรงนี้เอาไปยิง API ได้
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          แบบฟอร์มรายงาน / แจ้งเรื่อง
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          กรุณากรอกข้อมูลให้ครบถ้วน ข้อมูลของท่านจะถูกเก็บเป็นความลับ
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="ประเภทเรื่อง"
            name="type"
            value={form.type}
            onChange={handleChange}
            margin="normal"
            required
          >
            {reportTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="หัวข้อเรื่อง"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="รายละเอียด"
            name="detail"
            value={form.detail}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            label="ชื่อผู้แจ้ง (ไม่บังคับ)"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="เบอร์โทรศัพท์ (ไม่บังคับ)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
          />

          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              ส่งรายงาน
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
