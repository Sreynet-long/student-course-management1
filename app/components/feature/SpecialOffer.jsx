import { Box, Typography, Button, Stack } from "@mui/material";

export default function SpecialOffer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
      }}
    >
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Special Offers 🛒
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Grab your favorite groceries at discounted prices!
        </Typography>
        <Stack className="banner-image-offer">
          {/* <img src="/" alt="offer" /> */}
          <Typography>Coming Soon...</Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ width: 200, alignSelf: "center", borderRadius: "20px" }}
          >
            🔖 Shop Offers
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
