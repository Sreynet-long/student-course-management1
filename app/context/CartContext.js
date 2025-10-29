"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { useAuth } from "./AuthContext";
import { CREATE_ORDER } from "../schema/Order";

const CartContext = createContext();

const formatPrice = (value) => parseFloat(Number(value).toFixed(2));

export const CartProvider = ({ children }) => {
  const { user, setAlert } = useAuth();
  const [cart, setCart] = useState([]);
  const [createOrder] = useMutation(CREATE_ORDER);

  // Shipping info state for checkout
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.username || "",
    phone: user?.phoneNumber || "",
    email: user?.email || "",
    address: "",
    country: "",
  });

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!user) {
      return setAlert(true, "error", {
        messageEn: "Please login first!",
        messageKh: "សូមធ្វើការចូលជាមុនសិន!",
      });
    }

    const productPrice = formatPrice(product.price);
    const exist = cart.find((item) => item.product.id === product.id);
    let newCart;

    if (exist) {
      newCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [
        ...cart,
        { product: { ...product, price: productPrice }, quantity: 1 },
      ];
    }

    setCart(newCart);

    setAlert(true, "success", {
      messageEn: "Added to cart!",
      messageKh: "បានបន្ថែមទៅក្នុងកន្ត្រកហើយ!",
    });
  };

  const checkout = async () => {
    if (!user) {
      setAlert(true, "error", {
        messageEn: "Please login first!",
        messageKh: "សូមធ្វើការចូលជាមុនសិន!",
      });
      return;
    }

    // Check shipping info
    if (
      !shippingInfo.name ||
      !shippingInfo.phone ||
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.country
    ) {
      return setAlert(true, "error", {
        messageEn: "Please fill all shipping information!",
        messageKh: "សូមបំពេញព័ត៌មានកន្លែងដឹកជញ្ជូន!",
      });
    }

    try {
      await createOrder({
        variables: {
          input: {
            userId: user.id,
            items: cart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
            shippingInfo: shippingInfo, // ✅ include shipping info
          },
        },
      });

      setAlert(true, "success", {
        messageEn: "Order placed successfully!",
        messageKh: "ការបញ្ជាទិញត្រូវបានដាក់ដោយជោគជ័យ!",
      });
      clearCart();
    } catch (err) {
      console.error("Checkout failed:", err);
      setAlert(true, "error", {
        messageEn: "Checkout failed!",
        messageKh: "ការទូទាត់ប្រាក់បរាជ័យ!",
      });
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = formatPrice(
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        checkout,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        totalPrice,
        shippingInfo,
        setShippingInfo, // <-- expose setter to allow form updates
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
