import { useEffect, useState } from "react";
import API from "../api";
import Loader from "../components/Loader";

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

      const [tripRes, bookingRes] = await Promise.all([
        API.get("/trips"),
        API.get("/bookings/my"),
      ]);

      const tripData = tripRes.data.trips || [];
      const bookingData = bookingRes.data.bookings || [];

      setTrips(tripData);

      setStats({
        totalTrips: tripData.length,
        bookings: bookingData.length,
        revenue: bookingData.reduce(
          (sum, booking) => sum + booking.totalPrice,
          0
        ),
        pending: bookingData.filter(
          (booking) => booking.status === "pending"
        ).length,
      });

      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load dashboard.");
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

      <h1 className="text-4xl font-bold mb-2">
        User Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome back! Here is your travel summary.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Trips</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalTrips}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">My Bookings</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.bookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Spent</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">
            ₹{stats.revenue}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-4xl font-bold mt-2 text-yellow-500">
            {stats.pending}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow mt-10 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Available Trips
        </h2>

        {trips.length === 0 ? (
          <p>No trips available.</p>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="border rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold">
                  {trip.destination}
                </h3>

                <p>Budget: ₹{trip.budget}</p>
                <p>Travelers: {trip.travelers}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default UserDashboard;