"use client";
import React, {useContext, useState} from 'react';
import { Grid, Typography,TextField,Box, Button, Stack, FormControl, Select, MenuItem } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useMutation } from "@apollo/client/react";
import { CREATE_CONTACT } from '../schema/Contact';
import * as Yup from 'yup' ;
import { useFormik, Form, FormikProvider } from 'formik';

function Contact ()  {
    
    const [loading, setloading] = useState(false);
    const  {setAlert} = useContext(AuthContext);

    const subjects = [
        {value: "General Inquiry", label: "General Inquiry" },
        {value: "Order Issue", label: "Order Issue (Please provide Order #)" },
        {value: "Partnership", label: "Partnership Inquiry" },
        {value: "Feedback", label: "Feedback"}, 
    ]

    const [submitContactForm] = useMutation(CREATE_CONTACT, {
        onCompleted: ({submitContactForm}) => {
            setloading(false);
            if (submitContactForm?.isSuccess){
                setAlert(true, "success", submitContactForm?.message);
                console.log("submitcontactFrom" , submitContactForm);
            }else{
                setAlert(true, "failed", submitContactForm?.message);
            }
        },
        onError: (err) => {
            setAlert(true, "error" , err?.message)
            setloading(false);
        }
    });
    

    const validationSchema = Yup.object({
        name: Yup.string().required("Your Name is Required!"),
        email: Yup.string().email("Invalid email format").required("Required!"),
        subject: Yup.string().required("Subject is Required!"),
        message: Yup.string().required("Message is Required!"),
    });

    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setloading(true);
            try {
                await submitContactForm({
                    variables: {
                        input:{
                            ...values
                        }
                    }
                })
            }catch(error) {
                console.error("Error submitting message!", error);
            }
        }
    })
    const { handleSubmit, errors, touched, resetForm, handleChange,values} = formik
    

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" component="h2" mb={3} sx={{ fontWeight: '600' }}>
                        Send Us a Message
                    </Typography>
                        
                    <Box sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            {/* Your Name Field */}
                            <TextField
                                fullWidth 
                                label="Your Name" 
                                variant="outlined" 
                                name="name" 
                                value={formik.name} 
                                onChange={handleChange} 
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            {/* Your Email Field */}
                            <TextField 
                               fullWidth 
                                label="Your Email" 
                                variant="outlined" 
                                type="email" 
                                name="email" 
                                value={formik.email} 
                                onChange={handleChange} 
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            {/* Subject Field (Select) */}
                            <FormControl
                                size='small'
                                fullWidth
                                variant='outlined'
                                error={touched.subject && Boolean(errors.subject)}
                            >
                                <Select
                                    name="subject"
                                    value={values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {subjects.map((sub) => (
                                        <MenuItem key={sub.value} value={sub.value}>{sub.label}</MenuItem>
                                    ))}
                                </Select>
                                {touched.currencyType && errors.currencyType && (
                                    <div style={{color: 'red' , fontSize: 12}}>{errors.currencyType}</div>
                                )}
                            {/* <TextField 
                                required 
                                fullWidth 
                                label="Subject" 
                                variant="outlined" 
                                select 
                                SelectProps={{ native: true }}
                                name="subject" 
                                value={formik.subject}
                                onChange={handleChange} 
                            >

                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Order Issue">Order Issue (Please provide Order #)</option>
                                <option value="Partnership">Partnership Inquiry</option>
                                <option value="Feedback">Feedback</option>
                            </TextField> */}
                            </FormControl>
                            {/* Message Field */}
                            <TextField
                                fullWidth
                                label="Your Message"
                                variant="outlined"
                                multiline
                                rows={5}
                                name="message" 
                                value={formik.message} 
                                onChange={handleChange} 
                                error={touched.message && Boolean(errors.message)}
                                helperText={touched.message && errors.message}
                            />
                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="success" 
                                size="large"
                                disabled={loading} 
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Form>
        </FormikProvider>
    )
}

export default Contact;
