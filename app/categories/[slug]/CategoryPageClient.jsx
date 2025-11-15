"use client";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT_WITH_PAGINATION } from "@/app/schema/Product";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  Button,
  Card,
  CardMedia,
  Breadcrumbs,
  CardContent,
  Stack,
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import WhyShopWithUs from "@/app/components/feature/WhyShopWithUs";

// Map URL slug → GraphQL enum
const categoryMap = {
  vegetable: "Vegetable",
  "snacks-breads": "Sneack_and_Bread",
  fruits: "Fruit",
  meats: "Meats",
  "milk-dairy": "Milk_and_Diary",
  seafood: "Seafood",
  drinks: "Drinks",
  "frozen-food": "Frozen_Food",
};

export default function CategoryPageClient({ slug }) {
  const { addToCart } = useCart();

  const displayName = categoryMap[slug] || slug;

  // Convert slug to enum value
  const categoryEnum = categoryMap[slug];

  const { loading, error, data, refetch } = useQuery(
    GET_PRODUCT_WITH_PAGINATION,
    {
      variables: {
        page: 1,
        limit: 12,
        pagination: true,
        keyword: "",
        category: categoryEnum,
      },
    }
  );

  // Refetch when slug changes
  useEffect(() => {
    if (categoryEnum) {
      refetch({
        page: 1,
        limit: 12,
        pagination: true,
        keyword: "",
        category: categoryEnum,
      });
    }
  }, [slug, refetch, categoryEnum]);

  const products = Array.isArray(data?.getProductWithPagination?.data)
    ? data.getProductWithPagination.data
    : [];

  return (
    <Box sx={{ py: 3, px: { xs: 2, sm: 4 } }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: "none", color: "blue" }}>
          Home
        </Link>
        <Typography color="text.primary">{displayName}</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(12)).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Skeleton variant="rectangular" height={270} />
            </Grid>
          ))
        ) : error ? (
          <Typography color="error">{error.message}</Typography>
        ) : products.length === 0 ? (
          <Typography>No products found in this category.</Typography>
        ) : (
          products.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: 300,
                  width: 170,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  p: 1,
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <CardMedia
                  component="img"
                  height="130"
                  image={product.imageUrl}
                  alt={product.productName}
                  sx={{ objectFit: "contain", p: 1}}
                />
                <CardContent sx={{ p: 1, textAlign: "justify", flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.desc}
                  </Typography>
                  <Typography fontSize="16px" variant="h6" mt={1}>
                    ${product.price?.toFixed(2) ?? "0.00"}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, borderRadius: "20px", textTransform: "none" }}
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Stack sx={{ mt: 3 }}>
        <WhyShopWithUs />
      </Stack>
    </Box>
  );
}
