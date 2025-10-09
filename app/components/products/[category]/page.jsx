"use client";

import React, {useState} from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_WITH_PAGINATION } from "@/app/schema/Product";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function CategoryPage() {
  const { category } = useParams();
  const [paginationData, setPaginetionData] = useState([]);
  const { data, loading, error } = useQuery(GET_PRODUCT_WITH_PAGINATION, {
    variables: { 
      page ,
      limit,
      pagitnation: true,
      keyword,
      category,
      
    },
  });

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        Error: {error.message}
      </Typography>
    );

  const products = data?.getProductWithPagination || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textTransform: "capitalize" }}>
        {category}
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={product.imageUrl || "/no-image.jpg"}
                alt={product.productName}
              />
              <CardContent>
                <Typography variant="h6">{product.productName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.desc}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  ${product.price?.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
