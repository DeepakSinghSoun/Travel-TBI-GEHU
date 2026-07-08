import { useEffect, useMemo, useState } from "react";
import API from "../../api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalAdmins = users.filter(
    (u) => u.role === "admin"
  ).length;

  const totalUsers = users.filter(
    (u) => u.role !== "admin"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Users...
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
            Manage Users
          </h1>

          <p className="text-gray-500 mt-2">
            View all registered users.
          </p>
        </div>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Accounts
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Admins
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {totalAdmins}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Normal Users
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {totalUsers}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4">#</th>

              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4">
                Role
              </th>

              <th className="p-4">
                Joined
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No users found.
                </td>

              </tr>

            ) : (

              filteredUsers.map((user, index) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 text-center">
                    {index + 1}
                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {user._id.slice(-6)}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        user.role === "admin"
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4 text-center">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
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

export default ManageUsers;