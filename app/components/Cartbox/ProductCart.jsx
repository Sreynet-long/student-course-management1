"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", height: 150, position: "relative" }}>
        <Image src={product.imageUrl} alt={product.productName} fill style={{ objectFit: "contain" }} />
      </Box>
      <Typography sx={{ mt: 1, fontWeight: 500, textAlign: "center" }}>
        {product.productName}
      </Typography>
      <Typography color="gray" sx={{ fontSize: 14 }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Button sx={{ mt: 1 }} variant="contained" size="small">
        Add to Cart
      </Button>
    </Box>
  );
}
