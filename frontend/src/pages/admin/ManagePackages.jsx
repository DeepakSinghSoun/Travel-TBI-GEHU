import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function ManagePackages() {
  const [packages, setPackages] =useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await API.get("/packages");

      if (res.data.success) {
        setPackages(res.data.packages);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load packages."
      );
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      await API.delete(`/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPackages((prev) =>
        prev.filter((pkg) => pkg._id !== id)
      );

      alert("Package deleted successfully.");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete package."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) =>
      `${pkg.title} ${pkg.destination} ${pkg.difficulty}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [packages, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Packages...
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
            Travel Packages
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all travel packages.
          </p>
        </div>

        <Link
          to="/admin/packages/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Package
        </Link>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Packages
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {packages.length}
          </h2>
        </div>

        <div className="bg-green-100 rounded-xl shadow p-6">
          <p className="text-green-700">
            Available
          </p>

          <h2 className="text-4xl font-bold">
            {
              packages.filter(
                (pkg) => pkg.status === "Available"
              ).length
            }
          </h2>
        </div>

        <div className="bg-red-100 rounded-xl shadow p-6">
          <p className="text-red-700">
            Full
          </p>

          <h2 className="text-4xl font-bold">
            {
              packages.filter(
                (pkg) => pkg.status === "Full"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search package..."
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
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4">Seats</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredPackages.length === 0 ? (

              <tr>
                <td
                  colSpan="9"
                  className="text-center py-8 text-gray-500"
                >
                  No Packages Found
                </td>
              </tr>

            ) : (

              filteredPackages.map((pkg) => (

                <tr
                  key={pkg._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    {pkg.image ? (

                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-24 h-16 rounded object-cover"
                      />

                    ) : (

                      <div className="w-24 h-16 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">
                        No Image
                      </div>

                    )}

                  </td>

                  <td className="p-4 font-semibold">
                    {pkg.title}
                  </td>

                  <td className="p-4">
                    {pkg.destination}
                  </td>

                  <td className="p-4">
                    {pkg.duration}
                  </td>

                  <td className="p-4 text-green-600 font-bold">
                    ₹{pkg.price}
                  </td>

                  <td className="p-4">
                    {pkg.seats}
                  </td>

                  <td className="p-4">
                    {pkg.difficulty}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        pkg.status === "Available"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {pkg.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <Link
                        to={`/admin/packages/edit/${pkg._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deletePackage(pkg._id)
                        }
                        disabled={deletingId === pkg._id}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-3 py-2 rounded"
                      >
                        {deletingId === pkg._id
                          ? "Deleting..."
                          : "Delete"}
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

export default ManagePackages;