// src/components/WhyShopWithUs.jsx
"use client";
import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { LocalShipping, ThumbUp, SupportAgent } from "@mui/icons-material";

export default function WhyShopWithUs() {
  const reasons = [
    { icon: <LocalShipping fontSize="large" color="primary" />, title: "Fast Delivery", desc: "Get your groceries delivered in record time." },
    { icon: <ThumbUp fontSize="large" color="primary" />, title: "Quality Products", desc: "Only the freshest and finest items." },
    { icon: <SupportAgent fontSize="large" color="primary" />, title: "24/7 Support", desc: "We’re here whenever you need us." },
  ];

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Why Shop With Us
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {reasons.map((reason, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Box>
              {reason.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {reason.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reason.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
