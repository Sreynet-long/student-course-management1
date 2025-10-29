// src/pages/orders.jsx
"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS_BY_USER } from "../schema/Order";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function OrderHistory() {


  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
      {orders.length === 0 && <Typography>You have no orders yet.</Typography>}

      <Grid container spacing={3}>
        {orders.map((order) => {
          const totalPrice = order.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          return (
            <Grid item xs={12} md={6} key={order.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                  title={`Order #${order.id}`}
                  subheader={new Date(order.createdAt).toLocaleString()}
                />
                <CardContent>
                  <Stack spacing={1}>
                    <Typography><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</Typography>
                    <Typography><strong>Status:</strong> <Chip label={order.status || "Pending"} color={order.status === "Completed" ? "success" : "warning"} size="small" /></Typography>
                    <Typography><strong>Total Items:</strong> {order.items.length}</Typography>
                    <Typography><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Button variant="outlined" size="small" onClick={() => setSelectedOrder(order)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Modal */}
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Order #{selectedOrder?.id} Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>Shipping Info:</Typography>
          <Typography>Name: {selectedOrder?.shippingInfo.name}</Typography>
          <Typography>Phone: {selectedOrder?.shippingInfo.phone}</Typography>
          <Typography>Email: {selectedOrder?.shippingInfo.email}</Typography>
          <Typography>Address: {selectedOrder?.shippingInfo.address}</Typography>
          <Typography>Country: {selectedOrder?.shippingInfo.country}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" gutterBottom>Items:</Typography>
          {selectedOrder?.items.map((item) => (
            <Typography key={item.product.id}>
              {item.product.name} x {item.quantity} (${(item.product.price * item.quantity).toFixed(2)})
            </Typography>
          ))}
          <Divider sx={{ my: 1 }} />
          <Typography><strong>Payment Method:</strong> {selectedOrder?.paymentMethod}</Typography>
          <Typography><strong>Total Price:</strong> ${selectedOrder?.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedOrder(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
