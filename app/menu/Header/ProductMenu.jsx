import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";

export default function ProductMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <div onMouseLeave={handleMouseLeave}>
      <Button
        sx={{ color: "white" }}
        onMouseEnter={handleMouseEnter}
        aria-controls={open ? "products-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        Products
      </Button>

      <Menu
        id="products-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMouseLeave}
        // MenuListProps={{
        //   onMouseEnter: handleMouseEnter,
        //   onMouseLeave: handleMouseLeave,
        // }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem component={Link} href="/product/vegetables">
          Vegetables
        </MenuItem>
        <MenuItem component={Link} href="/product/fruits">
          Fruits
        </MenuItem>
        <MenuItem component={Link} href="/product/dairy">
          Milk & Dairy
        </MenuItem>
      </Menu>
    </div>
  );
}
