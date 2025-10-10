"use client";
import React, { useState } from "react";
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
  TextField,
  InputAdornment,
  Collapse,
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

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function TopNavbar() {
  const pathname = usePathname();
  const { cart, user, setUser } = useCart();
  const totalItems = typeof window !== "undefined" ? cart.length : 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productMenuOpen, setProductMenuOpen] = useState(null);
  const [drawerProductOpen, setDrawerProductOpen] = useState(false);

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

  const handleProfileOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const handleProductMenuOpen = (event) => setProductMenuOpen(event.currentTarget);
  const handleProductMenuClose = () => setProductMenuOpen(null);

  const handleDrawerProductClick = () => setDrawerProductOpen(!drawerProductOpen);

  const handleLogout = () => {
    if (setUser) setUser(null);
    if (typeof window !== "undefined") localStorage.removeItem("user");
    window.location.href = "/";
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography variant="h6" sx={{ m: 2, display: "flex", alignItems: "center" }}>
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
              <ListItemButton onClick={handleDrawerProductClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {drawerProductOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={drawerProductOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemButton sx={{ pl: 4 }} selected={pathname === sub.path}>
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
            <Link href="/signup" style={{ textDecoration: "none", color: "inherit" }} onClick={toggleDrawer(false)}>
              <ListItemButton selected={pathname === "/signup"}>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </Link>
            <Link href="/login" style={{ textDecoration: "none", color: "inherit" }} onClick={toggleDrawer(false)}>
              <ListItemButton selected={pathname === "/login"}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </Link>
          </>
        ) : (
          <>
            <ListItemButton onClick={toggleDrawer(false)} selected={pathname === "/profile"}>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={toggleDrawer(false)} selected={pathname === "/account"}>
              <ListItemText primary="My Account" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                toggleDrawer(false)();
                handleLogout();
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "green" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Left: Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography variant="h6" color="white" noWrap sx={{ display: "flex", alignItems: "center" }}>
                <ShoppingBasketIcon sx={{ mr: 1 }} />
                FreshMart
              </Typography>
            </Link>

            {/* Center: Menu */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, flexGrow: 1, justifyContent: "center" }}>
              {navItems.map((item) =>
                item.subItems ? (
                  <Box key={item.label}>
                    <Button sx={{ color: "white" }} onClick={handleProductMenuOpen}>
                      {item.label}
                    </Button>
                    <Menu
                      anchorEl={productMenuOpen}
                      open={Boolean(productMenuOpen)}
                      onClose={handleProductMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {item.subItems.map((sub) => (
                        <MenuItem key={sub.path} component={Link} href={sub.path} onClick={handleProductMenuClose} selected={pathname === sub.path}>
                          {sub.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    href={item.path}
                    sx={{ color: "white" }}
                    variant={pathname === item.path ? "outlined" : "text"}
                  >
                    {item.label}
                  </MenuItem>
                )
              )}
            </Box>

            {/* Right: Search + Auth + Cart */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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

              {!user ? (
                <>
                  <Button component={Link} href="/signup" sx={{ color: "white" }} variant={pathname === "/signup" ? "outlined" : "text"}>
                    Sign Up
                  </Button>
                  <Button component={Link} href="/login" sx={{ color: "white" }} variant={pathname === "/login" ? "outlined" : "text"}>
                    Login
                  </Button>
                </>
              ) : (
                <IconButton color="inherit" onClick={handleProfileOpen}>
                  <AccountCircle />
                </IconButton>
              )}

              <IconButton color="inherit">
                <Badge badgeContent={totalItems || 0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Mobile Menu Icon */}
              <IconButton edge="end" color="inherit" sx={{ display: { sm: "none" } }} onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleProfileClose} selected={pathname === "/profile"}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileClose} selected={pathname === "/account"}>
          My Account
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleProfileClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </Box>
  );
}
