// app/about/page.js
import React from 'react';
import { Box, Typography, Stack, Breadcrumbs, Divider, Button } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

export default function AboutPage() {
  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
            <Typography color="text.secondary" variant="body2">
              Home
            </Typography>
          </Stack>
        </Link>
        <Typography color="text.primary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoOutlineIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
          About Us
        </Typography>
      </Breadcrumbs>
      
      <Divider sx={{ mb: 4 }} />

      {/*Main Title and Our Story */}
      <Stack spacing={4} mb={6}>
        <Typography variant="h3" component="h1" gutterBottom 
            sx={{ fontWeight: 'bold', color: 'success.main' }}>
            Rooted in Freshness. Driven by Community.
        </Typography>

        <Box sx={{ 
            p: 3, 
            bgcolor: 'success.light', 
            borderRadius: 2, 
            display: 'flex', 
            alignItems: 'center',
            boxShadow: 3
        }}>
            <LocalFloristIcon sx={{ fontSize: 40, mr: 2, color: 'success.dark' }} />
            <Typography variant="h6" component="p" color="success.dark">
                Born out of a simple idea: to bring truly fresh, farm-quality produce straight from local growers to your table, minimizing travel and maximizing flavor.
            </Typography>
        </Box>
      </Stack>
      
      {/* Our Freshness Promise */}
      <Typography variant="h4" component="h2" mb={3} 
          sx={{ fontWeight: '600' }}>
          The FreshMart Promise
      </Typography>
      
      <Stack spacing={3} mb={6}>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
            <CheckCircleOutlineIcon color="success" sx={{ mt: 0.5 }} />
            <Box>
                <Typography variant="h6" gutterBottom>Farm-to-Door in 24 Hours</Typography>
                <Typography>We bypass unnecessary cold storage. Our produce is often picked,
                   packaged, and delivered to your home within a single day for peak nutrition and taste.</Typography>
            </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2}>
            <CheckCircleOutlineIcon color="success" sx={{ mt: 0.5 }} />
            <Box>
                <Typography variant="h6" gutterBottom>Local & Sustainable Sourcing</Typography>
                <Typography>We proudly partner with local farms, supporting our community and reducing the carbon footprint of your groceries.
                   Look for our 'Local Grown' tag!
                </Typography>
            </Box>
        </Stack>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
            <CheckCircleOutlineIcon color="success" sx={{ mt: 0.5 }} />
            <Box>
                <Typography variant="h6" gutterBottom>The Zero-Wilt Guarantee</Typography>
                <Typography>If any product doesn't meet our strict quality standards upon arrival, we will replace it or refund you, **no questions asked.**</Typography>
            </Box>
        </Stack>
      </Stack>

      {/*The Team (Placeholder) */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h4" component="h2" mb={3} sx={{ fontWeight: '600' }}>
          Meet the People Behind the Freshness
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" mb={6}>
        {/* <PeopleOutlineIcon sx={{ fontSize: 80, color: 'text.secondary' }} /> */}
        <img src="/images/team-work.jpg" style={{width: 500, height: 500}}/>
        <Box>
          <Typography variant="body1" mb={2} sx={{ fontSize: 18}}>
            FreshMart is powered by a small team of passionate food lovers, logistics experts,
             and tech enthusiasts. While we grow, know that every order is handled with individual care by someone who truly believes in the quality of our product.
          </Typography>
          {/* <Button variant="outlined" color="success" disabled>
            (Feature Team Photos Here Soon!)
          </Button> */}
        </Box>
      </Stack>
      
      {/*Call to Action */}   
      <Box sx={{ textAlign: 'center', py: 5, bgcolor: 'success.light', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'success.dark' }}>
          Ready to taste the difference?
        </Typography>
        <Link href="/products" passHref style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="success" size="large" sx={{ mt: 2 }}>
            Start Shopping Now
          </Button>
        </Link>
      </Box>

    </Box>
  );
}