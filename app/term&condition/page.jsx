"use client";
import React from 'react';
import { 
  Box, Breadcrumbs, Typography, Stack, Divider, Link as MuiLink 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <MuiLink 
          component={Link}
          href="/"
          passHref
          underline="none"
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
            <Typography color="text.secondary" variant="body2">
              Home
            </Typography>
          </Stack>
        </MuiLink>
        <Typography color="text.primary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <GavelIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
          Terms & Conditions
        </Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 4 }} />

      {/* Page Title */}
      <Stack spacing={2} mb={4}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: 'success.main' }}
        >
          Terms & Conditions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please read these terms and conditions carefully before using FreshMart.
        </Typography>
      </Stack>

      {/* Terms Content */}
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>1. Introduction</Typography>
        <Typography variant="body1">
          Welcome to FreshMart! By accessing our website, you agree to comply with these terms and conditions. 
          If you do not agree, please do not use our services.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>2. Orders</Typography>
        <Typography variant="body1">
          All orders are subject to availability and confirmation of the order price. 
          We reserve the right to refuse any order you place with us.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>3. Payment</Typography>
        <Typography variant="body1">
          Payments can be made using Visa, Mastercard, or Cash on Delivery. 
          Payment must be received before the order is shipped unless otherwise agreed.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>4. Delivery</Typography>
        <Typography variant="body1">
          Delivery times may vary depending on your location and availability of products. 
          FreshMart is not responsible for delays caused by third-party carriers.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>5. Returns & Refunds</Typography>
        <Typography variant="body1">
          You can request a return within 3 days of delivery for any damaged or spoiled items. 
          Refunds will be processed once the returned items are received and inspected.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>6. Limitation of Liability</Typography>
        <Typography variant="body1">
          FreshMart is not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>7. Changes to Terms</Typography>
        <Typography variant="body1">
          We may revise these terms at any time. Your continued use of the website after any changes indicates your acceptance of the new terms.
        </Typography>
      </Stack>
    </Box>
  );
}
