"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft, User, Hash, IndianRupee, Calendar } from "lucide-react";

// --- College Logo Component (re-used for branding) ---
const CollegeLogo = () => (
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 bg-slate-700/80 border border-slate-600 rounded-full flex items-center justify-center">
      <span className="font-bold text-purple-400 text-lg">DC</span>
    </div>
    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-300 hidden sm:block">
      Darrang College Alumni
    </span>
  </div>
);

// --- Main Payment Success Page Component ---
export default function PaymentSuccessPage() {
  // In a real app, you'd get these details from URL params or state management
  const paymentDetails = {
    transactionId: "pi_3PjA4tSJL2a7z1z21AabCD1e",
    amount: 5000, // in paisa/cents
    date: new Date(),
    for: "Life Membership Fee",
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4">
      <header className="absolute top-8 left-8">
        <CollegeLogo />
      </header>

      <Card className="max-w-2xl w-full bg-slate-800/50 border border-slate-700/80 rounded-2xl shadow-lg">
        <CardHeader className="flex flex-col items-center text-center p-8">
          <CheckCircle2 className="h-20 w-20 text-green-400 mb-4" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-300 to-white">
            Payment Successful
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Thank you for your generous contribution!
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {/* <div className="border-t border-slate-700 pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Transaction Summary</h2>
            
            <div className="flex justify-between items-center text-md">
              <span className="flex items-center gap-3 text-slate-400">
                <User className="h-5 w-5" /> Description
              </span>
              <span className="font-semibold text-white">{paymentDetails.for}</span>
            </div>

            <div className="flex justify-between items-center text-md">
              <span className="flex items-center gap-3 text-slate-400">
                <IndianRupee className="h-5 w-5" /> Amount Paid
              </span>
              <span className="font-mono text-white font-bold text-lg">
                ₹{(paymentDetails.amount / 100).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between items-center text-md">
              <span className="flex items-center gap-3 text-slate-400">
                <Calendar className="h-5 w-5" /> Date
              </span>
              <span className="font-medium text-white">
                {paymentDetails.date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center text-md">
              <span className="flex items-center gap-3 text-slate-400">
                <Hash className="h-5 w-5" /> Transaction ID
              </span>
              <span className="font-mono text-sm text-slate-300">
                {paymentDetails.transactionId}
              </span>
            </div>
          </div> */}
          
          <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center gap-4">
            <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-600/20">
              <Link to="/account">
                Go to My Account
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto text-gray border-slate-600 hover:bg-slate-700">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}