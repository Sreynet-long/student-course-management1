"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Typography, Grid, CircularProgress, Button, Stack } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_WITH_PAGINATION , GET_PRODUCT_BY_CATEGORY} from "../../../graphql/productQueries";
import ProductCard from "../../../feature/ProductCard"; // your product card component

export default function CategoryPage({ params }) {
  const { slug } = params; // category slug from URL
  const [page, setPage] = useState(1);
  const limit = 12; // number of products per page

  // Map slug to GraphQL category enum if needed
  const slugToCategory = {
    "vegetable": "Vegetable",
    "snacks-breads": "Sneack_and_Bread",
    "fruits": "Fruit",
    "meats": "Meats",
    "milk-dairy": "Milk_and_Diary",
    "seafood": "Seafood",
    "drinks": "Drinks",
    "frozen-food": "Frozen_Food",
  };
  const categoryEnum = slugToCategory[slug] || "";

  const { data, loading, error, refetch } = useQuery(GET_PRODUCT_WITH_PAGINATION, {
    variables: {
      page,
      limit,
      pagination: true,
      category: categoryEnum,
    },
    fetchPolicy: "network-only",
  });

  const products = data?.getProductWithPagination?.data || [];
  const paginator = data?.getProductWithPagination?.paginator || {};

  useEffect(() => {
    setPage(1);
    refetch({ page: 1, category: categoryEnum });
  }, [slug]);

  const handlePrev = () => {
    if (paginator.hasPrevPage) {
      setPage(page - 1);
      refetch({ page: page - 1, category: categoryEnum });
    }
  };

  const handleNext = () => {
    if (paginator.hasNextPage) {
      setPage(page + 1);
      refetch({ page: page + 1, category: categoryEnum });
    }
  };

  if (loading) return <Box sx={{ textAlign: "center", py: 10 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ textAlign: "center", py: 10 }}>Error loading products</Box>;

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", py: 6, px: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
        {slug.replace("-", " ").toUpperCase()}
      </Typography>

      {products.length === 0 ? (
        <Typography>No products found in this category.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <Button variant="outlined" onClick={handlePrev} disabled={!paginator.hasPrevPage}>
            Prev
          </Button>
          <Button variant="outlined" onClick={handleNext} disabled={!paginator.hasNextPage}>
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
}
