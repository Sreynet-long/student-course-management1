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
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client/react";
import * as Yup from "yup";
import { useFormik, FormikProvider, Form } from "formik";
import { LOGIN_USER_FORM } from "@/app/schema/User";
import {useAuth } from "@/app/context/AuthContext";

export default function LoginModal({ open, onClose, onSwitchToSignup }) {
  const { setAlert, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginUserForm] = useMutation(LOGIN_USER_FORM, {
    onCompleted: ({ loginUserForm }) => {
      setLoading(false);
      if (loginUserForm?.isSuccess) {
        const userData = loginUserForm.data;
        login(userData);
        setAlert(true, "success", loginUserForm.messageEn);
        resetForm();
        onClose();
      } else {
        setAlert(true, "error", loginUserForm.messageEn);
      }
    },
    onError: (err) => {
      setAlert(true, "error", err?.message);
      setLoading(false);
    },

  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await loginUserForm({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = formik;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center", color: "green" }}>Login</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <FormControl fullWidth size="small" error={Boolean(touched.password && errors.password)}>
                <OutlinedInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && <FormHelperText>{errors.password}</FormHelperText>}
              </FormControl>

              <Box display="flex" alignItems="center">
                <Checkbox name="remember" checked={values.remember} onChange={handleChange} />
                <Typography variant="body2">Remember Me</Typography>
              </Box>

              <Button type="submit" variant="contained" sx={{ bgcolor: "green" }} disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </Button>

              <Typography variant="body2" textAlign="center">
                Don't have an account?{" "}
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => {
                    onClose();
                    onSwitchToSignup();
                  }}
                >
                  Sign Up
                </span>
              </Typography>
            </Box>
          </DialogContent>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
