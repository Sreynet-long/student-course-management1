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
  FormControlLabel,
} from "@mui/material";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client/react";
import * as Yup from "yup";
import { useFormik, FormikProvider, Form } from "formik";
import { SIGN_UP_USER_FORM } from "@/app/schema/User";
import { useAuth } from "@/app/context/AuthContext";

export default function SignupModal({ open, onClose, onSwitchToLogin }) {
  const { setAlert, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [signupUserForm] = useMutation(SIGN_UP_USER_FORM, {
    onCompleted: ({ signupUserForm }) => {
      console.log("signup", signupUserForm);
      setLoading(false);
      if (signupUserForm?.isSuccess) {
        login(signupUserForm.data);
        setAlert(true, "Success", signupUserForm?.messageEn);
        resetForm();
        onClose();
      } else {
        setAlert(true, "Failed", signupUserForm?.messageEn);
      }
    },
    onError: (err) => {
      setAlert(true, "Error", err?.message);
      setLoading(false);
    },
  });

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const phoneRegExp = /^[0-9]{9,15}$/;
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable(),
   email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRules,
        "Password must contain at least 8 characters, including uppercase, lowercase and numbers"
      )
      .required("required"),
    checked: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
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
        variables: { input: values },
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
    helperText,
    resetForm,
  } = formik;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center", color: "green" }}>
            Sign Up
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                label="Username"
                name="username"
                fullWidth
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
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
                  placeholder="Enter your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={touched.checked && Boolean(errors.checked)}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checked"
                      checked={values.checked}
                      onChange={handleChange}
                    />
                  }
                  label="I agree to the terms and conditions"
                />
                {touched.checked && errors.checked && (
                  <FormHelperText>{errors.checked}</FormHelperText>
                )}
              </FormControl>

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
                    if (onSwitchToLogin) onSwitchToLogin();
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
