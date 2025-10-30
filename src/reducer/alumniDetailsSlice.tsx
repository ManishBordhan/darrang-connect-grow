import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Document {
    type: string;
    file_path: string;
}

interface Payment {
    id: number;
    amount: number;
    status: string;
    created_at: string;
    donation?: { title: string };
}

interface AlumniProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    batch: string;
    address: string;
    father: string;
    mother: string;
    activities: string;
    status: string;
    membership_type: string;
    documents: Document[];
}

interface AlumniDetailsState {
    profile: AlumniProfile | null;
    payments: Payment[];
    status: "idle" | "loading" | "failed";
}

const initialState: AlumniDetailsState = {
    profile: null,
    payments: [],
    status: "idle",
};

export const fetchAlumniDetails = createAsyncThunk(
  "alumniDetails/fetchAlumniDetails",
  async (id: number) => {
    const token = localStorage.getItem("auth_token"); // get your JWT
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/alumni/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // attach token
      },
    });
    return response.data;
  }
);

const alumniDetailsSlice = createSlice({
    name: "alumniDetails",
    initialState,
    reducers: {
        clearAlumniDetails: (state) => {
            state.profile = null;
            state.payments = [];
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlumniDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAlumniDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.profile = action.payload.profile;
                state.payments = action.payload.payments;
            })
            .addCase(fetchAlumniDetails.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { clearAlumniDetails } = alumniDetailsSlice.actions;
export default alumniDetailsSlice.reducer;
