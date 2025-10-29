// src/components/CustomerReviews.jsx
"use client";
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Box,
  Stack,
  Rating,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { GET_REVIEW_BY_PRODUCT } from "../../schema/review";
import { useQuery } from "@apollo/client/react";

export default function CustomerReviews({ productId }) {
  const { data, loading, error } = useQuery(GET_REVIEW_BY_PRODUCT, {
    variables: { productId },
    skip: !productId,
  });

  if (loading) return <Typography>Loading reviews...</Typography>;
  if (error) return <Typography color="error">Error loading reviews: {error.message}</Typography>;

  const reviews = Array.isArray(data?.getReviewsByProduct)
    ? data.getReviewsByProduct
    : [];

  if (!reviews.length) return <Typography>No reviews yet for this product.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          What Our Customers Say 📝
        </Typography>

        <Box sx={{ position: "relative", width: "100%", mt: 4 }}>
          <Swiper
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2, spaceBetween: 15 },
              1200: { slidesPerView: 3, spaceBetween: 20 },
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id || review._id}>
                <Card
                  elevation={3}
                  sx={{
                    mx: "auto",
                    my: 2,
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    px: 2,
                    py: 3,
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      src={review.avatar || ""}
                      alt={review.name}
                      sx={{ width: 64, height: 64, mb: 2 }}
                    />
                    <Typography variant="body1" gutterBottom>
                      "{review.comment}"
                    </Typography>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                      - {review.name}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          {["xs", "sm", "md", "lg", "xl"].map((size) => (
            <React.Fragment key={size}>
              <IconButton
                className="swiper-button-prev"
                sx={{
                  display: { xs: "flex", lg: "flex" },
                  position: "absolute",
                  top: "50%",
                  left: { xs: "-20px", lg: "-40px" },
                  transform: "translateY(-50%)",
                  bgcolor: "#219721ff",
                  "&:hover": { bgcolor: "#197b1fff" },
                  boxShadow: 2,
                }}
              >
                <KeyboardArrowLeftIcon sx={{ color: "#fff" }} />
              </IconButton>

              <IconButton
                className="swiper-button-next"
                sx={{
                  display: { xs: "flex", lg: "flex" },
                  position: "absolute",
                  top: "50%",
                  right: { xs: "-20px", lg: "-40px" },
                  transform: "translateY(-50%)",
                  bgcolor: "#219721ff",
                  "&:hover": { bgcolor: "#197b1fff" },
                  boxShadow: 2,
                }}
              >
                <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
              </IconButton>
            </React.Fragment>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
