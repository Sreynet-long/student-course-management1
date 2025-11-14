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
import Link from "next/link";

// Categories
const categories = [
  { name: "Vegetables", slug: "vegetable" },
  { name: "Fruits", slug: "fruits" },
  { name: "Dairy", slug: "milk-dairy" },
  { name: "Meat & Fish", slug: "meats" },
  { name: "Snacks & Breads", slug: "snacks-bread" },
  { name: "Seafood", slug: "seafood" },
  { name: "Drinks", slug: "drinks" },
  { name: "Frozen Food", slug: "frozen-food" },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ p: 4, bgcolor: "#a6f8a6ff" }}>
      <Container maxWidth="lg">
        
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Image
                  src="/logos/grocery-cart.png"
                  alt="FreshMart Logo"
                  width={48}
                  height={48}
                />
                <Typography variant="h6">FreshMart</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Your one-stop shop for fresh groceries delivered right to your door.
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Payment Methods:
                </Typography>
                <Image src="/payments/visa.png" alt="Visa" width={25} height={25} />
                <Image src="/payments/card.png" alt="Mastercard" width={25} height={25} />
              </Box>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>

            {[
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/faq", label: "FAQ" },
              { href: "/career", label: "Careers" },
              { href: "/term&condition", label: "Terms & Conditions" },
              { href: "/privacy&policy", label: "Privacy Policy" },
            ].map((item) => (
              <Typography key={item.href} variant="body2" sx={{ mb: 1 }}>
                <Link href={item.href} style={{ color: "green", textDecoration: "none" }}>
                  {item.label}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>

            {categories.map((cat) => (
              <Typography key={cat.slug} variant="body2" sx={{ mb: 1 }}>
                <Link
                  href={`/category/${cat.slug}`}
                  style={{ color: "green", textDecoration: "none" }}
                >
                  {cat.name}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {[
                { src: "/media/facebook.png", alt: "Facebook", url: "https://facebook.com" },
                { src: "/media/twitter.png", alt: "Twitter", url: "#" },
                { src: "/media/instagram.png", alt: "Instagram", url: "#" },
                { src: "/media/telegram.png", alt: "Telegram", url: "#" },
              ].map((s) => (
                <Link key={s.alt} href={s.url} target="_blank">
                  <IconButton>
                    <Image src={s.src} alt={s.alt} width={24} height={24} />
                  </IconButton>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" textAlign="center" color="text.secondary">
          © {new Date().getFullYear()} FreshMart. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
