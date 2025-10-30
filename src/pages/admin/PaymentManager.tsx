import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hook";
import { CreditCard, Loader2, TrendingUp } from "lucide-react";
import { fetchAllPayments, fetchPaymentStats } from "@/reducer/adminSlice";
import { Badge } from "@/components/ui/badge";



const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string; value: string; icon: React.ElementType; change?: string; changeType?: 'increase' | 'decrease' }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
            {change && (
                <p className={`text-xs mt-1 flex items-center ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${changeType === 'decrease' ? 'transform rotate-180' : ''}`} />
                    {change}
                </p>
            )}
        </div>
    </div>
);

const StatusPill = ({ status }: { status: string }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    let colorClasses = "";
    switch (status?.toLowerCase()) {
        case 'active':
        case 'paid':
        case 'approved':
            case 'online':
            colorClasses = "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
            break;
        case 'pending':
            colorClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
            break;
        case 'expired':
        case 'rejected':
            case 'ofline':
            colorClasses = "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
            break;
        default:
            colorClasses = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

const DataTable = ({ title, headers, data, renderRow, icon: Icon, isLoading }: { title: string, headers: string[], data: any[], renderRow: (item: any, index: number) => JSX.Element, icon?: React.ElementType, isLoading?: boolean }) => (
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
                                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            <tr><td colSpan={headers.length} className="text-center p-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" /></td></tr>
                        ) : data?.length > 0 ? (
                            data.map(renderRow)
                        ) : (
                            <tr><td colSpan={headers.length} className="text-center p-8 text-gray-500 dark:text-gray-400">No data available.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);


const PaymentsManager = () => {
  const dispatch = useAppDispatch();
  const { list: payments, stats: paymentStats, status } = useAppSelector(
    (state) => state.payments
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Online" | "Offline">("All");

  useEffect(() => {
    dispatch(fetchAllPayments({}));
    dispatch(fetchPaymentStats());
  }, [dispatch]);

  // Filtered & sorted payments
  const filteredPayments = useMemo(() => {
    let filtered = [...payments];

    // Sort new first
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Filter by Offline/Online
    if (filterType !== "All") {
      filtered = filtered.filter((p) =>
        filterType === "Offline" ? p.order_id.startsWith("manual") : !p.order_id.startsWith("manual")
      );
    }

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.user?.alumni?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.order_id.startsWith("manual") ? "offline" : "online").includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [payments, filterType, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {paymentStats?.map((stat) => (
          <StatCard key={stat.title} {...stat} icon={CreditCard} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name, payment ID, or type..."
          className="w-full md:w-64 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2">
          {["All", "Online", "Offline"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filterType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <DataTable
        title={`All Payments (${filteredPayments.length})`}
        icon={CreditCard}
        headers={["Alumnus Name", "Amount", "Date", "Method", "Type", "Status", "Payment ID"]}
        data={filteredPayments}
        isLoading={status === "loading"}
        renderRow={(payment: any) => {
          const isOffline = payment.order_id.startsWith("manual");
          const paymentType = isOffline ? "Offline" : "Online";

          const badgeClasses = isOffline
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-semibold";

          return (
            <tr
              key={payment.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {payment.user?.alumni?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
               
              <Badge variant="secondary" className="text-green-700 dark:text-green-300">
    ₹{payment.amount.toLocaleString("en-IN")}
  </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {new Date(payment.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
               
                   <StatusPill status= {payment.method}/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
               
                     <StatusPill status=  {paymentType}/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusPill status={payment.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={badgeClasses}>{payment.payment_id}</span>
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default PaymentsManager;
