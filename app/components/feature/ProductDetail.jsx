"use client";
import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Rating,
} from "@mui/material";
import { Add, Remove, FavoriteBorder } from "@mui/icons-material";
// import { useCart } from "../../hook/useCart";
import { useCart } from "../../context/CartContext";

export default function ProductDetail({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  return (
    <Box sx={{ textAlign: "center", mt: 1 }}>
      {/* Rating */}
      <Rating name="read-only" value={4} readOnly size="small" sx={{ mb: 1 }} />

      {/* Quantity Selector */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          size="small"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          <Remove />
        </IconButton>
        <Typography>{qty}</Typography>
        <IconButton size="small" onClick={() => setQty((q) => q + 1)}>
          <Add />
        </IconButton>
      </Stack>

      {/* Buttons */}
      <Stack direction="row" spacing={1} mt={2} justifyContent="center">
        <Button
          variant="contained"
          size="small"
          sx={{ flex: 1 }}
          onClick={() => addToCart(product, qty)}
        >
          Add to Cart
        </Button>
        <IconButton size="small">
          <FavoriteBorder />
        </IconButton>
      </Stack>

      {/* Stock & Delivery Info */}
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        mt={1}
      >
        In stock • Same-day delivery
      </Typography>
    </Box>
  );
}
