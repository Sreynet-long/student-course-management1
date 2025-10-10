"use client";
import React, { useState } from "react";
import {
  Stack,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";
import styles from "@/app/components/styles/sellProduct.module.css";
import { GET_PRODUCT_WITH_PAGINATION } from "@/app/schema/Product";
import { useQuery } from "@apollo/client/react";
import { useCart } from "@/app/context/CartContext";

const categories = [
  "Vegetable",
  "Sneack_and_Bread",
  "Fruit",
  "Meats",
  "Milk_and_Diary",
  "Seafood",
  "Drinks",
  "Frozen_Food",
];

// Optional: prettier labels
const categoryLabels = {
  Vegetable: "Vegetables",
  Sneack_and_Bread: "Snacks & Bread",
  Fruit: "Fruits",
  Meats: "Meats",
  Milk_and_Diary: "Milk & Dairy",
  Seafood: "Seafood",
  Drinks: "Drinks",
  Frozen_Food: "Frozen Food",
};

export default function SellProductList() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetable");
  const { addToCart } = useCart();

  const { loading, error, data, refetch } = useQuery(
    GET_PRODUCT_WITH_PAGINATION,
    {
      variables: {
        page: 1,
        limit: 12,
        pagination: true,
        keyword: "",
        category: selectedCategory,
      },
    }
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    refetch({
      page: 1,
      limit: 12,
      pagination: true,
      keyword: "",
      category,
    });
  };

  const products = Array.isArray(data?.getProductWithPagination?.data)
    ? data.getProductWithPagination.data
    : [];

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4 }, bgcolor: "background.paper" }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Weekly Selling Products 👇
        </Typography>

        {/* Category buttons */}
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
              onClick={() => handleCategoryClick(cat)}
              className={styles["btn-product-list"]}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 500,
                px: 2.5,
                py: 1,
              }}
            >
              {categoryLabels[cat] || cat.replace(/_/g, " ")}
            </Button>
          ))}
        </Stack>

        {/* Products Grid */}
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            Array.from(new Array(12)).map((_, i) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={i}>
                <Skeleton variant="rectangular" height={270} />
              </Grid>
            ))
          ) : error ? (
            <Typography color="error">Error: {error.message}</Typography>
          ) : (
            products.map((product) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    "&:hover": { boxShadow: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    p: 1,
                    width: 170,
                    height: 300, 
                  }}
                >
                  <CardMedia
                    component="img"
                    height="130"
                    image={product.imageUrl || "/placeholder.png"}
                    alt={product.productName}
                    sx={{ objectFit: "contain", p: 1 }}
                  />
                  <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.productName}
                    </Typography>
                    <Typography fontSize="16px" variant="h6" mt={1}>
                      $
                      {product.price != null
                        ? Number(product.price).toFixed(2)
                        : "0.00"}
                    </Typography>
                  </CardContent>
                  <Box sx={{p:1}}>
                    <Button
                      color="success"
                      variant="contained"
                      size="small"
                      sx={{ mt: 1, borderRadius: "20px", textTransform: "none" }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Stack>
    </Box>
  );
}
