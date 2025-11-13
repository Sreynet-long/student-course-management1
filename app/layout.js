"use client";
import "bootstrap/dist/css/bootstrap.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box, CssBaseline } from "@mui/material";
import TopNavbar from "./menu/Header/TopNavbar";
import Hero from "./components/Home/page";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ApolloWrapper } from "./lib/apolloClient";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const cache = createCache({ key: "mui", prepend: true });
const theme = createTheme();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <title>Fresh Mart</title>
        <meta name="description" content="Fresh Mart Ecommerce Website" />
        <link rel="icon" href="/grocery-cart.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloWrapper>
              <AuthProvider>
                <CartProvider>
                  <TopNavbar />
                  <Box
                    component="main"
                    sx={{
                      paddingTop: { xs: "56px", sm: "64px" },
                      minHeight: "100vh",
                    }}
                  >
                    {children}
                  </Box>
                  <Footer />
                  <ScrollToTop />
                </CartProvider>
              </AuthProvider>
            </ApolloWrapper>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
