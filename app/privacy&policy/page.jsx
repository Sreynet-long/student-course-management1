"use client";
import React from 'react';
import { 
  Box, Breadcrumbs, Typography, Stack, Divider, Link as MuiLink 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
          <LockIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
          Privacy Policy
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
          Privacy Policy
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your privacy is important to us. Please read how FreshMart collects, uses, and protects your information.
        </Typography>
      </Stack>

      {/* Privacy Policy Content */}
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>1. Information We Collect</Typography>
        <Typography variant="body1">
          We collect personal information you provide when placing orders, registering an account, or contacting customer support. This includes your name, email, phone number, and delivery address.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>2. How We Use Your Information</Typography>
        <Typography variant="body1">
          We use your information to process orders, communicate about your orders, improve our services, and send promotional offers if you opted in.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>3. Data Sharing</Typography>
        <Typography variant="body1">
          FreshMart does not sell your personal information. We may share data with trusted partners to fulfill orders, deliver packages, or comply with legal requirements.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>4. Cookies</Typography>
        <Typography variant="body1">
          We use cookies to enhance your browsing experience, analyze website traffic, and remember your preferences.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>5. Security</Typography>
        <Typography variant="body1">
          We implement industry-standard measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>6. Changes to Privacy Policy</Typography>
        <Typography variant="body1">
          FreshMart may update this policy from time to time. Any changes will be posted on this page with the updated effective date.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>7. Contact Us</Typography>
        <Typography variant="body1">
          For questions about this Privacy Policy, contact us at support@freshmart.com.
        </Typography>
      </Stack>
    </Box>
  );
}
