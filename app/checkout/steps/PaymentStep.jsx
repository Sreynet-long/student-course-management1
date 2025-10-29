"use client";
import React from "react";
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

export default function PaymentStep({ paymentMethod, setPaymentMethod, handlePayNow, loading }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
          <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handlePayNow}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </Box>
  );
}
