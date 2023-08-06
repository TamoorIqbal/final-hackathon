import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/constants";

// Define the async thunk to fetch all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllProducts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "product/createNewProduct",
  async ({ formData, token }) => {
    try {
      const response = await axios.post(`${baseUrl}/createProduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload); // Add the new product to the products array
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
