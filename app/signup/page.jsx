"use client";
import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  CheckBox,
} from "@mui/material";
import SIGN_UP_USER_FORM from '../schema/User';
import { useMutation } from "@apollo/client/react";
import { AuthContext } from "../context/AuthContext";
import * as Yup from "yup";
import { useFormik, FormikProvider, Form } from "formik";
import { CheckBox } from "@mui/icons-material";

export default function SignupModal({ open, onClose }) {
    const {setAlert} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [checked, setChecked] = React.useState(true);

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };
  
    const [signupUserForm] = useMutation(SIGN_UP_USER_FORM,{
        onCompleted: ({signupUserForm}) => {
            setLoading(false);
            if (signupUserForm?.isSuccess) {
                setAlert(true, "Success", signupUserForm?.message);
                resetForm();
                console.log("signupUserFrom success", signupUserForm)
            }else{
                setAlert(true, "Failed", signupUserForm?.message)
            }
        },
        onError:(err) => {
            setAlert(true, "error", err?.message);
            setLoading(false);
        }
    });
           
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    const phoneRegExp = /^[0-9]{9,15}$/;
    const validationSchema = Yup.object({
        username: Yup.string().required("Required!"),
        phoneNumber: Yup.string()
                    .matches(phoneRegExp, "Phone number is not valid")
                    .nullable(),
        email: Yup.string().email("Invalid email format").required("Required!"),
        password: Yup.string().matches(passwordRules, "Password must contain at least 10 characters, including uppercase, lowercase and numbers"),
        checked: Yup.string().required("Please accept our terms & condition!"),
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            phoneNumber: "",
            email: "",
            password:"",
            checked: true,
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await signupUserForm({
                    variables: {
                        input: {
                            ...values
                        }
                    }
                })
            } catch (error) {
                console.error("Error to sign up", error);
                setLoading(false);
            }
        }
    })
  
    const {values, handleChange, errors, handleSubmit, touched ,handleBlur, resetForm } = formik;
    

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
            <DialogTitle sx={{ textAlign: "center", color: "green" }}>
                Sign Up
            </DialogTitle>
            <DialogContent>
                <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
                >
                <Grid items xs={12} sm={12}>
                <Typography>Username</Typography>
                <TextField
                    label="Username"
                    name="username"
                    value={values?.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}phoneNumber
                    helperText={touched.username && errors.username}
                />
                </Grid>
                <Grid items xs={12} sm={12}>
                <Typography>Phone Number</Typography>
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={values?.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                />
                </Grid>
                <Grid items xs={12} sm={12}>
                <Typography>Email</Typography>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}

                />
                </Grid>
                <Grid items xs={12} sm={12}>
                <Typography>Password</Typography>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"
                        fullWidth
                        size="small"
                        error={Boolean(touched.password && errors.password)}
                    >
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
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
                        {touched.password && errors.password && (
                          <FormHelperText>{errors.password}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                {/* <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                /> */}
                <CheckBox
                    checked={checked}
                    onChange={handleChecked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />

                <Button
                 type="submit" 
                 variant="contained" 
                 sx={{ bgcolor: "green" }}

                >
                {loading ? "Sign Up..." : "Sign Up"}
                </Button>
                <Typography variant="body2" textAlign="center">
                    Already have an account? <span style={{ color: "green", cursor: "pointer" }}>Login</span>
                </Typography>
                </Box>
            </DialogContent>
            
            </Form>
        </FormikProvider>
    </Dialog>
  );
}
