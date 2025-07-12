import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { images } from "../assets/Images/Images";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Software Development", path: "/software" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const navlinks = {
  color: "var(--title)",
  fontFamily: "Regular_W",
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "3px",
  width: "max-content",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    background: "var(--webprimary)",
    color: "var(--white)",
  },
};

const WebNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:991px)");

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const handleLinkClick = () => {
    if (isMobile) setMobileOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0",
          zIndex: "999999",
          backgroundColor: isSticky ? "var(--white)" : "transparent",
          padding: isSticky ? "15px 0px" : "0px",
          transition: "0.3s ease",
        }}
      >
        {/* Left Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box
            sx={{
              background: "var(--webprimary)",
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "3px",
            }}
          >
            <Box
              component={"img"}
              sx={{ width: "30px" }}
              src={images.logoicon}
            />
          </Box>
        </Box>

        {/* Desktop Links */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {navItems.map((item, idx) => (
              <NavLink
                to={item.path}
                key={idx}
                style={({ isActive }) => ({
                  ...navlinks,
                  background: isActive ? "var(--webprimary)" : "transparent",
                  color: isActive ? "var(--white)" : "var(--title)",
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>
        )}

        {/* Right - Login + Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NavLink
            to="/login"
            style={{
              ...navlinks,
              minWidth: "100px",
              background: "var(--webprimary)" ,
              color:"var(--white)" ,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            Login
          </NavLink>

          {isMobile && (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: 250 } }}
      >
        <Box sx={{ p: 2 }}>
          {/* Logo + Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                background: "var(--webprimary)",
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
              }}
            >
              <Box
                component={"img"}
                sx={{ width: "30px" }}
                src={images.logoicon}
              />
            </Box>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={handleLinkClick}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  backgroundColor: isActive ? "var(--webprimary)" : "transparent",
                  color: isActive ? "white" : "#333",
                  borderRadius: "4px",
                  marginBottom: "4px",
                  display: "block",
                })}
              >
                <ListItemButton>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: "Regular_W",
                      fontSize: "14px",
                    }}
                  />
                </ListItemButton>
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default WebNavbar;
