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
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT_WITH_PAGINATION, GET_ALL_PRODUCT } from "@/app/schema/Product";

export default function AddToCard() {
  const {loading, error, data} = useQuery(GET_ALL_PRODUCT);

  if (loading) return <p style={{justifyContent: "center"}}>loading...</p>
  if (error) return <p>Error: {error.message}</p>
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
          {data?.getAllproducts?.map((product) => (
            <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
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
                  image={product.imageUrl}
                  alt={product.productName}
                  sx={{ objectFit: "contain", p: 1 }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.desc}
                  </Typography>
                  <Typography fontSize="16px" variant="h6" mt={1}>
                    ${product.price != null
                        ? Number(product.price).toFixed(2)
                       : "0.00"}
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

