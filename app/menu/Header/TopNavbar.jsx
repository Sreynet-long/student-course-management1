"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
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
  InputBase,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  Info as InfoIcon,
  ContactPage as ContactPageIcon,
  ExpandLess,
  ExpandMore,
  ShoppingBasket as ShoppingBasketIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "../../context/AuthContext";
import debounce from "lodash.debounce";
import SignupModal from "@/app/components/auth/SignupModal";
import LoginModal from "@/app/components/auth/LoginModal";

export default function TopNavbar({ onSearch, getSuggestions }) {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user, logout, alert, closeAlert } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  // Debounce search (wait 500ms before calling backend)
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        if (onSearch && typeof onSearch === "function") {
          onSearch(query);
        }
      }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const totalItems = mounted
    ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : 0;

  // Auth modals
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const handleSwitchToLogin = () => {
    setOpenSignup(false);
    setOpenLogin(true);
  };

  const handleSwitchToSignup = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };

  // Drawer & menus
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCollapse, setDrawerCollapse] = useState({});
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const navItems = [
    {
      label: "Products",
      path: "/products",
      icon: <StoreIcon />,
      subItems: [
        { label: "Vegetables", path: "/products/vegetables" },
        { label: "Fruits", path: "/products/fruits" },
        { label: "Frozen Foods", path: "/products/frozen-foods" },
        { label: "Drinks", path: "/products/drinks" },
        { label: "Snacks & Breads", path: "/products/snacks-bread" },
        { label: "Meats", path: "/products/meats" },
        { label: "Seafoods", path: "/products/seafoods" },
      ],
    },
    { label: "About", path: "/about", icon: <InfoIcon /> },
    { label: "Contact", path: "/contact", icon: <ContactPageIcon /> },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleDrawerCollapse = (label) =>
    setDrawerCollapse((prev) => ({ ...prev, [label]: !prev[label] }));
  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  // Drawer content
  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography
        variant="h6"
        sx={{ m: 2, display: "flex", alignItems: "center" }}
      >
        <ShoppingBasketIcon sx={{ mr: 1 }} /> FreshMart
      </Typography>

      {/* Mobile search */}
      <InputBase
        value={searchText}
        onChange={handleChange}
        placeholder="Search products..."
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          width: { xs: "90%", sm: "60%", md: "40%" },
          px: 2,
          py: 0.5,
          boxShadow: 1,
          color: "black",
        }}
        startAdornment={
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon sx={{ color: "green" }} />
            </IconButton>
          </InputAdornment>
        }
      />
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
                    <Link
                      key={sub.path}
                      href={sub.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemButton
                        sx={{ pl: 4 }}
                        selected={pathname === sub.path}
                      >
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <Link
              key={item.path}
              href={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={toggleDrawer(false)}
            >
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          )
        )}

        <Divider />

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
            >
              <ListItemText primary="My Account" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "green" }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                color="white"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ShoppingBasketIcon sx={{ mr: 1 }} /> FreshMart
              </Typography>
            </Link>

            {/* Desktop menu */}
            {/* <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {navItems.map((item) =>
                item.subItems ? (
                  <Box key={item.label}>
                    <Button sx={{ color: "white" }}>{item.label}</Button>
                  </Box>
                ) : (
                  <Button
                    key={item.path}
                    component={Link}
                    href={item.path}
                    sx={{ color: "white" }}
                    variant={pathname === item.path ? "outlined" : "text"}
                  >
                    {item.label}
                  </Button>
                )
              )}
            </Box> */}

            {/* Right section */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {/* Desktop search */}
              <InputBase
                value={searchText}
                onChange={handleChange}
                placeholder="Search products..."
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  width: "260px",
                  px: 2,
                  py: 0.5,
                  boxShadow: 1,
                  color: "black",
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon sx={{ color: "green" }} />
                    </IconButton>
                  </InputAdornment>
                }
              />

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
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                sx={{ display: { sm: "none" } }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onSwitchToLogin={handleSwitchToLogin}
      >
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
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message.messageEn}
        </Alert>
      </Snackbar>
    </>
  );
}
