import 'bootstrap/dist/css/bootstrap.css';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box } from '@mui/material';
import TobNavbar from "./menu/Header/TopNavbar";
import Topbar from "./menu/Header/TopNavbar";
import Hero from './components/Home/page';
import Footer from './menu/footer/page';


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
        <TobNavbar/>
        <Box
          component="main" 
          sx={{ 
            // paddingTop: TOP_NAVBAR_HEIGHT, 
            paddingTop: "64px",
            minHeight: '100vh', 
          }}
        >
          {children}
        </Box>
        <Footer/>
      </body>
    </html>
  );
}
