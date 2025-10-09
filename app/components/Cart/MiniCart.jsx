import { Drawer, Box, Button, Typography } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useMutation } from "@apollo/client";
// import { PLACE_ORDER } from "../../schema/order";
import toast from "react-hot-toast";

export default function MiniCart({ userId }) {
  const { cart, isCartOpen, setCartOpen, setCart } = useCart();
  // const [placeOrder] = useMutation(PLACE_ORDER);

  const handleCheckout = async () => {
    const result = await placeOrder({ variables: { userId, paymentMethod: "Bank Transfer" } });
    setCart([]); // clear local cart
    setCartOpen(false);
    toast.success("Order placed successfully!");
  };

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={() => setCartOpen(false)}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6">Mini Cart</Typography>
        {cart.map(i => (
          <Box key={i.product.id}>
            <Typography>{i.product.productName} x {i.quantity}</Typography>
          </Box>
        ))}
        {cart.length > 0 && <Button onClick={handleCheckout}>Checkout</Button>}
      </Box>
    </Drawer>
  );
}
