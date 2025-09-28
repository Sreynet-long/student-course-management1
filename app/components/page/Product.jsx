"use client";
import React from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MegaMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 600,
    padding: theme.spacing(3),
    borderRadius: 8,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 12px, rgba(0, 0, 0, 0.05) 0px 2px 4px",
  },
  "& a": {
    display: "block",
    textDecoration: "none",
    color: theme.palette.text.primary,
    padding: "4px 0",
    fontSize: "0.95rem",
    transition: "color 0.2s",
  },
  "& a:hover": {
    color: theme.palette.primary.main,
  },
}));

export default function Product() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        sx={{
          backgroundColor: "green",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
      >
        Products
      </Button>

      <MegaMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "product-mega-menu" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Fresh Produce 🥬
            </Typography>
            <Link href="/products/vegetables" onClick={handleClose}>
              Vegetables
            </Link>
            <Link href="/products/fruits" onClick={handleClose}>
              Fruits
            </Link>
            <Link href="/products/herbs" onClick={handleClose}>
              Herbs & Spices
            </Link>
            <Link href="/products/organic" onClick={handleClose}>
              Organic Produce
            </Link>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Pantry & Frozen 🍞
            </Typography>
            <Link href="/products/bakery-snacks" onClick={handleClose}>
              Bakery & Snacks
            </Link>
            <Link href="/products/frozen-foods" onClick={handleClose}>
              Frozen Foods
            </Link>
            <Link href="/products/meats" onClick={handleClose}>
              Meat & Seafood
            </Link>
            <Link href="/products/dairy-eggs" onClick={handleClose}>
              Dairy & Eggs
            </Link>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Beverages & More 🧃
            </Typography>
            <Link href="/products/drinks" onClick={handleClose}>
              Drinks & Beverages
            </Link>
            <Link href="/products/snacks" onClick={handleClose}>
              Snacks & Sweets
            </Link>
            <Link href="/products/household" onClick={handleClose}>
              Household & Personal Care
            </Link>
            <Link href="/products/offers" onClick={handleClose}>
              Special Offers
            </Link>
          </Grid>
        </Grid>
      </MegaMenu>
    </div>
  );
}
