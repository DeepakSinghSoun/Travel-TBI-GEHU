import { useEffect, useMemo, useState } from "react";
import API from "../../api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

const updateStatus = async (id, status) => {
  const confirmUpdate = window.confirm(
    `Are you sure you want to change the booking status to "${status}"?`
  );

  if (!confirmUpdate) return;

  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/admin/bookings/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Refresh bookings from the database
    fetchBookings();

    alert(`Booking ${status} successfully.`);
  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
        "Failed to update booking."
    );
  }
};

  const deleteBooking = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(`/admin/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Reload latest bookings from the database
    fetchBookings();

    alert("Booking deleted successfully.");
  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Failed to delete booking."
    );
  }
};

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) =>
      `${booking.user?.name || ""} ${booking.homestay?.title || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [bookings, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gray-100 p-8">

    {/* Header */}

    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold">
          Manage Bookings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all customer booking requests.
        </p>
      </div>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">Total Bookings</p>
        <h2 className="text-4xl font-bold mt-2">
          {bookings.length}
        </h2>
      </div>

      <div className="bg-yellow-100 rounded-xl shadow p-6">
        <p className="text-gray-600">Pending</p>
        <h2 className="text-4xl font-bold text-yellow-600 mt-2">
          {bookings.filter((b) => b.status === "pending").length}
        </h2>
      </div>

      <div className="bg-green-100 rounded-xl shadow p-6">
        <p className="text-gray-600">Approved</p>
        <h2 className="text-4xl font-bold text-green-600 mt-2">
          {bookings.filter((b) => b.status === "approved").length}
        </h2>
      </div>

      <div className="bg-red-100 rounded-xl shadow p-6">
        <p className="text-gray-600">Rejected</p>
        <h2 className="text-4xl font-bold text-red-600 mt-2">
          {bookings.filter((b) => b.status === "rejected").length}
        </h2>
      </div>

    </div>

    {/* Search */}

    <div className="mb-6">

      <input
        type="text"
        placeholder="Search by user or homestay..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>

    {/* Table */}

    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-4">User</th>

            <th className="p-4">Homestay</th>

            <th className="p-4">Check In</th>

            <th className="p-4">Check Out</th>

            <th className="p-4">Guests</th>

            <th className="p-4">Amount</th>

            <th className="p-4">Status</th>

            <th className="p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredBookings.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center py-8 text-gray-500"
              >
                No bookings found.
              </td>

            </tr>

          ) : (

            filteredBookings.map((booking) => (

              <tr
                key={booking._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  <div className="font-semibold">
                    {booking.user?.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {booking.user?.email}
                  </div>
                </td>

                <td className="p-4">
                  <div className="font-semibold">
                    {booking.homestay?.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {booking.homestay?.location}
                  </div>
                </td>

                <td className="p-4">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>

                <td className="p-4 text-center">
                  {booking.guests}
                </td>

                <td className="p-4 font-bold text-green-600">
                  ₹{booking.totalPrice}
                </td>

                <td className="p-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-white capitalize ${
                      booking.status === "approved"
                        ? "bg-green-600"
                        : booking.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2 justify-center">

                    {booking.status !== "approved" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "approved"
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                      >
                        Approve
                      </button>
                    )}

                    {booking.status !== "rejected" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "rejected"
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    )}

                    {booking.status !== "pending" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "pending"
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                      >
                        Pending
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </div>
);
}

export default ManageBookings;