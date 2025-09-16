import React from 'react'
import { Box, Typography, Stack, Grid ,Card, CardMedia, CartContent, IconButton} from '@mui/material';
function Footer() {
  return (
    <Stack>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} 
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
 
        <Box
          sx={{
           display: "flex",
            alignItems: "center",
            mr: 2,
            animation: "spin 3s linear infinite",
          }}
        >
          {/* <Image src="/icons/grocery-cart.png" alt="Grocery" style={{ width: 40, height: 40 }} /> */}
          <ShoppingBasketIcon fontSize="large" color="white" />
        </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            FreshMart 
          </Typography>
      <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 , mx: 5, mt:5}}>
        © 2025 Your Company. All rights reserved.
      </Typography>
    </Stack>
  )
}

export default Footer