"use client";
import React, {useState} from 'react';
import { 
    Stack, 
    Dialog, 
    DialogActions, 
    DialogContent,
    CheckBox ,
    Grid , 
    TextField,
    Divider, 
    FormControl,
    Button, 
    InputLabel,
    IconButton, 
    OutlinedInput,
    Typography,
    Visibility,
    InputAdornment,
} from '@mui/material';
import { CloseSquare } from "iconsax-react";
import Link from 'next/link';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function SignUp() {
      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
     const [showPassword, setShowPassword] = React.useState(false);
     const handleClickShowPassword = () => setShowPassword((show) => !show);

     const handleMouseDownPassword = (event) => {
        event.preventDefault();
     };

     const handleMouseUpPassword = (event) => {
        event.preventDefault();
     };
   

  return (
    <Dialog>
        <Stack direction="column" display="flex" justifyContent="space-between">
            <Stack direction="row">
                <Typography>Create account</Typography>
                <IconButton onClick={handleClose}>
                    <CloseSquare/>
                </IconButton>
            </Stack>
            <Divider/>
            <Stack direction="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>Username</Typography>
                        <TextField 
                            placeholder='Name...'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>Phone number</Typography>
                        <TextField 
                            placeholder='Phone number'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>Email Address</Typography>
                        <TextField 
                            placeholder='email@example.com'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>Password</Typography>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <CheckBox {...label} defaultChecked>I Agree with the Terms & Conditions</CheckBox>
                    </Grid>
                </Grid>
            </Stack>
            <Button>Sign Up</Button>
            <Divider>Or</Divider>
            <Stack direction="row" justifyContent="center" >
                <Button variant='outlined' sx={{ p: {mx: 5, my: 2 }}}>
                    <img src="/icons/google.png"/>Google
                </Button>
                <Button variant='outlined' sx={{ p: {mx: 5, my: 2 }}}>
                    <img src="/icons/facebook.png"/>Facebook
                </Button>
            </Stack>

        </Stack>
    </Dialog>
  )
}

export default SignUp