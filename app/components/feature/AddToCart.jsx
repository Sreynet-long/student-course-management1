import React from 'react'
import { Box, Typography, Stack, Grid } from '@mui/material';
function AddToCard() {
  return (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: 1, maxWidth: 300 }}>
      <Typography variant="h6" gutterBottom>
        Add to Cart 
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Quantity:
          </Typography>
          <input type="number" defaultValue={1} min={1} style={{ width: 60, padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} /> 
        </Box>  
        <Box sx={{ flexGrow: 1 }} />
        <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          Add to Cart
        </button>
      </Stack>
    </Box>
  )
}

export default AddToCard