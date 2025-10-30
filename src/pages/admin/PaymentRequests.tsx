"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hook";
import { ClipboardCheck, Loader2 } from "lucide-react";
import { fetchPendingPayments, updatePaymentStatus } from "@/reducer/customPaymentReducer";
import { Button } from "@/components/ui/button";

// --- Status Pill Component ---
const StatusPill = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
  let colorClasses = "";

  switch (status?.toLowerCase()) {
    case "active":
    case "paid":
    case "approved":
      colorClasses = "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      break;
    case "pending":
      colorClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      break;
    case "expired":
    case "rejected":
      colorClasses = "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }

  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

// --- DataTable Component ---
const DataTable = ({
  title,
  headers,
  data,
  renderRow,
  icon: Icon,
  isLoading,
}: {
  title: string;
  headers: string[];
  data: any[];
  renderRow: (item: any) => JSX.Element;
  icon?: React.ElementType;
  isLoading?: boolean;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
      {Icon && <Icon className="w-6 h-6 mr-3 text-blue-500" />}
      {title}
    </h3>
    <div className="overflow-x-auto -mx-6 flex-grow">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={headers.length} className="text-center p-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data.map(renderRow)
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center p-8 text-gray-500 dark:text-gray-400">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const PaymentRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pendingPayments, loading, error, successMessage } = useAppSelector(
    (state) => state.manualpayment
  );

  useEffect(() => {
    dispatch(fetchPendingPayments());
  }, [dispatch]);

  const handleApprove = async (id: number) => {
    try {
      await dispatch(updatePaymentStatus({ id, status: "approved" })).unwrap();
      alert("Payment approved successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to approve payment");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await dispatch(updatePaymentStatus({ id, status: "rejected" })).unwrap();
      alert("Payment rejected successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to reject payment");
    }
  };

  // Render receipt: image preview for images, link for PDF/others
  const renderReceipt = (receipt: string | null) => {
    if (!receipt) return "No file";

    const url = `http://localhost:8000/storage/${receipt}`;
    const extension = receipt.split(".").pop()?.toLowerCase();

    if (extension === "pdf") {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          View PDF
        </a>
      );
    } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} alt="Receipt" className="w-16 h-16 object-cover rounded-md border border-gray-300" />
        </a>
      );
    } else {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          View File
        </a>
      );
    }
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

      <DataTable
        title="Offline Payment Requests"
        icon={ClipboardCheck}
        headers={["Alumnus Name", "Amount", "Date", "Status", "Receipt", "Actions"]}
        data={pendingPayments}
        isLoading={loading}
        renderRow={(payment) => (
          <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {payment.user?.alumni?.name || "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              ₹{payment.amount.toLocaleString("en-IN")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {new Date(payment.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusPill status={payment.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{renderReceipt(payment.receipt)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <Button
                onClick={() => handleApprove(payment.id)}
                size="sm"
                variant="outline"
                className="text-green-600 hover:text-green-800"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleReject(payment.id)}
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-800"
              >
                Reject
              </Button>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default PaymentRequests;
