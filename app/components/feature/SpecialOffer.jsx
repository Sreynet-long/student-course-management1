import { Box, Typography, Button, Stack } from "@mui/material";

export default function SpecialOffer() {
  return (
    <Box sx={{
       textAlign: "center", 
       py: 6, 
       bgcolor: "#afddb3" , 
       borderTopRightRadius: "170px", 
       borderTopLeftRadius: "170px",
       mt: "15px"
      }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Special Offers 🛒 
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Grab your favorite groceries at discounted prices!
        </Typography>
        <Button variant="contained" color="success" sx={{ width: 200, alignSelf: "center", borderRadius: "20px"}}>
         🔖 Shop Offers
        </Button>
      </Stack>
    </Box>
  );
}
