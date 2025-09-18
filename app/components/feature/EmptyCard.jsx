import React from 'react'
import { Stack ,Image,Typography, Drawer,Divider,IconButton, Box } from '@mui/material';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function EmptyCard() {
  return (
    <Stack>
        <Stack>
            <ShoppingCartIcon/>
        </Stack>
    </Stack>
  )
}
