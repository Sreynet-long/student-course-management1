"use client";
import React, { useState } from "react";
import { Stack, Button, Typography, Box, Grid, Card, CardMedia, CardContent } from "@mui/material";
import styles from "@/app/components/styles/sellProduct.module.css";

const categories = [
  "Frozen Foods",
  "Vegetables",
  "Snacks & Breads",
  "Fruits",
  "Milk & Dairy",
  "Meats",
  "Drinks",
];

const products = [
  { id: 1, name: "Frozen Pizza", category: "Frozen Foods", price: "$4.50", image: "/images/pizza.png" },
  { id: 2, name: "Fresh Carrot", category: "Vegetables", price: "$2.00", image: "/images/carrot.png" },
  { id: 3, name: "French Baguette", category: "Snacks & Breads", price: "$1.50", image: "/images/bread.png" },
  { id: 4, name: "Apple", category: "Fruits", price: "$3.00", image: "/images/apple.png" },
  { id: 5, name: "Whole Milk", category: "Milk & Dairy", price: "$2.20", image: "/images/milk.png" },
  { id: 6, name: "Chicken Breast", category: "Meats", price: "$6.00", image: "/images/chicken1.png" },
  { id: 7, name: "Coca Cola", category: "Drinks", price: "$0.50", image: "/images/coke.png" },
  { id: 8, name: "Fresh Carrot", category: "Vegetables", price: "$2.00", image: "/images/carrot.png" },
  { id: 9, name: "French Baguette", category: "Snacks & Breads", price: "$1.50", image: "/images/bread.png" },
  { id: 10, name: "Apple", category: "Fruits", price: "$3.00", image: "/images/apple.png" },
  { id: 11, name: "Whole Milk", category: "Milk & Dairy", price: "$2.20", image: "/images/milk.png" },
  { id: 12, name: "Chicken Breast", category: "Meats", price: "$6.00", image: "/images/chicken1.png" },
  { id: 13, name: "Fresh Carrot", category: "Vegetables", price: "$2.00", image: "/images/carrot.png" },
];

export default function SellProductList() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4 }, bgcolor: "background.paper" }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>

        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, textAlign: { xs: "center", md: "left" } }}
        >
          Weekly Selling Products 👇
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          mb={4}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              size="small"
              onClick={() => setSelectedCategory(cat)}
              className={styles["btn-product-list"]}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 500,
                px: 2.5,
                py: 1,
              }}
            >
              {cat}
            </Button>
          ))}
        </Stack>

        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 2, "&:hover": { boxShadow: 4 }, width: "170px", height: "270px" ,textAlign: "center", p: 1,}}>
                <CardMedia
                  component="img"
                  height="130"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "contain", p: 1 }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, borderRadius: "20px", textTransform: "none" }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
