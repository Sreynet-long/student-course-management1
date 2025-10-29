"use client";
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import {
  styled,
  createTheme,
  keyframes,
  ThemeProvider,
} from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER } from "../schema/Order";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// Steps
const steps = ["Cart", "Shipping", "Checkout"];

// Styled components
const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}));

const PayButtonBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  background: "inherit",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
}));

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const { user, setAlert } = useAuth();
  const [createOrder] = useMutation(CREATE_ORDER);

  const [activeStep, setActiveStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Shipping info state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Cambodia");

  // Payment info state
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [loading, setLoading] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
    },
  });

  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 0, 0));

  // Shipping validation
  const validateShipping = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !address.trim() ||
      !country.trim()
    ) {
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) return false;
    return true;
  };

  const handlePayNow = async () => {
    if (!validateShipping()) {
      setAlert(true, "error", {
        messageEn: "Please fill all required shipping fields!",
        messageKh: "សូមបំពេញវាលដឹកជញ្ជូនទាំងអស់ដែលតម្រូវឲ្យបំពេញ!",
      });
      return;
    }
    if (!user) {
      setAlert(true, "error", {
        messageEn: "Please login first",
        messageKh: "",
      });
      return;
    }
    if (cart.length === 0) {
      setAlert(true, "error", { messageEn: "Cart is empty", messageKh: "" });
      return;
    }

    const orderInput = {
      userId: user?.id,
      shippingInfo: { name, phone, email, address, country },
      items: cart.map((item) => ({
        productId: item?.product?.id,
        quantity: item?.quantity,
      })),
      paymentMethod,
    };

    try {
      setLoading(true);
      const { data } = await createOrder({ variables: { input: orderInput } });

      if (data?.createOrder?.isSuccess) {
        // Success alert
        setAlert(true, "success", {
          messageEn: "Order placed successfully! Redirecting...",
          messageKh: "ការកម្មង់បានបង្កើតដោយជោគជ័យ! កំពុងបញ្ជូន...",
        });

        // Clear cart
        clearCart();

        // Wait 1.5s before redirect to order history
        setTimeout(() => {
          router.push("/orders"); // redirect to order history page
        }, 1500);
      } else {
        setAlert(true, "error", {
          messageEn: data?.createOrder?.messageEn,
          messageKh: data?.createOrder?.messageKh,
        });
      }
    } catch (err) {
      console.error(err);
      setAlert(true, "error", {
        messageEn: "Checkout failed. Please try again.",
        messageKh: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: { xs: 2, md: 6 },
          maxWidth: "lg",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4, cursor: "pointer" }}>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ArrowBackIcon
                sx={{ mr: 0.5 }}
                fontSize="inherit"
                color="success"
              />
              <Typography color="text.secondary" variant="h6">
                Back
              </Typography>
            </Stack>
          </Link>
        </Breadcrumbs>
        <Divider />
        <Box sx={{ flex: 3 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={8}>
              <CardPaper>
                {/* Steps */}
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Cart
                    </Typography>
                    <Typography>Review your items before shipping.</Typography>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Shipping Info
                    </Typography>
                    <TextField
                      fullWidth
                      label="Full Name"
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Phone"
                      margin="normal"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      margin="normal"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Country"
                      margin="normal"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Payment Method
                    </Typography>
                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                      <RadioGroup
                        row
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <FormControlLabel
                          value="credit"
                          control={<Radio />}
                          label="Credit Card"
                        />
                        <FormControlLabel
                          value="debit"
                          control={<Radio />}
                          label="Debit Card"
                        />
                        <FormControlLabel
                          value="cash"
                          control={<Radio />}
                          label="Cash on Delivery"
                        />
                      </RadioGroup>
                    </FormControl>
                    <PayButtonBox>
                      <AnimatedButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={handlePayNow}
                        disabled={loading || cart.length === 0}
                      >
                        {loading ? "Processing..." : "Pay Now"}
                      </AnimatedButton>
                    </PayButtonBox>
                  </Box>
                )}
                {/* Navigation */}
                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Button disabled={activeStep === 0} onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    sx={{ color: "success" }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </CardPaper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
