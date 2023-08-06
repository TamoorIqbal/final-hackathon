import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, /* ... */ } from "@mui/material";

export const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <Box>
      <Typography variant="h4">Cart Summary</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product._id}>
              <Typography>{item.product.name}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Subtotal: ${item.product.price * item.quantity}</Typography>
              <hr />
            </div>
          ))}
          <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
        </>
      )}
    </Box>
  );
};
