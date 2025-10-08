"use client";
import React, { useState } from "react";
import { Stack, Button, Typography, Box, Grid, Card, CardMedia, CardContent } from "@mui/material";
import styles from "@/app/components/styles/sellProduct.module.css";
import { GET_PRODUCT_WITH_PAGINATION } from "@/app/schema/Product";
import { useQuery } from "@apollo/client/react";

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

export default function SellProductList() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetable");
  const {loading, error, data} = useQuery(GET_PRODUCT_WITH_PAGINATION,{
    variables: {
      page: 1,
      limit: 12,
      pagination: true,
      keyword: "",
      category: selectedCategory,
    }
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure we always have an array
  const products = Array.isArray(data?.getProductWithPagination?.data)
    ? data.getProductWithPagination.data
    : [];
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    refetch({
      page: 1,
      limit: 20,
      pagination: true,
      keyword: "",
      category,
    });
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4 }, bgcolor: "background.paper" }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, textAlign: { xs: "center", md: "left" } }}
        >
          Weekly Selling Products 👇
        </Typography>

        {/* Category Buttons */}
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
              {cat.replace(/_/g, " ")}
            </Button>
          ))}
        </Stack>

        {/* Products Grid */}
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": { boxShadow: 4 },
                  width: "170px",
                  height: "270px",
                  textAlign: "center",
                  p: 1,
                }}
              >
                <CardMedia
                  component="img"
                  height="130"
                  image={product.imageUrl}
                  alt={product.productName}
                  sx={{ objectFit: "contain", p: 1 }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.productName}
                  </Typography>
                  <Typography fontSize="16px" variant="h6" mt={1}>
                    ${product.price != null ? Number(product.price).toFixed(2) : "0.00"}
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
