// src/components/Newsletter.jsx
"use client";
import React,  {useState, useEffect} from "react";
import {
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function Newsletter() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Ensures component only renders after client hydration
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubscribe = () => {
    if (!email) return;
    // Add your subscription logic here
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };
  return (
    <Box
      display="flex"
      sx={{
        textAlign: "center",
        py: 6,
        bgcolor: "#cee6d0ff",
        borderTopRightRadius: "170px",
        borderTopLeftRadius: "170px",
        mt: "15px",
      }}
    >
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Stay Updated
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Subscribe to our newsletter for fresh deals and weekly offers.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <TextField
            id="newsletter-email" 
            label="Enter your email"
            variant="outlined"
            sx={{ borderRadius: "27px", width: "450px" }}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ px: 4, borderRadius: "25px" }}
          >
            <span>🔔</span>Subscribe
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
