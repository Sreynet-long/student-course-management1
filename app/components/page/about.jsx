import React from 'react'
import { Box, Typography, Stack } from '@mui/material';
import Link from 'next/link';

function about() {
  return (
    <Stack className='page-container' direction="column">
      <Stack>
        <Link href="/">
          <Typography>Home</Typography>
        </Link>
        <Box>/</Box>
        <Typography>About Us</Typography>
      </Stack>
      

    </Stack>

  )
}

export default about