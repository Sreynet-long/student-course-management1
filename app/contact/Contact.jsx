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
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import { CREATE_CONTACT } from "../schema/Contact"; 

import * as Yup from "yup";
import { useFormik, FormikProvider, Form } from "formik";

function Contact() {
  const [loading, setLoading] = useState(false);
  const { setAlert, language } = useContext(AuthContext); // get current language

  const subjects = [
    {
      value: "General Inquiry",
      labelEn: "General Inquiry",
      labelKh: "សំណួរទូទៅ",
    },
    {
      value: "Order Issue",
      labelEn: "Order Issue (Please provide Order #)",
      labelKh: "បញ្ហាការកម្មង់ (សូមផ្តល់លេខ Order #)",
    },
    {
      value: "Partnership",
      labelEn: "Partnership Inquiry",
      labelKh: "សំណួររបស់ដៃគូ",
    },
    {
      value: "Feedback",
      labelEn: "Feedback",
      labelKh: "មតិយោបល់",
    },
  ];

  const [submitContactForm] = useMutation(CREATE_CONTACT, {
    onCompleted: ({ submitContactForm }) => {
      setLoading(false);

      // Use language from context to choose message
      const message =
        language === "kh"
          ? submitContactForm?.messageKh || "សារត្រូវបានផ្ញើដោយជោគជ័យ!"
          : submitContactForm?.messageEn || "Message sent successfully!";

      if (submitContactForm?.isSuccess) {
        setAlert(true, "success", message);
        resetForm();
        console.log("submitContactForm", submitContactForm);
      } else {
        setAlert(true, "failed", message);
      }
    },
    onError: (err) => {
      const errorMessage =
        language === "kh"
          ? "មានកំហុសកើតឡើង!"
          : err?.message || "An error occurred!";
      setAlert(true, "error", errorMessage);
      setLoading(false);
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(
      language === "kh" ? "សូមបញ្ចូលឈ្មោះ!" : "Your Name is Required!"
    ),
    email: Yup.string()
      .email(language === "kh" ? "អ៊ីមែលមិនត្រឹមត្រូវ" : "Invalid email format")
      .required(language === "kh" ? "ត្រូវបំពេញ!" : "Required!"),
    subject: Yup.string().required(
      language === "kh" ? "សូមជ្រើសរើសប្រធានបទ!" : "Subject is Required!"
    ),
    message: Yup.string().required(
      language === "kh" ? "សូមបញ្ចូលសារ!" : "Message is Required!"
    ),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", subject: "", message: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await submitContactForm({ variables: { input: { ...values } } });
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
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                mb={3}
                sx={{ fontWeight: 600 }}
              >
                {language === "kh" ? "ផ្ញើសារមកយើងខ្ញុំ" : "Send Us a Message"}
              </Typography>

              <Stack spacing={3}>
                {/* Name */}
                <TextField
                  fullWidth
                  label={language === "kh" ? "ឈ្មោះរបស់អ្នក" : "Your Name"}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                {/* Email */}
                <TextField
                  fullWidth
                  label={language === "kh" ? "អ៊ីមែលរបស់អ្នក" : "Your Email"}
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
                    <MenuItem value="">
                      <em>
                        {language === "kh" ? "ជ្រើសប្រធានបទ" : "Select Subject"}
                      </em>
                    </MenuItem>
                    {subjects.map((sub) => (
                      <MenuItem key={sub.value} value={sub.value}>
                        {language === "kh" ? sub.labelKh : sub.labelEn}
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
                  label={language === "kh" ? "សាររបស់អ្នក" : "Your Message"}
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
                  {loading
                    ? language === "kh"
                      ? "កំពុងផ្ញើ..."
                      : "Sending..."
                    : language === "kh"
                    ? "ផ្ញើសារ"
                    : "Send Message"}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

export default Contact;
