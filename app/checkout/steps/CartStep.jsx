"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useCart } from "@/app/context/CartContext";

export default function CartStep() {
  const { cart } = useCart();

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "success"}}>
        Cart  
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Typography>Review your items before shipping.</Typography>
      )}
    </Box>
  );
}
