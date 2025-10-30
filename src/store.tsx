// src/store.ts
import { configureStore } from "@reduxjs/toolkit";

// Separate slices
import authReducer from "./reducer/authSlice";
import alumniReducer from "./reducer/alumniSlice";
import publicEventsSlice from "./reducer/publicSlice";
import manualPaymentSlice from "./reducer/customPaymentReducer";
import alumniDetailsSlice from "./reducer/alumniDetailsSlice";

// Admin slices
import {
  authSlice,
  dashboardSlice,
  alumniSlice,
  paymentsSlice,
  paymentRequestsSlice,
  eventsSlice,
  newsSlice,
  settingsSlice,
} from "./reducer/adminSlice";

export const store = configureStore({
  reducer: {
    // Separate slices
    auth: authReducer,
    alumni: alumniReducer,
    event:publicEventsSlice,

    // Admin dashboard slices
    adminAuth: authSlice.reducer,
    adminAlumni: alumniSlice.reducer,
    alumniDetails:alumniDetailsSlice,
    dashboard: dashboardSlice.reducer,
    payments: paymentsSlice.reducer,
    paymentRequests: paymentRequestsSlice.reducer,
    manualpayment: manualPaymentSlice,
    events: eventsSlice.reducer,
    news: newsSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

// 🔹 Export Types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
