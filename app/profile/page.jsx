"use client";

import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ORDER_BY_USER, CREATE_ORDER, DELETE_ORDER } from "../schema/Order";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Collapse,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Breadcrumbs,
  Paper,
} from "@mui/material";

import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditProfile from "../components/page/EditProfile";

export default function ProfilePage() {
  const { user, logout, setAlert } = useAuth();
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [openProof, setOpenProof] = useState({ open: false, url: "" });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    orderId: null,
    title: "",
    message: "",
  });

  const { data, loading, refetch } = useQuery(GET_ORDER_BY_USER, {
    variables: { userId: user?.id || user?._id || null },
    skip: !user,
    fetchPolicy: "network-only",
  });

  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [createOrder] = useMutation(CREATE_ORDER);

  const orders = data?.getOrders ?? [];

  const filtered = useMemo(() => {
    if (!search?.trim()) return orders;
    const q = search.trim().toLowerCase();
    return orders.filter((o) => String(o.id).toLowerCase().includes(q));
  }, [orders, search]);

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h6" color="error">
          You are not logged in
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/auth"
          sx={{ mt: 2, bgcolor: "green" }}
        >
          Login
        </Button>
      </Box>
    );
  }

  const handleExpandToggle = (id) =>
    setExpandedId((cur) => (cur === id ? null : id));
  const openPaymentProof = (url) => setOpenProof({ open: true, url });
  const closePaymentProof = () => setOpenProof({ open: false, url: "" });
  const askConfirm = ({ action, orderId, title, message }) =>
    setConfirmDialog({ open: true, action, orderId, title, message });
  const closeConfirm = () =>
    setConfirmDialog({
      open: false,
      action: null,
      orderId: null,
      title: "",
      message: "",
    });

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder({
        variables: { id: orderId },
        update: (cache) => {
          const existing = cache.readQuery({
            query: GET_ORDER_BY_USER,
            variables: { userId: user.id },
          });
          if (existing?.getOrders) {
            cache.writeQuery({
              query: GET_ORDER_BY_USER,
              variables: { userId: user.id },
              data: {
                getOrders: existing.getOrders.filter((o) => o.id !== orderId),
              },
            });
          }
        },
      });
      setAlert?.({ type: "success", message: "Order deleted." });
    } catch (err) {
      console.error(err);
      setAlert?.({ type: "error", message: "Unable to delete order." });
    } finally {
      closeConfirm();
    }
  };

  // const handleReorder = async (orderId) => {
  //   try {
  //     await createOrder({ variables: { input: { previousOrderId: orderId } } });
  //     await refetch();
  //     setAlert?.({ type: "success", message: "Re-order created." });
  //   } catch (err) {
  //     console.error("Reorder error:", err);
  //     setAlert?.({ type: "error", message: "Unable to re-order." });
  //   } finally {
  //     closeConfirm();
  //   }
  // };

  const statusColor = (status) => {
    if (!status) return "default";
    const s = String(status).toLowerCase();
    if (
      s.includes("delivered") ||
      s.includes("done") ||
      s.includes("success") ||
      s.includes("completed")
    )
      return "success";
    if (s.includes("pending")) return "warning";
    if (s.includes("cancel") || s.includes("canceled")) return "error";
    return "info";
  };

  const formatOrderId = (id) => `#FM-${id.slice(-6).toUpperCase()}`;

  return (
    <Box sx={{ display: "flex", gap: 3, p: 3, minHeight: "80vh" }}>
      {/* Profile Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: 300,
          position: "sticky",
          top: 24,
          alignSelf: "flex-start",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={user?.avatar || "/avatars/default-avatar1.png"}
            sx={{ width: 72, height: 72 }}
          />
          <Box>
            <Typography variant="h6">{user?.username}</Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.role || "Customer"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountCircleIcon />
            <Typography variant="body2">{user?.username}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneIcon />
            <Typography variant="body2">
              {user?.phoneNumber || "N/A"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <ReceiptLongIcon />
            <Typography variant="body2">{user?.email}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={Link}
            href="/profile/edit"
          >
            Edit Profile
          </Button>
           <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </Paper>

      {/* Orders List */}
      <Box sx={{ flexGrow: 1, maxHeight: "82vh", overflowY: "auto", pr: 1 }}>
        {/* Breadcrumb & Search */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link href="/" passHref style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
                <Typography color="text.secondary" variant="body2">
                  Home
                </Typography>
              </Stack>
            </Link>
            <Typography
              color="text.primary"
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AccountCircleOutlinedIcon
                sx={{ mr: 0.5 }}
                fontSize="inherit"
                color="success"
              />
              Profile & History
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              mt: { xs: 2, md: 0 },
            }}
          >
            <TextField
              size="small"
              placeholder="Search by Order ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outlined" onClick={() => setSearch("")}>
              Clear
            </Button>
          </Box>
        </Stack>

        <Typography variant="h6" sx={{ mb: 1 }}>
          Purchase History
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : filtered.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          filtered.map((order) => (
            <Card
              key={order.id}
              elevation={2}
              sx={{
                mb: 2,
                transition: "transform 200ms ease, box-shadow 200ms ease",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle1">
                        Order ID: {formatOrderId(order.id)}
                      </Typography>
                      <Chip
                        label={order.status}
                        color={statusColor(order.status)}
                        size="small"
                      />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      <LocationOnIcon
                        sx={{ fontSize: 14, verticalAlign: "middle", mr: 0.4 }}
                      />
                      {order?.shippingInfo?.address ?? "No address"} •{" "}
                      {order?.shippingInfo?.country ?? ""}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {dayjs(Number(order.createdAt)).format(
                        "MMM DD, YYYY - hh:mm A"
                      )}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      ${Number(order.totalPrice ?? 0).toFixed(2)}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                      sx={{ mt: 1 }}
                    >
                      {/* <Tooltip title="Re-order">
                        <Button
                          size="small"
                          startIcon={<RestartAltIcon />}
                          onClick={() =>
                            askConfirm({
                              action: "reorder",
                              orderId: order.id,
                              title: "Create Re-order",
                              message: "Create a new order from this order?",
                            })
                          }
                        >
                          Re-order
                        </Button>
                      </Tooltip> */}
                      <Tooltip title="Delete order">
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() =>
                            askConfirm({
                              action: "delete",
                              orderId: order.id,
                              title: "Delete Order",
                              message:
                                "Are you sure you want to delete this order?",
                            })
                          }
                        >
                          Delete
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      minWidth: 260,
                    }}
                  >
                    {order.items?.slice(0, 3).map((it, idx) => (
                      <Stack
                        key={idx}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CardMedia
                          component="img"
                          image={
                            it?.product?.imageUrl || "/default-product.png"
                          }
                          alt={it?.product?.productName}
                          sx={{
                            width: 72,
                            height: 72,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2">
                            {it.product?.productName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Qty: {it?.quantity} • $
                            {Number(
                              it?.price ?? it.product?.price ?? 0
                            ).toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                    {order.items?.length > 3 && (
                      <Typography variant="caption" color="text.secondary">
                        +{order.items.length - 3} more items
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle2">Order details</Typography>
                      <IconButton
                        onClick={() => handleExpandToggle(order.id)}
                        aria-expanded={expandedId === order.id}
                      >
                        <ExpandMoreIcon
                          sx={{
                            transform:
                              expandedId === order.id
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 200ms ease",
                          }}
                        />
                      </IconButton>
                    </Stack>

                    <Collapse in={expandedId === order.id}>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Shipping Info
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LocationOnIcon />
                          <Typography variant="body2">
                            {order?.shippingInfo?.address ?? "N/A"}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 0.5 }}
                        >
                          <PhoneIcon />
                          <Typography variant="body2">
                            {order?.shippingInfo?.phone ?? "N/A"}
                          </Typography>
                        </Stack>

                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2">Items</Typography>
                        {order.items.map((it, i) => (
                          <Stack
                            key={i}
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mt: 1 }}
                          >
                            <Typography variant="body2">
                              {it?.product?.productName} x {it?.quantity}
                            </Typography>
                            <Typography variant="body2">
                              $
                              {Number(
                                it?.price ?? it?.product?.price ?? 0
                              ).toFixed(2)}
                            </Typography>
                          </Stack>
                        ))}

                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2">Payment</Typography>
                          <Typography variant="body2">
                            {order.paymentMethod ?? "—"}
                          </Typography>
                        </Stack>

                        {order.paymentProof && (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mt: 1 }}
                          >
                            <Button
                              size="small"
                              onClick={() =>
                                openPaymentProof(order.paymentProof)
                              }
                            >
                              View Payment Proof
                            </Button>
                          </Stack>
                        )}
                      </Box>
                    </Collapse>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Payment proof dialog */}
      <Dialog
        open={openProof.open}
        onClose={closePaymentProof}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Payment Proof</DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={openProof.url}
            alt="payment proof"
            sx={{ width: "100%", borderRadius: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePaymentProof}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm dialog */}
      <Dialog open={confirmDialog.open} onClose={closeConfirm}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <Typography>{confirmDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>No</Button>
          <Button
            onClick={() => {
              if (confirmDialog.action === "delete")
                handleDeleteOrder(confirmDialog.orderId);
              // if (confirmDialog.action === "reorder")
              //   handleReorder(confirmDialog.orderId);
            }}
            autoFocus
            color={confirmDialog.action === "delete" ? "error" : "primary"}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
