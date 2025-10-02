import React from "react";
import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import Image from "next/image";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";


export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6 }} className="app-footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={2}>
              <Typography variant="h6">
                <ShoppingBasketIcon sx={{ mr: 1 }}/>
                FreshMart
              </Typography>
              <Typography variant="body2" color="text.white">
                Your one-stop shop for fresh groceries delivered right to your
                door.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" color="text.white">
                  Payment Methods:
                </Typography>
                <img
                  src="/payments/visa.png"
                  alt="Visa"
                  style={{ height: 25, width: 25 }}
                />
                <img
                  src="/payments/card.png"
                  alt="Mastercard"
                  style={{ height: 25, width: 25 }}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" display="block" sx={{ textDecoration: "none", color: "white"}} gutterBottom>
              About Us
            </Link>
            <Link href="/contact" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Contact
            </Link>
            <Link href="/faq" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              FAQ
            </Link>
            <Link href="#" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Careers
            </Link>
            <Link href="#" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Terms & Conditions
            </Link>
            <Link href="#" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Privacy Policy
            </Link>
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Categories
            </Typography>
            <Link href="#" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Vegetables
            </Link>
            <Link href="#" display="block" sx={{ textDecoration: "none", color: "white"}} gutterBottom>
              Fruits
            </Link>
            <Link href="#" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Dairy
            </Link>
            <Link href="#" display="block" sx={{ textDecoration: "none",color: "white"}} gutterBottom>
              Meat & Fish
            </Link>
          </Grid>

          {/* Social */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <Box>
              <IconButton>
                <Image
                  src="/media/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton>
                <Image
                  src="/media/twitter.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton>
                <Image
                  src="/media/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton>
                <Image
                  src="/media/telegram.png"
                  alt="Telegram"
                  width={24}
                  height={24}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.white" textAlign="center">
          &copy; {new Date().getFullYear()} FreshMart. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
