"use client";
import React from 'react';
import { 
  Box, Typography, Stack, Breadcrumbs, Divider, Button, 
  TextField, Card, CardContent, Grid, Link as MuiLink 
} from '@mui/material';
import Link from 'next/link'; // Next.js Link
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function ContactPage() {
  

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');

  };

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit"  color='success'/>
            <Typography color="text.secondary" variant="body2">
              Home
            </Typography>
          </Stack>
        </Link>
        <Typography color="text.primary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <PermContactCalendarRoundedIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
          Contact Us
        </Typography>
      </Breadcrumbs>
      
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h3" component="h1" gutterBottom 
          sx={{ fontWeight: 'bold', color: 'success.main' }}>
          How Can We Help You?
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={5}>
          Get instant answers or reach out directly to our FreshMart support team.
      </Typography>

      {/*Self-Service/Quick Links */}
      <Card variant="outlined" sx={{ mb: 5, p: 3, bgcolor: 'success.light' }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'success.dark', fontWeight: 'bold' }}>
          Need Quick Help?
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Link href="/faq" passHref style={{ textDecoration: 'none', flexGrow: 1 }}>
                <Button variant="contained" color="success" fullWidth startIcon={<QuestionAnswerIcon />}>
                    Check Our Full FAQ
                </Button>
            </Link>
            <MuiLink href="/orders" underline="none" sx={{ flexGrow: 1 }}>
                <Button variant="outlined" color="success" fullWidth>
                    Track Your Order Status
                </Button>
            </MuiLink>
        </Stack>
      </Card>
      
      <Grid container spacing={5}>
        
        {/*Contact Form (Left Column) */}
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
                // In a real app, define these menu items
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

        {/*Direct Contact Details & Specialized (Right Column) */}

        <Grid item xs={12} md={4}>
          <Stack justifyContent="center">
            <Typography variant="h4" component="h2" mb={3} sx={{ fontWeight: '600' }}>
              Reach Us Directly
            </Typography>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PhoneIcon color="success" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Phone Support</Typography>
                      <Typography>(+855) 12568479</Typography>
                      <Typography>(+855) 975684798</Typography>
                      <Typography>(+855) 685684794</Typography>
                      <Typography variant="body2" color="text.secondary">Mon-Fri, 8:00 AM - 9:00 PM ICT,UTC</Typography>
                    </Box>
                  </Stack>
                  
                  <Divider />

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <EmailIcon color="success" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Email Support</Typography>
                      <Typography>support@freshmart.com</Typography>
                      <Typography variant="body2" color="text.secondary">Best for detailed issues & file attachments.</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            
            {/* Specialized Contacts */}
            <Typography variant="h5" component="h3" mt={4} mb={2}>
              Business & Media
            </Typography>
            <Typography>
              **Grower/Supplier Inquiries:** <MuiLink href="mailto:partners@freshmart.com">partners@freshmart.com</MuiLink>
            </Typography>
            <Typography>
              **Press Inquiries:** <MuiLink href="mailto:press@freshmart.com">press@freshmart.com</MuiLink>
            </Typography>
          </Stack>
        </Grid>
        <Grid item sx={12} md={4}>
          <Stack spacing={5} sx={{mt: 12}}>
            <img src="/icons/contact.png" style={{ width: 310 , height: 310}}/> 
          </Stack>
        </Grid>
      </Grid>
      
      {/* Location (Optional Footer Block) */}
      <Divider sx={{ my: 6 }} />
      <Stack alignItems="center" spacing={2}>
        <PublicIcon color="action" sx={{ fontSize: 40 }}/>
        <Typography variant="h6">FreshMart Fulfillment Center</Typography>
        <Typography color="text.secondary">No.69, Preah Monivong Blvd. Sangkat Srah Chak, Khan Daun Penh ,Phnom Penh,1200</Typography>
        <Typography variant="caption" color="error">Note: This is a fulfillment center, not a public retail location.</Typography>
      </Stack>

    </Box>
  );
}