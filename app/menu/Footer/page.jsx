import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton, Divider} from '@mui/material';
import Image from 'next/image';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PaymentIcon from '@mui/icons-material/Payment';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 6, mt: 'auto' }} className='app-footer'>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Section 1: Company Info */}
          <Grid item xs={12} sm={4}>
            
            <Typography variant="h6" color="text.primary" gutterBottom>
              <ShoppingBasketIcon fontSize="large" color="white"/>
              FreshMart
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for fresh groceries delivered right to your door.
            </Typography>
            <Box className="box-payment" sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mt: { xs: 2, md: 0 }, marginTop: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Payment Methods:
              </Typography>
              {/* <PaymentIcon sx={{ color: 'text.secondary' }} /> */}
              <img src="/payments/visa.png" alt="Visa" style={{ height: 25, width: 25, marginLeft: 8 }} />
              <img src="/payments/card.png" alt="Mastercard" style={{ height: 25, width:25,  marginLeft: 8 }} />
            </Box>
          </Grid>

          {/* Section 2: Quick Links */}
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box className='box-links'>
              <Link href="#" color="success" display="block" gutterBottom>About Us</Link>
              <Link href="#" color="success" display="block" gutterBottom>Contact</Link>
              <Link href="#" color="success" display="block" gutterBottom>FAQ</Link>
              <Link href="#" color="success" display="block" gutterBottom>Careers</Link>
            </Box>
          </Grid>

          {/* Section 3: Categories */}
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Categories
            </Typography>
            <Box className='box-links'>
              <Link href="#" color="success" display="block" gutterBottom>Vegetables</Link>
              <Link href="#" color="success" display="block" gutterBottom>Fruits</Link>
              <Link href="#" color="success" display="block" gutterBottom>Dairy</Link>
              <Link href="#" color="success" display="block" gutterBottom>Meat & Fish</Link>
            </Box>
          </Grid>

          {/* Section 4: Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect with Us:
            </Typography>
            <Box>
              <IconButton  aria-label="facebook">
                <Image src="/media/facebook.png" alt="Facebook" height={24} width={24} />
              </IconButton>
              <IconButton  aria-label="twitter">
                <Image src="/media/twitter.png" alt="Twitter" height={24} width={24} />
              </IconButton>
              <IconButton aria-label="instagram">
                <Image src="/media/instagram.png" alt="Instagram" height={24} width={24}/>
              </IconButton>
              <IconButton aria-label="instagram">
                <Image src="/media/telegram.png" alt="Telegram" height={24} width={24}/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section: Payment and Copyright */}
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign : { xs: 'center', md: 'left' }}}>
              &copy; {new Date().getFullYear()} FreshMart. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;