import React from 'react'
import { Box, Breadcrumbs, Typography, Stack, Divider, Link as MuiLink } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
// import Link from 'next/link';
import QuizIcon from '@mui/icons-material/Quiz';

export default function page() {
  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <MuiLink 
         component={Link}
         href ="/"
         passHref 
         style={{ textDecoration: 'none' }}
         
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
            <Typography color="text.secondary" variant="body2">
              Home
            </Typography>
          </Stack>
        </MuiLink>
        <Typography color="text.primary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <QuizIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
            FAQ
        </Typography>
      </Breadcrumbs>
      
      <Divider sx={{ mb: 4 }} />
      <Stack spacing={4} mb={6}>
        <Typography variant="h3" component="h1" gutterBottom 
            sx={{ fontWeight: 'bold', color: 'success.main' }}>
           Frequently Asked Questions
        </Typography>
        
      </Stack>
    </Box>
  )
}
