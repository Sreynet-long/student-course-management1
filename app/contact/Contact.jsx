"use client";
import React from 'react';
import { Grid, Typography,TextField,Box, Button, Stack } from '@mui/material';

function Contact() {
    const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    };
  return (
    <Grid item xs={12} md={4}>
        <Typography variant="h4" component="h2" mb={3} sx={{ fontWeight: '600' }}>
            Send Us a Message
        </Typography>
          
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <TextField 
                required 
                fullWidth 
                label="Your Name" 
                variant="outlined" 
              />
              <TextField 
                required 
                fullWidth 
                label="Your Email" 
                variant="outlined" 
                type="email" 
              />
              <TextField 
                required 
                fullWidth 
                label="Subject" 
                variant="outlined" 
                select 
                SelectProps={{ native: true }}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Issue">Order Issue (Please provide Order #)</option>
                <option value="Partnership">Partnership Inquiry</option>
                <option value="Feedback">Feedback</option>
              </TextField>
              <TextField
                required
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={5}
              />
              <Button type="submit" variant="contained" color="success" size="large">
                Send Message
              </Button>
            </Stack>
        </Box>
    </Grid>
  )
}

export default Contact