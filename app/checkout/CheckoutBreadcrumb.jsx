"use client";
import React from "react";
import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function CheckoutBreadcrumb({ activeStep }) {
  const steps = ["Cart", "Shipping", "Checkout"];

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
      <MuiLink
        component={Link}
        href="/"
        underline="hover"
        color="inherit"
        sx={{ fontWeight: 500 }}
      >
        Home
      </MuiLink>

      {steps.map((step, index) => {
        if (index < activeStep) {
          return (
            <MuiLink
              key={step}
              component={Link}
              href={`#`} // optional: can add real links to steps if needed
              underline="hover"
              color="inherit"
            >
              {step}
            </MuiLink>
          );
        } else if (index === activeStep) {
          return (
            <Typography key={step} color="text.primary">
              {step}
            </Typography>
          );
        }
        return null;
      })}
    </Breadcrumbs>
  );
}
