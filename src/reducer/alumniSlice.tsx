import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define Alumni Response type
interface AlumniResponse {
  message: string;
  id: number;
}

interface CheckResponse {
  filled: boolean;
}

interface AlumniState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: AlumniResponse | null;
  alreadyFilled: boolean;
}

const initialState: AlumniState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  alreadyFilled: false,
};

// 🔹 Helper: get Sanctum token
const getToken = (): string | null => {
  return localStorage.getItem("auth_token"); // store your Sanctum token in localStorage
};

// 🔹 Alumni Registration
export const submitAlumniForm = createAsyncThunk<
  AlumniResponse,
  FormData,
  { rejectValue: string }
>("alumni/submitForm", async (formData, { rejectWithValue }) => {
  try {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/alumni/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
      credentials: "include", // needed for Sanctum cookie if you use it
    });

    if (!res.ok) {
      const text = await res.text();
      return rejectWithValue(text || "Failed to register alumni");
    }

    return (await res.json()) as AlumniResponse;
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

// 🔹 Check Alumni Status
export const checkAlumniStatus = createAsyncThunk<
  CheckResponse,
  void,
  { rejectValue: string }
>("alumni/checkStatus", async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/alumni/register/check`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    if (!res.ok) {
      const text = await res.text();
      return rejectWithValue(text || "Failed to check alumni status");
    }

    return (await res.json()) as CheckResponse;
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

const alumniSlice = createSlice({
  name: "alumni",
  initialState,
  reducers: {
    resetAlumniState: () => initialState,
  },
  extraReducers: (builder) => {
    // Submit Alumni Form
    builder
      .addCase(submitAlumniForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        submitAlumniForm.fulfilled,
        (state, action: PayloadAction<AlumniResponse>) => {
          state.loading = false;
          state.success = true;
          state.data = action.payload;
        }
      )
      .addCase(submitAlumniForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register alumni";
      });

    // Check Alumni Status
    builder
      .addCase(checkAlumniStatus.fulfilled, (state, action) => {
        state.alreadyFilled = action.payload.filled;
      })
      .addCase(checkAlumniStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to check alumni status";
      });
  },
});

export const { resetAlumniState } = alumniSlice.actions;
export default alumniSlice.reducer;
