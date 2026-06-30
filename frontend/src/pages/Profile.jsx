import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH USER + BOOKINGS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login first.");
          setLoading(false);
          return;
        }

        // USER DATA
        const userRes = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // USER TRIPS / BOOKINGS
        const tripRes = await API.get("/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userRes.data.user);
        setTrips(tripRes.data.trips || []);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* USER INFO */}
        <div className="bg-white p-6 rounded-lg shadow">

          <h1 className="text-4xl font-bold mb-6">
            Profile
          </h1>

          <div className="space-y-2">
            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>
          </div>

        </div>

        {/* BOOKINGS */}
        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-2xl font-bold mb-4">
            My Bookings
          </h2>

          {trips.length === 0 ? (
            <p>No bookings found</p>
          ) : (
            <div className="space-y-3">

              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="border p-4 rounded-lg"
                >
                  <h3 className="font-bold">
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
    </div>
  );
}

export default Profile;