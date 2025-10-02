"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter();

  // Responsive helper
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    alert("✅ Order placed successfully!");
    clearCart();
    router.push("/order-success"); // redirect home or order success page
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4} direction={isMobile ? "column" : "row"}>
        {/* Left Side - Shipping & Payment */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: isMobile ? 3 : 0 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Delivery Address"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit / Debit Card"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
            </RadioGroup>
          </Paper>
        </Grid>

        {/* Right Side - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {cart.length === 0 ? (
              <Typography>Your cart is empty 🛒</Typography>
            ) : (
              <>
                {cart.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography>
                      {item.name} x {item.qty}
                    </Typography>
                    <Typography>
                      ${(item.price * item.qty).toFixed(2)}
                    </Typography>
                  </Stack>
                ))}

                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Shipping</Typography>
                  <Typography>${shipping.toFixed(2)}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1 }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Stack>

                {/* Back + Place Order Buttons */}
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={2}
                  sx={{ mt: 3 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => router.push("/cart")}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </Stack>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
