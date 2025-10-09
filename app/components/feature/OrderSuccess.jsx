"use client";
import React from "react";
import { Container, Typography, Button, Stack, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{ py: 10, textAlign: "center", display: "flex", justifyContent: "center" }}
    >
      <Paper elevation={3} sx={{ p: 6, borderRadius: 3, textAlign: "center" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Thank You! 🎉
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your order has been placed successfully.  
          We'll notify you once it's shipped 🚚.
        </Typography>

        <Stack spacing={2} direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => router.push("/")}
          >
            Continue Shopping 🛒
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => router.push("/orders")}
          >
            View My Orders 📝
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
