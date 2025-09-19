import React from 'react'
import { Stack ,Image,Typography, Drawer,Divider,IconButton, Box } from '@mui/material';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from 'bootstrap';

export default function EmptyCard() {
  return (
    <Stack>
        <Stack>
            <ShoppingCartIcon/>
        </Stack>
        <Stack>
          <Link href="/">
            <Button className="go-shop" >Go to shop</Button>
          </Link>
        </Stack>
    </Stack>
  )
}
