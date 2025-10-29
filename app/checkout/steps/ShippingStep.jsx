"use client";
import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

export default function ShippingStep({ shippingInfo, setShippingInfo }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Info
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        value={shippingInfo.name}
        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
      />
      <TextField
        fullWidth
        label="Phone"
        margin="normal"
        value={shippingInfo.phone}
        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={shippingInfo.email}
        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Address"
        margin="normal"
        value={shippingInfo.address}
        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
      />
      <TextField
        fullWidth
        label="Country"
        margin="normal"
        value={shippingInfo.country}
        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
      />
    </Box>
  );
}
