'use client'
import React, {useState}  from 'react'
import { Box, Typography, Stack, Grid,Card,CardContent, CardMedia, Image,IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { StackedBarChart } from '@mui/icons-material';
function AddToCard() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  }
  const items = [
    {id: 1 , name: "Carrot",image:"/images/carrot.png" ,desc: "500g", price: 2.5},
    {id: 2 , name: "Beef",image:"/images/beef.png" ,desc: "500g", price: 1.5},
    {id: 3 , name: "Cabbage",image:"/images/cabbage.png" ,desc: "500g", price: 3.0},
    {id: 4 , name: "Dragon Fruit",image:"/images/dragon.png" , desc: "500g",price: 5.0},
    {id: 5 , name: "Milk",image:"/images/milk.png" ,desc: "1 can",price: 2.0},
    {id: 6 , name: "Frozen Strawberry",image:"/images/freezeStrawberry.png" ,desc: "500g", price: 4.0},
    {id: 7 , name: "Pineapple",image:"/images/pineapple.png" ,desc: "500g", price: 6.0},
    {id: 8 , name: "Lay Chips",image:"/images/layChips.png" , desc: "500g",price: 7.0},
    {id: 9 , name: "Red Onions",image:"/images/redOnion.png" ,desc: "500g", price: 1.0},
    {id: 10 , name: "Coke", image:"/images/coke.png" ,desc: "1 can",price: 3.5},
  ];
  return (
    <Stack sx={{ p: 2, bgcolor: '#f9fafb' }} className="box-container">
      <Typography spacing={2} variant="h5" align="justify" gutterBottom sx={{ fontWeight: 'bold', mb: 4 , mx: 5}}>
        You might need     
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }} display="flex">
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card sx={{ textAlign: 'center', p: 1 , minWidth: 170, maxWidth: 170, m: 1 }} className='box-card'>
              <CardMedia
                component="img"
                height="130"
                // bgcolor="white"
                image={item.image}  
                alt={item.name}
                sx={{ objectFit: 'contain', p: 1}}
              />
              <CardContent>
                <Typography className='item-name' variant="body1" component="div" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography className='item-name' variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
                <Typography fontSize="16px" variant="h6" component="div" mt={1}>
                  ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
              <IconButton color="primary" sx={{  mb: 1 }} className='add-to-cart-button'>
                <AddCircleOutlineIcon onChange={handleIncrement}/>
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>

  )
}

export default AddToCard