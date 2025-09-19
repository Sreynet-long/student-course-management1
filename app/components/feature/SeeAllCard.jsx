// src/components/SeeAllCard.jsx

'use client';

import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
export default function SeeAllCard() {
  return (
    <Link href="/categories/all" passHref>
      <Box
        
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'success.light',
          borderRadius: '10px',
          boxShadow: 3,
          cursor: 'pointer',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            // bgcolor: '#4caf50',
            bgcolor: 'white',
            borderRadius: '50%',
            mb: 2,
          }}
        >
          <FaArrowRight color="black" size={30}/>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'gray.800' }}>
          See all
        </Typography>
      </Box>
    </Link>
  );
}