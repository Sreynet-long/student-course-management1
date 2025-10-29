"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../../components/Cartbox/ProductCart";
import { GET_PRODUCT_BY_CATEGORY } from "@/app/schema/Product";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  // ✅ Map slug → backend enum
  const categoryMap = useMemo(
    () => ({
      vegetable: "Vegetable",
      "snacks-breads": "Sneack_and_Bread",
      fruits: "Fruit",
      meats: "Meats",
      "milk-dairy": "Milk_and_Diary",
      seafood: "Seafood",
      drinks: "Drinks",
      "frozen-food": "Frozen_Food",
    }),
    []
  );

  // ✅ Fetch products by category using GraphQL
  useEffect(() => {
    async function fetchProducts() {
      if (!categoryMap[slug]) return;
      setLoading(true);
      try {
        const { data } = await client.query({
          query: GET_PRODUCT_BY_CATEGORY,
          variables: { category: categoryMap[slug] },
          fetchPolicy: "no-cache",
        });
        setProducts(data.getProductsByCategory);
        setFiltered(data.getProductsByCategory);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [slug, categoryMap]);

  // ✅ Handle Sorting
  const handleSort = (value) => {
    setSort(value);
    let sorted = [...filtered];
    if (value === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (value === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (value === "name") sorted.sort((a, b) => a.productName.localeCompare(b.productName));
    setFiltered(sorted);
  };

  // ✅ Handle Search (live filter)
  useEffect(() => {
    const filteredData = products.filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, products]);

  if (!categoryMap[slug]) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4">Category not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        maxWidth: "1300px",
        mx: "auto",
      }}
    >
      {/* 🏷️ Category Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: { xs: "center", md: "left" },
          textTransform: "capitalize",
        }}
      >
        {slug.replace("-", " ")}
      </Typography>

      {/* 🔍 Search & Sort Controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", md: "40%" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} label="Sort By" onChange={(e) => handleSort(e.target.value)}>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="name">Name (A-Z)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 🌀 Loading & Product Grid */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography sx={{ textAlign: "center", py: 6 }}>
          No products found in this category.
        </Typography>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            style={{ width: "100%" }}
          >
            <Grid container spacing={3}>
              {filtered.map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
      )}
    </Box>
  );
}
