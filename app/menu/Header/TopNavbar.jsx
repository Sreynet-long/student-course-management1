"use client";
import React, { useState, useEffect } from "react";
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
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../../context/CartContext";
import LoginModal from "@/app/components/auth/LoginModal";
import SignupModal from "@/app/components/auth/SignupModal";

export default function TopNavbar() {
  const pathname = usePathname();
  const { cart, user, setUser } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const totalItems = mounted
    ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : 0;

  // Auth modals
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  // Drawer & menus
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [drawerCollapse, setDrawerCollapse] = useState({});

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

  // Drawer handlers
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleDrawerCollapse = (label) =>
    setDrawerCollapse((prev) => ({ ...prev, [label]: !prev[label] }));

  // Profile menu
  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  // Product menu (desktop)
  const handleProductMenuOpen = (event) =>
    setProductAnchorEl(event.currentTarget);
  const handleProductMenuClose = () => setProductAnchorEl(null);

  const handleLogout = () => {
    if (setUser) setUser(null);
    if (typeof window !== "undefined") localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Drawer list
  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography
        variant="h6"
        sx={{ m: 2, display: "flex", alignItems: "center" }}
      >
        <ShoppingBasketIcon sx={{ mr: 1 }} />
        FreshMart
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Search products..."
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "green" }} />
            </InputAdornment>
          ),
        }}
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
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              href="/account"
              selected={pathname === "/account"}
            >
              <ListItemText primary="My Account" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
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
            disableGutters
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
                noWrap
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ShoppingBasketIcon sx={{ mr: 1 }} />
                FreshMart
              </Typography>
            </Link>

            {/* Desktop Menu */}
            <Box
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
                    <Button
                      sx={{ color: "white" }}
                      onClick={handleProductMenuOpen}
                    >
                      {item.label}
                    </Button>
                    <Menu
                      anchorEl={productAnchorEl}
                      open={Boolean(productAnchorEl)}
                      onClose={handleProductMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {item.subItems.map((sub) => (
                        <MenuItem
                          key={sub.path}
                          component={Link}
                          href={sub.path}
                          onClick={handleProductMenuClose}
                          selected={pathname === sub.path}
                        >
                          {sub.label}
                        </MenuItem>
                      ))}
                    </Menu>
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
            </Box>

            {/* Right: Search + Auth + Cart */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {/* Search */}
              <Box sx={{ display: { xs: "none", sm: "block" }, maxWidth: 200 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Search products..."
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "green" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Auth */}
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

              {/* Cart */}
              <IconButton color="inherit" component={Link} href="/cart">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Mobile menu */}
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem component={Link} href="/profile" onClick={handleProfileClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} href="/account" onClick={handleProfileClose}>
          My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      {/* Auth Modals */}
      <SignupModal
       open={openSignup} 
       onClose={() => setOpenSignup(false)} 
       onSwitchToLogin={() => {
        setOpenSignup(false);
        setOpenLogin(true);
       }}
      />
      <LoginModal
       open={openLogin} 
       onClose={() => setOpenLogin(false)} 
        onSwitchToSignup={() => {
        setOpenLogin(false);
        setOpenSignup(true);
        }}
      />
    </>
  );
}
