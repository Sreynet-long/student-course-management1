"use client";
import React from 'react';
import { 
  Box, Breadcrumbs, Typography, Stack, Divider, Link as MuiLink,
  Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import Link from 'next/link';

export default function CareerPage() {
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
          <WorkIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
          Careers
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
          Careers at FreshMart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join our team and be part of delivering fresh groceries to our customers every day.
        </Typography>
      </Stack>

      {/* Job Listings */}
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>1. Delivery Driver</Typography>
          <Typography variant="body1">
            Responsible for delivering groceries to our customers on time. Full-time and part-time positions available.
          </Typography>
          <Button 
            component={Link} 
            href="/apply?role=delivery-driver" 
            variant="contained" 
            color="success" 
            sx={{ mt: 1, width: 'fit-content' }}
          >
            Apply Now
          </Button>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>2. Customer Support</Typography>
          <Typography variant="body1">
            Provide support to our customers via phone, email, and chat. Strong communication skills required.
          </Typography>
          <Button 
            component={Link} 
            href="/apply?role=customer-support" 
            variant="contained" 
            color="success" 
            sx={{ mt: 1, width: 'fit-content' }}
          >
            Apply Now
          </Button>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>3. Warehouse Staff</Typography>
          <Typography variant="body1">
            Help manage inventory, pack orders, and ensure smooth warehouse operations.
          </Typography>
          <Button 
            component={Link} 
            href="/apply?role=warehouse-staff" 
            variant="contained" 
            color="success" 
            sx={{ mt: 1, width: 'fit-content' }}
          >
            Apply Now
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
