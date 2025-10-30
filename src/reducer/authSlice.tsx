import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";

// -------------------- Types --------------------
export interface User {
  id: number;
  name: string;
  email: string | null;
  phone?: string | null;
  payments?: {
    id: number;
    order_id: string;
    payment_id: string;
    amount: number;
    status: string;
    created_at: string;
    donation?: {
      id: number;
      title: string;
      description: string;
      default_amount: number;
    };
  }[];
}

interface AuthState {
  token: string | null;
  email: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
   missingFields?: {
    phone?: boolean;
    email?: boolean;
    name?: boolean;
  } | null;
}

interface LoginPayload {
  email?: string;
  password?: string;
  phone?: string;
  method?: "email" | "google" | "phone" | "google-or-email";
  idToken?: string;
  name?: string;
}

interface LoginResponse {
  token: string;
  email?: string | null;
  phone?: string | null;
}

// -------------------- Thunks --------------------

// 🔹 LOGIN
export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/login",
  async (
    { email, password, phone, method = "email", idToken, name },
    { rejectWithValue }
  ) => {
    const firebaseAuth = getAuth();

    try {
      let tokenToSend: string = "";

      // Case 1: Already authenticated (FirebaseUI or phone)
      if (idToken) {
        tokenToSend = idToken;
      }
      // Case 2: Google Login
      else if (method === "google") {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth, provider);
        tokenToSend = await result.user.getIdToken();
        email = result.user.email!;
        name = result.user.displayName || "Google User";
      }
      // Case 3: Email/Password Login
      else if (method === "email") {
        if (!email || !password)
          return rejectWithValue("Email & password are required");
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        tokenToSend = await userCredential.user.getIdToken();
      }
      // Case 4: Phone Login
      else if (method === "phone") {
        if (!idToken) return rejectWithValue("No Firebase token found");
        tokenToSend = idToken;
      } else {
        return rejectWithValue("Invalid login method");
      }

      // 🔹 Send token to Laravel backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/firebase`,
        { idToken: tokenToSend, email, phone, name },
        { withCredentials: true }
      );

      localStorage.setItem("auth_token", res.data.token);

      return {
        token: res.data.token,
        email: email || null,
        phone: phone || null,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.code ||
          err.response?.data?.error ||
          err.message ||
          "Login failed"
      );
    }
  }
);

// 🔹 FETCH USER
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) return rejectWithValue("No token found");

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data.user as User;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// 🔹 LOGOUT
export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("auth_token");
  if (!token) return;

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    await signOut(auth);
    localStorage.removeItem("auth_token");
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Logout failed");
  }
});

// -------------------- Slice --------------------
const initialState: AuthState = {
  token: localStorage.getItem("auth_token") || null,
  email: null,
  user: null,
  loading: false,
  error: null,
  success: null,
  missingFields:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.email = action.payload.email || null;
          state.success = "Login successful!";
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // FETCH USER
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch user";
        state.user = null;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.email = null;
        state.user = null;
        state.success = "Logged out successfully!";
      });
  },
});

export const { clearMessages, setUser } = authSlice.actions;
export default authSlice.reducer;
