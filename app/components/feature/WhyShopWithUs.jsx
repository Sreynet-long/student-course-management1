// src/components/WhyShopWithUs.jsx
"use client";
import React from "react";
import { Container, Typography, Grid, Box, Stack } from "@mui/material";
import { LocalShipping, ThumbUp, SupportAgent } from "@mui/icons-material";
import { color } from "framer-motion";

export default function WhyShopWithUs() {
  const reasons = [
    {
      icon: <LocalShipping fontSize="large" color="success" />,
      title: "Fast Delivery",
      desc: "Get your groceries delivered in record time.",
    },
    {
      icon: <ThumbUp fontSize="large" color="success" />,
      title: "Quality Products",
      desc: "Only the freshest and finest items.",
    },
    {
      icon: <SupportAgent fontSize="large" color="success" />,
      title: "24/7 Support",
      desc: "We're here whenever you need us.",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 6 }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" mb={5}>
          Why Shop With Us 💯
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Grid container spacing={3} justifyContent="center" gap={8}>
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
        </Stack>
      </Stack>
    </Container>
  );
}
