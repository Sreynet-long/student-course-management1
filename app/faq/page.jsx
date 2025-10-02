"use client";
import React from 'react';
import { 
  Box, Breadcrumbs, Typography, Stack, Divider, Link as MuiLink,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

// ✅ FAQ data array
const faqData = [
  {
    question: "How do I place an order?",
    answer: "Browse categories, add items to your cart, and checkout using your preferred payment method."
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, same-day delivery is available for orders placed before 2 PM in select areas."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, and Cash on Delivery."
  },
  {
    question: "Can I track my order?",
    answer: "Yes, once your order is confirmed, you will receive a tracking link via email or SMS."
  },
  {
    question: "What is your return policy?",
    answer: "You can request a return within 3 days of delivery for any damaged or spoiled items."
  }
];

export default function Page() {
  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 'lg', margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <MuiLink 
          component={Link}
          href="/"
          passHref
          underline="none"
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
            <Typography color="text.secondary" variant="body2">
              Home
            </Typography>
          </Stack>
        </MuiLink>
        <Typography color="text.primary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <QuizIcon sx={{ mr: 0.5 }} fontSize="inherit" color="success" />
          FAQ
        </Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 4 }} />

      {/* Page Title */}
      <Stack spacing={2} mb={4}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: 'success.main' }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find answers to the most common questions about FreshMart.
        </Typography>
      </Stack>

      {/* FAQ Accordion (Dynamic) */}
      <Stack spacing={2}>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}
