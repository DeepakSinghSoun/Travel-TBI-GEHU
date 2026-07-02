import { useEffect, useState } from "react";
import API from "../../api";

function ManageHomestays() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHomestays();
  }, []);

  const fetchHomestays = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/homestays", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHomestays(res.data.homestays);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load homestays");
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
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Manage Homestays
        </h1>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Homestay
        </button>

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Title</th>

              <th className="p-4 text-left">Location</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Rooms</th>

              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {homestays.map((item) => (

              <tr
                key={item._id}
                className="border-t"
              >

                <td className="p-4">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-4">
                  {item.title}
                </td>

                <td className="p-4">
                  {item.location}
                </td>

                <td className="p-4">
                  ₹{item.price}
                </td>

                <td className="p-4">
                  {item.availableRooms}
                </td>

                <td className="p-4 space-x-2">

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteHomestay(item._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageHomestays;