import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginThunk } from "../features/auth/authSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useAppSelector((s) => s.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginThunk({ username, password })).unwrap();

      // ✅ login สำเร็จ → ไป dashboard
      navigate(from, { replace: true });
    } catch {
      // ❌ error ถูกจัดการใน slice แล้ว
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            เข้าสู่ระบบ
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={3}
          >
            สำหรับเจ้าหน้าที่และผู้ดูแลระบบ
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="ชื่อผู้ใช้"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="รหัสผ่าน"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
            <Button component={Link} to="/report" fullWidth sx={{ mt: 2 }}>
              ยกเลิก
            </Button>
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
