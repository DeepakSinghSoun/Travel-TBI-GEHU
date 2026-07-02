import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHomestays: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");

      if (res.data.success) {
        setStats(res.data.stats);
      } else {
        setError("Failed to load dashboard.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage Homestays, Trips, Bookings and Users
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Homestays</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalHomestays}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalBookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">
            ₹{stats.totalRevenue}
          </h2>
        </div>

      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/admin/homestays"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold">
            🏡 Homestays
          </h2>

          <p className="text-gray-500 mt-2">
            Add, Edit & Delete Homestays
          </p>
        </Link>

        <Link
          to="/admin/trips"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold">
            ✈ Trips
          </h2>

          <p className="text-gray-500 mt-2">
            Manage Travel Packages
          </p>
        </Link>

        <Link
          to="/admin/bookings"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold">
            📅 Bookings
          </h2>

          <p className="text-gray-500 mt-2">
            View & Approve Bookings
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold">
            👤 Users
          </h2>

          <p className="text-gray-500 mt-2">
            View Registered Users
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;