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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CREATE_REVIEW, GET_ALL_REVIEWS } from "../../schema/review";
import { race } from "rxjs";
import { useQuery, useMutation } from "@apollo/client/react";

export default function CustomerReviews() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_REVIEWS, {
    variables: {
      page: 1,
      limit: 10,
      pagination: true,
      keyword: "",
    },
  });

  const reviews = data?.getAllReviews?.reviews || [];

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
           What Our Customers Say 📝
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Swiper
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: {
                direction: "horizontal",
                slidesPerView: 1,
              },
              600: {
                direction: "horizontal",
                slidesPerView: 2,
              },
              1200: {
                direction: "horizontal",
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            style={{ height: "100%", width: "100%", padding: "20px 0" }}
          >
            {reviews.map((rev, index) => (
              <SwiperSlide key={index}>
                <Card
                  elevation={2}
                  sx={{
                  maxWidth: 400,
                  mx: "auto",
                  my: 2,
                  minHeight: 240,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                      src={rev.avatar}
                      alt={rev.name}
                      sx={{ width: 64, height: 64, mb: 2 }}
                    />
                    
                    <Typography variant="body1" gutterBottom textAlign="center">
                      "{rev.comment}"
                    </Typography>
                    <Rating
                      name="read-only"
                      value={rev.rating}
                      precision={0.5}
                      readOnly
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                      - {rev.name}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          {/* Vertical (mobile/tablet) */}
          <IconButton
            className="swiper-button-prev"
            sx={{
              display: { xs: "flex", lg: "none" },
              position: "absolute",
              top: "-30px",
              right: "10px",
              bgcolor: "#219721ff",
              boxShadow: 2,
            }}
          >
            <KeyboardArrowLeftIcon color="white"/>
          </IconButton>

          <IconButton
            className="swiper-button-next"
            sx={{
              display: { xs: "flex", lg: "none" },
              position: "absolute",
              bottom: "-30px",
              right: "10px",
              bgcolor: "#219721ff",
              boxShadow: 2,
            }}
          >
            <KeyboardArrowRightIcon color="white"/>
          </IconButton>

          {/* Horizontal (desktop) */}
          <IconButton
            className="swiper-button-prev"
            sx={{
              display: { xs: "none", lg: "flex" },
              position: "absolute",
              top: "50%",
              left: "-30px",
              transform: "translateY(-50%)",
              bgcolor: "#219721ff",
              boxShadow: 2,
            }}
          >
            <KeyboardArrowLeftIcon color="white"/>
          </IconButton>

          <IconButton
            className="swiper-button-next"
            sx={{
              display: { xs: "none", lg: "flex" },
              position: "absolute",
              top: "50%",
              right: "-30px",
              transform: "translateY(-50%)",
              bgcolor: "#219721ff",
              boxShadow: 2,
            }}
          >
            <KeyboardArrowRightIcon color="white"/>
          </IconButton>
        </Box>
      </Stack>
    </Container>
  );
}

// const reviews = [
//     { name: "Sangwon", review: "Freshmart always delivers the best quality vegetables!", avatar: "/avatars/sangwon.jpg",rating: 5  },
//     { name: "Dara", review: "Quick delivery and great service. Highly recommended!", avatar: "/avatars/avatar2.png",rating: 4 },
//     { name: "Sophea", review: "I love their fruits section — always fresh and sweet.", avatar: "/avatars/sangwon.jpg",rating: 4.5 },
//     { name: "Vanna", review: "Affordable and reliable. My go-to online mart!", avatar: "/avatars/user4.png" ,rating: 4},
//     { name: "Ratha", review: "The dairy products are always fresh and safe.", avatar: "/avatars/avatar2.png",rating: 5 },
//   ];