"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client/react";
import { useAuth } from "./AuthContext";
import { CREATE_ORDER } from "../schema/Order";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, setAlert } = useAuth(); 
  const [cart, setCart] = useState([]);
  const [createOrder] = useMutation(CREATE_ORDER);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    if (!user) {
      setAlert(true, "error", { messageEn: "Please login first", messageKh: "" });
      return;
    }
    const exist = cart.find((item) => item.product.id === product.id);
    let newCart;
    if (exist) {
      newCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }

    setCart(newCart);
    setAlert(true, "success", { messageEn: "Added to cart!", messageKh: "" });
    try {
      await createOrder({
        variables: {
          input: {
            userId: user.id,
            items: newCart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              
            })),
          },
        },
      });
    } catch (err) {
      console.error("Failed to sync cart with backend:", err);
      setAlert(true, "error", { messageEn: "Failed to sync with server", messageKh: "" });
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const checkout = async () => {
    if (!user) {
      setAlert(true, "error", { messageEn: "Please login first", messageKh: "" });
      return;
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
          },
        },
      });
      setAlert(true, "success", { messageEn: "Order placed successfully!", messageKh: "" });
      clearCart();
    } catch (err) {
      console.error("Checkout failed:", err);
      setAlert(true, "error", { messageEn: "Checkout failed", messageKh: "" });
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        checkout,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
