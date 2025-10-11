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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems, updateQuantity } =
    useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) {

    return null;
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      <Box sx={{ p: 1 }} >
        <Typography variant="h5" gutterBottom>
          🛒 Your Cart ({totalItems} items)
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ width: "65%"}}>
          {cart.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <>
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.1 }}
                  >
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          p: 2,
                          mt: 3,
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
                          image={item.imageUrl || "/no-image.png"}
                          alt={item.productName}
                        />

                        <CardContent sx={{ flex: 2 }}>
                          <Typography variant="body1" fontSize="18px">{item.productName}</Typography>
                          <Typography color="text.secondary">
                            ${item.price.toFixed(2)} each
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
                              updateQuantity(item.id, item.quantity - 1)
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
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>

                        <Typography sx={{ flex: 1, textAlign: "right", mr: 2 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton>
                          <DeleteIcon 
                            color="error"
                            variant="outlined"
                            onClick={() => removeFromCart(item.id)}
                          />
                        </IconButton>
                      </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                  borderTop: "2px solid #eee",
                  pt: 2,
                }}
              >
                {/* <Box sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                }}> */}
                  <Typography variant="h6">
                    Total: ${totalPrice.toFixed(2)}
                  </Typography>
                {/* </Box> */}

                <Button
                  variant="outlined"
                  color="success"
                  onClick={clearCart}
                >
                  Clear All Cart
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
