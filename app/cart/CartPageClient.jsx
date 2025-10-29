"use client";

import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardMedia,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import OrderSummary from "../components/page/OrderSummary";

export default function CartPageClient() {
  const { cart, addToCart, removeFromCart, clearCart, updateQuantity } =
    useCart();
  const { setAlert } = useAuth(); // Use setAlert instead of showToast
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddRelated = (product) => {
    addToCart(product);
    setAlert(true, "success", {
      messageEn: `${product.productName} added to cart!`,
      messageKh: "",
    });
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        maxWidth: "lg",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      {/* Product List */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🛒 Shopping Cart ({totalItems} items)
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.product.imageUrl || "/no-image.png"}
                    alt={item.product.productName}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 1,
                      objectFit: "cover",
                      mr: 3,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.product.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      ${item.product.price.toFixed(2)} each
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mt: 1 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.product.id, item.quantity - 1);
                            setAlert(true, "success", {
                              messageEn: `Decreased quantity of ${item.product.productName}`,
                              messageKh: "",
                            });
                          }
                        }}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ width: 25, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateQuantity(item.product.id, item.quantity + 1);
                          setAlert(true, "success", {
                            messageEn: `Increased quantity of ${item.product.productName}`,
                            messageKh: "",
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>

                    <Stack direction="row" spacing={2} mt={1}>
                      <Button
                        startIcon={<DeleteIcon />}
                        size="small"
                        sx={{ textTransform: "none", fontSize: "0.875rem" }}
                        color="error"
                        onClick={() => {
                          removeFromCart(item.product.id);
                          setAlert(true, "success", {
                            messageEn: `${item.product.productName} removed from cart!`,
                            messageKh: "",
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>

                  <Box sx={{ textAlign: "right", ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Box>

      {/* Order Summary */}
      <Box
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
        <OrderSummary />
      </Box>
    </Box>
  );
}
