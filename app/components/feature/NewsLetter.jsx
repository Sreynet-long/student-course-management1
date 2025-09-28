// src/components/Newsletter.jsx
"use client";
import React from "react";
import { Container, Typography, Stack, TextField, Button } from "@mui/material";

export default function Newsletter() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Stay Updated
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Subscribe to our newsletter for fresh deals and weekly offers.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
        <TextField label="Enter your email" variant="outlined" fullWidth />
        <Button variant="contained" color="primary" sx={{ px: 4 }}>
          Subscribe
        </Button>
      </Stack>
    </Container>
  );
}
