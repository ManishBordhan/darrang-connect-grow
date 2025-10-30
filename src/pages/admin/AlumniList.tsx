import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hook";
import { fetchAllAlumni } from "@/reducer/adminSlice";
import {
  Users,
  Search,
  Download,
  ChevronRight,
  FilterX,
} from "lucide-react";
import { Link } from "react-router-dom";
import DataTable from "./Datatable";
import StatusPill from "./StatusPill";
import * as XLSX from "xlsx";

// Define the initial state for filters
const initialFilters = {
  searchTerm: "",
  membershipFilter: "all",
  statusFilter: "all",
  batchType: "all",
  batchValue: "all",
  page: 1,
};

const AlumniList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: alumni, pagination, status } = useAppSelector(
    (state: any) => state.adminAlumni
  );

  // Use the initial state
  const [filters, setFilters] = useState<any>(initialFilters);

  useEffect(() => {
    dispatch(fetchAllAlumni(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  // Filtering logic remains the same
  const filteredAlumni = (alumni || [])
    .filter((a: any) =>
      filters.searchTerm
        ? a.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          a.user?.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true
    )
    .filter((a: any) =>
      filters.membershipFilter === "all"
        ? true
        : a.membership_type === filters.membershipFilter
    )
    .filter((a: any) =>
      filters.statusFilter === "all" ? true : a.status === filters.statusFilter
    )
    .filter((a: any) => {
      if (filters.batchType === "all" || filters.batchValue === "all")
        return true;
      if (filters.batchType === "hs") return a.batch_hs === filters.batchValue;
      if (filters.batchType === "degree")
        return a.batch_degree === filters.batchValue;
      if (filters.batchType === "master")
        return a.batch_master === filters.batchValue;
      return true;
    });

  // Export logic remains the same
  const exportToExcel = () => {
    // ... (your existing export logic) ...
  };

  // --- UI Style Classes ---

  // UPDATED: Select class to match search input
  const selectBaseClass =
    "text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl pl-3 pr-8 py-2.5 font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition appearance-none";
  
  // Search input class (unchanged)
  const searchInputClass =
    "w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition pl-10";

  // --- Helper functions (unchanged) ---
  const formatBatches = (alumnus: any) => {
    const hs = alumnus.batch_hs ? `HS: ${alumnus.batch_hs}` : null;
    const degree = alumnus.batch_degree
      ? `Degree: ${alumnus.batch_degree}`
      : null;
    const master = alumnus.batch_master
      ? `Master: ${alumnus.batch_master}`
      : null;
    const allBatches = [hs, degree, master].filter(Boolean).join(" | ");
    return allBatches || "N/A";
  };

  const formatStudies = (alumnus: any) => {
    const stream = alumnus.stream ? `Stream: ${alumnus.stream}` : null;
    const subject = alumnus.subject ? `Subject: ${alumnus.subject}` : null;
    const allStudies = [stream, subject].filter(Boolean).join(" | ");
    return allStudies || "N/A";
  };

  return (
    <div className="space-y-8">
      {/* Page Header (remains the same) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Alumni Management
        </h2>
        <button
          onClick={exportToExcel}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Download className="h-5 w-5" />
          Export to Excel
        </button>
      </div>

      {/* --- NEW: Modern Filter Toolbar --- */}
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        
        {/* Search Bar (Priority) */}
        <div className="relative flex-grow w-full md:w-auto md:max-w-xs">
          <label htmlFor="searchTerm" className="sr-only">
            Search
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="searchTerm"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            placeholder="Search by name or email..."
            className={searchInputClass}
          />
        </div>

        {/* Filter Dropdowns Group */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
          
          {/* Membership (No label, updated default option) */}
          <div>
            <label htmlFor="membershipFilter" className="sr-only">Membership</label>
            <select
              id="membershipFilter"
              name="membershipFilter"
              value={filters.membershipFilter}
              onChange={handleFilterChange}
              className={selectBaseClass}
            >
              <option value="all">All Memberships</option>
              <option value="Lifetime">Lifetime</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          {/* Status (No label, updated default option) */}
          <div>
            <label htmlFor="statusFilter" className="sr-only">Status</label>
            <select
              id="statusFilter"
              name="statusFilter"
              value={filters.statusFilter}
              onChange={handleFilterChange}
              className={selectBaseClass}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Batch Type (No label, updated default option) */}
          <div>
            <label htmlFor="batchType" className="sr-only">Batch Type</label>
            <select
              id="batchType"
              name="batchType"
              value={filters.batchType}
              onChange={handleFilterChange}
              className={selectBaseClass}
            >
              <option value="all">All Batch Types</option>
              <option value="hs">HS</option>
              <option value="degree">Degree</option>
              <option value="master">Master</option>
            </select>
          </div>

          {/* Batch Year (No label, updated default option) */}
          <div>
            <label htmlFor="batchValue" className="sr-only">Batch Year</label>
            <select
              id="batchValue"
              name="batchValue"
              value={filters.batchValue}
              onChange={handleFilterChange}
              className={selectBaseClass}
            >
              <option value="all">All Years</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button (Pushed to the end) */}
        <div className="md:ml-auto">
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FilterX className="h-4 w-4" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Alumni Table (No changes here) */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <DataTable
          title={`Showing ${filteredAlumni.length} of ${
            pagination?.total || 0
          } Alumni`}
          icon={Users}
          headers={[
            "Name",
            "Academic Details",
            "Membership",
            "Status",
            "Actions",
          ]}
          data={filteredAlumni}
          isLoading={status === "loading"}
          renderRow={(alumnus: any) => (
            <tr
              key={alumnus.id}
              className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {/* Name & Email */}
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                    {alumnus.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {alumnus.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {alumnus.user?.email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Academic Details */}
              <td className="px-6 py-3 whitespace-nowrap text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {formatBatches(alumnus)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {formatStudies(alumnus)}
                  </span>
                </div>
              </td>

              {/* Membership */}
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {alumnus.membership_type || "N/A"}
              </td>

              {/* Status */}
              <td className="px-6 py-3 whitespace-nowrap">
                <StatusPill status={alumnus.status || "N/A"} />
              </td>

              {/* Actions */}
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/dashboard/alumni/${alumnus.user_id}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/75 transition-colors"
                >
                  View
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default AlumniList;