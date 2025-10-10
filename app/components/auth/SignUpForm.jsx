"use client";
import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SIGN_UP_USER_FORM from "../../schema/User";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import * as Yup from "yup";
import { useFormik, FormikProvider, Form } from "formik";

export default function SignupForm({ onSuccess }) {
  const { setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [signupUserForm] = useMutation(SIGN_UP_USER_FORM, {
    onCompleted: ({ signupUserForm }) => {
      setLoading(false);
      if (signupUserForm?.isSuccess) {
        setAlert(true, "Success", signupUserForm?.message);
        resetForm();
        if (onSuccess) onSuccess();
      } else {
        setAlert(true, "Failed", signupUserForm?.message);
      }
    },
    onError: (err) => {
      setAlert(true, "Error", err?.message);
      setLoading(false);
    },
  });

  const validationSchema = Yup.object({
    username: Yup.string().required("Required!"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{9,15}$/, "Phone number is not valid")
      .nullable(),
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/,
        "Must be at least 10 characters, with uppercase, lowercase, and numbers"
      )
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await signupUserForm({
          variables: { input: { ...values } },
        });
      } catch (error) {
        console.error("Error signing up:", error);
        setLoading(false);
      }
    },
  });
  const [signupOpen, setSignupOpen] = useState(false);
  const { values, handleChange, errors, handleSubmit, touched, handleBlur, resetForm } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <OutlinedInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="body2">
              I agree to the terms and conditions
            </Typography>
          </Box>

          <Button type="submit" variant="contained" sx={{ bgcolor: "green" }}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
}
