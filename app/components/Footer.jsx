"use client";

import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

const categories = [
  { name: "Vegetables", slug: "vegetable" },
  { name: "Fruits", slug: "fruits" },
  { name: "Dairy", slug: "milk-dairy" },
  { name: "Meat & Fish", slug: "meats" },
  { name: "Snacks & Breads", slug: "snacks-breads" },
  { name: "Seafood", slug: "seafood" },
  { name: "Drinks", slug: "drinks" },
  { name: "Frozen Food", slug: "frozen-food" },
];

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  const logoSize = isXs ? 28 : isMobile ? 36 : 48;
  const socialSize = isXs ? 24 : 32;
  const fontBody = isXs ? 11 : isMobile ? 13 : 14;
  const fontTitle = isXs ? "subtitle2" : isMobile ? "subtitle1" : "h6";
  const spacingY = isXs ? 1 : 2;

  return (
    <Box
      component="footer"
      sx={{
        p: { xs: 2, sm: 4, md: 6 },
        bgcolor: "#a6f8a6ff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={spacingY}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Image
                  src="/logos/grocery-cart.png"
                  alt="FreshMart Logo"
                  width={logoSize}
                  height={logoSize}
                />
                <Typography variant={fontTitle}>FreshMart</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: fontBody }}>
                Your one-stop shop for fresh groceries delivered right to your door.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: fontBody }}>
                  Payment Methods:
                </Typography>
                <Image src="/payments/visa.png" alt="Visa" width={socialSize} height={socialSize / 1.2} />
                <Image src="/payments/card.png" alt="Mastercard" width={socialSize} height={socialSize / 1.2} />
              </Box>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant={fontTitle} gutterBottom color="text.primary">
              Quick Links
            </Typography>
            {[
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/faq", label: "FAQ" },
              { href: "/career", label: "Careers" },
              { href: "/term&condition", label: "Terms & Conditions" },
              { href: "/privacy&policy", label: "Privacy Policy" },
            ].map((link) => (
              <Typography key={link.href} variant="body2" sx={{ mb: 0.5, fontSize: fontBody }}>
                <Link
                  href={link.href}
                  style={{ textDecoration: "none", color: "rgb(0, 121, 0)" }}
                >
                  {link.label}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant={fontTitle} gutterBottom color="text.primary">
              Categories
            </Typography>
            {categories.map((cat) => (
              <Typography key={cat.slug} variant="body2" sx={{ mb: 0.5, fontSize: fontBody }}>
                <Link
                  href={`/category/${cat.slug}`}
                  style={{ textDecoration: "none", color: "rgb(0, 121, 0)" }}
                >
                  {cat.name}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant={fontTitle} gutterBottom color="text.primary">
              Connect with Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              {[
                { src: "/media/facebook.png", alt: "Facebook" },
                { src: "/media/twitter.png", alt: "Twitter" },
                { src: "/media/instagram.png", alt: "Instagram" },
                { src: "/media/telegram.png", alt: "Telegram" },
              ].map((social) => (
                <IconButton key={social.alt} sx={{ p: 0 }}>
                  <Image src={social.src} alt={social.alt} width={socialSize} height={socialSize} />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ fontSize: fontBody }}
        >
          &copy; {new Date().getFullYear()} FreshMart. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
