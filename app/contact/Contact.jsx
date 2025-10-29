"use client";
import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import { CREATE_CONTACT } from "../schema/Contact";
import { Additem, Edit, Trash } from "iconsax-react";
import { CiSearch } from "react-icons/ci";

import * as Yup from "yup";
import { useFormik, FormikProvider, Form } from "formik";

function Contact() {
  const [loading, setLoading] = useState(false);
  const { setAlert, language } = useAuth();

  const subjects = [
    {
      value: "General Inquiry",
      label: "General Inquiry",
    },
    {
      value: "Order Issue",
      label: "Order Issue (Please provide Order #)",
    },
    {
      value: "Partnership",
      label: "Partnership Inquiry",
    },
    {
      value: "Feedback",
      label: "Feedback",
    },
  ];

  const [submitContactForm] = useMutation(CREATE_CONTACT, {
    onCompleted: ({ submitContactForm }) => {
      setLoading(false);
      if (submitContactForm?.isSuccess) {
        setAlert(true, "success", submitContactForm?.message);
        resetForm();
        console.log("submitContactForm", submitContactForm);
      } else {
        setAlert(true, "failed", submitContactForm?.message);
      }
    },
    onError: (err) => {
      setAlert(true, "error", err?.errorMessage);
      setLoading(false);
    },
  });

  const validationSchema = Yup.object({
    contactName: Yup.string().required("Your Name is Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    subject: Yup.string().required("Subject is Required!"),
    message: Yup.string().required("Message is Required!"),
  });

  const formik = useFormik({
    initialValues: {
      contactName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await submitContactForm({
          variables: { input: { ...values } },
        });
      } catch (error) {
        console.error("Error submitting message!", error);
        setLoading(false);
      }
    },
  });

  const {
    handleSubmit,
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    resetForm,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              mb={3}
              sx={{ fontWeight: 600 }}
            >
              Send Us a Message
            </Typography>

            <Stack spacing={3}>
              {/* Name */}
              <TextField
                fullWidth
                label="Your Name"
                name="contactName"
                type="contactName"
                value={values.contactName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.contactName && Boolean(errors.contactName)}
                helperText={touched.contactName && errors.contactName}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Your Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              {/* Subject */}
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                error={touched.subject && Boolean(errors.subject)}
              >
                <Select
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  displayEmpty
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  {subjects.map((sub) => (
                    <MenuItem key={sub.value} value={sub.value}>
                      {sub.label}
                    </MenuItem>
                  ))}
                </Select>
                {touched.subject && errors.subject && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors.subject}
                  </div>
                )}
              </FormControl>

              {/* Message */}
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={5}
                error={touched.message && Boolean(errors.message)}
                helperText={touched.message && errors.message}
              />

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

export default Contact;
