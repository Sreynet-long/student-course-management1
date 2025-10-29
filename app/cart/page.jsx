import CartPageClient from "../cart/CartPageClient";

export default async function CartPage() {
  const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/related`).then(res => res.json()).catch(() => []);
  return <CartPageClient relatedProducts={relatedProducts} />;
}
