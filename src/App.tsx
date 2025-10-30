import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Header from "./components/Header.js"

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AlumniForm from "./components/Form.js";
import FirebaseAuthUI from "./FirebaseAuthUI.js";

import { useAppDispatch, useAppSelector } from "./hook.js";
import { fetchUser } from "./reducer/authSlice";
import Payments from "./pages/Payments.js";
import MyAccountPage from "./pages/MyAccount.js";
import PaymentSuccessPage from "./pages/Payment-success.js";
import Dashboard from "./pages/admin/Dashboard.js";
import AlumniDetailsPage from "./pages/admin/AlimniDetails.js";
import DashboardLayout from "./pages/admin/DashboardLayout.js";
import AlumniList from "./pages/admin/AlumniList.js";
import PaymentsManager from "./pages/admin/PaymentManager.js";
import PaymentRequests from "./pages/admin/PaymentRequests.js";
import EventsManager from "./pages/admin/EventSection.js";


const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/registration" element={<AlumniForm />} />
      <Route path="/login" element={<FirebaseAuthUI />} />
      <Route path="/payment" element={< Payments />} />
      <Route path="/account" element={< MyAccountPage />} />
      <Route path="/thank-you" element={< PaymentSuccessPage />} />

      {/* 
      <Route path="/dashboard" element={< Dashboard/>} />
      <Route path="/dashboard/alumni/:id" element={< AlumniDetailsPage/>} /> */}

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="alumni" element={<AlumniList />} />
        <Route path="alumni/:id" element={<AlumniDetailsPage />} />
        <Route path="payments" element={<PaymentsManager />} />
        <Route path="payment-requests" element={<PaymentRequests />} />
        <Route path="events" element={<EventsManager />} />
        {/* <Route path="news" element={<NewsManager />} />
          <Route path="settings" element={<SiteSettings />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};



// ----------------- App.jsx -----------------


const queryClient = new QueryClient();

const App = () => (

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
