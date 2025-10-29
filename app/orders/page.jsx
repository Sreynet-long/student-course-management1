"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  CircularProgress,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@apollo/client/react";
import { GET_ORDER_WITH_PAGINATION } from "../schema/Order";
import jsPDF from "jspdf";

// Helper to get color based on status
const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

export default function OrdersPage() {
  const { user, setAlert } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, loading, error, refetch } = useQuery(
    GET_ORDER_WITH_PAGINATION,
    {
      variables: { page, limit, pagination: true, keyword: user?.id || "" },
      skip: !user,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (!user) {
      setAlert(true, "error", {
        messageEn: "Please login first",
        messageKh: "",
      });
    }
  }, [user]);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  if (!user) return null;

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Failed to load orders.</Typography>
      </Box>
    );

  const orders = data?.getOrdersWithPagination?.data || [];
  const paginator = data?.getOrdersWithPagination?.paginator || {};

  const handlePrevPage = () => {
    if (paginator.hasPrevPage) {
      setPage((prev) => prev - 1);
      refetch({ page: page - 1, limit });
    }
  };

  const handleNextPage = () => {
    if (paginator.hasNextPage) {
      setPage((prev) => prev + 1);
      refetch({ page: page + 1, limit });
    }
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
    refetch({ page: pageNum, limit });
  };
  const formatOrderId = (id) => `#FM-${id.slice(-6).toUpperCase()}`;

  const toDataURL = async (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });

  const handleDownloadPDF = async () => {
    if (!selectedOrder) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    let y = 50;

    doc.setFillColor(52, 58, 64);
    doc.rect(0, 0, 595, 60, "F");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.text("Invoice", margin, 40);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    y = 80;

    doc.setFont(undefined, "bold");
    doc.text("Order Information", margin, y);
    y += 20;
    doc.setFont(undefined, "normal");
    doc.text(`Order ID: ${selectedOrder.id}`, margin, y);
    doc.text(`Status: ${selectedOrder.status}`, margin + 300, y);
    y += 15;
    doc.text(
      `Date: ${new Date(selectedOrder.createdAt).toLocaleString()}`,
      margin,
      y
    );
    y += 25;

    doc.setFont(undefined, "bold");
    doc.text("Shipping Info", margin, y);
    y += 15;
    doc.setFont(undefined, "normal");
    const ship = selectedOrder.shippingInfo;
    const shippingLines = [
      `Name: ${ship?.name || ""}`,
      `Phone: ${ship?.phone || ""}`,
      `Email: ${ship?.email || ""}`,
      `Address: ${ship?.address || ""}`,
      `Country: ${ship?.country || ""}`,
    ];
    shippingLines.forEach((line) => {
      doc.text(line, margin, y);
      y += 15;
    });
    y += 10;

    doc.setFillColor(230, 230, 230);
    doc.rect(margin, y, 515, 20, "F");
    doc.setFont(undefined, "bold");
    doc.text("No", margin + 5, y + 15);
    doc.text("Product", margin + 50, y + 15);
    doc.text("Qty", margin + 360, y + 15);
    doc.text("Price ($)", margin + 420, y + 15);
    y += 20;

    doc.setFont(undefined, "normal");
    for (let i = 0; i < selectedOrder.items.length; i++) {
      const item = selectedOrder.items[i];

      const imgData = await toDataURL(item.product.imageUrl);
      if (imgData) {
        doc.addImage(imgData, "PNG", margin + 5, y - 5, 30, 30);
      }

      doc.text(`${i + 1}`, margin + 40, y + 15);
      doc.text(item.product.productName || "", margin + 50, y + 15);
      doc.text(`${item.quantity}`, margin + 360, y + 15);
      doc.text(`${Number(item.price).toFixed(2)}`, margin + 420, y + 15);
      y += 40;

      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    }

    doc.setFillColor(52, 58, 64);
    doc.rect(margin + 300, y, 200, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.text(
      `Total: $${Number(selectedOrder.totalPrice).toFixed(2)}`,
      margin + 310,
      y + 17
    );

    doc.save(`Order_${selectedOrder.id}.pdf`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Orders
      </Typography>

      {orders.length === 0 && <Typography>No orders found.</Typography>}

      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" }, 
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Order ID: {formatOrderId(order.id)}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 0.5, mb: 1 }}
                >
                  <Typography>
                    Total: ${Number(order.totalPrice).toFixed(2)}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={statusColor(order.status)}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Stack>
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => handleOpen(order)}
                >
                  View Detail
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {paginator.totalPages > 1 && (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Button
            variant="contained"
            disabled={!paginator.hasPrevPage}
            onClick={handlePrevPage}
          >
            Prev
          </Button>

          {[...Array(paginator.totalPages)].map((_, idx) => (
            <Button
              key={idx}
              variant={page === idx + 1 ? "contained" : "outlined"}
              onClick={() => handlePageClick(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}

          <Button
            variant="contained"
            disabled={!paginator.hasNextPage}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Stack>
      )}

      {/* Detail Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Order Detail</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Status:
                </Typography>
                <Chip
                  label={selectedOrder.status}
                  color={statusColor(selectedOrder.status)}
                />
              </Stack>

              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Shipping Info:
              </Typography>
              <Typography>Name: {selectedOrder?.shippingInfo?.name}</Typography>
              <Typography>
                Phone: {selectedOrder?.shippingInfo?.phone}
              </Typography>
              <Typography>
                Email: {selectedOrder?.shippingInfo?.email}
              </Typography>
              <Typography>
                Address: {selectedOrder?.shippingInfo?.address}
              </Typography>
              <Typography>
                Country: {selectedOrder?.shippingInfo?.country}
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mt: 2 }}
                fontWeight="bold"
              >
                Products:
              </Typography>
              {selectedOrder.items.map((item) => (
                <Card key={item.product?.id} sx={{ display: "flex", mb: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image={item.product?.imageUrl}
                    alt={item.product?.productName}
                  />
                  <CardContent>
                    <Typography>{item.product?.productName}</Typography>
                    <Typography>Qty: {item.quantity}</Typography>
                    <Typography>
                      Price: ${Number(item.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}

              <Divider sx={{ my: 3, fontSize: "bold" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  TOTAL: ${Number(selectedOrder.totalPrice || 0).toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownloadPDF}
                >
                  Download Invoice PDF
                </Button>
              </Stack>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
