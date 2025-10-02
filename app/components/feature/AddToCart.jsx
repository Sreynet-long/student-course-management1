"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import ProductDetail from "./ProductDetail";
import { useCart } from "../../context/CartContext";

const items = [
  {
    id: 1,
    name: "Carrot",
    image: "/images/carrot.png",
    desc: "500g",
    price: 2.5,
  },
  { id: 2, name: "Beef", image: "/images/beef.png", desc: "500g", price: 1.5 },
  {
    id: 3,
    name: "Cabbage",
    image: "/images/cabbage.png",
    desc: "500g",
    price: 3.0,
  },
  {
    id: 4,
    name: "Dragon Fruit",
    image: "/images/dragon.png",
    desc: "500g",
    price: 5.0,
  },
  { id: 5, name: "Milk", image: "/images/milk.png", desc: "1 can", price: 6.0 },
  {
    id: 6,
    name: "Frozen Strawberry",
    image: "/images/freezeStrawberry.png",
    desc: "500g",
    price: 4.0,
  },
  {
    id: 7,
    name: "Dragon Fruit",
    image: "/images/dragon.png",
    desc: "500g",
    price: 5.0,
  },
  { id: 8, name: "Milk", image: "/images/milk.png", desc: "1 can", price: 6.0 },
  {
    id: 9,
    name: "Frozen Strawberry",
    image: "/images/freezeStrawberry.png",
    desc: "500g",
    price: 4.0,
  },
];

export default function AddToCard() {
  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 }, bgcolor: "background.paper" }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          You might need ♥
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {items.map((item) => (
            <Grid key={item.id} item xs={6} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": { boxShadow: 4 },
                  textAlign: "center",
                  p: 1,
                  width: 170,
                  height: 300,
                  p: 1,
                }}
              >
                <CardMedia
                  component="img"
                  height="130"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: "contain", p: 1 }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                  <Typography fontSize="16px" variant="h6" mt={1}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, borderRadius: "20px", textTransform: "none" }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
