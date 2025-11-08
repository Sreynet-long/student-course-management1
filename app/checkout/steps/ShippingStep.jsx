"use client";
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

export default function ShippingStep({ shippingInfo, setShippingInfo }) {
  const [errors, setErrors] = useState({});

  // Real-time validation for a single field
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value) errorMsg = "Full Name is required";
        break;
      case "phone":
        if (!value) errorMsg = "Phone is required";
        else if (!/^\d{8,15}$/.test(value))
          errorMsg = "Phone must be 8-15 digits";
        break;
      case "email":
        if (!value) errorMsg = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          errorMsg = "Email is not valid";
        break;
      case "address":
        if (!value) errorMsg = "Address is required";
        break;
      case "country":
        if (!value) errorMsg = "Country is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
    validateField(name, value); // Validate immediately
  };

  const handleSubmit = () => {
    // Final validation for all fields
    let hasError = false;
    Object.keys(shippingInfo).forEach((key) => {
      validateField(key, shippingInfo[key]);
      if (!shippingInfo[key] || errors[key]) hasError = true;
    });

    if (!hasError) {
      console.log("Shipping info is valid:", shippingInfo);
      // proceed to next step
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Info
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        margin="normal"
        value={shippingInfo.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        margin="normal"
        value={shippingInfo.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        margin="normal"
        value={shippingInfo.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        margin="normal"
        value={shippingInfo.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        fullWidth
        label="Country"
        name="country"
        margin="normal"
        value={shippingInfo.country}
        onChange={handleChange}
        error={!!errors.country}
        helperText={errors.country}
      />

      {/* <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Next
      </Button> */}
    </Box>
  );
}
