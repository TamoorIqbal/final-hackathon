// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice.js";
import productReducer from "./productSlice.js";
import cartReducer from "./cartSlice.js";
import orderReducer from "./orderSlice.js";

const rootReducer = combineReducers({
  data: dataReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  // Add more reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
