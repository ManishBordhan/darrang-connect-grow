import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Async thunk to fetch all public events
export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // 👇 You can change this URL when hosting
      const response = await axios.get('https://dorrangcollege.onrender.com/api/public/events');
      return response.data; // expecting an array of events
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extract backend message safely
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
    error: null as string | null, // stores error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ⏳ Loading state
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      // ✅ Success state
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })

      // ❌ Error state
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = 'failed';

        // Ensure error is a string (avoid object render crash)
        if (typeof action.payload === 'object' && action.payload !== null) {
          state.error = (action.payload as any).message || JSON.stringify(action.payload);
        } else {
          state.error = (action.payload as string) || 'Something went wrong';
        }
      });
  },
});

export default publicEventsSlice.reducer;
