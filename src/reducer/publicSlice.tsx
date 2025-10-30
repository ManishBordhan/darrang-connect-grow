import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Async thunk to fetch all events
export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/public/events'); // your Laravel endpoint
      return response.data; // assuming response.data is the array of events
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching events');
    }
  }
);

// --- Slice
const publicEventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all events
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; // store events
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default publicEventsSlice.reducer;
