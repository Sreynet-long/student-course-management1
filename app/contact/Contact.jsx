"use client";
import React, {useContext, useState} from 'react';
import { Grid, Typography,TextField,Box, Button, Stack } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from '../schema/Contact';
import * as Yup from 'yup' ;
// Removed unused imports: Subject, Password

// Define initial state for the form
const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    subject: 'General Inquiry', 
    message: ''
};

function Contact() {
    const [loading , setloading] = useState(false);
    const [formState, setFormState] = useState(INITIAL_FORM_STATE);
    const {setAlert} = useContext(AuthContext);

    const resetForm = () => { 
        setFormState(INITIAL_FORM_STATE);
    };
    
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    
    const [submitContactForm] = useMutation(CREATE_CONTACT, {
        onCompleted: ({submitContactForm}) => {
            setloading(false);
            if (submitContactForm?.isSuccess){
                setAlert(true, "success", submitContactForm?.message || "Message sent successfully!");
                resetForm(); 
            }
        },
        onError: (err) => {
            setAlert(true, "error", err.message); 
            setloading(false);
        }
    });

    const validationSchema = Yup.object({
  
        name: Yup.string().required("Your Name is Required!"),
        email: Yup.string().email("Invalid email").required("Email is Required!"),
        subject: Yup.string().required("Subject is Required!"),
        message: Yup.string().required("Message is Required!"),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setloading(true);

        try {
            
            await validationSchema.validate(formState, { abortEarly: false });
            submitContactForm({
                variables: {
                    input: formState 
                }
            });

        } catch (validationErrors) {
            setloading(false);
            
            setAlert(true, "warning", "Please correct all form errors.");
            console.error("Validation failed:", validationErrors);
        }
    };

    return (
        <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h2" mb={3} sx={{ fontWeight: '600' }}>
                Send Us a Message
            </Typography>
                
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Stack spacing={3}>
                    {/* Your Name Field */}
                    <TextField 
                        required 
                        fullWidth 
                        label="Your Name" 
                        variant="outlined" 
                        name="name" 
                        value={formState.name} 
                        onChange={handleInputChange} 
                    />
                    {/* Your Email Field */}
                    <TextField 
                        required 
                        fullWidth 
                        label="Your Email" 
                        variant="outlined" 
                        type="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleInputChange} 
                    />
                    {/* Subject Field (Select) */}
                    <TextField 
                        required 
                        fullWidth 
                        label="Subject" 
                        variant="outlined" 
                        select 
                        SelectProps={{ native: true }}
                        name="subject" 
                        value={formState.subject}
                        onChange={handleInputChange} 
                    >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Issue">Order Issue (Please provide Order #)</option>
                        <option value="Partnership">Partnership Inquiry</option>
                        <option value="Feedback">Feedback</option>
                    </TextField>
                    {/* Message Field */}
                    <TextField
                        required
                        fullWidth
                        label="Your Message"
                        variant="outlined"
                        multiline
                        rows={5}
                        name="message" 
                        value={formState.message} 
                        onChange={handleInputChange} 
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
    )
}

export default Contact;