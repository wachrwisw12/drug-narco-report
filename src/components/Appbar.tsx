import * as React from "react";
import { Link } from "react-router-dom";
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

/* ===== MENU CONFIG ===== */
const pages = [
  { label: "แจ้งเบาะแส", path: "/report" },
  { label: "ติดตามเรื่องที่แจ้ง", path: "/track" },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
              {pages.map((page) => (
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
                <Button fullWidth variant="contained" color="primary">
                  เข้าสู่ระบบ
                </Button>
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
            {pages.map((page) => (
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button variant="contained" color="primary">
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
