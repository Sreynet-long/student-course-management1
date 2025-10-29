// app/categories/[slug]/page.jsx
import React from "react";
import CategoryPageClient from "./CategoryPageClient";

export default function CategoryPage({ params }) {
  const slug = params.slug; // get slug from URL

  return <CategoryPageClient slug={slug} />;
}
