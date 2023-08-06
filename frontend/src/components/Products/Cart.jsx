import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { fetchCart, removeProductFromCart } from "../../store/cartSlice.js";
import Loading from "../../utils/Loading";
import { baseUrl } from "../../utils/constants.js";
import { createOrder } from "../../store/orderSlice.js";
const Cart = ({ showToast }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleShippingDetailsChange = (field, value) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingDetails: {
          name: shippingDetails.name,
          address: shippingDetails.address,
          phoneNumber: shippingDetails.phoneNumber,
        },
        totalAmount: items
          .reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
          )
          .toFixed(2),
      };

      await dispatch(createOrder(orderData));

      // Handle success and reset cart
      showToast("Order placed successfully");
      dispatch(fetchCart());
    } catch (error) {
      console.error("Error placing order:", error);
      showToast("Failed to place order");
    }
  };
  const handleRemoveProduct = (productId) => {
    dispatch(removeProductFromCart(productId));
  };
  let content;

  if (status === "loading") {
    content = <Loading isLoading={true} />;
  } else if (status === "failed") {
    content = <Typography color="error">{error}</Typography>;
  } else {
    content = (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {items.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <Box>
            {items.map((item) => (
              <Card
                key={item.product._id}
                variant="outlined"
                style={{ marginBottom: "16px" }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CardMedia
                      component="img"
                      alt={item.product.name}
                      height={"300px"}
                      width={"100px"}
                      objectFit={"cover"}
                      image={`${baseUrl}/${
                        item.product.images && item.product.images.length > 0
                          ? item.product.images[0]
                          : "image-placeholder.jpg"
                      }`}
                      onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                      }}
                    />
                    <div style={{ marginLeft: "16px" }}>
                      <Typography variant="h6">{item.product.name}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>
                        Price: $
                        {item.product.price
                          ? item.product.price.toFixed(2)
                          : "N/A"}
                      </Typography>
                      <Typography>
                        Total: $
                        {(item.quantity * (item.product.price || 0)).toFixed(2)}
                      </Typography>
                    </div>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveProduct(item.product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Box p={2} textAlign="right">
              <Typography variant="h6">
                Total Price: $
                {items
                  .reduce(
                    (total, item) =>
                      total + item.quantity * (item.product.price || 0),
                    0
                  )
                  .toFixed(2)}
              </Typography>
            </Box>
            <Box my={4}>
              <Typography variant="h5">Checkout</Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={shippingDetails.name}
                onChange={(e) =>
                  handleShippingDetailsChange("name", e.target.value)
                }
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={shippingDetails.address}
                onChange={(e) =>
                  handleShippingDetailsChange("address", e.target.value)
                }
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={shippingDetails.phoneNumber}
                onChange={(e) =>
                  handleShippingDetailsChange("phoneNumber", e.target.value)
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
                style={{ marginTop: "16px" }}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    );
  }

  return <Box mt={3}>{content}</Box>;
};

export default Cart;
