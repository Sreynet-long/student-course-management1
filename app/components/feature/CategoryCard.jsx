"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/categories/${category.slug}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "16px",
          boxShadow: 1,
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.25s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ width: { xs: 40, sm: 50, md: 60 }, height: { xs: 40, sm: 50, md: 60 }, position: "relative", mb: 1 }}>
          <Image src={category.icon} alt={category.name} fill style={{ objectFit: "contain" }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            textAlign: "center",
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          {category.name}
        </Typography>
      </Box>
    </Link>
  );
}
