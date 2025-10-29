"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

// Steps
const steps = ["Cart", "Shipping", "Checkout"];

// Sticky order summary
function OrderSummary({ cart }) {
  const router = useRouter();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, borderRadius: 2, position: "sticky", top: 100 }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1}>
        <Typography>
          Items: <strong>{totalItems}</strong>
        </Typography>
        <Typography>
          Subtotal: <strong>${subtotal.toFixed(2)}</strong>
        </Typography>
      </Stack>

      <Stack spacing={2} mt={3}>
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push("#checkout")}
        >
          Proceed
        </Button>
      </Stack>
    </Paper>
  );
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);

  // Shipping state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const validateShipping = () => {
    if (!name || !phone || !email || !address) return false;
    // basic email regex
    if (!/\S+@\S+\.\S+/.test(email)) return false;
    return true;
  };

  const nextStep = () => {
    // Validate cart on step 0
    if (activeStep === 0 && cart.length === 0) {
      alert("Cart is empty! Add items before proceeding.");
      return;
    }
    // Validate shipping on step 1
    if (activeStep === 1 && !validateShipping()) {
      alert("Please fill in all required shipping information.");
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: "1200px", mx: "auto" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <MuiLink onClick={() => setActiveStep(0)} underline="hover" sx={{ cursor: "pointer" }}>
          Home
        </MuiLink>
        {activeStep >= 0 && (
          <MuiLink onClick={() => setActiveStep(0)} underline="hover" sx={{ cursor: "pointer" }}>
            Cart
          </MuiLink>
        )}
        {activeStep >= 1 && (
          <MuiLink onClick={() => setActiveStep(1)} underline="hover" sx={{ cursor: "pointer" }}>
            Shipping
          </MuiLink>
        )}
        {activeStep >= 2 && <Typography>Checkout</Typography>}
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Main content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {/* Cart Step */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Cart
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {cart.length === 0 ? (
                  <Typography>Your cart is empty.</Typography>
                ) : (
                  <Stack spacing={2}>
                    {cart.map((item) => (
                      <Paper key={item.product.id} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography fontWeight="bold">{item.product.productName}</Typography>
                        <Typography>
                          ${item.product.price.toFixed(2)} × {item.quantity}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Box>
            )}

            {/* Shipping Step */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Shipping Info
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone"
                  margin="normal"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Address"
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Box>
            )}

            {/* Checkout Step */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Checkout
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography>Review your order and shipping information before submitting.</Typography>
              </Box>
            )}

            {/* Navigation */}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button disabled={activeStep === 0} onClick={prevStep}>
                Back
              </Button>
              <Button variant="contained" onClick={nextStep}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Sticky Order Summary */}
        <Grid item xs={12} md={4}>
          <OrderSummary cart={cart} />
        </Grid>
      </Grid>
    </Box>
  );
}
