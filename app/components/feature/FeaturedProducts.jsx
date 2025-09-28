import { Grid, Card, CardContent, Typography } from "@mui/material";

const products = [
  { id: 1, name: "Fresh Carrots", price: "$2.99", img: "/images/carrot.jpg" },
  { id: 2, name: "Organic Milk", price: "$1.49", img: "/images/milk.jpg" },
  { id: 3, name: "Apples", price: "$3.50", img: "/images/apple.jpg" },
];

export default function FeaturedProducts() {
  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        🌟 Featured Products
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card>
              <img src={p.img} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              <CardContent>
                <Typography variant="h6">{p.name}</Typography>
                <Typography variant="body1">{p.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
