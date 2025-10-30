// src/features/manualPayment/manualPaymentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// --- Types ---
export interface Payment {
  id: number;
  user_id: number;
  donation_id?: number;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "rejected";
  receipt?: string; // backend uses 'receipt'
  order_id: string;
}

interface ManualPaymentState {
  payments: Payment[];
  pendingPayments: Payment[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// --- API base URL ---
const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/manual/payment`;

// --- Auth headers ---
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- Async Thunks ---
export const submitPayment = createAsyncThunk<
  { message: string; payment: Payment },
  FormData,
  { rejectValue: { message: string } }
>("manualPayment/submitPayment", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_BASE, formData, {
      headers: { "Content-Type": "multipart/form-data", ...getAuthHeaders() },
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || { message: "Something went wrong" });
  }
});

export const fetchUserPayments = createAsyncThunk<Payment[], void, { rejectValue: { message: string } }>(
  "manualPayment/fetchUserPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payment/all`, { headers: getAuthHeaders() });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);

export const fetchPendingPayments = createAsyncThunk<Payment[], void, { rejectValue: { message: string } }>(
  "manualPayment/fetchPendingPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payment/pending`, { headers: getAuthHeaders() });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);

export const updatePaymentStatus = createAsyncThunk<
  { message: string; payment: Payment },
  { id: number; status: "approved" | "rejected" },
  { rejectValue: { message: string } }
>("manualPayment/updatePaymentStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/approve/${id}`, { status }, { headers: getAuthHeaders() });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || { message: "Something went wrong" });
  }
});

// --- Slice ---
const initialState: ManualPaymentState = {
  payments: [],
  pendingPayments: [],
  loading: false,
  error: null,
  successMessage: null,
};

const manualPaymentSlice = createSlice({
  name: "manualPayment",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Payment
      .addCase(submitPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPayment.fulfilled, (state, action: PayloadAction<{ message: string; payment: Payment }>) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.payments.push(action.payload.payment);
      })
      .addCase(submitPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Fetch User Payments
      .addCase(fetchUserPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchUserPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Fetch Pending Payments
      .addCase(fetchPendingPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.loading = false;
        state.pendingPayments = action.payload;
      })
      .addCase(fetchPendingPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Update Payment Status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action: PayloadAction<{ message: string; payment: Payment }>) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        const updatedPayment = action.payload.payment;
        state.pendingPayments = state.pendingPayments.filter((p) => p.id !== updatedPayment.id);
        state.payments = state.payments.map((p) => (p.id === updatedPayment.id ? updatedPayment : p));
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearMessages } = manualPaymentSlice.actions;
export default manualPaymentSlice.reducer;
