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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import MoreIcon from "@mui/icons-material/MoreVert";
import Product from "@/app/components/page/Product";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

export default function TopNavbar() {
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchor, setMobileAnchor] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchor);

  // Profile menu
  const handleProfileOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  // Mobile menu
  const handleMobileMenuOpen = (event) => setMobileAnchor(event.currentTarget);
  const handleMobileMenuClose = () => setMobileAnchor(null);

  // Drawer
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const menuId = "account-menu";
  const mobileMenuId = "mobile-menu";

  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Products", path: "/products", icon: <StoreIcon /> }, // Used only for mobile drawer
    { label: "About", path: "/about", icon: <InfoIcon /> },
    { label: "Contact", path: "/contact", icon: <ContactPageIcon /> },
  ];

  const [productSubOpen, setProductSubOpen] = useState(false);
  const handleProductClick = () => setProductSubOpen(!productSubOpen);

const drawerList = (
  <Box sx={{ width: 240 }} role="presentation">
    <Typography variant="h6" sx={{ m: 2 }}>
      FreshMart
    </Typography>
    <Divider />
    <List>

      <Link
        href="/"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={toggleDrawer(false)} 
      >
        <ListItem disablePadding>
          <ListItemButton selected={pathname === "/"}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>

      <ListItemButton onClick={handleProductClick}>
        <ListItemIcon><StoreIcon /></ListItemIcon>
        <ListItemText primary="Products" />
        {productSubOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={productSubOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {[
            { label: "Vegetables", path: "/products/vegetables" },
            { label: "Fruits", path: "/products/fruits" },
            { label: "Frozen Foods", path: "/products/frozen-foods" },
            { label: "Drinks", path: "/products/drinks" },
            { label: "Snacks", path: "/products/snacks" },
            { label: "Meats", path: "/products/meats" },
          ].map((sub) => (
            <Link
              key={sub.path}
              href={sub.path}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={toggleDrawer(false)} 
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={sub.label} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>

      <Link
        href="/about"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={toggleDrawer(false)}
      >
        <ListItem disablePadding>
          <ListItemButton selected={pathname === "/about"}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link
        href="/contact"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={toggleDrawer(false)}
      >
        <ListItem disablePadding>
          <ListItemButton selected={pathname === "/contact"}>
            <ListItemIcon><ContactPageIcon /></ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  </Box>
);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "green" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            FreshMart
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              maxWidth: 300,
              mx: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
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

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            <Link href="/">
              <Button
                sx={{
                  color: "white",
                  borderBottom: pathname === "/" ? "2px solid yellow" : "none",
                }}
              >
                Home
              </Button>
            </Link>

            <Product />

            <Link href="/about">
              <Button
                sx={{
                  color: "white",
                  borderBottom:
                    pathname === "/about" ? "2px solid yellow" : "none",
                }}
              >
                About
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                sx={{
                  color: "white",
                  borderBottom:
                    pathname === "/contact" ? "2px solid yellow" : "none",
                }}
              >
                Contact
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: "flex"}}>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleProfileOpen}>
              <AccountCircle />
            </IconButton>
            {/* <IconButton
              sx={{ display: { sm: "none" } }}
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleProfileClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileClose}>My Account</MenuItem>
      </Menu>

      {/* <Menu
        id={mobileMenuId}
        anchorEl={mobileAnchor}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem onClick={handleProfileOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu> */}

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </Box>
  );
}
