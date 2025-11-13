"use client";

import React, { Suspense } from "react";
import OrdersContent from "./OrdersContent";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
