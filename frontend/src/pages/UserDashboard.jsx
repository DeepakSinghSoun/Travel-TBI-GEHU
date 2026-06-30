import { useEffect, useState } from "react";
import API from "../api";
import Loader from "../components/Loader";

function UserDashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalTrips: 0,
    bookings: 0,
    revenue: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        // HARD CHECK
        if (!token) {
          setError("No token found. Please login first.");
          setLoading(false);
          return;
        }

        const res = await API.get("/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.trips || [];

        setTrips(data);

        // REAL STATS FROM BACKEND DATA
        setStats({
          totalTrips: data.length,
          bookings: data.length,
          revenue: data.reduce(
            (sum, trip) => sum + (trip.budget || 0),
            0
          ),
          pending: 0,
        });

        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Not authorized or API failed"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // LOADING
  if (loading) return <Loader />;

  // ERROR
  if (error)
    return (
      <div className="p-6 text-red-600">
        <h2>{error}</h2>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your trips and track activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Total Trips</h2>
          <p className="text-3xl font-bold">
            {stats.totalTrips}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Bookings</h2>
          <p className="text-3xl font-bold">
            {stats.bookings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Revenue</h2>
          <p className="text-3xl font-bold">
            ₹{stats.revenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Pending</h2>
          <p className="text-3xl font-bold">
            {stats.pending}
          </p>
        </div>
      </div>

      {/* TRIPS LIST */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">

        <h2 className="text-2xl font-semibold mb-4">
          Your Trips
        </h2>

        {trips.length === 0 ? (
          <p>No trips found</p>
        ) : (
          <div className="space-y-3">

            {trips.map((trip) => (
              <div
                key={trip._id}
                className="border p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg">
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