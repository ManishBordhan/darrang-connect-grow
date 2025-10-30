"use client";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Download, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hook";
import { fetchUser } from "@/reducer/authSlice";
import logo from "../assets/logo.png";

// --- Certificate Component ---
interface CertificateProps {
  memberName: string;
  membershipType: string;
  issueDate: string;
}

const MembershipCertificate: React.FC<CertificateProps> = ({ memberName, membershipType, issueDate }) => {
  const formattedDate = new Date(issueDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl border-4 border-purple-500 font-serif w-full max-w-4xl aspect-[1.414/1] flex flex-col">
      <div className="border-2 border-purple-400 w-full h-full p-6 flex flex-col items-center justify-between relative">
        <div className="absolute top-2 left-2 w-12 h-12 border-l-2 border-t-2 border-purple-300"></div>
        <div className="absolute top-2 right-2 w-12 h-12 border-r-2 border-t-2 border-purple-300"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 border-l-2 border-b-2 border-purple-300"></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 border-r-2 border-b-2 border-purple-300"></div>

        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-800" style={{ fontFamily: '"Garamond", serif' }}>
            Certificate of Membership
          </h1>
          <p className="text-lg mt-2 text-gray-600">This certificate is proudly presented to</p>
        </div>

        <div className="text-center my-8">
          <p className="text-6xl font-extravagant tracking-wider text-gray-900" style={{ fontFamily: '"Playfair Display", serif' }}>
            {memberName}
          </p>
          <div className="w-64 h-px bg-purple-500 mx-auto mt-2"></div>
        </div>

        <div className="text-center text-lg text-gray-700 max-w-2xl">
          <p>
            For their valued commitment and support to the <span className="font-semibold text-purple-800">Darrang College Alumni Association</span>.
            This certifies that they are a distinguished
          </p>
          <p className="text-3xl font-bold text-purple-700 uppercase mt-4">{membershipType}</p>
        </div>

        <div className="w-full flex justify-between items-end mt-12 pt-4">
          <div className="text-center">
            <p className="text-lg font-semibold border-t-2 border-purple-600 px-4 pt-1">President</p>
            <p className="text-sm text-gray-600">DCAA</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-purple-400">
              <span className="font-bold text-purple-600 text-4xl"><img src={logo} alt="DC"  /></span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold border-t-2 border-purple-600 px-4 pt-1">Secretary</p>
            <p className="text-sm text-gray-600">DCAA</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 absolute bottom-1 right-2">Issued on: {formattedDate}</p>
      </div>
    </div>
  );
};

// --- Loading Spinner Component ---
const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-screen bg-slate-900">
    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// --- College Logo Component ---
const CollegeLogo = () => (
  <div className="flex items-center gap-3">
    <div className="h-11 w-11 bg-slate-700/80 border border-slate-600 rounded-full flex items-center justify-center">
      {/* <span className="font-bold text-purple-400 text-lg"> */}
        <img src={logo} alt="DC" />
        {/* </span> */}
    </div>
    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-300 hidden sm:block">
      Darrang College Alumni
    </span>
  </div>
);

// --- Main Account Page Component ---
export default function MyAccountPage() {
  const dispatch = useAppDispatch();
  const [showCertificate, setShowCertificate] = React.useState(false);
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Determine membership from the highest payment
  const membershipPayment = user?.payments
    ?.filter((p: any) => p.donation)
    .sort((a: any, b: any) => b.amount - a.amount)[0]?.donation;
  const membershipType = membershipPayment?.title ?? "Member";

  const handlePrint = () => window.print();
  const handleDownloadHistory = () => {
    alert("Downloading payment history...");
  };

  if (loading || !user) return <Loading />;

  if (showCertificate) {
    return (
      <div className="min-h-screen bg-slate-900 font-sans">
        <style>{`
          @media print {
            body * { visibility: hidden; }
            .printable-certificate-area, .printable-certificate-area * { visibility: visible; }
            .printable-certificate-area { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
            @page { size: A4 landscape; margin: 0; }
          }
        `}</style>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="printable-certificate-area">
            <MembershipCertificate
              memberName={user.name}
              membershipType={membershipType}
              issueDate={user.payments?.[0]?.created_at ?? new Date().toISOString()}
            />
          </div>
          <div className="text-center mt-6 space-x-4">
            <Button onClick={() => setShowCertificate(false)} variant="outline" className="text-black border-slate-600 hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Account
            </Button>
            <Button onClick={handlePrint} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download / Print
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white font-sans">
      <div className="relative max-w-5xl mx-auto py-8 px-4">
        <header className="flex items-center justify-between mb-10">
          <CollegeLogo />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
        </header>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-300 to-white">
            My Alumni Account
          </h1>
          <p className="mt-3 text-sm text-slate-400 max-w-2xl mx-auto">
            View your membership details and access exclusive resources.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 bg-slate-800/50 border border-slate-700/80 p-6 flex flex-col items-center text-center">
              <img
                src={ `https://placehold.co/100x100/1e293b/a78bfa?text=${user.name?.[0] ?? "U"}`}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-purple-400 object-cover mb-4"
              />
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-sm text-slate-400">{user.email}</p>
              <Button variant="outline" className="mt-4 text-xs h-8 border-slate-600 hover:bg-slate-700">Edit Profile</Button>
            </Card>

            <Card className="md:col-span-2 bg-slate-800/50 border border-slate-700/80">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Award className="h-6 w-6 text-purple-400" />
                  Membership Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-md">
                  <span className="text-sm text-slate-400">Membership Type</span>
                  <span className="text-md font-bold text-green-400 uppercase">{membershipType}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-md">
                  <span className="text-sm text-slate-400">Member Since</span>
                  <span className="text-md font-semibold text-white">{new Date(user.payments?.[0]?.created_at ?? new Date()).toLocaleDateString("en-GB")}</span>
                </div>
                <div className="border-t border-slate-700 my-4"></div>
                <div className="p-4 bg-gradient-to-tr from-green-500/10 to-transparent border border-green-500/30 rounded-lg text-center">
                  <h3 className="text-lg font-bold text-green-300">Your Official Certificate</h3>
                  <p className="text-sm text-slate-300 mt-1 mb-4">Download your proof of membership to the Darrang College Alumni Association.</p>
                  <Button
                    onClick={() => setShowCertificate(true)}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-600/20"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View & Download Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full bg-slate-800/50 border border-slate-700/80">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-3">
                <FileText className="h-6 w-6 text-purple-400" />
                Payment History
              </CardTitle>
              <Button
                variant="outline"
                className="text-xs h-8 border-slate-600 hover:bg-slate-700"
                onClick={handleDownloadHistory}
              >
                <Download className="h-3 w-3 mr-2" />
                Download History
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 uppercase border-b border-slate-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Description</th>
                      <th scope="col" className="px-6 py-3 text-right">Amount</th>
                      <th scope="col" className="px-6 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.payments?.map((payment: any) => (
                      <tr key={payment.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{new Date(payment.created_at).toLocaleDateString("en-GB")}</td>
                        <td className="px-6 py-4 text-white uppercase">{payment.donation?.title ?? "Membership Payment"}</td>
                        <td className="px-6 py-4 font-mono text-right text-white ">₹{(payment.amount).toLocaleString("en-IN")}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`bg-green-500/20 text-green-300 text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}