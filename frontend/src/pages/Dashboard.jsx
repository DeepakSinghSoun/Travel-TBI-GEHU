function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Host Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Listings</h2>
          <p className="text-3xl font-bold">24</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-3xl font-bold">18</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold">₹45,000</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Pending Requests</h2>
          <p className="text-3xl font-bold">5</p>
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
              <tr className="border-b">
                <td className="py-3">Rahul Sharma</td>
                <td className="py-3">Mountain View Cottage</td>
                <td className="py-3 text-green-600 font-medium">
                  Confirmed
                </td>
                <td className="py-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Priya Singh</td>
                <td className="py-3">Lake View Villa</td>
                <td className="py-3 text-yellow-600 font-medium">
                  Pending
                </td>
                <td className="py-3 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Approve
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Reject
                  </button>
                </td>
              </tr>

              <tr>
                <td className="py-3">Amit Verma</td>
                <td className="py-3">Forest Retreat</td>
                <td className="py-3 text-yellow-600 font-medium">
                  Pending
                </td>
                <td className="py-3 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Approve
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;