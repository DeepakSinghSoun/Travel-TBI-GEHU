import { useState, useEffect } from "react";
import Loader from "../components/Loader";

function Dashboard() {
  const [user] = useState("Deepak");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    listings: 0,
    bookings: 0,
    revenue: 0,
    pending: 0,
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        listings: 24,
        bookings: 18,
        revenue: 45000,
        pending: 5,
      });

      setBookings([
        {
          id: 1,
          guest: "Rahul Sharma",
          property: "Mountain View Cottage",
          status: "Confirmed",
        },
        {
          id: 2,
          guest: "Priya Singh",
          property: "Lake View Villa",
          status: "Pending",
        },
        {
          id: 3,
          guest: "Amit Verma",
          property: "Forest Retreat",
          status: "Pending",
        },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  // Reusable Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome, {user}
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your properties and booking requests.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Listings</h2>
          <p className="text-3xl font-bold">{stats.listings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-3xl font-bold">{stats.bookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold">
            ₹{stats.revenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Pending Requests</h2>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
      </div>

      {/* Recent Booking Requests */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Booking Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Guest</th>
                <th className="text-left py-3">Property</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b"
                >
                  <td className="py-3">
                    {booking.guest}
                  </td>

                  <td className="py-3">
                    {booking.property}
                  </td>

                  <td
                    className={`py-3 font-medium ${
                      booking.status === "Confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </td>

                  <td className="py-3 flex gap-2">
                    {booking.status === "Confirmed" ? (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        View
                      </button>
                    ) : (
                      <>
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                          Approve
                        </button>

                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;