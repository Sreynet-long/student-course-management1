// app/categories/[slug]/page.jsx
import React from "react";
import CategoryPageClient from "./CategoryPageClient";

export default async function CategoryPage({ params }) {
  const {slug} = await params; // get slug from URL

  return <CategoryPageClient slug={slug} />;
}
