"use Client";
import React, { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import Toast from "../../components/Toaste";
import { useRouter } from "next/navigation";
function OrderSummary() {
  const { cart, addToCart, removeFromCart, clearCart, updateQuantity } =
    useCart();
  const router = useRouter();
  const [toast, setToast] = useState({ open: false, message: "" });
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0;
  const totalPrice = subtotal + estimatedTax;

  const showToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 2000);
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };
  return (
    <Stack>
      {/* Order Summary */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 2,
          height: "fit-content",
          position: { md: "sticky" },
          top: { md: 100 },
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {cart.map((item) => (
            <Avatar
              key={item.product.id}
              src={item.product.imageUrl || "/no-image.png"}
              variant="rounded"
              sx={{ width: 50, height: 50, border: "1px solid #ddd" }}
            />
          ))}
        </Box>
        <Stack spacing={1} mt={2}>
          <Typography variant="body2">
            Subtotal ({totalItems} items):{" "}
            <strong>${subtotal.toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Estimated Tax: <strong>${estimatedTax.toFixed(2)}</strong>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">
            Total: <strong>${totalPrice.toFixed(2)}</strong>
          </Typography>
        </Stack>

        <Stack spacing={2} mt={3}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ py: 1.5 }}
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
            onClick={() => {
              clearCart();
              showToast("Cart cleared!");
            }}
          >
            Clear Cart
          </Button>
        </Stack>
      </Paper>
      <Toast open={toast.open} message={toast.message} />
    </Stack>
  );
}

export default OrderSummary;
