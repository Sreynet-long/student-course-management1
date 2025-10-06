"use client";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "../../feature/CategoryCard";

const categoriesData = [
  { id: "1", name: "Vegetable", icon: "/icons/vegetable.png", slug: "vegetable", Link: "/categories/vegetable" },
  { id: "2", name: "Snacks & Breads", icon: "/icons/croissant.png", slug: "snacks-breads", Link: "/categories/snacks-breads" },
  { id: "3", name: "Fruits", icon: "/icons/fruit.png", slug: "fruits", Link: "/categories/fruits" },
  { id: "4", name: "Meats", icon: "/icons/meats.png", slug: "meats", Link: "/categories/meats" },
  { id: "5", name: "Milk & Dairy", icon: "/icons/milk.png", slug: "milk-dairy", Link: "/categories/milk-dairy" },
  { id: "6", name: "Seafood", icon: "/icons/seafood.png", slug: "seafood", Link: "/categories/seafood" },
  { id: "7", name: "Drinks", icon: "/icons/seafood.png", slug: "drinks", Link: "/categories/drinks" },
  { id: "8", name: "Seafood", icon: "/icons/seafood.png", slug: "seafood", Link: "/categories/seafood" },
];

export default function CategoryList() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      checkScroll();
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <Box
  sx={{
    bgcolor: "background.paper",
    py: 6,
    px: { xs: 2, sm: 4 },
    position: "relative",
  }}
>
  <Box
    sx={{
      maxWidth: "1200px",
      mx: "auto",
      position: "relative",
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: "bold",
        mb: 3,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      Category
    </Typography>

    {/* Carousel wrapper: relative */}
    <Box sx={{ position: "relative" }}>
      {/* Left arrow overlay */}
      <IconButton
        onClick={() => handleScroll("left")}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(255,255,255,0.9)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          boxShadow: 2,
          borderRadius: "50%",
          zIndex: 10,
          opacity: canScrollLeft ? 1 : 0, // fade in/out
          transition: "opacity 0.3s ease, transform 0.3s ease",
          display: { xs: "none", sm: "flex" },
          width: { sm: 32, md: 40 }, // scale down on small screens
          height: { sm: 32, md: 40 },
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      {/* Scrollable row */}
      <Stack
        direction="row"
        spacing={2}
        ref={scrollRef}
        sx={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          "::-webkit-scrollbar": { display: "none" },
          py: 1,
        }}
      >
        {categoriesData.map((category) => (
          <Box
            key={category.id}
            sx={{
              flex: "0 0 auto",
              minWidth: { xs: 100, sm: 130, md: 150 },
              scrollSnapAlign: "start",
              textAlign: "center",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CategoryCard
              category={category}
              href={`/categories/${category.slug}`}
            />
          </Box>
        ))}
      </Stack>

      {/* Right arrow overlay */}
      <IconButton
        onClick={() => handleScroll("right")}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(50%, -50%)",
          bgcolor: "rgba(255,255,255,0.9)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          boxShadow: 2,
          borderRadius: "50%",
          zIndex: 10,
          opacity: canScrollRight ? 1 : 0, // fade in/out
          transition: "opacity 0.3s ease, transform 0.3s ease",
          display: { xs: "none", sm: "flex" },
          width: { sm: 32, md: 40 },
          height: { sm: 32, md: 40 },
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  </Box>
</Box>


  );
}
