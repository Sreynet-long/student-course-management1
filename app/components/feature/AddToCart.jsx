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
  Skeleton,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT_WITH_PAGINATION } from "@/app/schema/Product";

export default function AddToCart() {
  const { addToCart } = useCart();

  const { loading, error, data } = useQuery(GET_PRODUCT_WITH_PAGINATION, {
    variables: {
      page: 1,
      limit: 18,
      pagination: true,
      keyword: "",
      category: null,
    },
  });

  const products = Array.isArray(data?.getProductWithPagination?.data)
    ? data.getProductWithPagination.data
    : [];

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
          {loading
            ? Array.from(new Array(12)).map((_, i) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={i}>
                  <Skeleton variant="rectangular" height={270} />
                </Grid>
              ))
            : error
            ? <Typography color="error">Error: {error.message}</Typography>
            : products.map((product) => (
                <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 2,
                      "&:hover": { boxShadow: 4 },
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
                      image={product.imageUrl}
                      alt={product.productName}
                      sx={{ objectFit: "contain", p: 1 }}
                    />
                    <CardContent sx={{ p: 1, textAlign: "justify", flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {product.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
              ))}
        </Grid>
      </Stack>
    </Box>
  );
}
