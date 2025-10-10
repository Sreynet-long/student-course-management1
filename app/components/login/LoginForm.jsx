import React, {useContext, useEffect, useState} from 'react';
import { Stack, Dialog, DialogActions, DialogContent,CheckBox ,Grid , TextField,Divider, FormControl,Button, IconButton, Typography} from '@mui/material';
import { CloseSquare } from "iconsax-react";
import { useMutation } from '@apollo/client/react';
import LOGIN_USER_FORM from "../../schema/User";
import { AuthContext } from '@/app/context/AuthContext';
import { Formik, FormikProvider, Form, useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function LoginForm() {
    const [open, setOpen] = React.useState(false);
    const {setAlert} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [loginUserForm] = useMutation(LOGIN_USER_FORM, {
        onCompleted : ({loginUserForm}) => {
            setLoading(false);
            if (loginUserForm?.isSuccess) {
                setAlert(true, "Success", loginUserForm?.message)
                resetForm();
            }else{
                setAlert(true, "Failed", loginUserForm?.message)
            }

        },
        onError: (err) =>{
             setAlert(true, "error", err?.message)
             setLoading(false);
        }
    });

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required!"),
        password: Yup.string()
        .matches(passwordRules, "Password must contain at least 10 characters, including uppercase, lowercase and numbers"),
    })

    const formik = useFormik({
        initialValues: {
            
        }
    })
        
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
                        <Typography>Email Address</Typography>
                        <TextField 
                            placeholder='Email address'
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