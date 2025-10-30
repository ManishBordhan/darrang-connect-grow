import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- Async thunk to fetch all public events
export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Correct endpoint
      const response = await axios.get(`https://dorrangcollege.onrender.com/api/public/events`);
      // const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/public/events`);
      return response.data; // expecting an array of events
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
          error.response?.data ||
          { message: error.message }
        );

        
      }
      return rejectWithValue({ message: 'Unknown error occurred' });
    }
  }
);

// --- Events slice
const publicEventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],         // stores event data
    status: 'idle',   // idle | loading | succeeded | failed
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ⏳ Loading
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // ✅ Success
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      // ❌ Error
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'object' && action.payload !== null) {
          state.error =
            (action.payload as any).message || JSON.stringify(action.payload);
        } else {
          state.error = (action.payload as string) || 'Something went wrong';
        }
      });
  },
});

export default publicEventsSlice.reducer;
