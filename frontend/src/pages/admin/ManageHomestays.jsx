import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function ManageHomestays() {
  const [homestays, setHomestays] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHomestays();
  }, []);

  const fetchHomestays = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/admin/homestays", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHomestays(res.data.homestays || []);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load homestays."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteHomestay = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this homestay?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/homestays/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHomestays((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete homestay."
      );
    }
  };

  const filteredHomestays = useMemo(() => {
    return homestays.filter((home) =>
      `${home.title} ${home.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [homestays, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Homestays...
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
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Homestays
          </h1>

          <p className="text-gray-500 mt-2">
            Add, edit and manage all homestays.
          </p>
        </div>

        <Link
          to="/admin/homestays/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          + Add Homestay
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Homestays
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {homestays.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Available
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {
              homestays.filter(
                (item) => item.availableRooms > 0
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Sold Out
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {
              homestays.filter(
                (item) => item.availableRooms <= 0
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Image</th>
              <th className="p-4 text-left">
                Homestay
              </th>
              <th className="p-4">
                Price
              </th>
              <th className="p-4">
                Rooms
              </th>
              <th className="p-4">
                Status
              </th>
              <th className="p-4">
                Created
              </th>
              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredHomestays.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No homestays found.
                </td>
              </tr>
            ) : (
              filteredHomestays.map(
                (item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="text-center p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      <img
                        src={
                          item.images?.[0] ||
                          "https://placehold.co/120x80"
                        }
                        alt={item.title}
                        className="w-28 h-20 object-cover rounded-lg"
                      />
                    </td>

                    <td className="p-4">
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        📍 {item.location}
                      </p>
                    </td>

                    <td className="text-center font-semibold">
                      ₹{item.price}
                    </td>

                    <td className="text-center">
                      {item.availableRooms}
                    </td>

                    <td className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          item.availableRooms > 0
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {item.availableRooms > 0
                          ? "Available"
                          : "Sold Out"}
                      </span>
                    </td>

                    <td className="text-center">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/admin/homestays/edit/${item._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            deleteHomestay(item._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageHomestays;