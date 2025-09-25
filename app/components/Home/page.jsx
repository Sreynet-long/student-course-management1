import React from 'react';
import { Button, Section, Typography,Stack } from '@mui/material';

function Hero() {
  return (
    <Stack sx={{ p: 2, bgcolor: '#f9fafb' }} className="container-content">
      <Typography spacing={2} variant="h5" align="justify" gutterBottom sx={{ fontWeight: 'bold', mb: 4 , mx: 5, mt:6}} fontSize="50px" textAlign="justify">
        We bring the Store to your door
      </Typography>
      <Typography spacing={2} variant="body1" align="justify" gutterBottom sx={{ mb: 4 , mx: 5}} fontSize="20px">
        Experience the convenience of online shopping with FreshMart. Get fresh groceries delivered to your doorstep in no time.
      </Typography>
      <Button variant="contained" className='btn-banner' sx={{ mx: 5, mb: 4, width: '150px', height: '45px'}}>
        Shop Now
      </Button>
    </Stack>
    
  );
}

export default Hero;