"use client";
import { Button } from "@mui/material";
import { main } from "@popperjs/core";
import React, { useState } from "react";
import CategoryList from "./components/Home/categoryLists/page";
import Hero from "./components/Home/page";
import AddToCard from "./components/feature/AddToCart";
import { Add } from "@mui/icons-material";
import ProductCart from "./components/Cartbox/ProductCart";
import FeatureStore from "./components/feature/FeatureStore";
import SellProductList from "./components/Home/sellProductList/page";
import WhyShopWithUs from "./components/feature/WhyShopWithUs";
import CustomerReviews from "./components/feature/CustomerReviews";
import Newsletter from "./components/feature/NewsLetter";
import SpecialOffer from "./components/feature/SpecialOffer";
import FeaturedProducts from "./components/feature/FeaturedProducts";
import TopNavbar from "./menu/Header/TopNavbar";

function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <main>
      <TopNavbar onSearch={(keyword) => setSearchKeyword(keyword)} />
      <Hero />
      <CategoryList />
      <AddToCard searchKeyword={searchKeyword} />
      <SellProductList />
      <FeatureStore />
      <WhyShopWithUs />
      <SpecialOffer />
      {/* <CustomerReviews /> */}
      <Newsletter />
    </main>
  );
}

export default HomePage;
