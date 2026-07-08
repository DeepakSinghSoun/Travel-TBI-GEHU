import { useEffect, useState } from "react";
import API from "../api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [trips, setTrips] = useState([]);

  const [stats, setStats] = useState({
    totalTrips: 0,
    bookings: 0,
    revenue: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const [tripRes, bookingRes] = await Promise.all([
        API.get("/trips"),
        API.get("/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const tripData = tripRes.data.trips || [];
      const bookingData = bookingRes.data.bookings || [];

      setTrips(tripData);

      setStats({
        totalTrips: tripData.length,
        bookings: bookingData.length,
        revenue: bookingData.reduce(
          (sum, booking) => sum + (booking.totalPrice || 0),
          0
        ),
        pending: bookingData.filter(
          (booking) => booking.status === "pending"
        ).length,
      });

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

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

      <h1 className="text-4xl font-bold">
        User Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Welcome back! Here's your travel summary.
      </p>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Trips
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalTrips}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            My Bookings
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.bookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Spent
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            ₹{stats.revenue}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {stats.pending}
          </h2>
        </div>

      </div>

      {/* Trips */}

      <div className="bg-white rounded-xl shadow mt-10 p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Available Trips
          </h2>

          <Link
            to="/trip-planner"
            className="text-blue-600 font-semibold"
          >
            Plan New Trip →
          </Link>

        </div>

        {trips.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No trips available.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {trips.map((trip) => (

              <div
                key={trip._id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >

                <img
                  src={
                    trip.image ||
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                  }
                  alt={trip.destination}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-2xl font-bold">
                    {trip.destination}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    📅 {trip.startDate || "Coming Soon"}
                  </p>

                  <p className="mt-3">
                    💰 ₹{trip.budget}
                  </p>

                  <p className="mt-2">
                    👥 {trip.travelers}
                  </p>

                  <p className="mt-2">
                    🚍 {trip.transport || "Not Specified"}
                  </p>

                  <p className="mt-2">
                    🏨 {trip.hotelType || "Homestay"}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      View
                    </button>

                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                      Book
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default UserDashboard;
