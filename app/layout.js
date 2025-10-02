import 'bootstrap/dist/css/bootstrap.css';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box } from '@mui/material';
import TopNavbar from "./menu/Header/TopNavbar";
import Hero from './components/Home/page';
import Footer from './menu/footer/page';
import ScrollToTop from "./components/scroll/ScrollToTop";
import { CartProvider } from './context/CartContext';

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <TopNavbar/>

          <Box
            component="main" 
            sx={{ 
              paddingTop: "64px",
              minHeight: '100vh', 
            }}
          >
            {children}
          </Box>

          <Footer/>
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
