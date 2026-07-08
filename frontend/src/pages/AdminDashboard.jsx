import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHomestays: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
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
      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Welcome back! Here's an overview of your platform.
        </p>

      </div>

      {/* Main Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            👤 Total Users
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            🏡 Homestays
          </p>

          <h2 className="text-4xl font-bold mt-2 text-indigo-600">
            {stats.totalHomestays}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            📅 Bookings
          </p>

          <h2 className="text-4xl font-bold mt-2 text-purple-600">
            {stats.totalBookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            💰 Revenue
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            ₹{stats.totalRevenue}
          </h2>
        </div>

      </div>

      {/* Booking Status */}

      <h2 className="text-2xl font-bold mb-5">
        Booking Status
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-yellow-100 rounded-xl shadow p-6">

          <p className="text-yellow-700 font-medium">
            Pending
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {stats.pendingBookings}
          </h2>

        </div>

        <div className="bg-green-100 rounded-xl shadow p-6">

          <p className="text-green-700 font-medium">
            Confirmed
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {stats.approvedBookings}
          </h2>

        </div>

        <div className="bg-red-100 rounded-xl shadow p-6">

          <p className="text-red-700 font-medium">
            Cancelled
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {stats.rejectedBookings}
          </h2>

        </div>

      </div>

      {/* Quick Actions */}

      <h2 className="text-2xl font-bold mb-5">
        Quick Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/admin/homestays"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-4">
            🏡
          </div>

          <h2 className="text-2xl font-bold">
            Homestays
          </h2>

          <p className="text-gray-500 mt-2">
            Add, edit and delete homestays.
          </p>

        </Link>

        <Link
          to="/admin/trips"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-4">
            ✈️
          </div>

          <h2 className="text-2xl font-bold">
            Trips
          </h2>

          <p className="text-gray-500 mt-2">
            Manage travel packages.
          </p>

        </Link>

        <Link
          to="/admin/bookings"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-4">
            📅
          </div>

          <h2 className="text-2xl font-bold">
            Bookings
          </h2>

          <p className="text-gray-500 mt-2">
            Approve or cancel bookings.
          </p>

        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-4">
            👥
          </div>

          <h2 className="text-2xl font-bold">
            Users
          </h2>

          <p className="text-gray-500 mt-2">
            View all registered users.
          </p>

        </Link>

        <Link
          to="/admin/packages"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-4">
            🎒
          </div>

          <h2 className="text-2xl font-bold">
            Travel Packages
          </h2>

          <p className="text-gray-500 mt-2">
            Add, Edit & Delete Packages.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;