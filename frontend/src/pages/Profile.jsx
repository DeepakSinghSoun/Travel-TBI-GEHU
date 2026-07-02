import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        // Get current user
        const userRes = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userRes.data.user);

        // Fetch bookings ONLY for normal users
        if (userRes.data.user.role !== "admin") {
          const bookingRes = await API.get("/bookings/my", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setBookings(bookingRes.data.bookings || []);
        }

        setError("");
      } catch (err) {
        console.log("PROFILE ERROR:", err.response || err.message);

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
      <div className="p-6 text-xl">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-4xl font-bold mb-6">
            My Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500">
                Full Name
              </p>

              <h2 className="text-xl font-semibold">
                {user?.name}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <h2 className="text-xl font-semibold">
                {user?.email}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Role
              </p>

              <span
                className={`inline-block mt-2 px-4 py-1 rounded-full text-white ${
                  user?.role === "admin"
                    ? "bg-red-600"
                    : "bg-green-600"
                }`}
              >
                {user?.role}
              </span>
            </div>

          </div>
        </div>

        {/* User Bookings */}
        {user?.role !== "admin" && (
          <div className="bg-white rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-5">
              My Bookings
            </h2>

            {bookings.length === 0 ? (
              <p className="text-gray-500">
                No bookings found.
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border rounded-lg p-5"
                  >
                    <h3 className="text-xl font-semibold">
                      {booking.homestay?.title || "Homestay"}
                    </h3>

                    <p className="mt-2">
                      <strong>Check In:</strong>{" "}
                      {booking.checkIn}
                    </p>

                    <p>
                      <strong>Check Out:</strong>{" "}
                      {booking.checkOut}
                    </p>

                    <p>
                      <strong>Guests:</strong>{" "}
                      {booking.guests}
                    </p>

                    <p className="font-bold text-green-600 mt-2">
                      ₹{booking.totalPrice}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;