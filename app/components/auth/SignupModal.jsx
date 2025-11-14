"use client";
import React, { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client/react";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";

import { SIGN_UP_USER_FORM } from "@/app/schema/User";
import { useAuth } from "@/app/context/AuthContext";

export default function SignupModal({ open, onClose, onSwitchToLogin }) {
  const { setAlert, login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // Yup validation
  // =========================
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
        "Must include uppercase, lowercase & number, min 8 chars"
      )
      .required("Password is required"),
    checked: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // =========================
  // Apollo Mutation
  // =========================
  const [signupUserForm] = useMutation(SIGN_UP_USER_FORM, {
    onCompleted: ({ signupUserForm }) => {
      setLoading(false);

      if (signupUserForm?.isSuccess) {
        login(signupUserForm.data);

        setAlert(true, "Success", signupUserForm.messageEn);

        resetForm();
        onClose();
      } else {
        setAlert(true, "Failed", {
          messageEn: signupUserForm?.messageEn,
        });
      }
    },
    onError: (err) => {
      setAlert(true, "Error", signupUserForm?.messageEn || "Signup failed");
      setLoading(false);
    },
  });

  // =========================
  // Formik Setup
  // =========================
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
      await signupUserForm({ variables: { input: values } });
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = formik;

  // =========================
  // Render
  // =========================
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{ textAlign: "center", color: "green", fontWeight: 600 }}
          >
            Sign Up
          </DialogTitle>

          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              {/* USERNAME */}
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

              {/* PHONE */}
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

              {/* EMAIL */}
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

              {/* PASSWORD */}
              <FormControl
                fullWidth
                size="small"
                error={touched.password && Boolean(errors.password)}
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
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {touched.password && errors.password}
                </FormHelperText>
              </FormControl>

              {/* CHECKBOX */}
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
                {touched.checked && (
                  <FormHelperText>{errors.checked}</FormHelperText>
                )}
              </FormControl>

              {/* SUBMIT */}
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "green", py: 1.2, fontWeight: 600 }}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>

              {/* SWITCH TO LOGIN */}
              <Typography variant="body2" textAlign="center">
                Already have an account?{" "}
                <span
                  style={{ color: "green", cursor: "pointer", fontWeight: 600 }}
                  onClick={onSwitchToLogin}
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
