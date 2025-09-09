import React from 'react';
import { Stack, Box, Typography, Avatar, Grid, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material';


const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#259525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);


export default function App() {
  return (
    <Box sx={{ p: 2, bgcolor: 'background.default', minHeight: '100vh', width: '100%' }}>
      <TopNavbr />
    </Box>
  );
}


function TopNavbr() {
  return (
    <Box className="p-4 bg-white shadow-md rounded-b-2xl">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={10} sm={6} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: '25px', backgroundColor: '#f5f5f5' }
            }}
          />
        </Grid>
        <Grid item>
          <Avatar alt="User Avatar" src="https://placehold.co/40x40/E8E8E8/6C6C6C?text=U" />
        </Grid>
      </Grid>
    </Box>
  );
}
