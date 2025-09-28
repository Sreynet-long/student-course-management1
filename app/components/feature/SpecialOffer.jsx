import { Box, Typography, Button } from "@mui/material";

export default function SpecialOffer() {
  return (
    <Box sx={{ textAlign: "center", py: 6, bgcolor: "#fff3e0" }}>
      <Typography variant="h4" gutterBottom>
        🛒 Special Offers
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Grab your favorite groceries at discounted prices!
      </Typography>
      <Button variant="contained" color="primary">
        Shop Offers
      </Button>
    </Box>
  );
}
