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
  Checkbox,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client/react";
import { AuthContext } from "@/app/context/AuthContext";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import SIGN_UP_USER_FORM from "../../schema/User";

export default function SignupModal({ open, onClose, onSwitchToLogin }) {
  const { setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleChecked = (e) => setChecked(e.target.checked);

  const [signupUserForm] = useMutation(SIGN_UP_USER_FORM, {
    onCompleted: ({ signupUserForm }) => {
      setLoading(false);
      if (signupUserForm?.isSuccess) {
        setAlert(true, "Success", signupUserForm?.message);
        resetForm();
        onClose();
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
    username: Yup.string().required("Username is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{9,15}$/, "Invalid phone number")
      .nullable(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, and numbers"
      )
      .required("Password is required"),
    checked: Yup.bool().oneOf([true], "You must accept terms & conditions"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      checked: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await signupUserForm({
        variables: {
          input: {
            username: values.username,
            phoneNumber: values.phoneNumber,
            email: values.email,
            password: values.password,
            checked: values.checked,
          },
        },
      });
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = formik;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center", color: "green" }}>
            Create an Account
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
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

              <FormControl
                fullWidth
                size="small"
                error={Boolean(touched.password && errors.password)}
              >
                <OutlinedInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter your password"
                />
                {touched.password && errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={checked}
                  onChange={handleChecked}
                  name="checked"
                  error={Boolean(touched.checked && errors.checked)}
                  helperText={touched.checked && errors.checked}
                />
                <Typography variant="body2">
                  I agree to the terms & conditions
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "green" }}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              <Typography variant="body2" textAlign="center">
                Already have an account?{" "}
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                >
                  Login
                </span>
              </Typography>
            </Box>
          </DialogContent>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
