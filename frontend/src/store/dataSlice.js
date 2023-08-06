// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle', // Possible values: 'idle', 'pending', 'fulfilled', 'rejected'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
