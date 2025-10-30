"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  Award,
  Gem,
  CheckCircle2,
  GraduationCap,
  Edit,
  Heart,
  ArrowLeft,
  UploadCloud,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitPayment } from "@/reducer/customPaymentReducer";
import { useAppDispatch } from "@/hook";

// Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

// --- Donation Plans ---
interface Tier {
  id: string;
  label: string;
  benefit: string;
  minAmount: number;
}

interface Plan {
  donation_id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  tiers: Tier[];
}

const donationPlans: Plan[] = [
  {
    donation_id: 1,
    title: "General Member",
    description: "Support our mission annually with foundational membership.",
    icon: Users,
    tiers: [
      { id: "gen1", label: "₹500", benefit: "Annual Membership", minAmount: 500 },
      { id: "gen2", label: "₹100/year", benefit: "Renewal Fee", minAmount: 100 },
    ],
  },
  {
    donation_id: 2,
    title: "Life Member",
    description: "Make a lifetime impact and receive special recognition.",
    icon: Award,
    tiers: [
      { id: "life1", label: "₹5,000+", benefit: "Life Member", minAmount: 5000 },
      { id: "life2", label: "₹10,000+", benefit: "Silver Life", minAmount: 10000 },
      { id: "life3", label: "₹20,000+", benefit: "Gold Life", minAmount: 20000 },
    ],
  },
  {
    donation_id: 3,
    title: "Donor Member",
    description: "Become a key contributor to our long-term vision.",
    icon: Gem,
    tiers: [
      { id: "donor1", label: "₹25,000+", benefit: "Donor Member", minAmount: 25000 },
      { id: "donor2", label: "₹50,000+", benefit: "Silver Donor", minAmount: 50000 },
      { id: "donor3", label: "₹1,00,000+", benefit: "Gold Donor", minAmount: 100000 },
    ],
  },
  {
    donation_id: 4,
    title: "Custom Donation",
    description: "Contribute any amount of your choice to support our initiatives.",
    icon: Heart,
    tiers: [{ id: "custom1", label: "Enter Amount", benefit: "Flexible Support", minAmount: 1 }],
  },
];

// --- Tier Card Component ---
interface TierCardProps {
  tier: Tier;
  isSelected: boolean;
  onSelect: () => void;
}

const ModernTierCard: React.FC<TierCardProps> = ({ tier, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 relative group
      ${isSelected ? "border-purple-500 bg-purple-500/10" : "border-slate-700 bg-slate-800/60 hover:border-slate-500"}`}
  >
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h4 className="text-base font-bold text-white">{tier.benefit}</h4>
        <p className="text-xs text-slate-400">Starting from</p>
      </div>
      <div className="mt-1.5">
        <p className="text-xl font-bold text-purple-400">{tier.label}</p>
      </div>
    </div>
    <div
      className={`absolute top-2.5 right-2.5 h-4 w-4 rounded-full border-2 flex items-center justify-center
        ${isSelected ? "border-purple-500 bg-purple-500" : "border-slate-500 group-hover:border-slate-300"}`}
    >
      {isSelected && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
    </div>
  </div>
);

// --- Main Component ---
export default function DarrangCollegeAlumniSubscriptionFinal() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(donationPlans[0]);
  const [selectedTier, setSelectedTier] = useState<Tier>(donationPlans[0].tiers[0]);
  const [amount, setAmount] = useState<number>(donationPlans[0].tiers[0].minAmount);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => setAmount(selectedTier.minAmount), [selectedTier]);

  const handleSelection = (plan: Plan, tier: Tier) => {
    setSelectedPlan(plan);
    setSelectedTier(tier);
  };

  const handleSubscribe = async () => {
    if (!token) return alert("User not authenticated");
    if (amount < selectedTier.minAmount)
      return alert(`Amount must be at least ₹${selectedTier.minAmount}.`);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/payments/create-order",
        { amount, donation_id: selectedPlan.donation_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.order) throw new Error("Order creation failed");

      const options = {
        key: "rzp_test_ROzKgIEBxXbUWZ",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Darrang College Alumni Association",
        description: `${selectedTier.benefit} Membership`,
        order_id: data.order.id,
        prefill: { name: data.user_name, email: data.user_email, contact: data.user_contact },
        theme: { color: "#8B5CF6" },
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:8000/api/payments/verify",
              response,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (verifyRes.data.success) {
              alert("Payment successful!");
              navigate("/thank-you");
            } else alert("Payment verification failed!");
          } catch {
            alert("Verification failed. Please contact support.");
          }
        },
        modal: { ondismiss: () => alert("Payment cancelled") },
      };

      new window.Razorpay(options).open();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong while processing payment.");
    }
  };

  const handleReceiptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setReceiptFile(e.target.files[0]);
  };
const handleManualPayment = async () => {
  if (!amount || amount < selectedTier.minAmount)
    return alert(`Amount must be at least ₹${selectedTier.minAmount}.`);
  if (!receiptFile) return alert("Please upload receipt for manual payment.");

  const formData = new FormData();
  formData.append("amount", amount.toString());
  formData.append("donation_id", selectedPlan.donation_id.toString());
  formData.append("receipt", receiptFile); // ✅ FIXED FIELD NAME

  try {
    const result = await dispatch(submitPayment(formData)).unwrap();
    alert(result.message);
    setReceiptFile(null);
  } catch (err: any) {
    alert(err.message || "Submission failed");
  }
};


  return (
    <div className="min-h-screen w-full bg-slate-900 text-white font-sans">
      <div className="relative max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <GraduationCap className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-300">
                Darrang College Alumni Association
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-400">
                Reconnect, give back, and strengthen the legacy of our beloved institution.
              </p>
            </div>
          </div>
          <Link to="/">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Main Website
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donation Plans */}
          <div className="lg:col-span-2 space-y-4">
            {donationPlans.map((plan) => (
              <Card
                key={plan.title}
                className="w-full rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/80 shadow-xl"
              >
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <plan.icon className="h-5 w-5 text-purple-400 mr-3" />
                    <div>
                      <h2 className="text-lg font-bold text-white">{plan.title}</h2>
                      <p className="text-xs text-slate-400">{plan.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mt-4">
                    {plan.tiers.map((tier) => (
                      <ModernTierCard
                        key={tier.id}
                        tier={tier}
                        isSelected={selectedTier.id === tier.id}
                        onSelect={() => handleSelection(plan, tier)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary + Payment Options */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <Card className="w-full rounded-2xl bg-slate-800/70 backdrop-blur-md border border-slate-700/80 shadow-xl">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-7 w-7 text-purple-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Your Contribution Summary
                      </h3>
                    </div>
                  </div>

                  <div className="text-center bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <Heart className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                    <p className="text-purple-300 text-sm font-semibold">
                      Thank you for your support!
                    </p>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Membership Tier</span>
                      <span className="text-sm font-bold text-white">
                        {selectedTier.benefit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Minimum Amount</span>
                      <span className="text-sm font-mono text-slate-300">
                        ₹{selectedTier.minAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="border-t border-dashed border-slate-600 my-2"></div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="amount"
                        className="text-sm font-semibold text-purple-400 flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" /> Enter Your Final Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={selectedTier.minAmount}
                        step={1}
                        className="text-2xl font-bold h-14 bg-slate-800 border-2 border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-purple-400"
                      />
                    </div>
                  </div>

                  <h4 className="text-white text-base font-semibold mt-4">
                    Choose Payment Method
                  </h4>

                  <div className="flex flex-col gap-4 w-full">
                    {/* Option 1: Razorpay */}
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <p className="text-sm text-slate-300 mb-3 font-semibold flex items-center gap-2">
                        <Gem className="w-4 h-4 text-purple-400" /> Pay Online via Razorpay
                      </p>
                      <Button
                        onClick={handleSubscribe}
                        className="w-full h-12 text-base font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      >
                        Pay ₹{amount.toLocaleString("en-IN")} Securely
                      </Button>
                    </div>

                    {/* Option 2: Manual Upload */}
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <p className="text-sm text-slate-300 mb-3 font-semibold flex items-center gap-2">
                        <UploadCloud className="w-4 h-4 text-amber-400" /> Upload Offline Receipt
                      </p>
                      <label className="flex w-full h-11 items-center justify-center px-3 bg-slate-900/50 border border-slate-700 rounded-md text-sm text-slate-400 cursor-pointer hover:bg-slate-800/50 transition-colors mb-3">
                        <FileText className="w-4 h-4 mr-2" />
                        <span>{receiptFile ? receiptFile.name : "Choose receipt file..."}</span>
                        <Input
                          type="file"
                          onChange={handleReceiptFileChange}
                          className="hidden"
                            accept="*"
                        />
                      </label>
                      <Button
                        onClick={handleManualPayment}
                        disabled={!receiptFile}
                        className="w-full h-12 text-base font-bold bg-amber-500 hover:bg-amber-600"
                      >
                        Submit Receipt ₹{amount.toLocaleString("en-IN")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
