"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Container,
  Autocomplete,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
  ContactPage as ContactPageIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import debounce from "lodash.debounce";
import SignupModal from "@/app/components/auth/SignupModal";
import LoginModal from "@/app/components/auth/LoginModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";

export default function TopNavbar({ onSearch }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();
  const { user, logout, alert, closeAlert } = useAuth();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCollapse, setDrawerCollapse] = useState({});
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        if (onSearch) onSearch(query);
      }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navItems = [
    { label: "About", path: "/about", icon: <InfoIcon /> },
    { label: "Contact", path: "/contact", icon: <ContactPageIcon /> },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleDrawerCollapse = (label) =>
    setDrawerCollapse((prev) => ({ ...prev, [label]: !prev[label] }));
  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);
  const handleLogoutClick = () => {
    handleProfileClose();
    logout();
    router.push("/");
  };
  const handleSwitchToLogin = () => {
    setOpenSignup(false);
    setOpenLogin(true);
  };
  const handleSwitchToSignup = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };

  // Drawer content
  const drawerList = (
    <Box sx={{ width: { xs: 220, sm: 250 } }} role="presentation">
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          padding: "16px",
        }}
      >
        <img
          src="/logos/grocery-cart.png"
          alt="FreshMart Logo"
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            marginRight: 8,
          }}
        />
        <Typography variant="h6" color="var(--primary-color)">
          FreshMart
        </Typography>
      </Link>
      <Divider />

      {/* Mobile Search */}
      <Box sx={{ px: 2, py: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={searchText}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "green", cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider />
      <List>
        {navItems.map((item) =>
          item.subItems ? (
            <Box key={item.label}>
              <ListItemButton onClick={() => toggleDrawerCollapse(item.label)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {drawerCollapse[item.label] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={drawerCollapse[item.label]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((sub) => (
                    <ListItemButton
                      key={sub.path}
                      component={Link}
                      href={sub.path}
                      sx={{ pl: 4 }}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText primary={sub.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        )}

        <Divider sx={{ my: 1 }} />
        {!user ? (
          <>
            <ListItemButton onClick={() => setOpenSignup(true)}>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
            <ListItemButton onClick={() => setOpenLogin(true)}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              component={Link}
              href="/profile"
              selected={pathname === "/profile"}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="My Account" />
            </ListItemButton>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "var(--primary-color)", zIndex: 1300 }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 0.5,
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src="/logos/grocery-cart.png"
                alt="FreshMart Logo"
                style={{
                  width: isMobile ? 36 : 48,
                  height: isMobile ? 36 : 48,
                  objectFit: "contain",
                  marginRight: 8,
                }}
              />
              <Typography variant={isMobile ? "subtitle1" : "h6"} color="white">
                FreshMart
              </Typography>
            </Link>

            {/* Desktop Search */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "white",
                  borderRadius: 2,
                  px: 1,
                  py: 0.5,
                  boxShadow: 1,
                  width: { sm: 300, md: 400 },
                  mr: 2,
                }}
              >
                <Autocomplete
                  freeSolo
                  options={options}
                  inputValue={searchText}
                  onInputChange={(event, newValue) => {
                    setSearchText(newValue);
                    debouncedSearch(newValue);
                  }}
                  sx={{ flex: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search products..."
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: "green" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            )}

            {/* Right actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Mobile search icon */}
              {isMobile && (
                <IconButton onClick={() => setMobileSearchOpen(true)}>
                  <SearchIcon sx={{ color: "white" }} />
                </IconButton>
              )}

              {!user ? (
                <>
                  <Button
                    sx={{ color: "white" }}
                    onClick={() => setOpenSignup(true)}
                  >
                    Sign Up
                  </Button>
                  <Button
                    sx={{ color: "white" }}
                    onClick={() => setOpenLogin(true)}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <IconButton color="inherit" onClick={handleProfileOpen}>
                  <AccountCircle />
                </IconButton>
              )}

              <IconButton color="inherit" component={Link} href="/cart">
                <Badge badgeContent={totalItems} max={99} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Drawer toggle */}
              {isMobile && (
                <IconButton color="inherit" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile slide-down search */}
      {mobileSearchOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            bgcolor: "white",
            zIndex: 1400,
            p: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            animation: "slideDown 0.3s ease",
            "@keyframes slideDown": {
              from: { transform: "translateY(-100%)" },
              to: { transform: "translateY(0)" },
            },
          }}
        >
          <IconButton onClick={() => setMobileSearchOpen(false)}>
            <MenuIcon />
          </IconButton>
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={searchText}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "green" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {/* Profile menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
      >
        <MenuItem component={Link} href="/profile" onClick={handleProfileClose}>
          My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      {/* Auth Modals */}
      <SignupModal
        open={openSignup}
        onClose={() => setOpenSignup(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />

      {/* Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.status}
          sx={{ width: "100%" }}
        >
          {alert?.message?.messageEn || alert?.message?.messageKh}
        </Alert>
      </Snackbar>
    </>
  );
}
