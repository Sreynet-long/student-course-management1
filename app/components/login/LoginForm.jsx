import React from 'react';
import { Stack, Dialog, DialogActions, DialogContent,CheckBox ,Grid , TextField,Divider, FormControl,Button, IconButton, Typography} from '@mui/material';
import { CloseSquare } from "iconsax-react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function LoginForm() {
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
                <Typography>Login</Typography>
                <IconButton>
                    <CloseSquare/>
                </IconButton>
            </Stack>
            <Divider/>
            <Stack direction="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>Username or Email Address</Typography>
                        <TextField 
                            placeholder='username or email address'
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
                        <CheckBox {...label} defaultChecked>Remember Me</CheckBox>
                    </Grid>
                </Grid>
            </Stack>
            <Button>Login</Button>
        </Stack>
    </Dialog>
  )
}

export default LoginForm