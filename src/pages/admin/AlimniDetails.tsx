import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hook";
import {
  fetchAlumniDetails,
  clearAlumniDetails,
} from "../../reducer/alumniDetailsSlice";
import { Loader2, FileText, ArrowLeft, UserCircle2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const StatusPill = ({ status }: { status: string }) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block capitalize";
  let colorClasses = "";
  switch (status?.toLowerCase()) {
    case "active":
    case "paid":
    case "approved":
      colorClasses =
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      break;
    case "pending":
      colorClasses =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      break;
    case "expired":
    case "rejected":
      colorClasses =
        "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      break;
    default:
      colorClasses =
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <div className="sm:col-span-1">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </dt>
    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
      {value || "N/A"}
    </dd>
  </div>
);

const AlumniDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile, payments, status } = useAppSelector(
    (state) => state.alumniDetails
  );

  useEffect(() => {
    if (id) dispatch(fetchAlumniDetails(Number(id)));
    return () => {
      dispatch(clearAlumniDetails());
    };
  }, [dispatch, id]);

  if (status === "loading" || !profile) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bar with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/alumni")}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Alumni List
          </button>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <UserCircle2 className="w-16 h-16 text-white opacity-90" />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-blue-100">{profile.email}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <StatusPill status={profile.status} />
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-white">
          🎓 Alumni Profile
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <DetailItem label="Phone" value={profile.phone} />
          <DetailItem label="Batch" value={profile.batch} />
          <DetailItem label="Father's Name" value={profile.father} />
          <DetailItem label="Mother's Name" value={profile.mother} />
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {profile.address}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Co-curricular Activities
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {profile.activities}
            </dd>
          </div>
          <DetailItem label="Membership Type" value={profile.membership_type} />
        </dl>
      </div>

      {/* Documents Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
          <FileText className="w-5 h-5 text-blue-500" /> Uploaded Documents
        </h3>
        <div className="flex flex-wrap gap-3">
          {profile.documents.length > 0 ? (
            profile.documents.map((doc, index) => (
              <a
                key={index}
                href={`/storage/${doc.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{doc.type}</span>
              </a>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No documents uploaded.
            </p>
          )}
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          💳 Payment History
        </h3>
        {payments.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {payment.donation?.title || "Membership"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                      ₹{payment.amount}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusPill status={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No payment records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AlumniDetailsPage;
