"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import {Stack ,Button, Typography} from '@mui/material'

function UseCart() {
  const [quantity, setQuantity] = useState(0);
  return (
    // Updated to Stack with horizontal direction for better layout
    <Stack direction="row" alignItems="center" spacing={1}>
      { quantity === 0 ? (
        <Button
        className='addBtn'
        onClick={() => setQuantity(1)}
        >+</Button>
      ) : (
       <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            className='addBtn-box'
            onClick={() => setQuantity(quantity - 1)}>-</Button>
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              background: "#AAFFAA",
              borderRadius: "6px",
              padding: "6px 12px",
              minWidth: "40px",
              textAlign: "center"
            }}
          >
            {quantity}
          </Typography>
          <Button
            className='addBtn-box'
            onClick={() => setQuantity(quantity + 1)}
          >+</Button>
        </Stack>
      )}
    </Stack>
  )
};

export default UseCart;