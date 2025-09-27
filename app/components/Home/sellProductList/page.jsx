import React from 'react';
import {Stack, Button, Typography } from "@mui/material";
import styles from "@/app/components/styles/sellProduct.module.css";
import Link from 'next/link';
export default function SellProductList() {
  return (
    <Stack sx={{backgroundColor: "none"}}>
      <Stack direction="row" justifyContent="start" display="flex" sx={{ mt: 2, mx: 5}}>
        <Typography variant='h5'>Weekly selling products</Typography>
      </Stack>
      <Stack direction="row" display="flex" sx={{mx: 5, mt: 3}}>
        <Button aria-pressed="false" variant='outlined' size="small" className={styles['btn-product-list']}>Frozen Foods</Button>
        <Button aria-pressed="false" variant='outlined' size="small" className={styles['btn-product-list']}>Vegetables</Button>
        <Button aria-pressed="false" variant='outlined' size="small" className={styles['btn-product-list']}>Snacks & Breads</Button>
        <Button aria-pressed="false" variant='outlined' size="small" className={styles['btn-product-list']}>Fruits</Button>
        <Button aria-pressed="false" variant='outlined' size="small" className={styles['btn-product-list']}>Milk & Dairy</Button>
        <Button aria-pressed="false" variant='outlined' size="small" className={styles['btn-product-list']}>Meats</Button>
      </Stack>

    </Stack>
  )
}

