"use client";

import React, { useState, useRef } from "react";
import CategoryList from "./components/Home/categoryLists/page";
import Hero from "./components/Home/page";
import AddToCard from "./components/feature/AddToCart";
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
  const youMightNeedRef = useRef(null); 

  // Scroll function
  const scrollToYouMightNeed = () => {
    if (youMightNeedRef.current) {
      youMightNeedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <TopNavbar onSearch={(keyword) => setSearchKeyword(keyword)} />
      {/* Pass scroll function to Hero */}
      <Hero onLearnMore={scrollToYouMightNeed} />
      <CategoryList />
      {/* Attach ref to AddToCard */}
      <AddToCard ref={youMightNeedRef} searchKeyword={searchKeyword} />
      {/* <SellProductList /> */}
      <FeatureStore />
      <WhyShopWithUs />
      <SpecialOffer />
      {/* <CustomerReviews /> */}
      <Newsletter />
    </main>
  );
}

export default HomePage;
