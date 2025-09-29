// src/components/Newsletter.jsx
"use client";
import React from "react";
import { Container, Typography, Stack, TextField, Button } from "@mui/material";

export default function Newsletter() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 6 }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Stay Updated
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Subscribe to our newsletter for fresh deals and weekly offers.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <TextField label="Enter your email" variant="outlined" fullWidth sx={{ borderRadius: "27px"}}/>
          <Button variant="contained" color="success" sx={{ px: 4, borderRadius: "25px"}}>
            <span>🔔</span>Subscribe
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
