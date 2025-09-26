import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Image, Box, Card, CardMedia, Grid} from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProductDetail() {
  const items= [
    {id: 1 , name: "Carrot",image:"/images/carrot.png" ,weight: "500g", desc: "Fresh, contain vitamin A , good for maintaining healthy eyesight " , price: 2.5},
  ]
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton color="primary" sx={{ mb: 1 }} className='add-to-cart-button' onClick={handleClickOpen}>
        <AddCircleOutlineIcon/>
      </IconButton>
      <BootstrapDialog
        className="dialog-container"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 ,mt: 2}} id="customized-dialog-title">
          Product Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
            mt: 2
          })}
        >
          <CloseIcon color='error'/>
        </IconButton>
        <DialogContent dividers sx={{ m: 2}}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Card sx={{ width: 250, height:250, backgroundColor: 'white'}}>
                <CardMedia
                  sx={{ width: 250, height: 250}}
                  image={items[0].image}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6} spacing={2}>
              <Typography variant='h6'>Product Name: {items[0].name}</Typography>
              <Typography variant='h6'>Weight: {items[0].weight}</Typography>
              <Typography variant='h6'>Description: {items[0].desc}</Typography>
              <Typography variant='h6'>Price: ${items[0].price.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mb: 2}}>
          <Button onClick={handleClose} color='success.light' sx={{alignItems: "start" , backgroundColor: "success.dark"}}>Add to cart</Button>
          <Button autoFocus onClick={handleClose} color='error'>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}