"use client";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "../../feature/CategoryCard";

const categoriesData = [
  { id: "1", name: "Vegetable",icon: "/icons/vegetable.png", slug: "vegetable",Link: "/categories/vegetable"},
  { id: "2", name: "Snacks & Breads", icon: "/icons/croissant.png", slug: "snacks-breads",Link: "/categories/Snacks-breads" },
  { id: "3", name: "Fruits", icon: "/icons/fruit.png", slug: "fruits" ,Link: "/categories/fruits"},
  { id: "4", name: "Meats", icon: "/icons/meats.png", slug: "meats",Link: "/categories/meats" },
  { id: "5", name: "Milk & Dairy", icon: "/icons/milk.png", slug: "milk-dairy",Link: "/categories/milk-dairy" },
  { id: "6", name: "seafood", icon: "/icons/seafood.png", slug: "seafood" ,Link: "/categories/seafood"},
  
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
        <Stack>
        <Typography
         variant="h5" 
         sx={{fontWeight: "bold", 
          mb: 3,
          textAlign: { xs: "center", md: "left" }, }}>Categories 📦</Typography>
        </Stack>
        {canScrollLeft && (
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: -20,
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: 2,
              borderRadius: "50%",
              "&:hover": { bgcolor: "grey.100" },
              zIndex: 10,
              // display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
        )}

        <Stack
          direction="row"
          spacing={2}
          ref={scrollRef}
          sx={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            "::-webkit-scrollbar": { display: "none" },
            px: { xs: 0, md: 6 },
          }}
        >
          {categoriesData.map((category) => (
            <Box
              key={category.id}
              sx={{
                flex: "0 0 auto",
                minWidth: { xs: 120, sm: 160, md: 180 },
                scrollSnapAlign: "start",
              }}
            >
              <CategoryCard category={category} 
                href={`/categories/${category.slug}`}
              />
            </Box>
          ))}
        </Stack>
        {canScrollRight && (
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: -20,
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: 2,
              borderRadius: "50%",
              "&:hover": { bgcolor: "grey.100" },
              zIndex: 10,
              // display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
