import { Button } from "@mui/material";
import { main } from "@popperjs/core";
import React from "react";
import CategoryList from "./components/Home/categoryLists/page";
import Hero from "./components/Home/page";
import AddToCard from "./components/feature/AddToCart";
import { Add } from "@mui/icons-material";
import ProductCart from "./components/Cart/ProductCart";
import FeatureStore from "./components/feature/FeatureStore";
import SellProductList from "./components/Home/sellProductList/page";
import ScrollToTop from "./components/scroll/ScrollToTop";
import WhyShopWithUs from "./components/feature/WhyShopWithUs";
import CustomerReviews from "./components/feature/CustomerReviews";
import Newsletter from "./components/feature/NewsLetter";
import SpecialOffer from "./components/feature/SpecialOffer";
import FeaturedProducts from "./components/feature/FeaturedProducts";

function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryList />
      <AddToCard />
      <SellProductList />
      <FeatureStore />
      <WhyShopWithUs />
      <CustomerReviews />
      <Newsletter />
      <SpecialOffer />

      <ScrollToTop />
    </main>
  );
}

export default HomePage;
