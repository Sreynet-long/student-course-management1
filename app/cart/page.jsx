"use client";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity, checkout } =
    useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: "lg", mx: "auto", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
      
      {/* Product List */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5" gutterBottom>
          🛒 Your Cart ({totalItems} items)
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 2,
                      objectFit: "cover",
                      mr: 2,
                    }}
                    image={item.product.imageUrl || "/no-image.png"}
                    alt={item.product.productName}
                  />

                  <CardContent sx={{ flex: 2 }}>
                    <Typography variant="body1" fontSize="18px">
                      {item.product.productName}
                    </Typography>
                    <Typography color="text.secondary">
                      ${item.product.price.toFixed(2)} each
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>

                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      {item.quantity}
                    </motion.span>

                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Typography sx={{ flex: 1, textAlign: "right", mr: 2 }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>

                  <IconButton onClick={() => removeFromCart(item.product.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Box>

      {/* Sticky Summary */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 3,
          height: "fit-content",
          position: { xs: "relative", md: "sticky" },
          top: { md: 100 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          Total Items: <strong>{totalItems}</strong>
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Price: <strong>${totalPrice.toFixed(2)}</strong>
        </Typography>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={checkout}
          >
            Checkout
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
