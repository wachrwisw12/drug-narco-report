import * as React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deepOrange } from "@mui/material/colors";

import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import logo from "../assets/images/logo.png";
import { Avatar } from "@mui/material";
import { logout } from "../features/auth/authSlice";
import { pages } from "../constants/menu";
import { filterPagesByRole } from "../utils/role";

/* ===== MENU CONFIG ===== */

export default function ResponsiveAppBar() {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  console.log("role", user?.role_id);
  const visiblePages = filterPagesByRole(pages, user?.role_id);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const openUserMenu = Boolean(anchorElUser);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = async () => {
    try {
      await dispatch(logout());

      // ✅ login สำเร็จ → ไป dashboard
      navigate(from, { replace: true });
    } catch {
      // ❌ error ถูกจัดการใน slice แล้ว
    }
  };
  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ===== LOGO (DESKTOP) ===== */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 3,
            }}
          >
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: 100 }} />
            </Link>
          </Box>

          {/* ===== MOBILE MENU ===== */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {visiblePages.map((page) => (
                <MenuItem
                  key={page.label}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography>{page.label}</Typography>
                </MenuItem>
              ))}

              <Divider sx={{ my: 1 }} />

              <MenuItem onClick={handleCloseNavMenu}>
                {isAuthenticated ? (
                  <>
                    <Typography>dsfds{user?.fullname}</Typography>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to="/login"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    เข้าสู่ระบบ
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </Box>

          {/* ===== LOGO (MOBILE) ===== */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
            }}
          >
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: 100 }} />
            </Link>
          </Typography>

          {/* ===== DESKTOP MENU ===== */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {visiblePages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                color="inherit"
                sx={{ mx: 1 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          {/* ===== LOGIN (DESKTOP ONLY) ===== */}
          {!isAuthenticated ? (
            <>
              <Box display="flex" alignItems="center">
                <Button
                  component={Link}
                  to="/login"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </>
          ) : (
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}
                  alt={user?.fullname ?? "User"}
                >
                  {user?.fullname?.charAt(0) ?? "M"}
                </Avatar>
              </IconButton>

              <Typography fontWeight={500} sx={{ ml: 1 }}>
                {user?.fullname || "ไม่ระบุชื่อ"}
              </Typography>

              <Menu
                anchorEl={anchorElUser}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleCloseUserMenu}
                >
                  โปรไฟล์
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/settings"
                  onClick={handleCloseUserMenu}
                >
                  ตั้งค่า
                </MenuItem>

                <Divider />

                <MenuItem
                  onClick={() => {
                    console.log("logout");
                    handleLogout();
                  }}
                >
                  ออกจากระบบ
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
