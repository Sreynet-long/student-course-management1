import 'bootstrap/dist/css/bootstrap.css';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TobNavbar from "./menu/Header/TopNavbar";
import Topbar from "./menu/Header/TopNavbar";
import Hero from './components/Home/page';


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
          {/* <Topbar/> */}
        
          <Hero/>
        {children}
      </body>
    </html>
  );
}
