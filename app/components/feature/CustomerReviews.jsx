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

export default function CustomerReviews() {
  const reviews = [
    { name: "Sokha", review: "Freshmart always delivers the best quality vegetables!", avatar: "/avatars/user1.png" },
    { name: "Dara", review: "Quick delivery and great service. Highly recommended!", avatar: "/avatars/user2.png" },
    { name: "Sophea", review: "I love their fruits section — always fresh and sweet.", avatar: "/avatars/user3.png" },
    { name: "Vanna", review: "Affordable and reliable. My go-to online mart!", avatar: "/avatars/user4.png" },
    { name: "Ratha", review: "The dairy products are always fresh and safe.", avatar: "/avatars/user5.png" },
  ];

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        What Our Customers Say
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
              direction: "vertical",
              slidesPerView: 1,
            },
            600: {
              direction: "vertical",
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
          {reviews.map((rev, idx) => (
            <SwiperSlide key={idx}>
              <Card
                elevation={2}
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  my: 2,
                  minHeight: 220, // ✅ Uniform height
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
                    "{rev.review}"
                  </Typography>
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
            bgcolor: "white",
            boxShadow: 2,
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>

        <IconButton
          className="swiper-button-next"
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "absolute",
            bottom: "-30px",
            right: "10px",
            bgcolor: "white",
            boxShadow: 2,
          }}
        >
          <KeyboardArrowDownIcon />
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
            bgcolor: "white",
            boxShadow: 2,
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <IconButton
          className="swiper-button-next"
          sx={{
            display: { xs: "none", lg: "flex" },
            position: "absolute",
            top: "50%",
            right: "-30px",
            transform: "translateY(-50%)",
            bgcolor: "white",
            boxShadow: 2,
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
