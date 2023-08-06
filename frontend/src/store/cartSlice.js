import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/constants";

// Define the async thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${baseUrl}/add-to-cart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { productId, quantity };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the async thunk to get the cart data
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${baseUrl}/get-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (productId, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${baseUrl}/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { productId, quantity } = action.payload;
        const existingItem = state.items.find(
          (item) => item.product._id === productId
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ product: { _id: productId }, quantity });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item.product._id !== action.payload.productId
        );
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
