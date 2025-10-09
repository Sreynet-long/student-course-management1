import React from 'react'
import {Box, Stack, Typography, Divider} from "@mui/material";
import Link from 'next/link';
function Vegetable() {
  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit"  color='success'/>
          <Typography color="text.secondary" variant="body2">
            Home
          </Typography>
        </Stack>
      </Link>
      <Stack >
        <Typography variant='h4'>Products Vegetable</Typography>
      </Stack>
      <Divider/>
      <Typography variant='body1'>Sub Products</Typography>
      
    </Box>
  )
}

export default Vegetable